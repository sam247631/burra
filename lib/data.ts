export type Product = {
  id: string;
  name: string;
  category: "coffee" | "clothing" | "voucher";
  price: number;
  description: string;
  image: string;
  imagePosition?: string;
  variants?: string[];
  badge?: string;
};

export type Event = {
  id: string;
  title: string;
  subtitle: string;
  location: string;
  date: string;
  time: string;
  price: number;
  description: string;
  image: string;
  capacity: number;
  tables: Table[];
  type: "dining" | "workshop" | "private";
  soldOut?: boolean;
  ticketsRemaining?: number;
  chef?: string;
  partner?: string;
  highlights?: string[];
  refundPolicy?: string;
  goingFast?: boolean;
};

export type Table = {
  id: string;
  label: string;
  seats: number;
  position: { x: number; y: number };
  available: boolean;
  shape?: "circle" | "wide";
  section?: "indoor" | "garden";
};

const LATTE_LOCATION = "Burra Redland, Lower Redland Road, Bristol BS6 6TB";
const LATTE_IMG = "/images/flat-white.jpg";
const LATTE_DESC = "Do you want to learn to make latte art like a professional? Join us for an exclusive Latte Art Masterclass at Burra Redland and elevate your coffee skills to a whole new level. This hands-on workshop will guide you through the techniques and tips needed to create beautiful latte art, from hearts to rosettas and beyond.";
const LATTE_HIGHLIGHTS = [
  "The science behind perfect milk frothing",
  "Step-by-step guidance on pouring latte art",
  "Tips and tricks from experienced baristas",
  "Personalised feedback and practice time",
  "6 tickets per session — intimate class sizes",
];

export type Review = {
  id: string;
  author: string;
  rating: number;
  text: string;
  platform: "Google" | "TripAdvisor";
  date: string;
};

export const products: Product[] = [
  // ── Coffee ──────────────────────────────────────────────────────────────────
  {
    id: "coffee-espresso-1kg",
    name: "House Espresso — 1kg",
    category: "coffee",
    price: 32.5,
    description:
      "Belgian chocolate, black cherry, treacle. Sourced from Minas Gerais, Brazil — natural processed Catuai, Mundo Novo and Bourbon. Rich, sweet and full-bodied, with a smooth balanced finish. Extracts beautifully on espresso and pairs seamlessly with milk.",
    image: "/images/burra-kilo.jpg",
    badge: "Best Value",
  },
  {
    id: "coffee-espresso-250g",
    name: "House Espresso — 250g",
    category: "coffee",
    price: 13.0,
    description:
      "Belgian chocolate, black cherry, treacle. Sourced from Minas Gerais, Brazil — natural processed Catuai, Mundo Novo and Bourbon. Rich, sweet and full-bodied, with a smooth balanced finish. Extracts beautifully on espresso and pairs seamlessly with milk.",
    image: "/images/burra-kilo.jpg",
    badge: "Best Seller",
  },
  // ── Merch ───────────────────────────────────────────────────────────────────
  {
    id: "tee-white",
    name: "Burra Tee — White",
    category: "clothing",
    price: 28.0,
    description:
      "100% combed cotton (marles 15% viscose) · 180gsm · Mid-weight · UPF50+ · Neck ribbing, side seamed, shoulder to shoulder tape · Double needle hems, preshrunk to minimise shrinkage.",
    image: "/images/merch-design-light.jpg",
    variants: ["XS", "S", "M", "L", "XL", "XXL"],
  },
  {
    id: "tee-black",
    name: "Burra Tee — Black",
    category: "clothing",
    price: 28.0,
    description:
      "100% combed cotton (marles 15% viscose) · 180gsm · Mid-weight · UPF50+ · Neck ribbing, side seamed, shoulder to shoulder tape · Double needle hems, preshrunk to minimise shrinkage.",
    image: "/images/merch-design-dark.jpg",
    variants: ["XS", "S", "M", "L", "XL", "XXL"],
  },
];

function generateTables(count: number): Table[] {
  const tables: Table[] = [];
  const cols = 4;
  for (let i = 0; i < count; i++) {
    const row = Math.floor(i / cols);
    const col = i % cols;
    tables.push({
      id: `T${i + 1}`,
      label: `Table ${i + 1}`,
      seats: i % 3 === 0 ? 4 : i % 3 === 1 ? 2 : 6,
      position: { x: col * 22 + 5, y: row * 22 + 8 },
      available: Math.random() > 0.3,
    });
  }
  return tables;
}

