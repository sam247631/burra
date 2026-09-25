import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function GET(req: NextRequest) {
  const eventId = req.nextUrl.searchParams.get("eventId");
  if (!eventId) return NextResponse.json({ bookedTables: [] });

  try {
    const result = await stripe.products.search({
      query: `metadata["event_id"]:"${eventId}"`,
    });
    const product = result.data[0];
    const raw = product?.metadata?.booked_tables ?? "";
    const bookedTables = raw ? raw.split(",") : [];
    return NextResponse.json({ bookedTables });
  } catch {
    return NextResponse.json({ bookedTables: [] });
  }
}
