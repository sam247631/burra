"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { ArrowRight } from "lucide-react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (email) setSubmitted(true);
  }

  return (
    <footer style={{ backgroundColor: "var(--espresso)" }}>
      {/* Newsletter bar */}
      <div
        className="border-b"
        style={{ borderColor: "rgba(255,255,255,0.06)" }}
      >
        <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <p
              className="text-base font-bold text-white mb-1"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Stay in the loop
            </p>
            <p className="text-sm" style={{ color: "rgba(247,243,238,0.4)" }}>
              New events, specials and merch drops — straight to your inbox.
            </p>
          </div>
          {submitted ? (
            <p className="text-sm font-semibold" style={{ color: "var(--caramel-light)" }}>
              ✓ You&apos;re on the list. See you soon.
            </p>
          ) : (
            <form onSubmit={handleSubmit} className="flex gap-2 w-full md:w-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                className="flex-1 md:w-64 px-4 py-2.5 rounded-xl text-sm outline-none"
                style={{
                  backgroundColor: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.10)",
                  color: "var(--cream)",
                }}
              />
              <button
                type="submit"
                className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90 active:scale-95 flex-shrink-0"
                style={{ backgroundColor: "var(--caramel)" }}
              >
                Subscribe
                <ArrowRight size={13} />
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <Image
              src="/images/burra-logo-white.png"
              alt="Burra Bristol"
              width={140}
              height={36}
              className="mb-4 h-9 w-auto"
            />
            <p className="text-sm leading-relaxed mb-6" style={{ color: "rgba(247,243,238,0.42)" }}>
              Inspiring our community through award-winning coffee, food & drink.
            </p>
            <div className="flex gap-5">
              {[
                { label: "Instagram", href: "https://instagram.com/burrabristol" },
                { label: "Facebook", href: "https://facebook.com/burrabristolcoffee" },
              ].map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs transition-opacity hover:opacity-100"
                  style={{ color: "rgba(247,243,238,0.35)" }}
                >
                  {label}
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h4
              className="text-[10px] font-bold uppercase tracking-[0.4em] mb-5"
              style={{ color: "rgba(247,243,238,0.25)" }}
            >
              Explore
            </h4>
            <ul className="space-y-3">
              {[
                { href: "/our-story", label: "Our Story" },
                { href: "/shop", label: "Shop" },
                { href: "/events", label: "Events" },
                { href: "/find-us", label: "Find Us" },
                { href: "/contact", label: "Contact" },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm transition-opacity hover:opacity-100"
                    style={{ color: "rgba(247,243,238,0.55)" }}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Locations */}
          <div>
            <h4
              className="text-[10px] font-bold uppercase tracking-[0.4em] mb-5"
              style={{ color: "rgba(247,243,238,0.25)" }}
            >
              Locations
            </h4>
            <ul className="space-y-5">
              {[
                { name: "Redland", addr: "7 Lower Redland Rd, BS6 6TB" },
                { name: "North Street", addr: "223 North Street, BS3 1JJ" },
                { name: "Clifton Village", addr: "19 The Mall, BS8 4JG" },
              ].map(({ name, addr }) => (
                <li key={name}>
                  <p className="text-sm font-semibold mb-0.5" style={{ color: "rgba(247,243,238,0.75)" }}>
                    {name}
                  </p>
                  <p className="text-xs" style={{ color: "rgba(247,243,238,0.35)" }}>
                    {addr}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          {/* Hours & Awards */}
          <div>
            <h4
              className="text-[10px] font-bold uppercase tracking-[0.4em] mb-5"
              style={{ color: "rgba(247,243,238,0.25)" }}
            >
              Hours
            </h4>
            <ul className="space-y-2 text-sm mb-8" style={{ color: "rgba(247,243,238,0.55)" }}>
              <li>Mon–Sat: 8am – 4pm</li>
              <li>Sunday: 9am – 4pm</li>
            </ul>
            <h4
              className="text-[10px] font-bold uppercase tracking-[0.4em] mb-4"
              style={{ color: "rgba(247,243,238,0.25)" }}
            >
              Awards
            </h4>
            <ul className="space-y-2 text-xs" style={{ color: "rgba(247,243,238,0.45)" }}>
              <li>UK&apos;s Best Café 2024</li>
              <li>Café of the Year 2022</li>
            </ul>
          </div>
        </div>

        <div
          className="mt-16 pt-6 border-t flex flex-col md:flex-row justify-between items-center gap-4 text-xs"
          style={{ borderColor: "rgba(247,243,238,0.07)", color: "rgba(247,243,238,0.22)" }}
        >
          <p>© {new Date().getFullYear()} Burra Bristol Ltd. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:opacity-60 transition-opacity">Privacy Policy</a>
            <a href="#" className="hover:opacity-60 transition-opacity">Terms &amp; Conditions</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
