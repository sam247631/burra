"use client";
import Image from "next/image";
import { useState } from "react";
import { ShoppingBag, Check } from "lucide-react";
import { Product } from "@/lib/data";
import { useCart } from "@/lib/cartContext";
import TiltCard from "./TiltCard";
import { motion } from "framer-motion";

export default function FeaturedProductCard({ product }: { product: Product }) {
  const { add } = useCart();
  const [selectedVariant, setSelectedVariant] = useState(product.variants?.[0] ?? "");
  const [added, setAdded] = useState(false);

  function handleAdd() {
    add({ id: product.id, name: product.name, price: product.price, variant: selectedVariant || undefined, image: product.image });
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  }

  return (
    <TiltCard className="h-full">
      <div
        className="relative h-full min-h-[480px] rounded-2xl overflow-hidden group cursor-pointer"
        style={{ border: "1px solid rgba(74,44,28,0.08)" }}
      >
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        {product.badge && (
          <span
            className="absolute top-4 left-4 text-xs font-semibold px-3 py-1 rounded-full text-white"
            style={{ backgroundColor: "var(--caramel)" }}
          >
            {product.badge}
          </span>
        )}
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <p className="text-xs font-semibold uppercase tracking-widest text-white/50 mb-1">Coffee</p>
          <h3 className="text-2xl font-bold text-white mb-1" style={{ fontFamily: "var(--font-playfair)" }}>
            {product.name}
          </h3>
          <p className="text-sm text-white/60 mb-4 leading-relaxed">{product.description.slice(0, 80)}&hellip;</p>
          {product.variants && product.variants.length > 1 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {product.variants.map((v) => (
                <button
                  key={v}
                  onClick={() => setSelectedVariant(v)}
                  className="text-xs px-3 py-1.5 rounded-lg border transition-all font-medium"
                  style={{
                    borderColor: selectedVariant === v ? "var(--caramel)" : "rgba(255,255,255,0.2)",
                    backgroundColor: selectedVariant === v ? "var(--caramel)" : "rgba(255,255,255,0.1)",
                    color: "white",
                  }}
                >
                  {v}
                </button>
              ))}
            </div>
          )}
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-white" style={{ fontFamily: "var(--font-playfair)" }}>
              £{product.price.toFixed(2)}
            </span>
            <button
              onClick={handleAdd}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90"
              style={{ backgroundColor: added ? "var(--forest)" : "var(--caramel)" }}
            >
              {added ? <Check size={15} /> : <ShoppingBag size={15} />}
              {added ? "Added!" : "Add to bag"}
            </button>
          </div>
        </div>
      </div>
    </TiltCard>
  );
}
