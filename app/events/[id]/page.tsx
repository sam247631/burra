import { notFound } from "next/navigation";
import Image from "next/image";
import { events } from "@/lib/data";
import { Calendar, Clock, MapPin, ChefHat, Wine, ShieldCheck, Check } from "lucide-react";
import TableBooking from "@/components/TableBooking";

export function generateStaticParams() {
  return events.map((e) => ({ id: e.id }));
}

export default async function EventDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const event = events.find((e) => e.id === id);
  if (!event) notFound();

  return (
    <div className="pt-24 pb-24 min-h-screen">
      {/* Hero */}
      <div className="relative h-72 md:h-[480px] w-full">
        <Image
          src={event.image}
          alt={event.title}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/30 to-black/80" />
        <div className="absolute bottom-0 left-0 right-0 px-6 pb-12 max-w-5xl mx-auto">
          <span
            className="inline-block text-xs font-semibold px-3 py-1 rounded-full text-white mb-4 capitalize"
            style={{ backgroundColor: event.type === "workshop" ? "var(--forest)" : "var(--caramel)" }}
          >
            {event.type === "dining" ? "Dining Event" : "Workshop"}
          </span>
          {event.soldOut && (
            <span className="inline-block ml-2 text-xs font-bold px-3 py-1 rounded-full text-white bg-black/60 uppercase tracking-widest mb-4">
              Sold Out
            </span>
          )}
          <h1
            className="text-3xl md:text-5xl font-bold text-white leading-tight"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            {event.title}
          </h1>
          <p className="text-white/70 mt-2 text-lg">{event.subtitle}</p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 mt-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* Left column */}
          <div className="md:col-span-1 space-y-6">

            {/* Event details card */}
            <div className="rounded-2xl p-6" style={{ backgroundColor: "var(--sand)" }}>
              <h3
                className="text-lg font-bold mb-4"
                style={{ fontFamily: "var(--font-playfair)", color: "var(--espresso)" }}
              >
                Event Details
              </h3>
              <div className="space-y-3">
                <div className="flex gap-3 items-start">
                  <Calendar size={16} className="flex-shrink-0 mt-0.5" style={{ color: "var(--caramel)" }} />
                  <span className="text-sm" style={{ color: "var(--espresso)" }}>{event.date}</span>
                </div>
                <div className="flex gap-3 items-start">
                  <Clock size={16} className="flex-shrink-0 mt-0.5" style={{ color: "var(--caramel)" }} />
                  <span className="text-sm" style={{ color: "var(--espresso)" }}>{event.time}</span>
                </div>
                <div className="flex gap-3 items-start">
                  <MapPin size={16} className="flex-shrink-0 mt-0.5" style={{ color: "var(--caramel)" }} />
                  <span className="text-sm" style={{ color: "var(--espresso)" }}>{event.location}</span>
                </div>
                {event.chef && (
                  <div className="flex gap-3 items-start">
                    <ChefHat size={16} className="flex-shrink-0 mt-0.5" style={{ color: "var(--caramel)" }} />
                    <span className="text-sm" style={{ color: "var(--espresso)" }}>{event.chef}</span>
                  </div>
                )}
                {event.partner && (
                  <div className="flex gap-3 items-start">
                    <Wine size={16} className="flex-shrink-0 mt-0.5" style={{ color: "var(--caramel)" }} />
                    <span className="text-sm" style={{ color: "var(--espresso)" }}>Wines by {event.partner}</span>
                  </div>
                )}
              </div>
              <div
                className="mt-4 pt-4 border-t flex justify-between items-center"
                style={{ borderColor: "rgba(74,44,28,0.1)" }}
              >
                <span className="text-sm opacity-60">Price per person</span>
                <span
                  className="text-2xl font-bold"
                  style={{ fontFamily: "var(--font-playfair)", color: "var(--espresso)" }}
                >
                  {event.price === 0 ? "Free" : `£${event.price}`}
                </span>
              </div>
            </div>

            {/* Highlights */}
            {event.highlights && event.highlights.length > 0 && (
              <div className="rounded-2xl p-6" style={{ backgroundColor: "var(--warm-white)", border: "1.5px solid rgba(184,115,42,0.15)" }}>
                <h3
                  className="text-base font-bold mb-4"
                  style={{ fontFamily: "var(--font-playfair)", color: "var(--espresso)" }}
                >
                  What&apos;s included
                </h3>
                <ul className="space-y-2.5">
                  {event.highlights.map((h) => (
                    <li key={h} className="flex gap-2.5 items-start text-sm" style={{ color: "var(--espresso)" }}>
                      <Check size={14} className="flex-shrink-0 mt-0.5" style={{ color: "var(--caramel)" }} />
                      {h}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* About */}
            <div>
              <h3
                className="text-lg font-bold mb-3"
                style={{ fontFamily: "var(--font-playfair)", color: "var(--espresso)" }}
              >
                About this event
              </h3>
              <p className="text-sm opacity-70 leading-relaxed" style={{ color: "var(--espresso)" }}>
                {event.description}
              </p>
            </div>

            {/* Refund policy */}
            {event.refundPolicy && (
              <div className="flex gap-2.5 items-start text-xs opacity-50" style={{ color: "var(--espresso)" }}>
                <ShieldCheck size={13} className="flex-shrink-0 mt-0.5" />
                <span>{event.refundPolicy}</span>
              </div>
            )}

            {/* Map */}
            <div className="rounded-2xl overflow-hidden" style={{ height: 180, border: "1px solid rgba(74,44,28,0.1)" }}>
              <iframe
                title="Venue location"
                src="https://maps.google.com/maps?q=51.46916005922742,-2.61301834657869&z=16&output=embed"
                className="w-full h-full"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          {/* Right column — booking */}
          <div className="md:col-span-2">
            {event.soldOut ? (
              <div
                className="rounded-2xl p-10 text-center"
                style={{ backgroundColor: "var(--sand)" }}
              >
                <p
                  className="text-2xl font-bold mb-2"
                  style={{ fontFamily: "var(--font-playfair)", color: "var(--espresso)" }}
                >
                  Sold Out
                </p>
                <p className="text-sm opacity-60" style={{ color: "var(--espresso)" }}>
                  All tickets for this event have been claimed. Check back for future dates.
                </p>
              </div>
            ) : (
              <TableBooking event={event} />
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
