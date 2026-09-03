"use client";
import Image from "next/image";
import { useState } from "react";
import { ShoppingBag, Check } from "lucide-react";
import { Product } from "@/lib/data";
import { useCart } from "@/lib/cartContext";
import TiltCard from "./TiltCard";

export default function ProductCard({ product }: { product: Product }) {
  const { add } = useCart();
  const [selectedVariant, setSelectedVariant] = useState(product.variants?.[0] ?? "");
  const [added, setAdded] = useState(false);

  const isVoucher = product.category === "voucher";

  function handleAdd() {
    if (isVoucher) {
      window.open("https://app.squareup.com/gift/MLKPR08R87F38/order", "_blank");
      return;
    }
    add({
      id: product.id,
      name: product.name,
      price: product.price,
      variant: selectedVariant || undefined,
      image: product.image,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  }

  return (
    <TiltCard className="h-full">
    <div
      className="group rounded-2xl overflow-hidden flex flex-col shadow-sm hover:shadow-lg transition-shadow duration-300"
      style={{ backgroundColor: "var(--warm-white)", border: "1px solid rgba(74,44,28,0.08)" }}
    >
      <div className="relative h-64 overflow-hidden">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className={`object-cover ${product.imagePosition ?? "object-center"} transition-transform duration-700 group-hover:scale-105`}
        />
        {product.badge && (
          <span
            className="absolute top-3 left-3 text-xs font-semibold px-3 py-1 rounded-full text-white shadow-sm"
            style={{ backgroundColor: "var(--caramel)" }}
          >
            {product.badge}
          </span>
        )}
      </div>
      <div className="p-5 flex flex-col flex-1">
        <p className="text-xs font-semibold uppercase tracking-widest mb-2 opacity-40" style={{ color: "var(--espresso)" }}>
          {product.category === "coffee" ? "Coffee" : product.category === "clothing" ? "Merch" : "Gift"}
        </p>
        <h3 className="font-bold text-base mb-2 leading-tight" style={{ fontFamily: "var(--font-playfair)", color: "var(--espresso)" }}>
          {product.name}
        </h3>
        <p className="text-sm opacity-60 leading-relaxed flex-1 mb-4" style={{ color: "var(--espresso)" }}>
          {product.description}
        </p>

        {product.variants && product.variants.length > 1 && (
          <div className="mb-4">
            <div className="flex flex-wrap gap-2">
              {product.variants.map((v) => (
                <button
                  key={v}
                  onClick={() => setSelectedVariant(v)}
                  className="text-xs px-3 py-1.5 rounded-lg border transition-all font-medium"
                  style={{
                    borderColor: selectedVariant === v ? "var(--caramel)" : "var(--sand)",
                    backgroundColor: selectedVariant === v ? "var(--caramel)" : "transparent",
                    color: selectedVariant === v ? "white" : "var(--espresso)",
                  }}
                >
                  {v}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="flex items-center justify-between">
          <span className="text-xl font-bold" style={{ fontFamily: "var(--font-playfair)", color: "var(--espresso)" }}>
            £{product.price.toFixed(2)}
          </span>
          <button
            onClick={handleAdd}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90 active:scale-95"
            style={{ backgroundColor: added ? "var(--forest)" : "var(--espresso)" }}
          >
            {added ? <Check size={15} /> : <ShoppingBag size={15} />}
            {isVoucher ? "Buy on Square" : added ? "Added" : "Add to bag"}
          </button>
        </div>
      </div>
    </div>
    </TiltCard>
  );
}
