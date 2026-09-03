"use client";
import { useRef, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Check, ShoppingBag } from "lucide-react";
import { Product } from "@/lib/data";
import { useCart } from "@/lib/cartContext";

function StripCard({ product }: { product: Product }) {
  const { add } = useCart();
  const [added, setAdded] = useState(false);
  const [variant, setVariant] = useState(product.variants?.[0] ?? "");

  function handleAdd(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    add({ id: product.id, name: product.name, price: product.price, variant: variant || undefined, image: product.image });
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  }

  const categoryLabel =
    product.category === "coffee" ? "Coffee" : product.category === "clothing" ? "Merch" : "Gift";

  return (
    <div
      className="flex-shrink-0 w-64 group flex flex-col rounded-2xl overflow-hidden select-none"
      style={{ backgroundColor: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}
    >
      <div className="relative h-72 overflow-hidden flex-shrink-0">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105 pointer-events-none"
          draggable={false}
          sizes="260px"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        {product.badge && (
          <span
            className="absolute top-3 left-3 text-[10px] font-bold px-2.5 py-1 rounded-full text-white uppercase tracking-wider"
            style={{ backgroundColor: "var(--caramel)" }}
          >
            {product.badge}
          </span>
        )}
        <div className="absolute bottom-3 left-3">
          <p className="text-[9px] font-bold uppercase tracking-[0.35em]" style={{ color: "rgba(247,243,238,0.4)" }}>
            {categoryLabel}
          </p>
        </div>
      </div>

      <div className="p-4 flex flex-col gap-3 flex-1">
        <h3
          className="text-base font-bold leading-snug"
          style={{ fontFamily: "var(--font-playfair)", color: "var(--cream)" }}
        >
          {product.name}
        </h3>

        {product.variants && product.variants.length > 1 && (
          <div className="flex flex-wrap gap-1.5">
            {product.variants.map((v) => (
              <button
                key={v}
                onPointerDown={(e) => { e.stopPropagation(); setVariant(v); }}
                className="text-[10px] px-2.5 py-1 rounded-lg font-semibold transition-all"
                style={{
                  backgroundColor: variant === v ? "var(--caramel)" : "rgba(255,255,255,0.07)",
                  color: variant === v ? "white" : "rgba(247,243,238,0.5)",
                  border: `1px solid ${variant === v ? "var(--caramel)" : "transparent"}`,
                }}
              >
                {v}
              </button>
            ))}
          </div>
        )}

        <div className="flex items-center justify-between mt-auto pt-1">
          <span
            className="text-xl font-bold"
            style={{ fontFamily: "var(--font-playfair)", color: "var(--cream)" }}
          >
            £{product.price.toFixed(2)}
          </span>
          <button
            onPointerDown={handleAdd}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-[11px] font-semibold text-white transition-all hover:opacity-90"
            style={{ backgroundColor: added ? "var(--forest)" : "var(--caramel)" }}
          >
            {added ? <Check size={12} /> : <ShoppingBag size={12} />}
            {added ? "Added" : "Add"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ShopStrip({ products }: { products: Product[] }) {
  const constraintsRef = useRef<HTMLDivElement>(null);
  const [dragging, setDragging] = useState(false);

  return (
    <div ref={constraintsRef} className="overflow-hidden">
      <motion.div
        className="flex gap-4 px-8 md:px-14"
        style={{ width: "max-content", cursor: dragging ? "grabbing" : "grab" }}
        drag="x"
        dragConstraints={constraintsRef}
        dragElastic={0.05}
        dragMomentum
        onDragStart={() => setDragging(true)}
        onDragEnd={() => setDragging(false)}
      >
        {products.map((p) => (
          <StripCard key={p.id} product={p} />
        ))}
        {/* End spacer */}
        <div className="flex-shrink-0 w-4" />
      </motion.div>
    </div>
  );
}
