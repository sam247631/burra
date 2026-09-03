import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: NextRequest) {
  const { items, origin } = await req.json();

  // Vouchers go through Square — exclude them from Stripe
  const stripeItems = items.filter(
    (i: { id: string }) => !i.id.startsWith("voucher-")
  );

  if (stripeItems.length === 0) {
    return NextResponse.json({ error: "No items for Stripe checkout" }, { status: 400 });
  }

  const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = stripeItems.map(
    (item: { id: string; name: string; variant?: string; price: number; qty: number; image: string }) => {
      const isTee = item.id.startsWith("tee-");
      const displayName = isTee && item.variant
        ? `${item.name} · ${item.variant}`
        : item.name;
      return {
        price_data: {
          currency: "gbp",
          product_data: {
            name: displayName,
            images: item.image.startsWith("/")
              ? [`${origin}${item.image}`]
              : [item.image],
          },
          unit_amount: Math.round(item.price * 100),
        },
        quantity: item.qty,
      };
    }
  );

  const allLineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = [
    ...lineItems,
    {
      price_data: {
        currency: "gbp",
        product_data: { name: "UK Shipping" },
        unit_amount: 500,
      },
      quantity: 1,
    },
  ];

  const hasMerch = stripeItems.some(
    (i: { id: string }) => i.id.startsWith("tee-")
  );

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: allLineItems,
    mode: "payment",
    success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/`,
    shipping_address_collection: { allowed_countries: ["GB"] },
    phone_number_collection: { enabled: true },
    metadata: { hasMerch: hasMerch ? "true" : "false" },
    custom_text: {
      submit: { message: "We'll confirm your order by email shortly." },
    },
  });

  return NextResponse.json({ url: session.url });
}
