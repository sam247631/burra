import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { Resend } from "resend";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
const resend = new Resend(process.env.RESEND_API_KEY!);
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

const FULFILLMENT_EMAIL = "burrabristol@gmail.com";

function formatAddress(addr: Stripe.Address | null | undefined): string {
  if (!addr) return "Not provided";
  return [addr.line1, addr.line2, addr.city, addr.postal_code, addr.country]
    .filter(Boolean)
    .join(", ");
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
    const session = event.data.object as Stripe.Checkout.Session;
    const customerEmail = session.customer_details?.email;
    const customerName = session.customer_details?.name ?? "there";
    const phone = session.customer_details?.phone ?? "Not provided";
    const shippingAddress = formatAddress(session.shipping_details?.address);
    const orderId = session.id.slice(-8).toUpperCase();

    // Fetch line items from Stripe
    const lineItemsPage = await stripe.checkout.sessions.listLineItems(session.id, { limit: 20 });
    const lineItems = lineItemsPage.data.filter((li) => li.description !== "UK Shipping");

    const teeLine = lineItems.filter((li) =>
      li.description?.toLowerCase().includes("tee") ||
      li.description?.toLowerCase().includes("burra tee") ||
      (li.price?.product_data as { name?: string } | undefined)?.name?.toLowerCase().includes("tee")
    );
    const hasTees = session.metadata?.hasMerch === "true" || teeLine.length > 0;

    const itemRowsHtml = lineItems
      .map(
        (li) =>
          `<tr>
            <td style="padding:8px 0; border-bottom:1px solid rgba(74,44,28,0.1);">${li.description ?? "Item"}</td>
            <td style="padding:8px 0; border-bottom:1px solid rgba(74,44,28,0.1); text-align:center;">${li.quantity}</td>
            <td style="padding:8px 0; border-bottom:1px solid rgba(74,44,28,0.1); text-align:right;">£${((li.amount_total ?? 0) / 100).toFixed(2)}</td>
          </tr>`
      )
      .join("");

    const totalGBP = `£${((session.amount_total ?? 0) / 100).toFixed(2)}`;

    // ── Customer confirmation email ──────────────────────────────────────────
    if (customerEmail) {
      await resend.emails.send({
        from: "Burra Bristol <burrabristol@gmail.com>",
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
              Questions? Reply to this email or find us at burrabristol@gmail.com<br/>
              Burra · North Street · Clifton · Redland
            </p>
          </div>
        `,
      });
    }

    // ── Fulfillment email (internal) — sent for every physical order ─────────
    const inkthreadableRows = hasTees
      ? lineItems
          .filter((li) => {
            const name = li.description ?? "";
            return name.toLowerCase().includes("tee");
          })
          .map(
            (li) =>
              `<tr>
                <td style="padding:10px 8px; border-bottom:1px solid rgba(74,44,28,0.1);">${li.description}</td>
                <td style="padding:10px 8px; border-bottom:1px solid rgba(74,44,28,0.1); text-align:center;">${li.quantity}</td>
              </tr>`
          )
          .join("")
      : "";

    await resend.emails.send({
      from: "Burra Orders <onboarding@resend.dev>",
      to: FULFILLMENT_EMAIL,
      subject: `🛍️ New order to fulfil — #${orderId}`,
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
          <div style="background:#fff7ed; border:1.5px solid #d4924a; border-radius:12px; padding:20px 24px; margin-bottom:8px;">
            <p style="font-weight:bold; margin:0 0 12px; font-size:15px;">🖨️ Inkthreadable — items to print &amp; ship</p>
            <table style="width:100%; border-collapse:collapse; font-size:14px;">
              <thead>
                <tr style="opacity:0.5; font-size:11px; text-transform:uppercase;">
                  <th style="text-align:left; padding-bottom:8px;">Product</th>
                  <th style="text-align:center; padding-bottom:8px;">Qty</th>
                </tr>
              </thead>
              <tbody>${inkthreadableRows}</tbody>
            </table>
            <p style="font-size:13px; opacity:0.6; margin:16px 0 0;">
              Ship to: <strong>${customerName}</strong> · ${shippingAddress}
            </p>
            <p style="margin:12px 0 0;">
              <a href="https://www.inkthreadable.co.uk/dashboard" style="display:inline-block; background:#4a2c1c; color:#fff; text-decoration:none; padding:10px 20px; border-radius:8px; font-size:13px; font-weight:bold;">
                Open Inkthreadable →
              </a>
            </p>
          </div>
          ` : ""}
        </div>
      `,
    });
  }

  return NextResponse.json({ received: true });
}
