import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: NextRequest) {
  const { productName, priceGbp, variant, image, origin } = await req.json();

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "subscription",
    line_items: [
      {
        price_data: {
          currency: "gbp",
          product_data: {
            name: `${productName} — Monthly`,
            description: variant ? `${variant} · Roasted fresh each month` : "Roasted fresh each month",
            images: image?.startsWith("/") ? [`${origin}${image}`] : image ? [image] : [],
          },
          recurring: { interval: "month" },
          unit_amount: Math.round(priceGbp * 100),
        },
        quantity: 1,
      },
    ],
    success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}&type=subscription`,
    cancel_url: `${origin}/shop`,
    billing_address_collection: "required",
    custom_text: {
      submit: { message: "Cancel anytime from your email confirmation link." },
    },
  });

  return NextResponse.json({ url: session.url });
}
