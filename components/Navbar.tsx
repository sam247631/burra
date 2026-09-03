"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { ShoppingBag, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/lib/cartContext";
import CartDrawer from "./CartDrawer";

const links = [
  { href: "/menu.pdf", label: "Menu", external: true },
  { href: "/our-story", label: "Our Story" },
  { href: "/shop", label: "Shop" },
  { href: "/events", label: "Events" },
  { href: "/private-hire", label: "Private Hire" },
  { href: "/find-us", label: "Find Us" },
  { href: "/contact", label: "Contact" },
];

function NavLink({ href, label, scrolled, external }: { href: string; label: string; scrolled: boolean; external?: boolean }) {
  const [hovered, setHovered] = useState(false);
  const cls = "text-sm font-medium tracking-wide transition-colors relative block py-1";
  const style = { color: scrolled ? "var(--espresso)" : "rgba(247,243,238,0.82)" };
  const underline = (
    <motion.span
      className="absolute bottom-0 left-0 h-px"
      style={{ backgroundColor: scrolled ? "var(--caramel)" : "rgba(212,146,74,0.8)" }}
      initial={{ width: 0 }}
      animate={{ width: hovered ? "100%" : 0 }}
      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
    />
  );
  return (
    <li className="relative">
      {external ? (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={cls}
          style={style}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          {label}
          {underline}
        </a>
      ) : (
        <Link
          href={href}
          className={cls}
          style={style}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          {label}
          {underline}
        </Link>
      )}
    </li>
  );
}

export default function Navbar() {
  const { count } = useCart();
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    handler();
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const solid = !isHome || scrolled;

  const iconColor = solid ? "var(--espresso)" : "rgba(247,243,238,0.82)";

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          backgroundColor: solid ? "rgba(247,243,238,0.96)" : "transparent",
          backdropFilter: solid ? "blur(14px)" : "none",
          borderBottom: solid ? "1px solid rgba(184,115,42,0.12)" : "none",
        }}
      >
        <nav className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src={solid ? "/images/burra-logo-black.png" : "/images/burra-logo-white.png"}
              alt="Burra Bristol"
              width={120}
              height={32}
              className="h-8 w-auto transition-all duration-300"
              style={{  }}
            />
          </Link>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-8">
            {links.map(({ href, label, external }) => (
              <NavLink key={href} href={href} label={label} scrolled={solid} external={external} />
            ))}
          </ul>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setCartOpen(true)}
              className="relative p-2 rounded-full transition-colors hover:bg-white/10"
              aria-label="Open cart"
            >
              <ShoppingBag size={20} color={iconColor} />
              <AnimatePresence>
                {count > 0 && (
                  <motion.span
                    key="badge"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold text-white"
                    style={{ backgroundColor: "var(--caramel)" }}
                  >
                    {count}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>

            <button
              className="md:hidden p-2"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={20} color={iconColor} /> : <Menu size={20} color={iconColor} />}
            </button>
          </div>
        </nav>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="md:hidden overflow-hidden border-t"
              style={{ backgroundColor: "var(--espresso)", borderColor: "rgba(184,115,42,0.15)" }}
            >
              <ul className="flex flex-col px-6 py-6 gap-5">
                {links.map(({ href, label, external }) => (
                  <li key={href}>
                    {external ? (
                      <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => setMobileOpen(false)}
                        className="text-lg font-medium transition-opacity hover:opacity-60"
                        style={{ color: "var(--cream)" }}
                      >
                        {label}
                      </a>
                    ) : (
                      <Link
                        href={href}
                        onClick={() => setMobileOpen(false)}
                        className="text-lg font-medium transition-opacity hover:opacity-60"
                        style={{ color: "var(--cream)" }}
                      >
                        {label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}
