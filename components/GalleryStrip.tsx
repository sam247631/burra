import Image from "next/image";

type Img = { src: string; pos?: string };

const IMGS_A: Img[] = [
  { src: "/images/north-street-opening.jpg" },
  { src: "/images/RT1_4125.jpg" },
  { src: "/images/croissants.jpg" },
  { src: "/images/baristas.jpg", pos: "top" },
  { src: "/images/burra-clifton.jpg" },
  { src: "/images/evening-dinner-champagne.jpg" },
];

const IMGS_B: Img[] = [
  { src: "/images/north-street-chef.jpg", pos: "top" },
  { src: "/images/latte-pour.jpg" },
  { src: "/images/cookies.jpg" },
  { src: "/images/evening-dinner-food.jpg" },
  { src: "/images/fine-dining-plate.jpg" },
  { src: "/images/latte-art.jpg" },
];

const ROW_A = [...IMGS_A, ...IMGS_A];
const ROW_B = [...IMGS_B, ...IMGS_B];

function Strip({ srcs, reverse }: { srcs: Img[]; reverse?: boolean }) {
  return (
    <div className="overflow-hidden marquee-pause">
      <div
        className={`flex ${reverse ? "marquee-reverse" : "marquee-track"}`}
        style={{ width: "max-content" }}
      >
        {srcs.map((img, i) => (
          <div key={i} className="flex-shrink-0 pr-3">
            <div className="relative w-[300px] h-[200px] rounded-xl overflow-hidden">
              <Image
                src={img.src}
                alt=""
                fill
                className={`object-cover object-${img.pos ?? "center"}`}
                sizes="300px"
                draggable={false}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function GalleryStrip() {
  return (
    <div
      className="py-10 overflow-hidden select-none"
      style={{ backgroundColor: "var(--espresso)" }}
      aria-hidden
    >
      <Strip srcs={ROW_A} />
      <div className="mt-3">
        <Strip srcs={ROW_B} reverse />
      </div>
    </div>
  );
}
