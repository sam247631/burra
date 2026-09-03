import Image from "next/image";

const photos = [
  { src: "/images/latte-art.jpg", alt: "Latte art" },
  { src: "/images/croissants.jpg", alt: "Fresh croissants" },
  { src: "/images/barista-counter.jpg", alt: "Barista at work", pos: "top" },
  { src: "/images/food-bowl.jpg", alt: "Poke bowl" },
  { src: "/images/evening-dinner-food.jpg", alt: "Evening dining" },
  { src: "/images/north-street-opening.jpg", alt: "Burra North Street" },
];

function IgIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4.5" />
      <circle cx="17.5" cy="6.5" r="0.75" fill="currentColor" stroke="none" />
    </svg>
  );
}

export default function InstagramStrip() {
  return (
    <section className="py-20" style={{ backgroundColor: "var(--sand)" }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.35em] mb-1" style={{ color: "var(--caramel)" }}>
              Follow along
            </p>
            <h2 className="text-2xl font-bold" style={{ fontFamily: "var(--font-playfair)", color: "var(--espresso)" }}>
              @burrabristol
            </h2>
          </div>
          <a
            href="https://www.instagram.com/burrabristol/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-opacity hover:opacity-80"
            style={{ backgroundColor: "var(--espresso)", color: "var(--cream)" }}
          >
            <IgIcon size={16} />
            Follow on Instagram
          </a>
        </div>

        <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
          {photos.map((photo) => (
            <a
              key={photo.src}
              href="https://www.instagram.com/burrabristol/"
              target="_blank"
              rel="noopener noreferrer"
              className="relative aspect-square overflow-hidden rounded-xl group"
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                className={`object-cover object-${"pos" in photo && photo.pos ? photo.pos : "center"} transition-transform duration-500 group-hover:scale-105`}
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <IgIcon size={24} />
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
