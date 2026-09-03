"use client";
import Image from "next/image";
import { useState } from "react";
import { CheckCircle, Send } from "lucide-react";

const eventTypes = [
  "Birthday / Celebration",
  "Corporate Breakfast / Lunch",
  "Product Launch",
  "Team Away Day",
  "Wedding Breakfast",
  "Photoshoot / Filming",
  "Other",
];

const perks = [
  { icon: "☕", title: "Exclusive use", body: "All three of our spaces available for full or partial hire — choose the location that suits your event." },
  { icon: "🍳", title: "Bespoke menus", body: "Work with our team to create a custom menu, from brunch platters to evening sharing feasts." },
  { icon: "📸", title: "Great space", body: "Beautiful interiors and warm lighting that photograph well. Perfect for brand shoots and launches." },
];

export default function PrivateHirePage() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", date: "", guests: "", eventType: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  const inputCls = "w-full px-4 py-3 rounded-xl text-sm outline-none transition-all focus:ring-2";
  const inputStyle = { backgroundColor: "rgba(74,44,28,0.05)", border: "1px solid rgba(74,44,28,0.12)", color: "var(--espresso)" };
  const focusStyle = { "--tw-ring-color": "var(--caramel)" } as React.CSSProperties;

  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--warm-white)" }}>
      {/* Hero */}
      <div className="relative h-[50vh] min-h-80 overflow-hidden">
        <Image src="/images/evening-dinner-champagne.jpg" alt="Private hire at Burra" fill className="object-cover" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(74,44,28,0.6) 0%, rgba(74,44,28,0.35) 100%)" }} />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 pt-16">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] mb-4" style={{ color: "rgba(212,146,74,0.9)" }}>
            Host with us
          </p>
          <h1
            className="text-5xl md:text-6xl font-bold text-white mb-4"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Private Hire
          </h1>
          <p className="text-white/70 max-w-md text-sm leading-relaxed">
            Celebrate, connect, or create at Burra. Our three Bristol venues are available for exclusive hire — morning to late.
          </p>
        </div>
      </div>

      {/* Perks */}
      <div className="max-w-5xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-24">
          {perks.map((p) => (
            <div key={p.title} className="rounded-2xl p-6" style={{ backgroundColor: "var(--sand)" }}>
              <div className="text-3xl mb-3">{p.icon}</div>
              <h3 className="font-bold mb-2" style={{ fontFamily: "var(--font-playfair)", color: "var(--espresso)" }}>{p.title}</h3>
              <p className="text-sm leading-relaxed opacity-60" style={{ color: "var(--espresso)" }}>{p.body}</p>
            </div>
          ))}
        </div>

        {/* Form */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          <div className="lg:col-span-2">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] mb-4" style={{ color: "var(--caramel)" }}>
              Get in touch
            </p>
            <h2 className="text-3xl font-bold mb-4" style={{ fontFamily: "var(--font-playfair)", color: "var(--espresso)" }}>
              Tell us about your event
            </h2>
            <p className="text-sm leading-relaxed mb-8 opacity-60" style={{ color: "var(--espresso)" }}>
              Fill in the form and we'll come back to you within 2 working days with availability, pricing, and a tailored proposal.
            </p>
            <div className="rounded-2xl overflow-hidden" style={{ height: 200, border: "1px solid rgba(74,44,28,0.1)" }}>
              <iframe
                title="Venue location"
                src="https://maps.google.com/maps?q=51.46916005922742,-2.61301834657869&z=15&output=embed"
                className="w-full h-full"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          <div className="lg:col-span-3">
            {status === "sent" ? (
              <div className="flex flex-col items-center justify-center text-center h-full py-20">
                <CheckCircle size={48} style={{ color: "var(--caramel)" }} className="mb-4" />
                <h3 className="text-2xl font-bold mb-2" style={{ fontFamily: "var(--font-playfair)", color: "var(--espresso)" }}>
                  Enquiry received
                </h3>
                <p className="text-sm opacity-60 max-w-xs" style={{ color: "var(--espresso)" }}>
                  Thanks! We'll be in touch within 2 working days. Check your inbox for a confirmation.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold mb-1.5 opacity-50" style={{ color: "var(--espresso)" }}>Your name *</label>
                    <input name="name" required value={form.name} onChange={handleChange} className={inputCls} style={{ ...inputStyle, ...focusStyle }} placeholder="Jane Smith" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold mb-1.5 opacity-50" style={{ color: "var(--espresso)" }}>Email *</label>
                    <input name="email" type="email" required value={form.email} onChange={handleChange} className={inputCls} style={{ ...inputStyle, ...focusStyle }} placeholder="jane@example.com" />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold mb-1.5 opacity-50" style={{ color: "var(--espresso)" }}>Phone</label>
                    <input name="phone" type="tel" value={form.phone} onChange={handleChange} className={inputCls} style={{ ...inputStyle, ...focusStyle }} placeholder="07700 900000" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold mb-1.5 opacity-50" style={{ color: "var(--espresso)" }}>Preferred date</label>
                    <input name="date" type="date" value={form.date} onChange={handleChange} className={inputCls} style={{ ...inputStyle, ...focusStyle }} />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold mb-1.5 opacity-50" style={{ color: "var(--espresso)" }}>Number of guests</label>
                    <input name="guests" type="number" min="2" value={form.guests} onChange={handleChange} className={inputCls} style={{ ...inputStyle, ...focusStyle }} placeholder="e.g. 40" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold mb-1.5 opacity-50" style={{ color: "var(--espresso)" }}>Event type</label>
                    <select name="eventType" value={form.eventType} onChange={handleChange} className={inputCls} style={{ ...inputStyle, ...focusStyle }}>
                      <option value="">Select…</option>
                      {eventTypes.map((t) => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1.5 opacity-50" style={{ color: "var(--espresso)" }}>Tell us more *</label>
                  <textarea
                    name="message"
                    required
                    rows={5}
                    value={form.message}
                    onChange={handleChange}
                    className={inputCls}
                    style={{ ...inputStyle, ...focusStyle, resize: "none" }}
                    placeholder="What are you celebrating? Any catering requirements, AV needs, or specific requests?"
                  />
                </div>

                {status === "error" && (
                  <p className="text-sm" style={{ color: "#c0392b" }}>Something went wrong. Please email us directly at hello@burrabristol.co.uk</p>
                )}

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-semibold text-sm text-white transition-opacity hover:opacity-90 disabled:opacity-50"
                  style={{ backgroundColor: "var(--espresso)" }}
                >
                  <Send size={15} />
                  {status === "sending" ? "Sending…" : "Send enquiry"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
