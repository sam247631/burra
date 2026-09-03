"use client";
import { motion } from "framer-motion";
import RevealText from "./RevealText";

const STEPS = [
  {
    num: "01",
    label: "Source",
    desc: "Every bean traced to its origin farm. We partner exclusively with Extract Coffee Roasters — Bristol's most celebrated specialty roaster, based in St Werburghs.",
  },
  {
    num: "02",
    label: "Roast",
    desc: "Small-batch roasting locks in flavour profiles that shift with the seasons. Never mass-produced. Always intentional. Always local.",
  },
  {
    num: "03",
    label: "Brew",
    desc: "Our baristas train for months. Each cup is pulled with care — from an espresso-based flat white to a seasonal single-origin pour-over.",
  },
  {
    num: "04",
    label: "Connect",
    desc: "Coffee is the excuse. Connection is the point. Every cup is an invitation to sit, slow down, and stay a while.",
  },
];

export default function CraftSection() {
  return (
    <section
      className="py-28 md:py-40 px-8 md:px-14 overflow-hidden"
      style={{ backgroundColor: "var(--espresso)" }}
    >
      <div className="max-w-screen-xl mx-auto">

        {/* Header */}
        <div
          className="flex flex-col md:flex-row items-start md:items-end justify-between gap-8 mb-20 pb-10 border-b"
          style={{ borderColor: "rgba(255,255,255,0.07)" }}
        >
          <div>
            <RevealText>
              <p
                className="text-fluid-label font-bold uppercase tracking-[0.45em] mb-3"
                style={{ color: "rgba(247,243,238,0.25)" }}
              >
                The Process
              </p>
            </RevealText>
            <RevealText delay={0.1}>
              <h2
                className="font-bold text-white"
                style={{
                  fontFamily: "var(--font-playfair)",
                  fontSize: "clamp(2.2rem, 5vw, 4rem)",
                  letterSpacing: "-0.02em",
                }}
              >
                From bean to cup
              </h2>
            </RevealText>
          </div>
          <RevealText delay={0.2}>
            <p
              className="text-sm max-w-xs leading-relaxed"
              style={{ color: "rgba(247,243,238,0.32)" }}
            >
              Every element of Burra is chosen with intention — from the farm
              to the final cup you hold in your hands.
            </p>
          </RevealText>
        </div>

        {/* Steps grid */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-t border-l"
          style={{ borderColor: "rgba(255,255,255,0.07)" }}
        >
          {STEPS.map((step, i) => (
            <motion.div
              key={step.num}
              className="relative p-8 md:p-10 border-b border-r overflow-hidden group"
              style={{ borderColor: "rgba(255,255,255,0.07)" }}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-5%" }}
              transition={{
                duration: 0.8,
                delay: i * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {/* Hover accent */}
              <motion.div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: "linear-gradient(135deg, rgba(184,115,42,0.04) 0%, transparent 60%)" }}
              />

              {/* Ghost number */}
              <span
                className="absolute -bottom-2 -right-1 font-bold select-none pointer-events-none"
                style={{
                  fontFamily: "var(--font-playfair)",
                  fontSize: "6.5rem",
                  lineHeight: 1,
                  color: "rgba(255,255,255,0.035)",
                  fontWeight: 900,
                }}
                aria-hidden
              >
                {step.num}
              </span>

              <p
                className="text-[9px] font-bold uppercase tracking-[0.45em] mb-6"
                style={{ color: "var(--caramel)" }}
              >
                {step.num}
              </p>
              <h3
                className="font-bold text-white mb-4"
                style={{
                  fontFamily: "var(--font-playfair)",
                  fontSize: "clamp(1.4rem, 2.2vw, 1.9rem)",
                  letterSpacing: "-0.01em",
                }}
              >
                {step.label}
              </h3>
              <p
                className="text-sm leading-relaxed"
                style={{ color: "rgba(247,243,238,0.38)" }}
              >
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
