"use client";
import { createContext, useContext, useState, ReactNode } from "react";

export type CartItem = {
  id: string;
  name: string;
  price: number;
  qty: number;
  variant?: string;
  image: string;
};

type CartCtx = {
  items: CartItem[];
  add: (item: Omit<CartItem, "qty">) => void;
  remove: (id: string, variant?: string) => void;
  update: (id: string, qty: number, variant?: string) => void;
  total: number;
  count: number;
  clear: () => void;
};

const CartContext = createContext<CartCtx | null>(null);

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be inside CartProvider");
  return ctx;
}

export default CartContext;
