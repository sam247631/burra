"use client";
import { useState } from "react";
import { X, Minus, Plus, Trash2, Loader2 } from "lucide-react";
import { useCart } from "@/lib/cartContext";
import Image from "next/image";

const SQUARE_VOUCHER_URL = "https://app.squareup.com/gift/MLKPR08R87F38/order";

export default function CartDrawer({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const { items, remove, update, total, clear } = useCart();
  const [loading, setLoading] = useState(false);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);

  const voucherItems = items.filter((i) => i.id.startsWith("voucher-"));
  const stripeItems = items.filter((i) => !i.id.startsWith("voucher-"));
  const hasVouchers = voucherItems.length > 0;
  const hasStripeItems = stripeItems.length > 0;
  const hasPhysical = stripeItems.some(
    (i) => i.id.startsWith("tee-") || i.id.startsWith("coffee-")
  );

  async function handleCheckout() {
    if (hasVouchers && !hasStripeItems) {
      window.open(SQUARE_VOUCHER_URL, "_blank");
      return;
    }
    setLoading(true);
    setCheckoutError(null);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: stripeItems, origin: window.location.origin }),
      });
      const data = await res.json();
      if (!res.ok) {
        setCheckoutError(data.error ?? "Something went wrong. Please try again.");
        return;
      }
      if (data.url) window.location.href = data.url;
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
          onClick={onClose}
        />
      )}

      {/* Drawer */}
      <aside
        className="fixed top-0 right-0 h-full z-50 w-full max-w-md flex flex-col transition-transform duration-300 ease-in-out"
        style={{
          backgroundColor: "var(--warm-white)",
          transform: open ? "translateX(0)" : "translateX(100%)",
        }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-6 py-5 border-b"
          style={{ borderColor: "var(--sand)" }}
        >
          <h2
            className="text-xl font-bold"
            style={{ fontFamily: "var(--font-playfair)", color: "var(--espresso)" }}
          >
            Your Bag
          </h2>
          <button onClick={onClose} className="p-2 hover:opacity-60 transition-opacity">
            <X size={20} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
              <span className="text-5xl">☕</span>
              <p className="text-lg font-medium" style={{ color: "var(--brown)" }}>
                Your bag is empty
              </p>
              <p className="text-sm opacity-60">
                Add some coffee, merch or event tickets to get started.
              </p>
            </div>
          ) : (
            <ul className="flex flex-col gap-4">
              {items.map((item) => (
                <li
                  key={item.id + (item.variant ?? "")}
                  className="flex gap-4 items-start py-4 border-b"
                  style={{ borderColor: "var(--sand)" }}
                >
                  <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm leading-tight" style={{ color: "var(--espresso)" }}>
                      {item.name}
                    </p>
                    {item.variant && (
                      <p className="text-xs opacity-60 mt-0.5">{item.variant}</p>
                    )}
                    <p className="text-sm font-bold mt-1" style={{ color: "var(--caramel)" }}>
                      £{(item.price * item.qty).toFixed(2)}
                    </p>
                    <div className="flex items-center gap-3 mt-2">
                      <button
                        onClick={() => update(item.id, item.qty - 1, item.variant)}
                        className="w-6 h-6 rounded-full flex items-center justify-center border hover:bg-gray-100"
                        style={{ borderColor: "var(--sand)" }}
                      >
                        <Minus size={12} />
                      </button>
                      <span className="text-sm font-medium w-4 text-center">{item.qty}</span>
                      <button
                        onClick={() => update(item.id, item.qty + 1, item.variant)}
                        className="w-6 h-6 rounded-full flex items-center justify-center border hover:bg-gray-100"
                        style={{ borderColor: "var(--sand)" }}
                      >
                        <Plus size={12} />
                      </button>
                      <button
                        onClick={() => remove(item.id, item.variant)}
                        className="ml-auto opacity-40 hover:opacity-100 transition-opacity"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="px-6 py-6 border-t" style={{ borderColor: "var(--sand)" }}>
            <div className="space-y-2 mb-4">
              <div className="flex justify-between items-center">
                <span className="text-sm opacity-60">Subtotal</span>
                <span className="text-sm font-medium" style={{ color: "var(--espresso)" }}>
                  £{total.toFixed(2)}
                </span>
              </div>
              {hasPhysical && (
                <div className="flex justify-between items-center">
                  <span className="text-sm opacity-60">UK Shipping</span>
                  <span className="text-sm font-medium" style={{ color: "var(--espresso)" }}>£5.00</span>
                </div>
              )}
              <div className="flex justify-between items-center pt-2 border-t" style={{ borderColor: "var(--sand)" }}>
                <span className="text-sm font-semibold">Total</span>
                <span className="text-xl font-bold" style={{ fontFamily: "var(--font-playfair)", color: "var(--espresso)" }}>
                  £{(total + (hasPhysical ? 5 : 0)).toFixed(2)}
                </span>
              </div>
            </div>
            {checkoutError && (
              <p className="text-xs text-center mb-3 font-medium" style={{ color: "#c0392b" }}>
                {checkoutError}
              </p>
            )}
            {hasVouchers && hasStripeItems && (
              <p className="text-xs text-center mb-3 opacity-50" style={{ color: "var(--espresso)" }}>
                Gift vouchers will open in Square separately.
              </p>
            )}
            {hasVouchers && !hasStripeItems && (
              <p className="text-xs text-center mb-3 opacity-50" style={{ color: "var(--espresso)" }}>
                Gift vouchers are purchased via Square.
              </p>
            )}
            <button
              onClick={handleCheckout}
              disabled={loading}
              className="w-full py-4 rounded-xl font-semibold text-white text-sm tracking-wide transition-opacity hover:opacity-90 flex items-center justify-center gap-2 disabled:opacity-60"
              style={{ backgroundColor: "var(--espresso)" }}
            >
              {loading && <Loader2 size={16} className="animate-spin" />}
              {hasVouchers && !hasStripeItems ? "Buy gift vouchers on Square" : "Pay with card"}
            </button>
            <button
              onClick={clear}
              className="w-full mt-3 text-xs opacity-40 hover:opacity-60 transition-opacity"
            >
              Clear bag
            </button>
          </div>
        )}
      </aside>
    </>
  );
}