export const events: Event[] = [
  // ─── UPCOMING ───────────────────────────────────────────────────────────────
  {
    id: "autumn-tasting-redland-sept",
    title: "Autumn Tasting Evening",
    subtitle: "Burra & Corks — Redland",
    location: "Burra Redland, Lower Redland Road, Bristol BS6 6TB",
    date: "Friday 11 September 2026",
    time: "7:00pm — 11:00pm",
    price: 90,
    description:
      "Join Burra, your local Antipodean café, for a one-night-only dining experience where bold cooking and carefully selected wines come together on the plate. We've crafted a seasonal menu that draws on our culinary roots, delivering a playful fusion of Japanese technique through a modern Antipodean lens — fresh, inventive, and full of character. Corks of Bristol will be on hand to select wines to complement and contrast the flavours, from crisp whites to elegant reds and a few unexpected gems. A relaxed evening for those who love great food, exciting combinations, and a glass (or two) of something special.",
    image: "/images/evening-dinner-chef.jpg",
    capacity: 40,
    chef: "Toru Yanada — former Michelin-star chef",
    partner: "Corks of Bristol",
    highlights: [
      "Seasonal tasting menu — Japanese technique through an Antipodean lens",
      "Wine pairing for every course, curated by Corks of Bristol",
      "Hosted at Burra Redland — intimate, relaxed setting",
      "Full refunds available up to 14 days before the event",
    ],
    refundPolicy: "Full refunds available up to 14 days before the event.",
    tables: [
      // Bar seats
      { id: "Bar3", label: "Bar 3", seats: 1, position: { x: 8, y: 20 }, available: true,  section: "indoor" },
      { id: "Bar2", label: "Bar 2", seats: 1, position: { x: 8, y: 50 }, available: false, section: "indoor" },
      { id: "Bar1", label: "Bar 1", seats: 1, position: { x: 8, y: 80 }, available: true,  section: "indoor" },
      // Top row
      { id: "T3",  label: "Table 3",  seats: 2, position: { x: 26, y: 20 }, available: true,  section: "indoor" },
      { id: "T4",  label: "Table 4",  seats: 2, position: { x: 35, y: 20 }, available: true,  section: "indoor" },
      { id: "T5",  label: "Table 5",  seats: 2, position: { x: 45, y: 20 }, available: false, section: "indoor" },
      { id: "T6",  label: "Table 6",  seats: 4, position: { x: 55, y: 20 }, available: true,  section: "indoor" },
      // High tables
      { id: "H1",  label: "High Table 1", seats: 4, position: { x: 31, y: 50 }, available: true, shape: "wide", section: "indoor" },
      { id: "H2",  label: "High Table 2", seats: 4, position: { x: 46, y: 50 }, available: true, shape: "wide", section: "indoor" },
      // Bottom row
      { id: "T7",  label: "Table 7",  seats: 2, position: { x: 26, y: 80 }, available: true,  section: "indoor" },
      { id: "T8",  label: "Table 8",  seats: 4, position: { x: 35, y: 80 }, available: true,  section: "indoor" },
      { id: "T9",  label: "Table 9",  seats: 2, position: { x: 44, y: 80 }, available: false, section: "indoor" },
      { id: "T10", label: "Table 10", seats: 2, position: { x: 55, y: 80 }, available: true,  section: "indoor" },
      // Garden top row
      { id: "G1", label: "Garden 1", seats: 2, position: { x: 71, y: 20 }, available: true,  section: "garden" },
      { id: "G2", label: "Garden 2", seats: 2, position: { x: 79, y: 20 }, available: true,  section: "garden" },
      { id: "G3", label: "Garden 3", seats: 2, position: { x: 87, y: 20 }, available: false, section: "garden" },
      { id: "G4", label: "Garden 4", seats: 2, position: { x: 95, y: 20 }, available: true,  section: "garden" },
      // Garden bottom row
      { id: "G5", label: "Garden 5", seats: 2, position: { x: 75, y: 52 }, available: true,  section: "garden" },
      { id: "G6", label: "Garden 6", seats: 2, position: { x: 87, y: 52 }, available: true,  section: "garden" },
    ],
    type: "dining",
    soldOut: false,
  },

  // ─── SOLD OUT / PAST ────────────────────────────────────────────────────────
  {
    id: "summer-tasting-redland-july",
    title: "Summer Tasting Evening",
    subtitle: "Burra & Corks — Redland",
    location: "Burra Redland, Lower Redland Road, Bristol BS6 6TB",
    date: "Friday 3 July 2026",
    time: "7:00pm — 11:00pm",
    price: 90,
    description:
      "A summer celebration of bold seasonal cooking and expertly selected wines. Chef Toru Yanada brought his Michelin-trained technique to a menu inspired by the best of the British summer harvest, paired by Corks of Bristol.",
    image: "/images/evening-dinner-champagne.jpg",
    capacity: 40,
    tables: generateTables(10),
    type: "dining",
    soldOut: true,
  },
  {
    id: "bbq-bash-june",
    title: "Burra BBQ Bash",
    subtitle: "Summer Garden Party — North Street",
    location: "Burra North Street, 223 North Street, Bristol BS3 1JJ",
    date: "Saturday 27 June 2026",
    time: "10:00am — 10:00pm",
    price: 0,
    description:
      "A full day summer garden party at Burra North Street — live music, BBQ food fresh off the grill, cold drinks and good people. Free entry, all welcome.",
    image: "/images/barista-counter.jpg",
    capacity: 200,
    tables: generateTables(2),
    type: "workshop",
    soldOut: true,
  },
  {
    id: "spring-tasting-northstreet-may",
    title: "Spring Tasting Evening",
    subtitle: "Burra North Street x Corks",
    location: "Burra North Street, 223 North Street, Bristol BS3 1JJ",
    date: "Friday 9 May 2025",
    time: "7:00pm — 11:00pm",
    price: 90,
    description:
      "An intimate spring evening at Burra North Street — a seasonal menu paired with wines hand-picked by Corks of Bristol. A warm, convivial night in the heart of Bedminster.",
    image: "/images/fine-dining-plate.jpg",
    capacity: 40,
    tables: generateTables(10),
    type: "dining",
    soldOut: true,
  },
  // ─── LATTE ART MASTERCLASSES — PAST ─────────────────────────────────────────
  { id: "latte-art-oct-2024",      title: "Latte Art Masterclass",    subtitle: "October 2024",    date: "Monday 7 October 2024",   time: "5:00pm — 7:00pm", soldOut: true,  ticketsRemaining: 0, goingFast: false, location: LATTE_LOCATION, price: 50, description: LATTE_DESC, image: LATTE_IMG, capacity: 6, tables: generateTables(2), type: "workshop", highlights: LATTE_HIGHLIGHTS },
  { id: "latte-art-mar-2025",      title: "Latte Art Masterclass",    subtitle: "March 2025",      date: "Monday 3 March 2025",     time: "5:00pm — 7:00pm", soldOut: true,  ticketsRemaining: 0, goingFast: false, location: LATTE_LOCATION, price: 50, description: LATTE_DESC, image: LATTE_IMG, capacity: 6, tables: generateTables(2), type: "workshop", highlights: LATTE_HIGHLIGHTS },
  { id: "latte-art-feb-2026",      title: "Latte Art Masterclass",    subtitle: "February 2026",   date: "Monday 9 February 2026",  time: "5:00pm — 7:00pm", soldOut: true,  ticketsRemaining: 0, goingFast: false, location: LATTE_LOCATION, price: 50, description: LATTE_DESC, image: LATTE_IMG, capacity: 6, tables: generateTables(2), type: "workshop", highlights: LATTE_HIGHLIGHTS },
  { id: "latte-art-mar-2026",      title: "Latte Art Masterclass",    subtitle: "March 2026",      date: "Monday 9 March 2026",     time: "5:00pm — 7:00pm", soldOut: true,  ticketsRemaining: 0, goingFast: false, location: LATTE_LOCATION, price: 50, description: LATTE_DESC, image: LATTE_IMG, capacity: 6, tables: generateTables(2), type: "workshop", highlights: LATTE_HIGHLIGHTS },
  { id: "latte-art-mar-ii-2026",   title: "Latte Art Masterclass II", subtitle: "March 2026",      date: "Monday 23 March 2026",    time: "5:00pm — 7:00pm", soldOut: true,  ticketsRemaining: 0, goingFast: false, location: LATTE_LOCATION, price: 50, description: LATTE_DESC, image: LATTE_IMG, capacity: 6, tables: generateTables(2), type: "workshop", highlights: LATTE_HIGHLIGHTS },
  { id: "latte-art-jul-2026",      title: "Latte Art Masterclass",    subtitle: "July 2026",       date: "Monday 6 July 2026",      time: "5:00pm — 7:00pm", soldOut: true,  ticketsRemaining: 0, goingFast: false, location: LATTE_LOCATION, price: 50, description: LATTE_DESC, image: LATTE_IMG, capacity: 6, tables: generateTables(2), type: "workshop", highlights: LATTE_HIGHLIGHTS },

  // ─── LATTE ART MASTERCLASSES — UPCOMING ──────────────────────────────────────
  { id: "latte-art-sept-2026",     title: "Latte Art Masterclass",     subtitle: "September 2026",  date: "Monday 7 September 2026",     time: "5:00pm — 7:00pm", soldOut: true,  ticketsRemaining: 0, goingFast: false, location: LATTE_LOCATION, price: 50, description: LATTE_DESC, image: LATTE_IMG, capacity: 6, tables: generateTables(2), type: "workshop", highlights: LATTE_HIGHLIGHTS },
  { id: "latte-art-sept-ii-2026",  title: "Latte Art Masterclass II",  subtitle: "September 2026",  date: "Wednesday 23 September 2026", time: "5:00pm — 7:00pm", soldOut: false, ticketsRemaining: 2, goingFast: true,  location: LATTE_LOCATION, price: 50, description: LATTE_DESC, image: LATTE_IMG, capacity: 6, tables: generateTables(2), type: "workshop", highlights: LATTE_HIGHLIGHTS },
  { id: "latte-art-oct-2026",      title: "Latte Art Masterclass",     subtitle: "October 2026",    date: "Monday 12 October 2026",      time: "5:00pm — 7:00pm", soldOut: false, ticketsRemaining: 2, goingFast: true,  location: LATTE_LOCATION, price: 50, description: LATTE_DESC, image: LATTE_IMG, capacity: 6, tables: generateTables(2), type: "workshop", highlights: LATTE_HIGHLIGHTS },
  { id: "latte-art-oct-ii-2026",   title: "Latte Art Masterclass II",  subtitle: "October 2026",    date: "Wednesday 28 October 2026",   time: "5:00pm — 7:00pm", soldOut: false, ticketsRemaining: 5, goingFast: false, location: LATTE_LOCATION, price: 50, description: LATTE_DESC, image: LATTE_IMG, capacity: 6, tables: generateTables(2), type: "workshop", highlights: LATTE_HIGHLIGHTS },
  { id: "latte-art-nov-2026",      title: "Latte Art Masterclass",     subtitle: "November 2026",   date: "Monday 9 November 2026",      time: "5:00pm — 7:00pm", soldOut: false, ticketsRemaining: 6, goingFast: false, location: LATTE_LOCATION, price: 50, description: LATTE_DESC, image: LATTE_IMG, capacity: 6, tables: generateTables(2), type: "workshop", highlights: LATTE_HIGHLIGHTS },
  { id: "latte-art-nov-ii-2026",   title: "Latte Art Masterclass II",  subtitle: "November 2026",   date: "Wednesday 25 November 2026",  time: "5:00pm — 7:00pm", soldOut: false, ticketsRemaining: 4, goingFast: false, location: LATTE_LOCATION, price: 50, description: LATTE_DESC, image: LATTE_IMG, capacity: 6, tables: generateTables(2), type: "workshop", highlights: LATTE_HIGHLIGHTS },
  { id: "latte-art-dec-2026",      title: "Latte Art Masterclass",     subtitle: "December 2026",   date: "Monday 7 December 2026",      time: "5:00pm — 7:00pm", soldOut: false, ticketsRemaining: 3, goingFast: true,  location: LATTE_LOCATION, price: 50, description: LATTE_DESC, image: LATTE_IMG, capacity: 6, tables: generateTables(2), type: "workshop", highlights: LATTE_HIGHLIGHTS },
  { id: "latte-art-dec-ii-2026",   title: "Latte Art Masterclass II",  subtitle: "December 2026",   date: "Wednesday 16 December 2026",  time: "5:00pm — 7:00pm", soldOut: false, ticketsRemaining: 6, goingFast: false, location: LATTE_LOCATION, price: 50, description: LATTE_DESC, image: LATTE_IMG, capacity: 6, tables: generateTables(2), type: "workshop", highlights: LATTE_HIGHLIGHTS },
  { id: "latte-art-jan-2027",      title: "Latte Art Masterclass",     subtitle: "January 2027",    date: "Wednesday 6 January 2027",    time: "5:00pm — 7:00pm", soldOut: false, ticketsRemaining: 6, goingFast: false, location: LATTE_LOCATION, price: 50, description: LATTE_DESC, image: LATTE_IMG, capacity: 6, tables: generateTables(2), type: "workshop", highlights: LATTE_HIGHLIGHTS },
  { id: "latte-art-jan-ii-2027",   title: "Latte Art Masterclass II",  subtitle: "January 2027",    date: "Monday 11 January 2027",      time: "5:00pm — 7:00pm", soldOut: false, ticketsRemaining: 6, goingFast: false, location: LATTE_LOCATION, price: 50, description: LATTE_DESC, image: LATTE_IMG, capacity: 6, tables: generateTables(2), type: "workshop", highlights: LATTE_HIGHLIGHTS },
  { id: "latte-art-jan-iii-2027",  title: "Latte Art Masterclass III", subtitle: "January 2027",    date: "Wednesday 20 January 2027",   time: "5:00pm — 7:00pm", soldOut: false, ticketsRemaining: 6, goingFast: false, location: LATTE_LOCATION, price: 50, description: LATTE_DESC, image: LATTE_IMG, capacity: 6, tables: generateTables(2), type: "workshop", highlights: LATTE_HIGHLIGHTS },
  { id: "latte-art-jan-iv-2027",   title: "Latte Art Masterclass IV",  subtitle: "January 2027",    date: "Monday 25 January 2027",      time: "5:00pm — 7:00pm", soldOut: false, ticketsRemaining: 6, goingFast: false, location: LATTE_LOCATION, price: 50, description: LATTE_DESC, image: LATTE_IMG, capacity: 6, tables: generateTables(2), type: "workshop", highlights: LATTE_HIGHLIGHTS },
  { id: "latte-art-feb-2027",      title: "Latte Art Masterclass",     subtitle: "February 2027",   date: "Monday 8 February 2027",      time: "5:00pm — 7:00pm", soldOut: false, ticketsRemaining: 6, goingFast: false, location: LATTE_LOCATION, price: 50, description: LATTE_DESC, image: LATTE_IMG, capacity: 6, tables: generateTables(2), type: "workshop", highlights: LATTE_HIGHLIGHTS },
  { id: "latte-art-feb-ii-2027",   title: "Latte Art Masterclass II",  subtitle: "February 2027",   date: "Wednesday 17 February 2027",  time: "5:00pm — 7:00pm", soldOut: false, ticketsRemaining: 6, goingFast: false, location: LATTE_LOCATION, price: 50, description: LATTE_DESC, image: LATTE_IMG, capacity: 6, tables: generateTables(2), type: "workshop", highlights: LATTE_HIGHLIGHTS },
  { id: "latte-art-feb-iii-2027",  title: "Latte Art Masterclass III", subtitle: "February 2027",   date: "Monday 22 February 2027",     time: "5:00pm — 7:00pm", soldOut: false, ticketsRemaining: 6, goingFast: false, location: LATTE_LOCATION, price: 50, description: LATTE_DESC, image: LATTE_IMG, capacity: 6, tables: generateTables(2), type: "workshop", highlights: LATTE_HIGHLIGHTS },
  { id: "latte-art-mar-2027",      title: "Latte Art Masterclass",     subtitle: "March 2027",      date: "Monday 8 March 2027",         time: "5:00pm — 7:00pm", soldOut: false, ticketsRemaining: 6, goingFast: false, location: LATTE_LOCATION, price: 50, description: LATTE_DESC, image: LATTE_IMG, capacity: 6, tables: generateTables(2), type: "workshop", highlights: LATTE_HIGHLIGHTS },
  { id: "latte-art-mar-ii-2027",   title: "Latte Art Masterclass II",  subtitle: "March 2027",      date: "Wednesday 17 March 2027",     time: "5:00pm — 7:00pm", soldOut: false, ticketsRemaining: 6, goingFast: false, location: LATTE_LOCATION, price: 50, description: LATTE_DESC, image: LATTE_IMG, capacity: 6, tables: generateTables(2), type: "workshop", highlights: LATTE_HIGHLIGHTS },
  { id: "latte-art-apr-2027",      title: "Latte Art Masterclass",     subtitle: "April 2027",      date: "Monday 5 April 2027",         time: "5:00pm — 7:00pm", soldOut: false, ticketsRemaining: 6, goingFast: false, location: LATTE_LOCATION, price: 50, description: LATTE_DESC, image: LATTE_IMG, capacity: 6, tables: generateTables(2), type: "workshop", highlights: LATTE_HIGHLIGHTS },
  { id: "latte-art-apr-ii-2027",   title: "Latte Art Masterclass II",  subtitle: "April 2027",      date: "Wednesday 14 April 2027",     time: "5:00pm — 7:00pm", soldOut: false, ticketsRemaining: 6, goingFast: false, location: LATTE_LOCATION, price: 50, description: LATTE_DESC, image: LATTE_IMG, capacity: 6, tables: generateTables(2), type: "workshop", highlights: LATTE_HIGHLIGHTS },
];

