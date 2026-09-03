import { products } from "@/lib/data";
import ProductCard from "@/components/ProductCard";
import SubscribeButton from "@/components/SubscribeButton";
import { ExternalLink } from "lucide-react";

const coffee  = products.filter((p) => p.category === "coffee");
const merch   = products.filter((p) => p.category === "clothing");

export default function ShopPage() {
  return (
    <div className="pt-32 pb-24 px-6 min-h-screen">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center mb-20">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] mb-4" style={{ color: "var(--caramel)" }}>
            The Shop
          </p>
          <h1
            className="text-5xl md:text-6xl font-bold mb-4"
            style={{ fontFamily: "var(--font-playfair)", color: "var(--espresso)" }}
          >
            Take Burra home
          </h1>
          <p className="text-base opacity-60 max-w-md mx-auto">
            Bristol-roasted coffee, limited merch and gift cards — shipped across the UK.
          </p>
        </div>

        {/* ── Coffee ── */}
        <section className="mb-20">
          <div className="flex items-baseline gap-4 mb-8">
            <h2 className="text-2xl font-bold" style={{ fontFamily: "var(--font-playfair)", color: "var(--espresso)" }}>
              Coffee
            </h2>
            <span className="text-xs opacity-40 font-medium" style={{ color: "var(--espresso)" }}>
              Extract Coffee Roasters · St Werburghs, Bristol
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {coffee.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>

        {/* ── Coffee Subscription ── */}
        <section className="mb-20">
          <div
            className="rounded-3xl p-10 md:p-14 grid grid-cols-1 md:grid-cols-2 gap-10 items-center"
            style={{ backgroundColor: "var(--sand)" }}
          >
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.35em] mb-3" style={{ color: "var(--caramel)" }}>
                Never run out
              </p>
              <h2
                className="text-3xl md:text-4xl font-bold mb-3"
                style={{ fontFamily: "var(--font-playfair)", color: "var(--espresso)" }}
              >
                Coffee subscription
              </h2>
              <p className="text-sm leading-relaxed mb-6 opacity-65" style={{ color: "var(--espresso)" }}>
                Get freshly roasted Extract coffee delivered every month. Cancel any time, no fuss — roasted to order and dispatched within 3 days.
              </p>
              <ul className="space-y-2 mb-6">
                {["Save 10% vs one-off price", "Roasted fresh each month", "Swap bag or grind anytime", "Cancel with one click"].map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm" style={{ color: "var(--espresso)" }}>
                    <span style={{ color: "var(--caramel)" }}>✓</span> {f}
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-4">
              {coffee.map((p) => (
                <div
                  key={p.id}
                  className="flex items-center justify-between rounded-2xl p-5"
                  style={{ backgroundColor: "rgba(247,243,238,0.7)", border: "1px solid rgba(74,44,28,0.1)" }}
                >
                  <div>
                    <p className="font-semibold text-sm" style={{ color: "var(--espresso)", fontFamily: "var(--font-playfair)" }}>{p.name}</p>
                    <p className="text-xs opacity-50 mt-0.5" style={{ color: "var(--espresso)" }}>
                      £{(p.price * 0.9).toFixed(2)}/mo · save £{(p.price * 0.1).toFixed(2)}
                    </p>
                  </div>
                  <SubscribeButton product={p} />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Merch ── */}
        <section className="mb-20">
          <div className="flex items-baseline gap-4 mb-8">
            <h2 className="text-2xl font-bold" style={{ fontFamily: "var(--font-playfair)", color: "var(--espresso)" }}>
              Merch
            </h2>
            <span className="text-xs opacity-40 font-medium" style={{ color: "var(--espresso)" }}>
              100% organic cotton · limited run
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {merch.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>

        {/* ── Gift Cards ── */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-8" style={{ fontFamily: "var(--font-playfair)", color: "var(--espresso)" }}>
            Gift Cards
          </h2>
          <div
            className="rounded-3xl p-10 md:p-14 flex flex-col md:flex-row items-center justify-between gap-8"
            style={{ backgroundColor: "var(--espresso)" }}
          >
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.35em] mb-3" style={{ color: "rgba(247,243,238,0.4)" }}>
                Give the gift of Burra
              </p>
              <h3
                className="text-3xl md:text-4xl font-bold text-white mb-3"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                Burra Gift Cards
              </h3>
              <p className="text-white/60 max-w-md leading-relaxed">
                Choose any amount and let them spend it across all three Burra locations. Redeemable on food, coffee and drinks in store.
              </p>
            </div>
            <a
              href="https://app.squareup.com/gift/MLKPR08R87F38/order"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-shrink-0 flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-sm transition-opacity hover:opacity-90 whitespace-nowrap"
              style={{ backgroundColor: "var(--caramel)", color: "white" }}
            >
              Buy a gift card
              <ExternalLink size={14} />
            </a>
          </div>
        </section>

        {/* Shipping note */}
        <div className="p-6 rounded-2xl text-center" style={{ backgroundColor: "var(--sand)" }}>
          <p className="text-sm font-medium" style={{ color: "var(--espresso)" }}>
            Free UK shipping on orders over £40 &nbsp;·&nbsp; Coffee roasted fresh to order by Extract Coffee, Bristol
          </p>
        </div>

      </div>
    </div>
  );
}
