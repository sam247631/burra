"use client";
import { useState } from "react";
import { Check, Loader2 } from "lucide-react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", subject: "general", message: "" });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(false);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      setSubmitted(true);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="pt-32 pb-24 px-6 min-h-screen">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] mb-4" style={{ color: "var(--caramel)" }}>
            Get in Touch
          </p>
          <h1
            className="text-5xl md:text-6xl font-bold mb-4"
            style={{ fontFamily: "var(--font-playfair)", color: "var(--espresso)" }}
          >
            Say hello
          </h1>
          <p className="text-base opacity-60 max-w-md mx-auto">
            For press enquiries, private hire, partnerships or general questions — we&apos;d love to hear from you.
          </p>
        </div>

        {/* Form */}
        <div className="max-w-2xl mx-auto">
          <div>
            {submitted ? (
              <div
                className="rounded-2xl p-12 flex flex-col items-center justify-center text-center h-full"
                style={{ backgroundColor: "var(--sand)" }}
              >
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center mb-4"
                  style={{ backgroundColor: "var(--forest)" }}
                >
                  <Check size={24} className="text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-2" style={{ fontFamily: "var(--font-playfair)", color: "var(--espresso)" }}>
                  Message sent
                </h3>
                <p className="opacity-60 text-sm" style={{ color: "var(--espresso)" }}>
                  We&apos;ll get back to you within 24 hours.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="rounded-2xl p-8 space-y-5"
                style={{ backgroundColor: "var(--warm-white)", border: "1px solid rgba(74,44,28,0.08)" }}
              >
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-widest mb-1.5 block opacity-50" style={{ color: "var(--espresso)" }}>
                      Name
                    </label>
                    <input
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 transition-all"
                      style={{
                        backgroundColor: "var(--cream)",
                        border: "1.5px solid rgba(74,44,28,0.1)",
                        color: "var(--espresso)",
                        // @ts-ignore
                        "--tw-ring-color": "var(--caramel)",
                      }}
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-widest mb-1.5 block opacity-50" style={{ color: "var(--espresso)" }}>
                      Email
                    </label>
                    <input
                      required
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full rounded-xl px-4 py-3 text-sm outline-none transition-all"
                      style={{
                        backgroundColor: "var(--cream)",
                        border: "1.5px solid rgba(74,44,28,0.1)",
                        color: "var(--espresso)",
                      }}
                      placeholder="you@example.com"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-xs font-semibold uppercase tracking-widest mb-1.5 block opacity-50" style={{ color: "var(--espresso)" }}>
                    Subject
                  </label>
                  <select
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    className="w-full rounded-xl px-4 py-3 text-sm outline-none"
                    style={{
                      backgroundColor: "var(--cream)",
                      border: "1.5px solid rgba(74,44,28,0.1)",
                      color: "var(--espresso)",
                    }}
                  >
                    <option value="general">General enquiry</option>
                    <option value="private">Private hire</option>
                    <option value="press">Press / media</option>
                    <option value="partnership">Partnership</option>
                    <option value="events">Events</option>
                    <option value="shop">Shop / orders</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold uppercase tracking-widest mb-1.5 block opacity-50" style={{ color: "var(--espresso)" }}>
                    Message
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full rounded-xl px-4 py-3 text-sm outline-none resize-none"
                    style={{
                      backgroundColor: "var(--cream)",
                      border: "1.5px solid rgba(74,44,28,0.1)",
                      color: "var(--espresso)",
                    }}
                    placeholder="Tell us more..."
                  />
                </div>
                {error && (
                  <p className="text-sm" style={{ color: "#c0392b" }}>
                    Something went wrong. Please email us at hello@burrabristol.co.uk
                  </p>
                )}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 rounded-xl font-semibold text-sm text-white transition-opacity hover:opacity-90 flex items-center justify-center gap-2 disabled:opacity-60"
                  style={{ backgroundColor: "var(--espresso)" }}
                >
                  {loading && <Loader2 size={16} className="animate-spin" />}
                  {loading ? "Sending…" : "Send Message"}
                </button>
              </form>
            )}
          </div>

          {/* Socials */}
          <div className="mt-6 rounded-2xl p-5 flex items-center gap-8" style={{ backgroundColor: "var(--sand)" }}>
            <p className="text-xs font-semibold uppercase tracking-widest opacity-60 flex-shrink-0" style={{ color: "var(--espresso)" }}>
              Social Media
            </p>
            <div className="flex gap-6">
              {[
                { label: "Instagram", handle: "@burrabristol", href: "https://www.instagram.com/burrabristol/" },
                { label: "Facebook", handle: "burrabristolcoffee", href: "https://www.facebook.com/burrabristolcoffee" },
              ].map(({ label, handle, href }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                  className="text-sm transition-opacity hover:opacity-70" style={{ color: "var(--espresso)" }}>
                  <span className="opacity-40">{label} — </span>
                  <span className="font-medium">{handle}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
