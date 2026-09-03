"use client";
import { useState } from "react";
import { RefreshCw } from "lucide-react";
import { Product } from "@/lib/data";

export default function SubscribeButton({ product }: { product: Product }) {
  const [loading, setLoading] = useState(false);

  async function handleSubscribe() {
    setLoading(true);
    const res = await fetch("/api/subscribe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        productName: product.name,
        priceGbp: +(product.price * 0.9).toFixed(2),
        variant: product.variants?.[0],
        image: product.image,
        origin: window.location.origin,
      }),
    });
    const { url } = await res.json();
    if (url) window.location.href = url;
    else setLoading(false);
  }

  return (
    <button
      onClick={handleSubscribe}
      disabled={loading}
      className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-50"
      style={{ backgroundColor: "var(--espresso)" }}
    >
      <RefreshCw size={12} className={loading ? "animate-spin" : ""} />
      {loading ? "Loading…" : "Subscribe"}
    </button>
  );
}
