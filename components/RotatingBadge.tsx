"use client";
import { motion } from "framer-motion";

interface Props {
  text?: string;
  size?: number;
  color?: string;
  duration?: number;
}

export default function RotatingBadge({
  text = "UK's Best Café 2024 · Award Winning · ",
  size = 120,
  color = "currentColor",
  duration = 14,
}: Props) {
  const r = size * 0.4;
  const cx = size / 2;

  return (
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration, ease: "linear", repeat: Infinity }}
      style={{ width: size, height: size }}
      aria-hidden
    >
      <svg viewBox={`0 0 ${size} ${size}`} width={size} height={size}>
        <defs>
          <path
            id={`rp-${size}`}
            d={`M ${cx - r},${cx} a ${r},${r} 0 1,0 ${r * 2},0 a ${r},${r} 0 1,0 ${-r * 2},0`}
          />
        </defs>
        <text
          style={{
            fontSize: size * 0.087,
            fontWeight: 700,
            fill: color,
            letterSpacing: size * 0.016,
            textTransform: "uppercase",
          }}
        >
          <textPath href={`#rp-${size}`}>{text}</textPath>
        </text>
      </svg>
    </motion.div>
  );
}