export const reviews: Review[] = [
  {
    id: "r1",
    author: "Sophie M.",
    rating: 5,
    text: "Genuinely the best café in Bristol. The coffee is exceptional, the food is beautiful and the staff are so warm. It's become our weekly ritual.",
    platform: "Google",
    date: "August 2025",
  },
  {
    id: "r2",
    author: "James T.",
    rating: 5,
    text: "Whipped feta, avo and poached eggs on toast with pistachio zaatar — life changing. Generous portions, beautiful space, perfect coffee.",
    platform: "Google",
    date: "July 2025",
  },
  {
    id: "r3",
    author: "Priya K.",
    rating: 5,
    text: "Won UK's Best Café for good reason. The oat hot chocolate alone is worth the trip. Always packed but worth every minute of the wait.",
    platform: "Google",
    date: "June 2025",
  },
  {
    id: "r4",
    author: "Tom A.",
    rating: 5,
    text: "Burra Clifton has become my office. Incredible flat whites, fast WiFi, and the sweetcorn fritters are unreal. Highly recommend.",
    platform: "Google",
    date: "August 2025",
  },
  {
    id: "r5",
    author: "Emma R.",
    rating: 5,
    text: "Attended their supper club event — absolutely stunning food, wine pairings were spot on and the atmosphere was electric. Book fast, sells out.",
    platform: "Google",
    date: "May 2025",
  },
  {
    id: "r6",
    author: "Luca D.",
    rating: 5,
    text: "French toast here is legendary. The sourcing ethos really comes through in the quality — you can taste the care. Best brunch spot in Bristol.",
    platform: "TripAdvisor",
    date: "July 2025",
  },
  {
    id: "r7",
    author: "Harriet B.",
    rating: 5,
    text: "The latte art class was incredible fun and incredibly informative. Our barista was so talented and patient. Left with a huge smile and great coffee.",
    platform: "Google",
    date: "June 2025",
  },
  {
    id: "r8",
    author: "Dan W.",
    rating: 5,
    text: "Salmon scramble and a flat white — the perfect combination. Burra North Street is a gem. Ethical, local, delicious. What more could you want?",
    platform: "Google",
    date: "August 2025",
  },
];

