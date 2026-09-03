import Image from "next/image";

const values = [
  { title: "We're in the business of making people happy", body: "Every interaction, every cup, every plate — it all starts with people. That's the centre of everything we do." },
  { title: "Quality of service above all. Every time.", body: "We hold ourselves to the highest standards — not because we're told to, but because it's the only way we know how to operate." },
  { title: "Hard work is fun — and rewarded", body: "Our team works hard and genuinely loves what they do. We invest in the people who invest in Burra." },
  { title: "Break the boundaries; creativity counts", body: "We're always looking for new flavours, new partnerships, new ways to surprise you. Standing still is not our style." },
  { title: "We exist to serve our community", body: "Three cafés in Bristol, rooted in the neighbourhoods they serve. Local suppliers. Local faces. Local love." },
  { title: "Honesty returns loyalty", body: "We're transparent about where our food comes from, how we run our business, and who we partner with. Trust is earned." },
];

export default function OurStoryPage() {
  return (
    <div className="pt-24 pb-24 min-h-screen">
      {/* Hero */}
      <div className="relative h-80 md:h-[500px] w-full">
        <Image
          src="/images/our-story-banner.jpg"
          alt="Burra Bristol story"
          fill
          priority
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/30 to-black/70" />
        <div className="absolute inset-0 flex items-center justify-center text-center px-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-white/60 mb-4">
              Est. February 2021
            </p>
            <h1
              className="text-5xl md:text-7xl font-bold text-white"
              style={{ fontFamily: "var(--font-playfair)", lineHeight: 1.1 }}
            >
              Our Story
            </h1>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6">
        {/* Origin */}
        <section className="py-20 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] mb-4" style={{ color: "var(--caramel)" }}>
              The Beginning
            </p>
            <h2
              className="text-4xl font-bold mb-6"
              style={{ fontFamily: "var(--font-playfair)", color: "var(--espresso)" }}
            >
              Born on the pitch, built in Bristol
            </h2>
            <p className="text-base opacity-70 leading-relaxed mb-4">
              Burra was founded in February 2021 by Jake and Adele Heenan alongside Luke and Madison Morahan — teammates at Bristol Bears RFC. With a love for Antipodean café culture and a deep belief in the power of community, they set out to build something Bristol had been missing.
            </p>
            <p className="text-base opacity-70 leading-relaxed mb-4">
              The name &ldquo;Burra&rdquo; is Australian slang — a nod to the founders&apos; roots and a reminder that great things happen when different worlds come together.
            </p>
            <p className="text-base opacity-70 leading-relaxed">
              Starting with a single location in Redland, the Burra family has grown to three cafés across Bristol, each one rooted in the neighbourhood it serves.
            </p>
          </div>
          <div className="relative h-80 rounded-2xl overflow-hidden">
            <Image
              src="/images/north-street-chef.jpg"
              alt="Burra team"
              fill
              className="object-cover object-top"
            />
          </div>
        </section>

        {/* Sourcing */}
        <section className="py-16 border-t" style={{ borderColor: "var(--sand)" }}>
          <div className="text-center mb-12">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] mb-4" style={{ color: "var(--caramel)" }}>
              How We Source
            </p>
            <h2
              className="text-4xl font-bold"
              style={{ fontFamily: "var(--font-playfair)", color: "var(--espresso)" }}
            >
              25 miles and counting
            </h2>
            <p className="text-base opacity-60 mt-4 max-w-xl mx-auto">
              Every ingredient on our menu is sourced within 25 miles of Bristol. That&apos;s not a marketing line — it&apos;s a commitment we renew every day.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: "Extract Coffee Roasters", role: "Our coffee partner", loc: "St Werburghs, Bristol", img: "/images/extract-logo.svg", isLogo: true },
              { name: "Burra Kitchen", role: "Pastries & baked goods", loc: "Baked in house, Bristol", img: "/images/croissants.jpg" },
              { name: "Hobbs Bakery", role: "Bread & baked goods", loc: "Worcestershire", img: "/images/cookies.jpg" },
            ].map(({ name, role, loc, img, isLogo }) => (
              <div key={name} className="rounded-2xl overflow-hidden" style={{ border: "1px solid rgba(74,44,28,0.1)" }}>
                <div className="relative h-40 flex items-center justify-center" style={isLogo ? { backgroundColor: "var(--sand)", padding: "24px" } : {}}>
                  <Image src={img} alt={name} fill className={isLogo ? "object-contain p-6" : "object-cover"} />
                </div>
                <div className="p-5">
                  <p className="font-bold text-sm" style={{ color: "var(--espresso)" }}>{name}</p>
                  <p className="text-xs opacity-60 mt-0.5" style={{ color: "var(--espresso)" }}>{role}</p>
                  <p className="text-xs opacity-40 mt-1" style={{ color: "var(--espresso)" }}>{loc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Awards */}
        <section className="py-16 border-t" style={{ borderColor: "var(--sand)" }}>
          <div
            className="rounded-3xl p-10 text-center"
            style={{ backgroundColor: "var(--espresso)" }}
          >
            <p className="text-xs font-semibold uppercase tracking-[0.35em] mb-4 opacity-50 text-white">
              Recognition
            </p>
            <h2
              className="text-3xl font-bold text-white mb-8"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Awards &amp; accolades
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
              {[
                { award: "UK's Best Café", org: "Small Business Awards", year: "2024" },
                { award: "Café of the Year", org: "Bristol Life Awards", year: "2022" },
              ].map(({ award, org, year }) => (
                <div
                  key={award}
                  className="rounded-2xl p-6 text-center"
                  style={{ backgroundColor: "rgba(247,243,238,0.06)", border: "1px solid rgba(247,243,238,0.1)" }}
                >
                  <p className="text-3xl mb-3">🏆</p>
                  <p className="text-xl font-bold text-white mb-1" style={{ fontFamily: "var(--font-playfair)" }}>{award}</p>
                  <p className="text-sm text-white/50">{org}</p>
                  <p className="text-xs text-white/30 mt-1">{year}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-16 border-t" style={{ borderColor: "var(--sand)" }}>
          <div className="text-center mb-12">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] mb-4" style={{ color: "var(--caramel)" }}>
              How We Operate
            </p>
            <h2
              className="text-4xl font-bold"
              style={{ fontFamily: "var(--font-playfair)", color: "var(--espresso)" }}
            >
              The Burra Way
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {values.map(({ title, body }, i) => (
              <div
                key={i}
                className="rounded-2xl p-6"
                style={{ backgroundColor: "var(--sand)" }}
              >
                <p className="text-xs font-bold uppercase tracking-widest mb-2 opacity-30" style={{ color: "var(--espresso)" }}>
                  0{i + 1}
                </p>
                <h3 className="font-bold text-base mb-2 leading-snug" style={{ fontFamily: "var(--font-playfair)", color: "var(--espresso)" }}>
                  {title}
                </h3>
                <p className="text-sm opacity-60 leading-relaxed" style={{ color: "var(--espresso)" }}>
                  {body}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
