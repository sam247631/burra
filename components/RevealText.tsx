"use client";
import { motion } from "framer-motion";
import { ReactNode } from "react";

export default function RevealText({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <div style={{ overflow: "hidden" }} className={className}>
      <motion.div
        initial={{ y: "110%" }}
        whileInView={{ y: 0 }}
        viewport={{ once: true, margin: "-5%" }}
        transition={{ duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
    </div>
  );
}
