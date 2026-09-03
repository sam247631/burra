"use client";
import { useEffect, useRef } from "react";
import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";

export default function CountUp({
  to,
  duration = 2,
  suffix = "",
  decimals = 0,
}: {
  to: number;
  duration?: number;
  suffix?: string;
  decimals?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) =>
    decimals > 0 ? v.toFixed(decimals) : Math.round(v).toString()
  );

  useEffect(() => {
    if (isInView) {
      animate(count, to, { duration, ease: "easeOut" });
    }
  }, [isInView, count, to, duration]);

  return (
    <span ref={ref}>
      <motion.span>{rounded}</motion.span>{suffix}
    </span>
  );
}
