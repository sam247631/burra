import Image from "next/image";

const menuSections = [
  {
    title: "Eggs & Dishes",
    subtitle: "Served all day",
    items: [
      { name: "Feta & Eggs", description: "Soft poached free range eggs, whipped feta, pistachio zaatar, avocado, sourdough", price: "£14.80", badge: "V" },
      { name: "Ricotta & Eggs", description: "Soft poached free range eggs, maple ricotta, apricot harissa, chimichurri, avocado, sourdough", price: "£14.80", badge: "V" },
      { name: "Sobrasada & Eggs", description: "Spreadable chorizo, scrambled eggs, sweet corn salsa, chilli jam, sourdough", price: "£14.20" },
      { name: "Scrambled Eggs", description: "Scrambled eggs, mixed leaves, sourdough", price: "£11.00", badge: "V" },
      { name: "Smashed Avo", description: "Avocado, mixed leaves, sourdough, chilli jam", price: "£11.00", badge: "V" },
      { name: "Cannellini Beans", description: "Sesame & chilli cannellini beans, avocado, coconut yoghurt, pomegranate, sourdough", price: "£13.00", badge: "V" },
    ],
  },
  {
    title: "Eggs Benedict",
    subtitle: "On toasted English muffin with hollandaise",
    items: [
      { name: "Eggs Royale", description: "Soft poached free range eggs, Loch Duart hot-smoked salmon", price: "£14.90" },
      { name: "Eggs Benedict", description: "Soft poached free range eggs, Serrano ham", price: "£13.20" },
      { name: "Avocado Bene", description: "Soft poached free-range eggs, avocado", price: "£12.60", badge: "V" },
    ],
  },
  {
    title: "Rice Bowls",
    subtitle: "Add a fried egg for £1.50",
    items: [
      { name: "Salmon Rice Bowl", description: "Loch Duart hot-smoked salmon, miso mayo, edamame beans, Asian slaw, sushi rice", price: "£15.30" },
      { name: "Crispy Chilli Rice Bowl", description: "Crispy chilli oil (peanuts, almonds), avocado, miso mayo, edamame beans, sushi rice", price: "£12.50", badge: "VG" },
    ],
  },
  {
    title: "Buns",
    subtitle: "Served on a toasted bun",
    items: [
      { name: "The Works", description: "Fried egg, sausage, back bacon, mixed leaves, halloumi, beef tomato, jalapeño mayo", price: "£13.70" },
      { name: "Brekkie", description: "Fried egg, sausage, back bacon, mixed leaves, jalapeño mayo", price: "£11.00" },
      { name: "Halloumi", description: "Fried egg, halloumi, beef tomato, chilli jam, miso mayo, pickled onion", price: "£11.00", badge: "V" },
      { name: "Buttery Toast", description: "Toasted sourdough, butter, jam", price: "£5.40", badge: "V" },
    ],
  },
  {
    title: "Something Sweet",
    subtitle: "See counter for today's cakes",
    items: [
      { name: "Matcha Mascarpone Pancakes", description: "Matcha mascarpone, kumquat butter, blackcurrant, banana", price: "£10.50", badge: "V" },
      { name: "Banana Bread", description: "Blackcurrant compote, cashew crème, almond coconut yoghurt", price: "£8.20", badge: "VG" },
      { name: "Granola", description: "Oats, almonds, coconut yoghurt, pomegranate molasses", price: "£9.00", badge: "VG GF" },
    ],
  },
  {
    title: "Add to Any Dish",
    subtitle: "",
    items: [
      { name: "Free Range Egg", description: "", price: "£1.50" },
      { name: "Avocado", description: "", price: "£2.50", badge: "V" },
      { name: "Halloumi", description: "", price: "£3.50", badge: "V" },
      { name: "Back Bacon", description: "", price: "£3.00" },
      { name: "Sausage", description: "", price: "£3.00" },
      { name: "Hot-Smoked Salmon", description: "", price: "£4.00" },
    ],
  },
  {
    title: "Hot Drinks",
    subtitle: "Extract Coffee Roasters · Oat milk & decaf at no extra charge",
    items: [
      { name: "Filter", description: "", price: "£3.90" },
      { name: "Espresso", description: "", price: "£2.60 / £2.90" },
      { name: "Americano", description: "", price: "£3.70" },
      { name: "Flat White", description: "", price: "£3.90" },
      { name: "Latte", description: "", price: "£4.00" },
      { name: "Cappuccino", description: "", price: "£4.00" },
      { name: "Mocha", description: "", price: "£4.10" },
      { name: "Hot Chocolate", description: "", price: "£4.00 / £3.00" },
      { name: "Matcha", description: "", price: "£4.20" },
      { name: "Chai", description: "", price: "£4.00" },
      { name: "Tea", description: "Breakfast, Earl Grey, Green, Minty, Rooibos", price: "£3.30" },
      { name: "Extra Shot", description: "", price: "£0.80" },
    ],
  },
  {
    title: "Cold Drinks",
    subtitle: "",
    items: [
      { name: "Freshly Squeezed OJ", description: "", price: "£4.30" },
      { name: "LemonAid", description: "Mate or Passionfruit", price: "£3.90" },
    ],
  },
];

const allergenNote = "Full allergen information is available in venue. Please speak to a team member if you have any dietary requirements. (V) Vegetarian · (VG) Vegan · (GF) Gluten-free. A discretionary 10% service charge is added to all sit-in food orders.";

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
            <div className="mb-8 pb-4" style={{ borderBottom: "1px solid rgba(74,44,28,0.12)" }}>
              <h2
                className="text-3xl font-bold mb-1"
                style={{ fontFamily: "var(--font-playfair)", color: "var(--espresso)" }}
              >
                {section.title}
              </h2>
              {section.subtitle && (
                <p className="text-sm opacity-50" style={{ color: "var(--espresso)" }}>
                  {section.subtitle}
                </p>
              )}
            </div>

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
                          style={{ backgroundColor: "rgba(45,74,45,0.12)", color: "var(--forest)" }}
                        >
                          {item.badge}
                        </span>
                      )}
                    </div>
                    {item.description && (
                      <p className="text-sm leading-relaxed opacity-55" style={{ color: "var(--espresso)" }}>
                        {item.description}
                      </p>
                    )}
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
          </section>
        ))}

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
