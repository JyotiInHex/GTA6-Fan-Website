"use client";

const items = [
  "GTA VI", "Vice City", "Leonida", "Jason Duval", "Lucia Caminos",
  "November 19 2026", "Rockstar Games", "PS5 & Xbox", "Only in Leonida",
  "GTA VI", "Vice City", "Leonida", "Jason Duval", "Lucia Caminos",
  "November 19 2026", "Rockstar Games", "PS5 & Xbox", "Only in Leonida",
];

export default function MarqueeSection() {
  return (
    <div className="py-6 overflow-hidden border-y border-white/5 relative">
      {/* Top row — left to right */}
      <div className="marquee-inner gap-12 mb-3">
        {items.map((item, i) => (
          <span
            key={i}
            className={`text-label text-sm whitespace-nowrap px-6 ${
              i % 3 === 0 ? "text-gta-orange" : i % 3 === 1 ? "text-gta-pink" : "text-white/20"
            }`}
          >
            {item}
            <span className="text-gta-orange/40 mx-4">✦</span>
          </span>
        ))}
        {items.map((item, i) => (
          <span
            key={`dup-${i}`}
            className={`text-label text-sm whitespace-nowrap px-6 ${
              i % 3 === 0 ? "text-gta-orange" : i % 3 === 1 ? "text-gta-pink" : "text-white/20"
            }`}
          >
            {item}
            <span className="text-gta-orange/40 mx-4">✦</span>
          </span>
        ))}
      </div>

      {/* Bottom row — right to left */}
      <div
        className="flex gap-12"
        style={{
          animation: "marquee 25s linear infinite reverse",
          display: "flex",
          width: "max-content",
        }}
      >
        {items.map((item, i) => (
          <span
            key={i}
            className={`text-label text-sm whitespace-nowrap px-6 ${
              i % 3 === 0 ? "text-gta-cyan" : i % 3 === 1 ? "text-white/20" : "text-gta-yellow/60"
            }`}
          >
            {item}
            <span className="text-gta-cyan/40 mx-4">◆</span>
          </span>
        ))}
        {items.map((item, i) => (
          <span
            key={`dup2-${i}`}
            className={`text-label text-sm whitespace-nowrap px-6 ${
              i % 3 === 0 ? "text-gta-cyan" : i % 3 === 1 ? "text-white/20" : "text-gta-yellow/60"
            }`}
          >
            {item}
            <span className="text-gta-cyan/40 mx-4">◆</span>
          </span>
        ))}
      </div>
    </div>
  );
}
