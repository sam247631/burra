import Image from "next/image";

const menuSections = [
  {
    title: "All Day Brunch",
    subtitle: "Served 8am – 3pm",
    items: [
      { name: "Full Burra", description: "Eggs your way, smashed avo, roasted tomato, halloumi, sourdough", price: "£14.50" },
      { name: "Bacon & Egg Roll", description: "Thick-cut smoked bacon, free-range fried egg, sriracha mayo, brioche bun", price: "£8.00" },
      { name: "Avo Smash", description: "Whipped avo, poached eggs, dukkah, chilli oil, sourdough", price: "£11.50" },
      { name: "Shakshuka", description: "Baked eggs in spiced tomato & pepper sauce, feta, warm flatbread", price: "£12.00" },
      { name: "Poke Bowl", description: "Sushi rice, sesame-marinated veg, edamame, pickled ginger, miso dressing", price: "£13.50", badge: "Vegan" },
      { name: "Burra Granola Bowl", description: "House-made granola, seasonal compote, coconut yoghurt", price: "£8.50", badge: "Vegan" },
      { name: "French Toast", description: "Brioche, whipped mascarpone, seasonal berries, maple syrup", price: "£10.50" },
    ],
  },
  {
    title: "Coffee",
    subtitle: "Extract Coffee Roasters · St Werburghs, Bristol",
    items: [
      { name: "Espresso", description: "Single or double — House Espresso blend", price: "£2.50 / £3.00" },
      { name: "Flat White", description: "Double ristretto, velvety steamed milk", price: "£3.80" },
      { name: "Cappuccino / Latte", description: "Double espresso, your choice of milk", price: "£4.00" },
      { name: "Filter / Batch Brew", description: "Rotating single origin, black", price: "£3.20" },
      { name: "Cold Brew", description: "18-hour cold-steeped, served over ice", price: "£4.50" },
      { name: "Matcha Latte", description: "Ceremonial-grade matcha, oat milk", price: "£4.20" },
      { name: "Hot Chocolate", description: "Belgian dark chocolate, steamed milk", price: "£4.00" },
    ],
  },
  {
    title: "Pastries & Bakes",
    subtitle: "Baked fresh in house every morning",
    items: [
      { name: "Butter Croissant", description: "Classic French laminated pastry", price: "£3.20" },
      { name: "Almond Croissant", description: "Double-baked with almond frangipane", price: "£3.80" },
      { name: "Pain au Chocolat", description: "Dark chocolate batons, flaky pastry", price: "£3.50" },
      { name: "Banana Loaf", description: "Caramelised banana, walnut, dark chocolate chunks", price: "£3.80" },
      { name: "Cinnamon Roll", description: "Soft enriched dough, cream cheese glaze", price: "£4.20" },
      { name: "Seasonal Cookie", description: "Ask your barista for today's flavour", price: "£2.80" },
    ],
  },
  {
    title: "Evening Dining",
    subtitle: "Thursday – Saturday from 6pm · Ticketed events",
    description: "Our evening dining series features rotating chefs, paired wines, and sharing menus inspired by the best of Bristol's producers. Tickets include a welcome drink.",
    items: [
      { name: "Welcome Cocktail", description: "Seasonal house cocktail on arrival", price: "Included" },
      { name: "Sharing Snacks", description: "3–4 small plates to start", price: "Included" },
      { name: "Main Courses", description: "2–3 courses from rotating guest chefs", price: "Included" },
      { name: "Wine Pairing", description: "Optional matched wines from local importers", price: "£25 supplement" },
    ],
    cta: { label: "Book a table", href: "/events" },
  },
];

const allergenNote = "Full allergen information is available in venue. Please speak to a team member if you have any dietary requirements. (v) Vegetarian · (vg) Vegan · (gf) Gluten-free options available.";

export default function MenuPage() {
  return (
    <div className="pt-28 pb-24 min-h-screen" style={{ backgroundColor: "var(--warm-white)" }}>
      {/* Hero */}
      <div className="relative h-72 mb-16 overflow-hidden">
        <Image src="/images/barista-counter.jpg" alt="Burra menu" fill className="object-cover object-top" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(74,44,28,0.55) 0%, rgba(74,44,28,0.2) 100%)" }} />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] mb-3" style={{ color: "rgba(212,146,74,0.9)" }}>
            Food &amp; Drink
          </p>
          <h1
            className="text-5xl md:text-6xl font-bold text-white"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Our Menu
          </h1>
          <p className="mt-3 text-white/70 text-sm max-w-sm">
            Simple, seasonal, Bristol-made — every day from 8am
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6">
        {menuSections.map((section) => (
          <section key={section.title} className="mb-20">
            {/* Section header */}
            <div className="mb-8 pb-4" style={{ borderBottom: "1px solid rgba(74,44,28,0.12)" }}>
              <h2
                className="text-3xl font-bold mb-1"
                style={{ fontFamily: "var(--font-playfair)", color: "var(--espresso)" }}
              >
                {section.title}
              </h2>
              <p className="text-sm opacity-50" style={{ color: "var(--espresso)" }}>
                {section.subtitle}
              </p>
              {section.description && (
                <p className="mt-3 text-sm leading-relaxed opacity-70" style={{ color: "var(--espresso)" }}>
                  {section.description}
                </p>
              )}
            </div>

            {/* Items */}
            <div className="divide-y" style={{ borderColor: "rgba(74,44,28,0.07)" }}>
              {section.items.map((item) => (
                <div key={item.name} className="flex items-start justify-between gap-6 py-5">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span
                        className="font-semibold text-base"
                        style={{ fontFamily: "var(--font-playfair)", color: "var(--espresso)" }}
                      >
                        {item.name}
                      </span>
                      {"badge" in item && item.badge && (
                        <span
                          className="text-xs font-semibold px-2 py-0.5 rounded-full"
                          style={{ backgroundColor: "var(--forest)", color: "white" }}
                        >
                          {item.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-sm leading-relaxed opacity-55" style={{ color: "var(--espresso)" }}>
                      {item.description}
                    </p>
                  </div>
                  <span
                    className="flex-shrink-0 text-sm font-semibold mt-0.5"
                    style={{ color: "var(--caramel)" }}
                  >
                    {item.price}
                  </span>
                </div>
              ))}
            </div>

            {section.cta && (
              <div className="mt-8">
                <a
                  href={section.cta.href}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white transition-opacity hover:opacity-90"
                  style={{ backgroundColor: "var(--espresso)" }}
                >
                  {section.cta.label} →
                </a>
              </div>
            )}
          </section>
        ))}

        {/* Allergen note */}
        <div
          className="rounded-2xl p-6 text-center text-xs leading-relaxed"
          style={{ backgroundColor: "var(--sand)", color: "var(--espresso)", opacity: 0.7 }}
        >
          {allergenNote}
        </div>
      </div>
    </div>
  );
}
