"use client";
import { motion } from "framer-motion";

export default function CoffeeDrip({ className = "" }: { className?: string }) {
  return (
    <div className={`flex flex-col items-center ${className}`}>
      <motion.div
        initial={{ scaleY: 0 }}
        whileInView={{ scaleY: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        style={{
          width: 1.5,
          height: 64,
          backgroundColor: "var(--caramel)",
          transformOrigin: "top",
          opacity: 0.5,
        }}
      />
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 0.4 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 0.55, ease: "backOut" }}
        style={{
          width: 7,
          height: 9,
          borderRadius: "0 0 50% 50%",
          backgroundColor: "var(--caramel)",
          marginTop: -1,
        }}
      />
    </div>
  );
}
