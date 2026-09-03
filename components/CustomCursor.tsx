"use client";
import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [visible, setVisible] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [clicking, setClicking] = useState(false);

  const mx = useMotionValue(-200);
  const my = useMotionValue(-200);

  const dotX = useSpring(mx, { damping: 28, stiffness: 1200 });
  const dotY = useSpring(my, { damping: 28, stiffness: 1200 });
  const ringX = useSpring(mx, { damping: 20, stiffness: 300 });
  const ringY = useSpring(my, { damping: 20, stiffness: 300 });

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const onMove = (e: MouseEvent) => {
      mx.set(e.clientX);
      my.set(e.clientY);
      setVisible(true);
      const el = e.target as HTMLElement;
      setHovering(
        !!(el.closest("a") || el.closest("button") || el.tagName === "A" || el.tagName === "BUTTON")
      );
    };
    const onDown = () => setClicking(true);
    const onUp = () => setClicking(false);
    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("mouseup", onUp);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);

    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("mouseup", onUp);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
    };
  }, [mx, my]);

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full mix-blend-difference bg-white"
        animate={{
          width: clicking ? 5 : 8,
          height: clicking ? 5 : 8,
          opacity: visible ? 1 : 0,
        }}
        style={{ x: dotX, y: dotY, translateX: "-50%", translateY: "-50%" }}
        transition={{ width: { duration: 0.12 }, height: { duration: 0.12 }, opacity: { duration: 0.2 } }}
      />
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full mix-blend-difference border border-white"
        animate={{
          width: hovering ? 52 : clicking ? 16 : 32,
          height: hovering ? 52 : clicking ? 16 : 32,
          opacity: visible ? 1 : 0,
        }}
        style={{ x: ringX, y: ringY, translateX: "-50%", translateY: "-50%" }}
        transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
      />
    </>
  );
}
