"use client";
import { useRef } from "react";
import { useScroll, useTransform, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import SteamAnimation from "./SteamAnimation";
import RotatingBadge from "./RotatingBadge";

export default function HeroSection({ heroImage }: { heroImage: string }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const imageY   = useTransform(scrollYProgress, [0, 1], ["0%", "28%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const opacity  = useTransform(scrollYProgress, [0, 0.55], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative h-screen overflow-hidden"
      style={{ backgroundColor: "var(--espresso)" }}
    >
      {/* Parallax image with Ken Burns zoom */}
      <motion.div
        className="absolute inset-0"
        style={{ y: imageY }}
        initial={{ scale: 1.18 }}
        animate={{ scale: 1.28 }}
        transition={{ duration: 14, ease: "easeInOut", repeat: Infinity, repeatType: "reverse" }}
      >
        <Image
          src={heroImage}
          alt="Burra Bristol"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
      </motion.div>

      {/* Strong left vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(105deg, rgba(10,5,2,0.94) 0%, rgba(10,5,2,0.55) 45%, rgba(10,5,2,0.28) 100%)",
        }}
      />
      {/* Bottom fade */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to top, rgba(10,5,2,0.97) 0%, transparent 42%)",
        }}
      />

      {/* Top meta bar */}
      <motion.div
        className="absolute top-0 left-0 right-0 z-20 px-8 md:px-14 flex justify-between items-center"
        style={{ paddingTop: "88px", opacity }}
      >
        <p
          className="text-fluid-label font-semibold uppercase tracking-[0.45em]"
          style={{ color: "rgba(247,243,238,0.35)" }}
        >
          Bristol, England
        </p>
        {/* Rotating award badge */}
        <motion.div
          className="hidden md:block"
          initial={{ opacity: 0, rotate: -20, scale: 0.8 }}
          animate={{ opacity: 1, rotate: 0, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <RotatingBadge
            text="UK's Best Café 2024 · Award Winning · "
            size={110}
            color="rgba(212,146,74,0.65)"
            duration={12}
          />
        </motion.div>
      </motion.div>

      {/* Main content pinned to bottom */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 z-10 px-8 md:px-14 pb-14"
        style={{ y: contentY, opacity }}
      >
        {/* Massive wordmark */}
        <div style={{ overflow: "hidden", marginBottom: "-0.08em" }}>
          <motion.h1
            className="font-bold text-white leading-[0.85] select-none text-fluid-hero"
            style={{
              fontFamily: "var(--font-playfair)",
              letterSpacing: "-0.025em",
            }}
            initial={{ y: "105%" }}
            animate={{ y: 0 }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          >
            BURRA
          </motion.h1>
        </div>

        {/* Divider + subtitle row */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 mt-7">

          {/* Left: tagline */}
          <div>
            <div style={{ overflow: "hidden", marginBottom: 8 }}>
              <motion.p
                className="italic leading-snug"
                style={{
                  fontFamily: "var(--font-playfair)",
                  color: "rgba(247,243,238,0.72)",
                  fontSize: "clamp(1.1rem, 2.2vw, 1.6rem)",
                }}
                initial={{ y: "110%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.9, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
              >
                Coffee is about connecting people
              </motion.p>
            </div>
            <motion.p
              className="text-fluid-label font-semibold uppercase tracking-[0.45em]"
              style={{ color: "rgba(247,243,238,0.28)" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.55 }}
            >
              Redland · North Street · Clifton Village
            </motion.p>
          </div>

          {/* Right: CTAs */}
          <motion.div
            className="flex flex-row gap-3"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Link
              href="/shop"
              className="px-6 py-3.5 text-sm font-semibold text-white rounded-xl tracking-wide transition-all hover:opacity-90 active:scale-95"
              style={{ backgroundColor: "var(--caramel)" }}
            >
              Shop Now
            </Link>
            <Link
              href="/events"
              className="px-6 py-3.5 text-sm font-semibold rounded-xl tracking-wide border transition-all hover:bg-white/8"
              style={{ borderColor: "rgba(255,255,255,0.22)", color: "rgba(255,255,255,0.8)" }}
            >
              Events
            </Link>
          </motion.div>
        </div>
      </motion.div>

      {/* Steam bottom-right */}
      <div className="absolute bottom-14 right-14 w-20 h-24 pointer-events-none opacity-70">
        <SteamAnimation />
      </div>
    </section>
  );
}
