import { events } from "@/lib/data";
import EventCard from "@/components/EventCard";

export default function EventsPage() {
  const dining = events.filter((e) => e.type === "dining");
  const upcomingWorkshops = events.filter((e) => e.type === "workshop" && !e.soldOut);
  const pastWorkshops = events.filter((e) => e.type === "workshop" && e.soldOut);

  return (
    <div className="pt-32 pb-24 px-6 min-h-screen">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center mb-14">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] mb-4" style={{ color: "var(--caramel)" }}>
            {"What's On"}
          </p>
          <h1
            className="text-5xl md:text-6xl font-bold mb-4"
            style={{ fontFamily: "var(--font-playfair)", color: "var(--espresso)" }}
          >
            Events at Burra
          </h1>
          <p className="text-base opacity-60 max-w-lg mx-auto">
            From intimate supper clubs to latte art masterclasses — select your table and book your spot directly.
          </p>
        </div>

        {/* Dining events */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-6" style={{ fontFamily: "var(--font-playfair)", color: "var(--espresso)" }}>
            Dining &amp; Wine Events
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {dining.map((e) => (
              <EventCard key={e.id} event={e} />
            ))}
          </div>
        </div>

        {/* Upcoming workshops */}
        <div className="mb-10">
          <div className="flex items-baseline gap-4 mb-6">
            <h2 className="text-2xl font-bold" style={{ fontFamily: "var(--font-playfair)", color: "var(--espresso)" }}>
              Workshops &amp; Classes
            </h2>
            <span className="text-sm font-semibold px-2.5 py-0.5 rounded-full" style={{ backgroundColor: "rgba(45,74,45,0.1)", color: "var(--forest)" }}>
              {upcomingWorkshops.length} upcoming
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {upcomingWorkshops.map((e) => (
              <EventCard key={e.id} event={e} />
            ))}
          </div>
        </div>

        {/* Past workshops */}
        {pastWorkshops.length > 0 && (
          <details className="mb-16 group">
            <summary className="cursor-pointer list-none flex items-center gap-3 mb-5 select-none">
              <span className="text-base font-semibold" style={{ color: "rgba(74,44,28,0.45)" }}>
                Past sessions ({pastWorkshops.length})
              </span>
              <span className="text-xs opacity-40 group-open:hidden">▼ Show</span>
              <span className="text-xs opacity-40 hidden group-open:inline">▲ Hide</span>
            </summary>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {pastWorkshops.map((e) => (
                <EventCard key={e.id} event={e} />
              ))}
            </div>
          </details>
        )}

        {/* Private hire CTA */}
        <div className="rounded-3xl p-12 text-center" style={{ backgroundColor: "var(--espresso)" }}>
          <h2 className="text-3xl font-bold text-white mb-3" style={{ fontFamily: "var(--font-playfair)" }}>
            Private Hire
          </h2>
          <p className="text-white/60 mb-6 max-w-lg mx-auto">
            Host your birthday, celebration or team night at Burra. Up to 40 guests, BYO drinks or catering with grazing and buffet options available.
          </p>
          <a
            href="/contact"
            className="inline-block px-8 py-4 rounded-xl font-semibold text-sm text-white transition-opacity hover:opacity-90"
            style={{ backgroundColor: "var(--caramel)" }}
          >
            Enquire About Private Hire
          </a>
        </div>

      </div>
    </div>
  );
}