export const locations = [
  {
    name: "Redland",
    address: "7 Lower Redland Road",
    city: "Bristol, BS6 6TB",
    email: "redland@burrabristol.co.uk",
    hours: { weekday: "Mon–Sat: 8am – 4pm", weekend: "Sun: 9am – 4pm" },
    mapEmbed:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2484.0!2d-2.6109!3d51.4706!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48718e1a4d8ad3b1%3A0x1!2sBurra%20Redland!5e0!3m2!1sen!2suk!4v1700000000000",
  },
  {
    name: "North Street",
    address: "223 North Street",
    city: "Bristol, BS3 1JJ",
    email: "northstreet@burrabristol.co.uk",
    hours: { weekday: "Mon–Sat: 8am – 4pm", weekend: "Sun: 9am – 4pm" },
    mapEmbed:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2484.0!2d-2.6100!3d51.4450!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48718df0b3e5ff15%3A0x2!2sBurra%20North%20Street!5e0!3m2!1sen!2suk!4v1700000000001",
  },
  {
    name: "Clifton Village",
    address: "19 The Mall, Clifton",
    city: "Bristol, BS8 4JG",
    email: "clifton@burrabristol.co.uk",
    hours: { weekday: "Mon–Sat: 8am – 4pm", weekend: "Sun: 9am – 4pm" },
    mapEmbed:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2484.0!2d-2.6240!3d51.4562!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48718e8e90f8e8b3%3A0x3!2sBurra%20Clifton!5e0!3m2!1sen!2suk!4v1700000000002",
  },
];
