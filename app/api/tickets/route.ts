import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { events } from "@/lib/data";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function GET(req: NextRequest) {
  const eventId = req.nextUrl.searchParams.get("eventId");
  if (!eventId) return NextResponse.json({ error: "Missing eventId" }, { status: 400 });

  const event = events.find((e) => e.id === eventId);
  if (!event) return NextResponse.json({ error: "Event not found" }, { status: 404 });

  try {
    const result = await stripe.products.search({
      query: `metadata["event_id"]:"${eventId}"`,
    });
    const product = result.data[0];
    const ticketsSold = product ? parseInt(product.metadata.tickets_sold ?? "0", 10) : 0;
    const remaining = Math.max(0, event.capacity - ticketsSold);
    return NextResponse.json({ remaining, capacity: event.capacity });
  } catch {
    return NextResponse.json({
      remaining: event.ticketsRemaining ?? event.capacity,
      capacity: event.capacity,
    });
  }
}
