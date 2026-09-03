"use client";
import Image from "next/image";
import Link from "next/link";
import { MapPin } from "lucide-react";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const locations = [
  {
    name: "Redland",
    addr: "7 Lower Redland Road, BS6 6TB",
    img: "/images/RT1_4125.jpg",
  },
  {
    name: "North Street",
    addr: "223 North Street, BS3 1JJ",
    img: "/images/north-street-opening.jpg",
  },
  {
    name: "Clifton Village",
    addr: "19 The Mall, BS8 4JG",
    img: "/images/burra-clifton-village.jpg",
  },
];

function LocationCard({
  loc,
  index,
}: {
  loc: (typeof locations)[0];
  index: number;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["8%", "-8%"]);

  return (
    <Link
      ref={ref}
      href="/find-us"
      className="group relative overflow-hidden rounded-2xl block"
      style={{ height: 380 }}
    >
      <motion.div className="absolute inset-0 scale-110" style={{ y }}>
        <Image
          src={loc.img}
          alt={`Burra ${loc.name}`}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </motion.div>
      <div
        className="absolute inset-0 transition-opacity duration-500"
        style={{
          background:
            "linear-gradient(to top, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.15) 55%, transparent 100%)",
        }}
      />
      {/* Hover overlay */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ backgroundColor: "rgba(184,115,42,0.12)" }}
      />
      <div className="absolute bottom-0 left-0 right-0 p-6">
        <div
          className="flex items-center gap-1.5 mb-2 transition-all duration-300"
          style={{ color: "rgba(255,255,255,0.6)" }}
        >
          <MapPin size={12} />
          <p className="text-xs">{loc.addr}</p>
        </div>
        <p
          className="text-2xl font-bold text-white transition-transform duration-300 group-hover:translate-x-1"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          {loc.name}
        </p>
        <p
          className="text-xs mt-2 opacity-0 group-hover:opacity-100 transition-all duration-300"
          style={{ color: "var(--caramel)" }}
        >
          Open Mon–Sat 8am–4pm, Sun 9am–4pm →
        </p>
      </div>
      {/* Corner index */}
      <div
        className="absolute top-4 right-4 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold"
        style={{
          backgroundColor: "rgba(0,0,0,0.3)",
          backdropFilter: "blur(4px)",
          color: "white",
        }}
      >
        {String(index + 1).padStart(2, "0")}
      </div>
    </Link>
  );
}

export default function ParallaxLocations() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {locations.map((loc, i) => (
        <LocationCard key={loc.name} loc={loc} index={i} />
      ))}
    </div>
  );
}
