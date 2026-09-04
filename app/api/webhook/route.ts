import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { Resend } from "resend";
import crypto from "crypto";
import { events } from "@/lib/data";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
const resend = new Resend(process.env.RESEND_API_KEY!);
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

const FULFILLMENT_EMAIL = "hello@burrabristol.co.uk";

const COLOR_MAP: Record<string, string> = {
  white: "WHI",
  black: "BLK",
};

const SIZE_MAP: Record<string, string> = {
  xxl: "2XL",
  xl:  "XLG",
  xs:  "XSM",
  l:   "LRG",
  m:   "MED",
  s:   "SML",
};

function mapToPn(description: string): string | null {
  const lower = description.toLowerCase();
  let color = "";
  for (const [name, code] of Object.entries(COLOR_MAP)) {
    if (lower.includes(name)) { color = code; break; }
  }
  let size = "";
  // Check longest first to avoid "xl" matching inside "xxl"
  for (const [name, code] of Object.entries(SIZE_MAP)) {
    if (lower.includes(`· ${name}`) || lower.endsWith(name)) { size = code; break; }
  }
  if (!color || !size) return null;
  return `AS-5001-${color}-${size}`;
}

function formatAddress(addr: Stripe.Address | null | undefined): string {
  if (!addr) return "Not provided";
  return [addr.line1, addr.line2, addr.city, addr.postal_code, addr.country]
    .filter(Boolean)
    .join(", ");
}

