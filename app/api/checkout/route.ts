import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { events } from "@/lib/data";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: NextRequest) {
  const { items, origin } = await req.json();

  const stripeItems = items.filter((i: { id: string }) => !i.id.startsWith("voucher-"));

  if (stripeItems.length === 0) {
    return NextResponse.json({ error: "No items for Stripe checkout" }, { status: 400 });
  }

  // Check ticket capacity for event items before creating session
  const eventTicketMeta: Array<{ eventId: string; tickets: number }> = [];
  const eventTableMeta: Array<{ eventId: string; tableId: string; guests: number }> = [];

  for (const item of stripeItems) {
    const ticketMatch = (item.id as string).match(/^(.+)-tickets-(\d+)$/);
    if (ticketMatch) {
      const [, eventId, ticketsStr] = ticketMatch;
      const ticketsRequested = parseInt(ticketsStr, 10) * (item.qty ?? 1);

      const event = events.find((e) => e.id === eventId);
      if (!event) continue;

      const result = await stripe.products.search({
        query: `metadata["event_id"]:"${eventId}"`,
      });
      const product = result.data[0];
      const ticketsSold = product ? parseInt(product.metadata.tickets_sold ?? "0", 10) : 0;
      const remaining = event.capacity - ticketsSold;

      if (ticketsRequested > remaining) {
        return NextResponse.json(
          {
            error:
              remaining === 0
                ? `Sorry, ${event.title} (${event.date}) is now sold out.`
                : `Only ${remaining} ticket${remaining === 1 ? "" : "s"} remaining for ${event.title} (${event.date}).`,
          },
          { status: 409 }
        );
      }

      eventTicketMeta.push({ eventId, tickets: ticketsRequested });
      continue;
    }

    const tableMatch = (item.id as string).match(/^(.+)-(T\d+|H\d+|G\d+)$/);
    if (!tableMatch) continue;
    const [, eventId, tableId] = tableMatch;
    const event = events.find((e) => e.id === eventId);
    if (!event) continue;

    const result = await stripe.products.search({
      query: `metadata["event_id"]:"${eventId}"`,
    });
    const product = result.data[0];
    const bookedTablesRaw = product?.metadata?.booked_tables ?? "";
    const bookedTables = bookedTablesRaw ? bookedTablesRaw.split(",") : [];

    if (bookedTables.includes(tableId)) {
      const table = event.tables.find((t) => t.id === tableId);
      return NextResponse.json(
        { error: `Sorry, ${table?.label ?? tableId} is no longer available for ${event.title}.` },
        { status: 409 }
      );
    }

    const guestsMatch = (item.variant as string | undefined)?.match(/^(\d+) guests/);
    const guests = guestsMatch ? parseInt(guestsMatch[1]) : (item.qty ?? 1);
    eventTableMeta.push({ eventId, tableId, guests });
  }

  const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = stripeItems.map(
    (item: { id: string; name: string; variant?: string; price: number; qty: number; image: string }) => {
      const isTee = item.id.startsWith("tee-");
      const displayName = isTee && item.variant ? `${item.name} · ${item.variant}` : item.name;
      return {
        price_data: {
          currency: "gbp",
          product_data: {
            name: displayName,
            images: item.image.startsWith("/") ? [`${origin}${item.image}`] : [item.image],
          },
          unit_amount: Math.round(item.price * 100),
        },
        quantity: item.qty,
      };
    }
  );

  const hasPhysical = stripeItems.some(
    (i: { id: string }) => i.id.startsWith("tee-") || i.id.startsWith("coffee-")
  );

  const allLineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = [
    ...lineItems,
    ...(hasPhysical
      ? [
          {
            price_data: {
              currency: "gbp",
              product_data: { name: "UK Shipping" },
              unit_amount: 500,
            },
            quantity: 1,
          } as Stripe.Checkout.SessionCreateParams.LineItem,
        ]
      : []),
  ];

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: allLineItems,
    mode: "payment",
    success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/`,
    allow_promotion_codes: true,
    ...(hasPhysical && {
      shipping_address_collection: { allowed_countries: ["GB"] },
      phone_number_collection: { enabled: true },
    }),
    custom_fields: [
      {
        key: "allergies",
        label: { type: "custom", custom: "Any allergies or dietary requirements?" },
        type: "text",
        optional: false,
      },
    ],
    metadata: {
      hasMerch: hasPhysical ? "true" : "false",
      ...(eventTicketMeta.length > 0 && {
        eventTickets: JSON.stringify(eventTicketMeta),
      }),
      ...(eventTableMeta.length > 0 && {
        eventTables: JSON.stringify(eventTableMeta),
      }),
    },
    custom_text: {
      submit: { message: "We'll confirm your order by email shortly." },
    },
  });

  return NextResponse.json({ url: session.url });
}
