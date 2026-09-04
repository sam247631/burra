"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const LOCATIONS = [
  {
    name: "Redland",
    address: "7 Lower Redland Road",
    postcode: "Bristol, BS6 6TB",
    hours: "Mon–Sat 8am–4pm · Sun 9am–4pm",
    email: "redland@burrabristol.co.uk",
    img: "/images/RT1_4125.jpg",
  },
  {
    name: "North Street",
    address: "223 North Street",
    postcode: "Bristol, BS3 1JJ",
    hours: "Mon–Sat 8am–4pm · Sun 9am–4pm",
    email: "northstreet@burrabristol.co.uk",
    img: "/images/north-street-opening.jpg",
  },
  {
    name: "Clifton Village",
    address: "19 The Mall, Clifton",
    postcode: "Bristol, BS8 4JG",
    hours: "Mon–Sat 8am–4pm · Sun 9am–4pm",
    email: "clifton@burrabristol.co.uk",
    img: "/images/burra-clifton-village.jpg",
  },
];

export default function ExpandingLocations() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <div
      className="flex gap-[3px] overflow-hidden rounded-2xl"
      style={{ height: "min(75vh, 560px)" }}
    >
      {LOCATIONS.map((loc, i) => (
        <motion.div
          key={loc.name}
          className="relative overflow-hidden flex-shrink-0 cursor-pointer"
          style={{ minWidth: 72 }}
          animate={{ flex: active === i ? 5 : 1 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          onHoverStart={() => setActive(i)}
          onHoverEnd={() => setActive(null)}
          onClick={() => window.open(`https://maps.google.com/maps?q=${encodeURIComponent(loc.address + ", " + loc.postcode)}`, "_blank")}
        >
          {/* Image */}
          <Image
            src={loc.img}
            alt={loc.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 40vw"
          />

          {/* Base overlay */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to top, rgba(10,5,2,0.9) 0%, rgba(10,5,2,0.35) 55%, rgba(10,5,2,0.2) 100%)",
            }}
          />

          {/* Hover tint */}
          <motion.div
            className="absolute inset-0"
            animate={{ opacity: active === i ? 0.15 : 0 }}
            transition={{ duration: 0.4 }}
            style={{ backgroundColor: "var(--caramel)" }}
          />

          {/* Collapsed: vertical label */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
            animate={{ opacity: active === i ? 0 : 1 }}
            transition={{ duration: 0.25 }}
          >
            <p
              className="font-bold text-white/50 text-[11px] uppercase tracking-[0.35em]"
              style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}
            >
              {loc.name}
            </p>
          </motion.div>

          {/* Expanded content */}
          <motion.div
            className="absolute bottom-0 left-0 right-0 p-7 pointer-events-none"
            animate={{
              opacity: active === i ? 1 : 0,
              y: active === i ? 0 : 18,
            }}
            transition={{ duration: 0.35, delay: active === i ? 0.18 : 0 }}
          >
            <p
              className="text-[10px] font-bold uppercase tracking-[0.45em] mb-2"
              style={{ color: "var(--caramel-light)" }}
            >
              0{i + 1}
            </p>
            <h3
              className="text-3xl font-bold text-white mb-1"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              {loc.name}
            </h3>
            <p className="text-sm mb-0.5" style={{ color: "rgba(247,243,238,0.55)" }}>
              {loc.address}
            </p>
            <p className="text-sm mb-4" style={{ color: "rgba(247,243,238,0.35)" }}>
              {loc.postcode}
            </p>
            <p className="text-xs mb-5" style={{ color: "rgba(247,243,238,0.4)" }}>
              {loc.hours}
            </p>
            <Link
              href="/find-us"
              className="pointer-events-auto inline-flex items-center gap-2 text-xs font-semibold group transition-colors"
              style={{ color: "var(--caramel-light)" }}
            >
              Get directions
              <ArrowRight size={12} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>

          {/* Index top-right */}
          <div className="absolute top-4 right-4">
            <span
              className="text-[10px] font-bold"
              style={{ color: "rgba(247,243,238,0.25)" }}
            >
              0{i + 1}
            </span>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
