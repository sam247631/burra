import { MapPin, Clock } from "lucide-react";
import { locations } from "@/lib/data";

export default function FindUsPage() {
  return (
    <div className="pt-32 pb-24 px-6 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <p
            className="text-xs font-semibold uppercase tracking-[0.35em] mb-4"
            style={{ color: "var(--caramel)" }}
          >
            Three Locations
          </p>
          <h1
            className="text-5xl md:text-6xl font-bold mb-4"
            style={{ fontFamily: "var(--font-playfair)", color: "var(--espresso)" }}
          >
            Find your Burra
          </h1>
          <p className="text-base opacity-60 max-w-md mx-auto">
            Walk-ins only — no reservations needed. Just come in and we&apos;ll take care of you.
          </p>
        </div>

        {/* Locations */}
        <div className="flex flex-col gap-12">
          {locations.map((loc, i) => (
            <div
              key={loc.name}
              className={`grid grid-cols-1 lg:grid-cols-2 gap-8 items-start ${i % 2 === 1 ? "lg:flex-row-reverse" : ""}`}
            >
              {/* Map */}
              <div className="relative rounded-2xl overflow-hidden h-72 w-full" style={{ border: "1px solid rgba(74,44,28,0.1)" }}>
                <iframe
                  title={`Burra ${loc.name} map`}
                  src={`https://maps.google.com/maps?q=${encodeURIComponent(loc.address + ", " + loc.city)}&output=embed`}
                  className="w-full h-full"
                  style={{ border: 0 }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
                <a
                  href={`https://maps.google.com/maps?q=${encodeURIComponent(loc.address + ", " + loc.city)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute inset-0 cursor-pointer"
                  style={{ zIndex: 10 }}
                  aria-label={`Open ${loc.name} in Google Maps`}
                />
              </div>

              {/* Info */}
              <div className="flex flex-col justify-center py-4">
                <p
                  className="text-xs font-semibold uppercase tracking-[0.3em] mb-2"
                  style={{ color: "var(--caramel)" }}
                >
                  Location 0{i + 1}
                </p>
                <h2
                  className="text-3xl font-bold mb-5"
                  style={{ fontFamily: "var(--font-playfair)", color: "var(--espresso)" }}
                >
                  {loc.name}
                </h2>
                <div className="space-y-4">
                  <div className="flex gap-3 items-start">
                    <MapPin size={18} className="flex-shrink-0 mt-0.5" style={{ color: "var(--caramel)" }} />
                    <div>
                      <p className="font-medium text-sm" style={{ color: "var(--espresso)" }}>{loc.address}</p>
                      <p className="text-sm opacity-60" style={{ color: "var(--espresso)" }}>{loc.city}</p>
                    </div>
                  </div>
                  <div className="flex gap-3 items-start">
                    <Clock size={18} className="flex-shrink-0 mt-0.5" style={{ color: "var(--caramel)" }} />
                    <div>
                      <p className="font-medium text-sm" style={{ color: "var(--espresso)" }}>{loc.hours.weekday}</p>
                      <p className="text-sm opacity-60" style={{ color: "var(--espresso)" }}>{loc.hours.weekend}</p>
                    </div>
                  </div>

                </div>
                <a
                  href={`https://maps.google.com/maps?q=${encodeURIComponent(loc.address + ", " + loc.city)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-all hover:opacity-90"
                  style={{ backgroundColor: "var(--espresso)", color: "white" }}
                >
                  <MapPin size={14} />
                  Get Directions
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
