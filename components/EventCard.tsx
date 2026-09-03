import Image from "next/image";
import Link from "next/link";
import { Calendar, MapPin, Clock, Ticket } from "lucide-react";
import { Event } from "@/lib/data";

export default function EventCard({
  event,
  variant = "light",
}: {
  event: Event;
  variant?: "light" | "dark";
}) {
  const isDark = variant === "dark";

  const isSoldOut = !!event.soldOut;

  return (
    <Link
      href={`/events/${event.id}`}
      className="group rounded-2xl overflow-hidden flex flex-col h-full transition-all duration-300 hover:-translate-y-1"
      style={{
        backgroundColor: isDark ? "rgba(255,255,255,0.04)" : "var(--warm-white)",
        border: isDark
          ? "1px solid rgba(255,255,255,0.08)"
          : "1px solid rgba(74,44,28,0.08)",
        boxShadow: isDark ? "none" : "0 2px 8px rgba(74,44,28,0.06)",
        opacity: isSoldOut ? 0.72 : 1,
      }}
    >
      {/* Image */}
      <div className="relative h-60 overflow-hidden flex-shrink-0">
        <Image
          src={event.image}
          alt={event.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.2) 50%, transparent 100%)",
          }}
        />
        {/* Type badge */}
        <span
          className="absolute top-3 left-3 text-xs font-semibold px-3 py-1 rounded-full text-white backdrop-blur-sm"
          style={{
            backgroundColor:
              event.type === "workshop"
                ? "rgba(45,74,45,0.85)"
                : "rgba(184,115,42,0.85)",
          }}
        >
          {event.type === "dining"
            ? "Dining Event"
            : event.type === "workshop"
            ? "Workshop"
            : "Private Hire"}
        </span>
        {event.goingFast && !isSoldOut && (
          <span className="absolute top-3 right-3 text-[10px] font-bold px-2.5 py-1 rounded-full text-white uppercase tracking-wider" style={{ backgroundColor: "rgba(184,115,42,0.9)" }}>
            Going fast
          </span>
        )}
        {/* Sold out badge or price */}
        <div className="absolute bottom-4 right-4">
          {isSoldOut ? (
            <span className="text-xs font-bold px-3 py-1.5 rounded-full text-white bg-black/60 uppercase tracking-widest">
              Sold Out
            </span>
          ) : event.price === 0 ? (
            <span className="text-2xl font-bold text-white" style={{ fontFamily: "var(--font-playfair)" }}>
              Free
            </span>
          ) : (
            <>
              <span className="text-2xl font-bold text-white" style={{ fontFamily: "var(--font-playfair)" }}>
                £{event.price}
              </span>
              <span className="text-xs text-white/60 ml-1">pp</span>
            </>
          )}
        </div>
      </div>

      {/* Body */}
      <div className="p-5 flex flex-col gap-3 flex-1">
        <div>
          <h3
            className="text-xl font-bold leading-tight"
            style={{
              fontFamily: "var(--font-playfair)",
              color: isDark ? "var(--cream)" : "var(--espresso)",
            }}
          >
            {event.title}
          </h3>
          <p
            className="text-sm mt-0.5"
            style={{
              color: isDark ? "rgba(247,243,238,0.45)" : "rgba(26,15,10,0.5)",
            }}
          >
            {event.subtitle}
          </p>
        </div>

        <p
          className="text-sm leading-relaxed flex-1"
          style={{
            color: isDark ? "rgba(247,243,238,0.6)" : "rgba(26,15,10,0.65)",
          }}
        >
          {event.description.slice(0, 110)}…
        </p>

        <div
          className="flex flex-col gap-1.5 pt-3 border-t"
          style={{
            borderColor: isDark
              ? "rgba(255,255,255,0.07)"
              : "rgba(232,221,208,0.8)",
          }}
        >
          {[
            { Icon: Calendar, text: event.date },
            { Icon: Clock, text: event.time },
            {
              Icon: MapPin,
              text: event.location.split(",")[0],
            },
          ].map(({ Icon, text }) => (
            <div
              key={text}
              className="flex items-center gap-2 text-xs"
              style={{
                color: isDark
                  ? "rgba(247,243,238,0.4)"
                  : "rgba(26,15,10,0.5)",
              }}
            >
              <Icon size={11} />
              <span>{text}</span>
            </div>
          ))}
        </div>

        {event.type === "workshop" && (
          <div className="flex items-center justify-between">
            <div
              className="text-xs font-semibold px-2.5 py-1 rounded-full"
              style={{
                backgroundColor: isSoldOut
                  ? "rgba(74,44,28,0.07)"
                  : event.ticketsRemaining !== undefined && event.ticketsRemaining <= 3
                  ? "rgba(184,115,42,0.12)"
                  : "rgba(45,74,45,0.1)",
                color: isSoldOut
                  ? "rgba(74,44,28,0.4)"
                  : event.ticketsRemaining !== undefined && event.ticketsRemaining <= 3
                  ? "var(--caramel)"
                  : "var(--forest)",
              }}
            >
              {isSoldOut
                ? "Sold out"
                : event.ticketsRemaining !== undefined
                ? `${event.ticketsRemaining} ticket${event.ticketsRemaining === 1 ? "" : "s"} left`
                : `${event.capacity} spots`}
            </div>
          </div>
        )}

        <div
          className="flex items-center gap-2 text-sm font-semibold group-hover:gap-3 transition-all"
          style={{ color: isSoldOut ? "rgba(74,44,28,0.35)" : "var(--caramel)" }}
        >
          <Ticket size={14} />
          {isSoldOut ? "Event sold out" : "Book tickets & select table"}
        </div>
      </div>
    </Link>
  );
}
