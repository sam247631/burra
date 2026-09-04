import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { reviews, products, events } from "@/lib/data";

import HeroSection        from "@/components/HeroSection";
import ReviewsMarquee     from "@/components/ReviewsMarquee";
import EventCard          from "@/components/EventCard";
import RevealText         from "@/components/RevealText";
import CountUp            from "@/components/CountUp";
import CoffeeDrip         from "@/components/CoffeeDrip";
import ShopStrip          from "@/components/ShopStrip";
import ExpandingLocations from "@/components/ExpandingLocations";
import CraftSection       from "@/components/CraftSection";
import GalleryStrip       from "@/components/GalleryStrip";
import InstagramStrip     from "@/components/InstagramStrip";


export default function HomePage() {
  return (
    <div className="overflow-x-hidden">

      {/* ══════════════════════════════════════
          1  HERO
      ══════════════════════════════════════ */}
      <HeroSection heroImage="/images/north-street-opening.jpg" />

      {/* ══════════════════════════════════════
          2  STATS BAR
      ══════════════════════════════════════ */}
      <div className="py-8 px-8 md:px-14" style={{ backgroundColor: "var(--espresso)" }}>
        <div className="max-w-screen-xl mx-auto flex flex-wrap gap-x-10 gap-y-4 items-center justify-between">
          {[
            { to: 4.8, decimals: 1, suffix: "★", label: "Google" },
            { to: 380, suffix: "+",               label: "Reviews" },
            { to: 3,                               label: "Locations" },
            { to: 2021,                            label: "Founded" },
          ].map(({ to, decimals, suffix, label }) => (
            <div key={label} className="flex items-baseline gap-2">
              <p
                className="font-bold text-white"
                style={{ fontFamily: "var(--font-playfair)", fontSize: "clamp(1.6rem,3vw,2.5rem)" }}
              >
                <CountUp to={to} decimals={decimals ?? 0} suffix={suffix ?? ""} />
              </p>
              <p className="text-xs font-semibold uppercase tracking-[0.35em]" style={{ color: "rgba(247,243,238,0.35)" }}>
                {label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ══════════════════════════════════════
          4  STORY — image clip + pull quote
      ══════════════════════════════════════ */}
      <section className="py-24 md:py-32 px-8 md:px-14">
        <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-6 items-center">

          {/* Image (5/12) — clip-path reveal handled by framer in RevealText approach */}
          <div className="md:col-span-5">
            <div
              className="relative rounded-2xl overflow-hidden"
              style={{ height: "min(70vh, 600px)" }}
            >
              <Image
                src="/images/north-street-chef.jpg"
                alt="Burra team"
                fill
                className="object-cover object-top"
                sizes="(max-width: 768px) 100vw, 42vw"
              />
              {/* Accent chip */}
              <div
                className="absolute bottom-5 right-5 px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest"
                style={{ backgroundColor: "var(--caramel)", color: "white" }}
              >
                Est. 2021
              </div>
            </div>
          </div>

          {/* Text (7/12) */}
          <div className="md:col-span-7 md:pl-12">
            <RevealText>
              <p className="text-fluid-label font-bold uppercase tracking-[0.45em] mb-8" style={{ color: "var(--caramel)" }}>
                About Burra
              </p>
            </RevealText>

            {/* Pull quote */}
            <RevealText delay={0.1}>
              <blockquote
                className="font-bold italic leading-[1.1] mb-10"
                style={{
                  fontFamily: "var(--font-playfair)",
                  color: "var(--espresso)",
                  fontSize: "clamp(1.8rem, 3.5vw, 3rem)",
                  letterSpacing: "-0.01em",
                }}
              >
                &ldquo;We&apos;re in the business<br />
                of making people happy.&rdquo;
              </blockquote>
            </RevealText>

            <RevealText delay={0.2}>
              <p className="text-base leading-relaxed mb-4" style={{ color: "rgba(26,15,10,0.65)" }}>
                Founded in 2021 by Bristol Bears rugby players Jake and Adele Heenan alongside Luke and Madison Morahan,
                Burra was built on one belief: that great coffee brings people together.
              </p>
            </RevealText>
            <RevealText delay={0.28}>
              <p className="text-base leading-relaxed mb-10" style={{ color: "rgba(26,15,10,0.65)" }}>
                Every item on our menu is sourced within 25 miles of Bristol — from Extract Coffee Roasters
                in St Werburghs to bread from Hobbs House Bakery — and pastries baked fresh in our own kitchen every morning.
              </p>
            </RevealText>

            <RevealText delay={0.36}>
              <div className="flex flex-wrap gap-4 items-center">
                <Link
                  href="/our-story"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90"
                  style={{ backgroundColor: "var(--espresso)" }}
                >
                  Full story
                  <ArrowRight size={14} />
                </Link>
                <Link
                  href="/find-us"
                  className="inline-flex items-center gap-2 text-sm font-semibold group"
                  style={{ color: "var(--caramel)" }}
                >
                  Find us
                  <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </RevealText>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          5  EVENTS
      ══════════════════════════════════════ */}
      <section className="py-20 md:py-28 px-8 md:px-14" style={{ backgroundColor: "var(--espresso)" }}>
        <div className="max-w-screen-xl mx-auto">
          <div className="flex items-end justify-between mb-10">
            <div>
              <RevealText>
                <p className="text-fluid-label font-bold uppercase tracking-[0.45em] mb-3" style={{ color: "rgba(247,243,238,0.28)" }}>
                  {"What's On"}
                </p>
              </RevealText>
              <RevealText delay={0.1}>
                <h2
                  className="font-bold text-white text-fluid-lg"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  Upcoming events
                </h2>
              </RevealText>
            </div>
            <Link
              href="/events"
              className="hidden md:inline-flex items-center gap-2 text-xs font-semibold group"
              style={{ color: "rgba(247,243,238,0.4)" }}
            >
              All events
              <ArrowRight size={12} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {events.slice(0, 2).map((e) => (
              <EventCard key={e.id} event={e} variant="dark" />
            ))}
          </div>

          {/* Private hire banner */}
          <div
            className="mt-5 rounded-xl p-7 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5"
            style={{ backgroundColor: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.05)" }}
          >
            <div>
              <p className="text-fluid-label font-bold uppercase tracking-[0.4em] mb-1.5" style={{ color: "rgba(247,243,238,0.25)" }}>
                Private Hire
              </p>
              <p
                className="text-lg font-bold text-white"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                Host your event at Burra — up to 40 guests
              </p>
            </div>
            <Link
              href="/private-hire"
              className="flex-shrink-0 px-6 py-3 rounded-xl text-sm font-semibold text-white hover:opacity-90 transition-all"
              style={{ backgroundColor: "var(--caramel)" }}
            >
              Enquire now
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          6  SHOP — horizontal drag strip
      ══════════════════════════════════════ */}
      <section className="py-20 md:py-28 overflow-hidden" style={{ backgroundColor: "var(--espresso)" }}>
        <div className="px-8 md:px-14 mb-10 flex items-end justify-between">
          <div>
            <RevealText>
              <p className="text-fluid-label font-bold uppercase tracking-[0.45em] mb-3" style={{ color: "rgba(247,243,238,0.28)" }}>
                The Shop
              </p>
            </RevealText>
            <RevealText delay={0.1}>
              <h2
                className="font-bold text-white text-fluid-lg"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                Take Burra home
              </h2>
            </RevealText>
          </div>
          <div className="hidden md:flex flex-col items-end gap-1.5">
            <p className="text-[10px] font-semibold uppercase tracking-[0.4em]" style={{ color: "rgba(247,243,238,0.22)" }}>
              Drag to explore →
            </p>
            <Link
              href="/shop"
              className="inline-flex items-center gap-1.5 text-xs font-semibold group"
              style={{ color: "var(--caramel-light)" }}
            >
              View all products
              <ArrowRight size={12} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>

        <ShopStrip products={products} />
      </section>

      <CoffeeDrip className="pb-2" />

      {/* ══════════════════════════════════════
          7  CRAFT — process steps
      ══════════════════════════════════════ */}
      <CraftSection />

      {/* ══════════════════════════════════════
          7b GALLERY — auto-scroll photo strip
      ══════════════════════════════════════ */}
      <GalleryStrip />

      {/* ══════════════════════════════════════
          7c FOOD — what we serve
      ══════════════════════════════════════ */}
      <section className="py-20 md:py-28 px-8 md:px-14" style={{ backgroundColor: "var(--warm-white)" }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] mb-4" style={{ color: "var(--caramel)" }}>
              What We Serve
            </p>
            <h2
              className="text-4xl md:text-5xl font-bold mb-4"
              style={{ fontFamily: "var(--font-playfair)", color: "var(--espresso)" }}
            >
              Fresh food. Serious coffee.
            </h2>
            <p className="text-base opacity-60 max-w-md mx-auto" style={{ color: "var(--espresso)" }}>
              All-day brunch, Antipodean-inspired bowls and every coffee order made with Extract beans — roasted in Bristol.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { src: "/images/food-burger.jpg", label: "Burra Bacon & Egg Roll", sub: "Brioche · streaky bacon · fried egg · rocket" },
              { src: "/images/food-bowl.jpg",   label: "Poke Bowl",              sub: "Edamame · pickled red cabbage · miso · sesame" },
              { src: "/images/latte-art.jpg",   label: "Flat White",             sub: "Extract house blend · double shot · silky milk" },
              { src: "/images/croissants.jpg",  label: "Pastries",               sub: "Baked fresh in house every morning" },
            ].map(({ src, label, sub }) => (
              <div key={label} className="group rounded-2xl overflow-hidden" style={{ border: "1px solid rgba(74,44,28,0.08)" }}>
                <div className="relative h-56 overflow-hidden">
                  <Image
                    src={src}
                    alt={label}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                </div>
                <div className="p-4" style={{ backgroundColor: "var(--sand)" }}>
                  <p className="font-bold text-sm leading-tight" style={{ color: "var(--espresso)" }}>{label}</p>
                  <p className="text-xs mt-1 opacity-55" style={{ color: "var(--espresso)" }}>{sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CoffeeDrip className="py-2" />

      {/* ══════════════════════════════════════
          7  REVIEWS
      ══════════════════════════════════════ */}
      <section className="py-20 md:py-28 overflow-hidden" style={{ backgroundColor: "var(--espresso)" }}>
        {/* Featured review */}
        <div className="px-8 md:px-14 max-w-screen-xl mx-auto mb-16">
          <div
            className="rounded-2xl p-10 md:p-14 relative overflow-hidden"
            style={{ backgroundColor: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}
          >
            {/* Big quote mark */}
            <p
              className="absolute -top-4 left-8 font-bold select-none pointer-events-none"
              style={{
                fontFamily: "var(--font-playfair)",
                fontSize: "clamp(8rem,18vw,16rem)",
                lineHeight: 1,
                color: "rgba(184,115,42,0.07)",
              }}
            >
              &ldquo;
            </p>
            <div className="relative z-10">
              <div className="flex gap-0.5 mb-6">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span key={i} style={{ color: "var(--caramel)" }}>★</span>
                ))}
              </div>
              <RevealText>
                <blockquote
                  className="italic font-bold leading-[1.2] mb-8 text-white"
                  style={{
                    fontFamily: "var(--font-playfair)",
                    fontSize: "clamp(1.4rem, 3vw, 2.2rem)",
                    letterSpacing: "-0.01em",
                  }}
                >
                  &ldquo;Genuinely the best café in Bristol. The coffee is exceptional,
                  the food is beautiful and the staff are so warm. It&apos;s become our weekly ritual.&rdquo;
                </blockquote>
              </RevealText>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold" style={{ color: "rgba(247,243,238,0.7)" }}>Sophie M.</p>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.35em] mt-0.5" style={{ color: "rgba(247,243,238,0.25)" }}>
                    Google Review · August 2025
                  </p>
                </div>
                <p className="text-fluid-label font-bold uppercase tracking-[0.4em]" style={{ color: "rgba(184,115,42,0.5)" }}>
                  4.8★ on Google
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Marquee */}
        <ReviewsMarquee reviews={reviews} />
      </section>

      {/* ══════════════════════════════════════
          8  LOCATIONS — expanding panels
      ══════════════════════════════════════ */}
      <section className="py-20 md:py-28 px-8 md:px-14">
        <div className="max-w-screen-xl mx-auto">
          <div className="flex items-end justify-between mb-10">
            <div>
              <RevealText>
                <p className="text-fluid-label font-bold uppercase tracking-[0.45em] mb-3" style={{ color: "var(--caramel)" }}>
                  Three locations
                </p>
              </RevealText>
              <RevealText delay={0.1}>
                <h2
                  className="font-bold text-fluid-lg"
                  style={{ fontFamily: "var(--font-playfair)", color: "var(--espresso)" }}
                >
                  Find your Burra
                </h2>
              </RevealText>
            </div>
            <RevealText delay={0.15}>
              <p className="hidden md:block text-[11px] font-semibold uppercase tracking-[0.35em]" style={{ color: "rgba(26,15,10,0.3)" }}>
                Hover to explore
              </p>
            </RevealText>
          </div>
          <ExpandingLocations />
        </div>
      </section>

      {/* ══════════════════════════════════════
          8b INSTAGRAM STRIP
      ══════════════════════════════════════ */}
      <InstagramStrip />

      {/* ══════════════════════════════════════
          9  CLOSING CTA
      ══════════════════════════════════════ */}
      <section
        className="relative overflow-hidden"
        style={{ backgroundColor: "var(--espresso)" }}
      >
        {/* Background image */}
        <div className="absolute inset-0 opacity-[0.18]">
          <Image
            src="/images/barista.jpg"
            alt=""
            fill
            className="object-cover object-center"
          />
        </div>

        <div className="relative z-10 px-8 md:px-14 py-28 md:py-40 max-w-screen-xl mx-auto">
          {/* Rule */}
          <div
            className="h-px w-16 mb-14"
            style={{ backgroundColor: "rgba(184,115,42,0.4)" }}
          />

          <RevealText>
            <p className="text-base font-semibold uppercase tracking-[0.35em] mb-8" style={{ color: "var(--caramel-light)" }}>
              Walk-ins only · No reservation needed
            </p>
          </RevealText>

          <div className="overflow-hidden mb-10">
            <RevealText delay={0.05}>
              <h2
                className="font-bold text-white leading-[0.9]"
                style={{
                  fontFamily: "var(--font-playfair)",
                  fontSize: "clamp(4rem, 10vw, 10rem)",
                  letterSpacing: "-0.025em",
                }}
              >
                Just come in.
              </h2>
            </RevealText>
          </div>

          <RevealText delay={0.2}>
            <p className="text-xl leading-relaxed mb-12 text-white font-medium">
              Mon–Sat 8am–4pm · Sun 9am–4pm<br />
              Redland · North Street · Clifton Village
            </p>
          </RevealText>

          <RevealText delay={0.3}>
            <Link
              href="/find-us"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-xl text-sm font-semibold text-white group transition-all hover:opacity-90 active:scale-95"
              style={{ backgroundColor: "var(--caramel)" }}
            >
              Get Directions
              <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </RevealText>
        </div>
      </section>

    </div>
  );
}