async function placeInkthreadableOrder(
  session: Stripe.Checkout.Session,
  teeItems: Stripe.LineItem[]
) {
  const collected = (session as unknown as {
    collected_information?: { shipping_details?: { address?: Stripe.Address; name?: string } };
  }).collected_information;

  const shippingAddr = session.shipping_details?.address ?? collected?.shipping_details?.address;
  const fullName = collected?.shipping_details?.name ?? session.customer_details?.name ?? "";
  const [firstName, ...rest] = fullName.split(" ");
  const lastName = rest.join(" ");

  const items = teeItems.flatMap((li) => {
    const pn = mapToPn(li.description ?? "");
    if (!pn) return [];
    return [{
      pn,
      quantity: li.quantity ?? 1,
      designs: [],
      mockups: [],
    }];
  });

  if (items.length === 0) return null;

  const country = shippingAddr?.country === "GB" ? "United Kingdom" : (shippingAddr?.country ?? "");

  const addressBlock = {
    firstName: firstName ?? "",
    lastName:  lastName ?? "",
    address1:  shippingAddr?.line1 ?? "",
    address2:  shippingAddr?.line2 ?? "",
    city:      shippingAddr?.city ?? "",
    postcode:  shippingAddr?.postal_code ?? "",
    country,
    phone1:    session.customer_details?.phone ?? "",
  };

  const body = JSON.stringify({
    external_id:      session.id.slice(-8).toUpperCase(),
    brand:            "Burra",
    shipping_address: addressBlock,
    billing_address:  addressBlock,
    items,
    shipping: { shippingMethod: "regular" },
  });

  const appId  = process.env.INKTHREADABLE_APP_ID!;
  const secret = process.env.INKTHREADABLE_SECRET_KEY!;
  const sig    = crypto.createHash("sha1").update(body + secret).digest("hex");

  const res = await fetch(
    `https://www.inkthreadable.co.uk/api/orders.php?AppId=${appId}&Signature=${sig}`,
    { method: "POST", headers: { "Content-Type": "application/json" }, body }
  );

  return res.json();
}

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature")!;

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
  } catch {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const raw = event.data.object as Stripe.Checkout.Session;
    const session = await stripe.checkout.sessions.retrieve(raw.id, {
      expand: ["shipping_details", "customer_details"],
    });

    const customerEmail = session.customer_details?.email;
    const customerName  = session.customer_details?.name ?? "there";
    const phone         = session.customer_details?.phone ?? "Not provided";

    const collected = (session as unknown as {
      collected_information?: { shipping_details?: { address?: Stripe.Address } };
    }).collected_information;

    const shippingAddress = formatAddress(
      session.shipping_details?.address ?? collected?.shipping_details?.address
    );
    const orderId = session.id.slice(-8).toUpperCase();

    const lineItemsPage = await stripe.checkout.sessions.listLineItems(session.id, { limit: 20 });
    const lineItems = lineItemsPage.data.filter((li) => li.description !== "UK Shipping");

    const teeItems = lineItems.filter((li) =>
      li.description?.toLowerCase().includes("tee")
    );
    const hasTees = teeItems.length > 0;

    const itemRowsHtml = lineItems.map((li) =>
      `<tr>
        <td style="padding:8px 0; border-bottom:1px solid rgba(74,44,28,0.1);">${li.description ?? "Item"}</td>
        <td style="padding:8px 0; border-bottom:1px solid rgba(74,44,28,0.1); text-align:center;">${li.quantity}</td>
        <td style="padding:8px 0; border-bottom:1px solid rgba(74,44,28,0.1); text-align:right;">£${((li.amount_total ?? 0) / 100).toFixed(2)}</td>
      </tr>`
    ).join("");

    const totalGBP = `£${((session.amount_total ?? 0) / 100).toFixed(2)}`;

    // ── Auto-fulfil tees via Inkthreadable ───────────────────────────────────
    let inkthreadableOrderId: string | null = null;
    if (hasTees) {
      try {
        const result = await placeInkthreadableOrder(session, teeItems);
        inkthreadableOrderId = result?.order?.id ?? null;
      } catch (err) {
        console.error("Inkthreadable order failed:", err);
      }
    }

    // ── Update ticket inventory in Stripe product metadata ──────────────────
    const eventTicketsRaw = session.metadata?.eventTickets;
    if (eventTicketsRaw) {
      const ticketMeta: Array<{ eventId: string; tickets: number }> = JSON.parse(eventTicketsRaw);
      for (const { eventId, tickets } of ticketMeta) {
        try {
          const result = await stripe.products.search({
            query: `metadata["event_id"]:"${eventId}"`,
          });
          const product = result.data[0];
          const currentSold = product ? parseInt(product.metadata.tickets_sold ?? "0", 10) : 0;
          const newSold = currentSold + tickets;

          if (product) {
            await stripe.products.update(product.id, {
              metadata: { ...product.metadata, tickets_sold: String(newSold) },
            });
          } else {
            const event = events.find((e) => e.id === eventId);
            await stripe.products.create({
              name: `Event Tickets: ${eventId}`,
              metadata: {
                event_id: eventId,
                tickets_sold: String(newSold),
                capacity: String(event?.capacity ?? 0),
              },
            });
          }
        } catch (err) {
          console.error(`Failed to update ticket count for ${eventId}:`, err);
        }
      }
    }

    // ── Customer confirmation email ──────────────────────────────────────────
    if (customerEmail) {
      await resend.emails.send({
        from: "Burra Bristol <onboarding@resend.dev>",
        to: customerEmail,
        subject: `Order confirmed — Burra Bristol (#${orderId})`,
        html: `
          <div style="font-family: Georgia, serif; max-width: 560px; margin: 0 auto; padding: 40px 24px; background: #f7f3ee; color: #4a2c1c;">
            <h1 style="font-size: 26px; margin: 0 0 8px;">Thanks, ${customerName}!</h1>
            <p style="font-size: 15px; line-height: 1.65; opacity: 0.7; margin: 0 0 28px;">
              Your order is confirmed and we're getting it ready. We'll email you when it's dispatched.
            </p>
            <table style="width:100%; border-collapse:collapse; font-size:14px; margin-bottom:24px;">
              <thead>
                <tr style="opacity:0.45; font-size:12px; text-transform:uppercase; letter-spacing:0.05em;">
                  <th style="text-align:left; padding-bottom:8px;">Item</th>
                  <th style="text-align:center; padding-bottom:8px;">Qty</th>
                  <th style="text-align:right; padding-bottom:8px;">Price</th>
                </tr>
              </thead>
              <tbody>${itemRowsHtml}</tbody>
              <tfoot>
                <tr>
                  <td colspan="2" style="padding-top:12px; font-weight:bold;">Total</td>
                  <td style="padding-top:12px; font-weight:bold; text-align:right;">${totalGBP}</td>
                </tr>
              </tfoot>
            </table>
            <div style="background:rgba(74,44,28,0.06); border-radius:10px; padding:16px 20px; font-size:13px; margin-bottom:24px;">
              <p style="margin:0 0 4px; opacity:0.5; font-size:11px; text-transform:uppercase; letter-spacing:0.05em;">Delivering to</p>
              <p style="margin:0;">${shippingAddress}</p>
            </div>
            <p style="font-size:13px; opacity:0.5;">
              Questions? Reply to this email or find us at hello@burrabristol.co.uk<br/>
              Burra · North Street · Clifton · Redland
            </p>
          </div>
        `,
      });
    }

    // ── Internal fulfillment email ───────────────────────────────────────────
    await resend.emails.send({
      from: "Burra Orders <onboarding@resend.dev>",
      to: FULFILLMENT_EMAIL,
      subject: `🛍️ New order — #${orderId}`,
      html: `
        <div style="font-family: Georgia, serif; max-width: 580px; margin: 0 auto; padding: 32px 24px; background: #f7f3ee; color: #4a2c1c;">
          <h2 style="margin:0 0 4px;">New order — #${orderId}</h2>
          <p style="opacity:0.5; font-size:13px; margin:0 0 24px;">Stripe session: ${session.id}</p>
          <table style="width:100%; border-collapse:collapse; font-size:14px; margin-bottom:24px;">
            <thead>
              <tr style="opacity:0.45; font-size:11px; text-transform:uppercase; letter-spacing:0.05em;">
                <th style="text-align:left; padding-bottom:8px;">Item</th>
                <th style="text-align:center; padding-bottom:8px;">Qty</th>
                <th style="text-align:right; padding-bottom:8px;">Price</th>
              </tr>
            </thead>
            <tbody>${itemRowsHtml}</tbody>
            <tfoot>
              <tr>
                <td colspan="2" style="padding-top:12px; font-weight:bold;">Total received</td>
                <td style="padding-top:12px; font-weight:bold; text-align:right;">${totalGBP}</td>
              </tr>
            </tfoot>
          </table>
          <table style="width:100%; border-collapse:collapse; font-size:14px; margin-bottom:28px;">
            <tr><td style="padding:6px 0; opacity:0.5; width:130px;">Customer</td><td>${customerName}</td></tr>
            <tr><td style="padding:6px 0; opacity:0.5;">Email</td><td>${customerEmail ?? "—"}</td></tr>
            <tr><td style="padding:6px 0; opacity:0.5;">Phone</td><td>${phone}</td></tr>
            <tr><td style="padding:6px 0; opacity:0.5;">Ship to</td><td>${shippingAddress}</td></tr>
          </table>
          ${hasTees ? `
          <div style="background:${inkthreadableOrderId ? "#f0fff4" : "#fff7ed"}; border:1.5px solid ${inkthreadableOrderId ? "#38a169" : "#d4924a"}; border-radius:12px; padding:20px 24px;">
            <p style="font-weight:bold; margin:0 0 4px; font-size:15px;">
              ${inkthreadableOrderId ? "✅ Inkthreadable order placed automatically" : "⚠️ Inkthreadable — place manually"}
            </p>
            ${inkthreadableOrderId
              ? `<p style="font-size:13px; opacity:0.7; margin:0;">Inkthreadable order #${inkthreadableOrderId} — printing &amp; shipping handled.</p>`
              : `<p style="font-size:13px; opacity:0.7; margin:0 0 12px;">Auto-fulfillment failed — please place manually in Inkthreadable.</p>
                 <a href="https://www.inkthreadable.co.uk/dashboard" style="display:inline-block; background:#4a2c1c; color:#fff; text-decoration:none; padding:10px 20px; border-radius:8px; font-size:13px; font-weight:bold;">Open Inkthreadable →</a>`
            }
          </div>
          ` : ""}
        </div>
      `,
    });
  }

  return NextResponse.json({ received: true });
}
