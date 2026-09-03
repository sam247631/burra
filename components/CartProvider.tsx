"use client";
import { useState, ReactNode } from "react";
import CartContext, { CartItem } from "@/lib/cartContext";

export default function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  function add(item: Omit<CartItem, "qty">) {
    setItems((prev) => {
      const key = item.id + (item.variant ?? "");
      const exists = prev.find((i) => i.id + (i.variant ?? "") === key);
      if (exists) {
        return prev.map((i) =>
          i.id + (i.variant ?? "") === key ? { ...i, qty: i.qty + 1 } : i
        );
      }
      return [...prev, { ...item, qty: 1 }];
    });
  }

  function remove(id: string, variant?: string) {
    const key = id + (variant ?? "");
    setItems((prev) => prev.filter((i) => i.id + (i.variant ?? "") !== key));
  }

  function update(id: string, qty: number, variant?: string) {
    const key = id + (variant ?? "");
    if (qty <= 0) return remove(id, variant);
    setItems((prev) =>
      prev.map((i) => (i.id + (i.variant ?? "") === key ? { ...i, qty } : i))
    );
  }

  function clear() {
    setItems([]);
  }

  const total = items.reduce((s, i) => s + i.price * i.qty, 0);
  const count = items.reduce((s, i) => s + i.qty, 0);

  return (
    <CartContext.Provider value={{ items, add, remove, update, total, count, clear }}>
      {children}
    </CartContext.Provider>
  );
}
