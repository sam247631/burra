"use client";
import { useState, useEffect } from "react";
import { Users, Check, ShoppingBag } from "lucide-react";
import { Event } from "@/lib/data";
import { useCart } from "@/lib/cartContext";

export default function TableBooking({ event }: { event: Event }) {
  const { add } = useCart();
  const [selected, setSelected] = useState<string | null>(null);
  const [guests, setGuests] = useState(2);
  const [tickets, setTickets] = useState(1);
  const [booked, setBooked] = useState(false);
  const [remaining, setRemaining] = useState<number | null>(null);

  const selectedTable = event.tables.find((t) => t.id === selected);
  const isWorkshop = event.type === "workshop";

  useEffect(() => {
    if (!isWorkshop || event.soldOut) return;
    fetch(`/api/tickets?eventId=${event.id}`)
      .then((r) => r.json())
      .then((d) => setRemaining(d.remaining ?? null))
      .catch(() => setRemaining(event.ticketsRemaining ?? null));
  }, [event.id, isWorkshop, event.soldOut, event.ticketsRemaining]);

  function handleBook() {
    if (isWorkshop) {
      add({
        id: `${event.id}-tickets-${tickets}`,
        name: `${event.title}`,
        price: event.price * tickets,
        image: event.image,
        variant: `${tickets} ${tickets === 1 ? "ticket" : "tickets"} · ${event.date}`,
      });
    } else {
      if (!selected || !selectedTable) return;
      add({
        id: `${event.id}-${selected}`,
        name: `${event.title} — ${selectedTable.label}`,
        price: event.price * guests,
        image: event.image,
        variant: `${guests} guests · ${event.date}`,
      });
    }
    setBooked(true);
    setTimeout(() => setBooked(false), 2500);
  }

  if (isWorkshop) {
    return (
      <div>
        <h2
          className="text-2xl font-bold mb-6"
          style={{ fontFamily: "var(--font-playfair)", color: "var(--espresso)" }}
        >
          Book your tickets
        </h2>

        <div
          className="rounded-2xl p-6"
          style={{ backgroundColor: "var(--warm-white)", border: "1.5px solid rgba(184,115,42,0.2)" }}
        >
          <div className="flex items-center gap-4 mb-6">
            <label className="text-sm font-medium opacity-70 flex items-center gap-2" style={{ color: "var(--espresso)" }}>
              <Users size={14} />
              Tickets
            </label>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setTickets(Math.max(1, tickets - 1))}
                className="w-8 h-8 rounded-full border flex items-center justify-center font-bold hover:bg-gray-100 transition-colors"
                style={{ borderColor: "var(--sand)" }}
              >
                −
              </button>
              <span className="w-8 text-center font-bold text-lg" style={{ fontFamily: "var(--font-playfair)" }}>
                {tickets}
              </span>
              <button
                onClick={() => setTickets(Math.min(remaining ?? event.capacity, tickets + 1))}
                className="w-8 h-8 rounded-full border flex items-center justify-center font-bold hover:bg-gray-100 transition-colors"
                style={{ borderColor: "var(--sand)" }}
              >
                +
              </button>
            </div>
            <span className="text-xs opacity-40" style={{ color: "var(--espresso)" }}>
              {remaining === null ? "…" : remaining} spots left
            </span>
          </div>

          <div className="flex items-center justify-between pt-4 border-t mb-5" style={{ borderColor: "var(--sand)" }}>
            <div>
              <p className="text-xs opacity-50 mb-0.5">Total</p>
              <p className="text-2xl font-bold" style={{ fontFamily: "var(--font-playfair)", color: "var(--espresso)" }}>
                £{(event.price * tickets).toFixed(2)}
              </p>
              <p className="text-xs opacity-40">£{event.price} × {tickets} {tickets === 1 ? "ticket" : "tickets"}</p>
            </div>
            <button
              onClick={handleBook}
              className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm text-white transition-all hover:opacity-90 active:scale-95"
              style={{ backgroundColor: booked ? "var(--forest)" : "var(--espresso)" }}
            >
              {booked ? <Check size={16} /> : <ShoppingBag size={16} />}
              {booked ? "Added to bag!" : "Reserve & Pay"}
            </button>
          </div>
          <p className="text-xs opacity-40 text-center">
            Tickets added to your bag — complete payment at checkout.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h2
        className="text-2xl font-bold mb-6"
        style={{ fontFamily: "var(--font-playfair)", color: "var(--espresso)" }}
      >
        Select your table
      </h2>

      {/* Floor plan */}
      <div
        className="relative rounded-2xl p-4 mb-6 overflow-x-auto"
        style={{ backgroundColor: "var(--sand)" }}
      >
        <div
          className="relative rounded-xl"
          style={{
            minWidth: 520,
            height: 280,
            border: "2px dashed rgba(74,44,28,0.15)",
            backgroundColor: "rgba(247,243,238,0.5)",
          }}
        >
          {/* Section labels */}
          <p className="absolute top-2 left-3 text-[9px] font-bold uppercase tracking-widest opacity-25" style={{ color: "var(--espresso)" }}>
            Indoor
          </p>
          <p className="absolute top-2 text-[9px] font-bold uppercase tracking-widest opacity-25" style={{ color: "var(--espresso)", left: "69%" }}>
            Garden
          </p>

          {/* Divider between indoor and garden */}
          <div
            className="absolute top-4 bottom-4"
            style={{ left: "66%", width: 1, backgroundColor: "rgba(74,44,28,0.1)", borderLeft: "1px dashed rgba(74,44,28,0.18)" }}
          />

          {event.tables.map((table) => {
            const isSelected = selected === table.id;
            const isUnavailable = !table.available;
            const isCircle = table.shape === "circle";
            const isWide = table.shape === "wide";
            const w = isCircle ? 38 : isWide ? 62 : 46;
            const h = isCircle ? 38 : isWide ? 38 : 42;
            return (
              <button
                key={table.id}
                disabled={isUnavailable}
                onClick={() => {
                if (isUnavailable) return;
                if (isSelected) { setSelected(null); } else { setSelected(table.id); setGuests(table.seats); }
              }}
                className="absolute flex flex-col items-center justify-center text-[10px] font-semibold transition-all duration-200 hover:scale-105 disabled:cursor-not-allowed"
                style={{
                  left: `${table.position.x}%`,
                  top: `${table.position.y}%`,
                  width: w,
                  height: h,
                  transform: "translate(-50%, -50%)",
                  borderRadius: isCircle ? "50%" : "8px",
                  backgroundColor: isUnavailable
                    ? "rgba(74,44,28,0.08)"
                    : isSelected
                    ? "var(--caramel)"
                    : "white",
                  color: isUnavailable
                    ? "rgba(74,44,28,0.2)"
                    : isSelected
                    ? "white"
                    : "var(--espresso)",
                  border: isSelected
                    ? "2px solid var(--caramel)"
                    : "1.5px solid rgba(74,44,28,0.14)",
                  boxShadow: isSelected ? "0 4px 16px rgba(184,115,42,0.3)" : "none",
                }}
              >
                <span className="leading-tight text-center px-0.5">{table.label}</span>
                {!isCircle && (
                  <span className="opacity-50 text-[9px]">
                    {isUnavailable ? "taken" : `${table.seats}p`}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-4 mt-3 px-1">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded bg-white border border-gray-200" />
            <span className="text-xs opacity-50">Available</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded" style={{ backgroundColor: "var(--caramel)" }} />
            <span className="text-xs opacity-50">Selected</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded" style={{ backgroundColor: "rgba(74,44,28,0.08)" }} />
            <span className="text-xs opacity-50">Unavailable</span>
          </div>
        </div>
      </div>

      {selected && selectedTable ? (
        <div
          className="rounded-2xl p-6"
          style={{ backgroundColor: "var(--warm-white)", border: "1.5px solid rgba(184,115,42,0.2)" }}
        >
          <div className="flex items-center gap-2 mb-4">
            <Check size={16} style={{ color: "var(--caramel)" }} />
            <span className="text-sm font-semibold" style={{ color: "var(--espresso)" }}>
              {selectedTable.label} selected · {selectedTable.seats} {selectedTable.seats === 1 ? "person" : "people"} minimum
            </span>
          </div>

          <div className="flex items-center gap-4 mb-6">
            <label className="text-sm font-medium opacity-70 flex items-center gap-2" style={{ color: "var(--espresso)" }}>
              <Users size={14} />
              Guests
            </label>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setGuests(Math.max(selectedTable.seats, guests - 1))}
                className="w-8 h-8 rounded-full border flex items-center justify-center font-bold hover:bg-gray-100 transition-colors"
                style={{ borderColor: "var(--sand)" }}
              >
                −
              </button>
              <span className="w-8 text-center font-bold text-lg" style={{ fontFamily: "var(--font-playfair)" }}>
                {guests}
              </span>
              <button
                onClick={() => setGuests(Math.min(selectedTable.seats, guests + 1))}
                className="w-8 h-8 rounded-full border flex items-center justify-center font-bold hover:bg-gray-100 transition-colors"
                style={{ borderColor: "var(--sand)" }}
              >
                +
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t mb-5" style={{ borderColor: "var(--sand)" }}>
            <div>
              <p className="text-xs opacity-50 mb-0.5">Total</p>
              <p className="text-2xl font-bold" style={{ fontFamily: "var(--font-playfair)", color: "var(--espresso)" }}>
                £{(event.price * guests).toFixed(2)}
              </p>
              <p className="text-xs opacity-40">£{event.price} × {guests} {guests === 1 ? "person" : "people"}</p>
            </div>
            <button
              onClick={handleBook}
              className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm text-white transition-all hover:opacity-90 active:scale-95"
              style={{ backgroundColor: booked ? "var(--forest)" : "var(--espresso)" }}
            >
              {booked ? <Check size={16} /> : <ShoppingBag size={16} />}
              {booked ? "Added to bag!" : "Reserve & Pay"}
            </button>
          </div>
          <p className="text-xs opacity-40 text-center">
            Tickets added to your bag — complete payment at checkout.
          </p>
        </div>
      ) : (
        <div
          className="rounded-2xl p-6 text-center"
          style={{ backgroundColor: "var(--sand)" }}
        >
          <p className="text-sm opacity-60" style={{ color: "var(--espresso)" }}>
            Click a table on the floor plan above to select your seats.
          </p>
        </div>
      )}
    </div>
  );
}
