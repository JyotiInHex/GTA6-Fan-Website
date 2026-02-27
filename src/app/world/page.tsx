"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Footer from "@/components/Footer";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const locations = [
  {
    id: "vice-city",
    name: "Vice City",
    subtitle: "The Crown Jewel of Leonida",
    description:
      "The neon-lit metropolis at the heart of Leonida. Sun-soaked beaches give way to dazzling nightlife, opulent mansions, and shadowy back alleys. A city where dreams and danger dance side by side.",
    details: [
      "Iconic beachfront boardwalk",
      "High-end luxury district",
      "Underground crime network",
      "Strip clubs & recording studios",
      "Ocean Drive neon corridor",
    ],
    image:
      "https://www.rockstargames.com/VI/_next/image?url=%2FVI%2F_next%2Fstatic%2Fmedia%2FVice_City_01.332891cf.jpg&w=1366&q=75",
    color: "#FF6B00",
    tag: "Main City",
    size: "Massive",
    vibe: "Neon & Crime",
  },
  {
    id: "leonida-keys",
    name: "Leonida Keys",
    subtitle: "Paradise at the Edge of the World",
    description:
      "A chain of sun-drenched islands stretching into the Atlantic. Here, drug runners blend with beachcombers, and every sunset hides a transaction. The birthplace of Jason's story.",
    details: [
      "Boat yards & smuggler coves",
      "Tropical island chains",
      "Fishing villages",
      "Coast Guard activity",
      "Hidden airstrips",
    ],
    image:
      "https://www.rockstargames.com/VI/_next/image?url=%2FVI%2F_next%2Fstatic%2Fmedia%2FLeonida_Keys_05.cf35e824.jpg&w=1366&q=75",
    color: "#00E5FF",
    tag: "Island Chain",
    size: "Large",
    vibe: "Tropical & Lawless",
  },
  {
    id: "grassrivers",
    name: "Grassrivers",
    subtitle: "Where the Wild Things Are",
    description:
      "The vast, untamed interior of Leonida. Swamps, rivers, and forests stretch for miles. Law enforcement is sparse, but danger is everywhere. A world unto itself.",
    details: [
      "Expansive wetlands",
      "Rural communities",
      "Wildlife sanctuaries",
      "Hidden compounds",
      "River networks",
    ],
    image:
      "https://www.rockstargames.com/VI/_next/image?url=%2FVI%2F_next%2Fstatic%2Fmedia%2FGrassrivers_01.3abae122.jpg&w=1366&q=75",
    color: "#22C55E",
    tag: "Wilderness",
    size: "Vast",
    vibe: "Wild & Dangerous",
  },
  {
    id: "port-gellhorn",
    name: "Port Gellhorn",
    subtitle: "Where Fortunes Change Hands",
    description:
      "The industrial heart of Leonida's coastal trade. Shipping containers, warehouses, and docks teeming with activity — legal and otherwise. Everyone here has something to move.",
    details: [
      "Shipping container districts",
      "Industrial warehouses",
      "Underground auctions",
      "Dock worker unions",
      "Smuggling routes",
    ],
    image:
      "https://www.rockstargames.com/VI/_next/image?url=%2FVI%2F_next%2Fstatic%2Fmedia%2FPort_Gellhorn_04.580f17d9.jpg&w=1366&q=75",
    color: "#FF2D6B",
    tag: "Port District",
    size: "Large",
    vibe: "Industrial & Corrupt",
  },
  {
    id: "ambrosia",
    name: "Ambrosia",
    subtitle: "High Stakes, Higher Rewards",
    description:
      "An upscale district where old money meets new crime. Luxury hotels, private clubs, and casino operations make this Leonida's most profitable — and most dangerous — neighborhood.",
    details: [
      "Luxury hotel casinos",
      "Private members clubs",
      "Art district",
      "Penthouse apartments",
      "High-end heist targets",
    ],
    image:
      "https://www.rockstargames.com/VI/_next/image?url=%2FVI%2F_next%2Fstatic%2Fmedia%2FAmbrosia_01.0c8fad88.jpg&w=1366&q=75",
    color: "#7B2FBE",
    tag: "Luxury District",
    size: "Medium",
    vibe: "Opulent & Deadly",
  },
  {
    id: "mount-kalaga",
    name: "Mount Kalaga",
    subtitle: "Above It All",
    description:
      "The highest point in Leonida offers breathtaking views — and the most isolated criminal operations in the state. What goes up here, stays up here.",
    details: [
      "Mountain resort area",
      "Off-grid compounds",
      "Scenic overlooks",
      "Helicopter landing zones",
      "Mountain roads",
    ],
    image:
      "https://www.rockstargames.com/VI/_next/image?url=%2FVI%2F_next%2Fstatic%2Fmedia%2FMount_Kalaga_National_Park_04.e5eec73f.jpg&w=1366&q=75",
    color: "#FFD600",
    tag: "Mountain",
    size: "Medium",
    vibe: "Remote & Isolated",
  },
];

function LocationCard({
  loc,
  index,
  onSelect,
}: {
  loc: typeof locations[0];
  index: number;
  onSelect: (l: typeof locations[0]) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      layout
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: (index % 3) * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="group relative overflow-hidden cursor-pointer"
      onClick={() => onSelect(loc)}
      data-cursor-hover="true"
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={loc.image}
          alt={loc.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          unoptimized
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gta-darker via-gta-darker/30 to-transparent" />
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-25 transition-opacity duration-500"
          style={{ background: `radial-gradient(circle at bottom, ${loc.color}, transparent 70%)` }}
        />
      </div>

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-5">
        <div className="flex items-center justify-between mb-2">
          <span
            className="text-label text-xs px-2 py-0.5"
            style={{
              color: loc.color,
              backgroundColor: `${loc.color}20`,
              border: `1px solid ${loc.color}40`,
            }}
          >
            {loc.tag}
          </span>
          <span className="text-label text-xs text-white/30">{loc.size}</span>
        </div>
        <h3
          className="text-3xl text-white"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {loc.name}
        </h3>
        <p className="text-xs text-white/40 mt-1">{loc.subtitle}</p>
        <div className="overflow-hidden h-0 group-hover:h-6 transition-all duration-400 mt-2">
          <span className="text-label text-xs" style={{ color: loc.color }}>
            Explore Location →
          </span>
        </div>
      </div>

      {/* Border on hover */}
      <div
        className="absolute inset-0 border-0 group-hover:border transition-all duration-400 pointer-events-none"
        style={{ borderColor: `${loc.color}50` }}
      />

      {/* Vibe tag */}
      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-400">
        <span className="text-label text-xs text-white/60 glass px-2 py-1">{loc.vibe}</span>
      </div>
    </motion.div>
  );
}

function LocationModal({
  loc,
  onClose,
}: {
  loc: typeof locations[0];
  onClose: () => void;
}) {
  return (
    <motion.div
      className="fixed inset-0 z-[500] flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-gta-darker/95 backdrop-blur-xl" />
      <motion.div
        className="relative z-10 max-w-5xl w-full glass border border-white/10 overflow-hidden"
        initial={{ scale: 0.92, y: 40 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.92, y: 40 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="grid md:grid-cols-5">
          {/* Image - 3 cols */}
          <div className="md:col-span-3 relative aspect-video md:aspect-auto">
            <Image
              src={loc.image}
              alt={loc.name}
              fill
              className="object-cover"
              unoptimized
            />
            <div
              className="absolute inset-0 bg-gradient-to-r from-transparent to-gta-card/80 hidden md:block"
            />
            <div
              className="absolute inset-0"
              style={{ background: `linear-gradient(135deg, ${loc.color}15, transparent)` }}
            />

            {/* Tag */}
            <div className="absolute top-4 left-4">
              <span
                className="text-label text-xs px-3 py-1"
                style={{
                  color: loc.color,
                  backgroundColor: `${loc.color}30`,
                  border: `1px solid ${loc.color}60`,
                }}
              >
                {loc.tag}
              </span>
            </div>
          </div>

          {/* Info - 2 cols */}
          <div className="md:col-span-2 p-8 flex flex-col justify-between">
            <div>
              <p className="text-label text-xs text-white/30 mb-2">{loc.vibe}</p>
              <h2
                className="text-4xl md:text-5xl mb-2"
                style={{ fontFamily: "var(--font-display)", color: loc.color }}
              >
                {loc.name}
              </h2>
              <p className="text-white/40 text-sm italic mb-6">{loc.subtitle}</p>
              <p className="text-white/60 text-sm leading-relaxed mb-8">{loc.description}</p>

              <div>
                <p className="text-label text-xs text-white/30 mb-3">Key Features</p>
                <ul className="space-y-2">
                  {loc.details.map((d) => (
                    <li key={d} className="flex items-center gap-2 text-sm text-white/50">
                      <span
                        className="w-1 h-1 rounded-full flex-shrink-0"
                        style={{ backgroundColor: loc.color }}
                      />
                      {d}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="flex items-center justify-between pt-8 border-t border-white/5">
              <div>
                <p className="text-label text-xs text-white/20">Size</p>
                <p className="text-lg" style={{ fontFamily: "var(--font-display)", color: loc.color }}>
                  {loc.size}
                </p>
              </div>
              <button
                onClick={onClose}
                className="text-label text-xs text-white/30 hover:text-white transition-colors"
              >
                Close ✕
              </button>
            </div>
          </div>
        </div>

        <div
          className="absolute inset-0 border pointer-events-none"
          style={{ borderColor: `${loc.color}30` }}
        />
      </motion.div>
    </motion.div>
  );
}

export default function WorldPage() {
  const [selected, setSelected] = useState<typeof locations[0] | null>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const isStatsInView = useInView(statsRef, { once: true });

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".world-title span",
        { yPercent: 110 },
        {
          yPercent: 0,
          duration: 1,
          stagger: 0.07,
          ease: "power4.out",
          delay: 0.2,
        }
      );
    }, headerRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (selected) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [selected]);

  return (
    <main className="bg-gta-darker min-h-screen overflow-hidden">
      <AnimatePresence>
        {selected && <LocationModal loc={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>

      {/* Header */}
      <div
        ref={headerRef}
        className="relative pt-40 pb-20 overflow-hidden"
        style={{ background: "linear-gradient(180deg, #0A1a0A 0%, #0A0A0F 100%)" }}
      >
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(34,197,94,1) 1px, transparent 1px), linear-gradient(90deg, rgba(34,197,94,1) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        <div className="absolute top-20 left-1/4 w-[500px] h-[400px] bg-gta-cyan/5 blur-[150px] rounded-full" />

        <div className="relative z-10 max-w-[1400px] mx-auto px-6">
          <p className="text-label text-gta-cyan mb-4">State of Leonida</p>
          <div className="overflow-hidden">
            <div
              className="world-title text-display-xl text-white leading-none"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {["The", "World"].map((w) => (
                <span key={w} className="block overflow-hidden">
                  <span className="block">{w}</span>
                </span>
              ))}
            </div>
          </div>
          <p className="mt-6 text-white/40 text-lg max-w-2xl" style={{ fontFamily: "var(--font-body)" }}>
            From the gleaming towers of Vice City to the untamed wilds of Grassrivers — Leonida is the most expansive and detailed world in GTA history.
          </p>
        </div>
      </div>

      {/* Stats */}
      <section
        ref={statsRef}
        className="py-16 border-y border-white/5"
        style={{ background: "linear-gradient(90deg, #0d0015, #0A0A0F, #000d15)" }}
      >
        <div className="max-w-[1400px] mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { label: "Locations", value: "6+", color: "#FF6B00" },
            { label: "Square Miles", value: "50+", color: "#00E5FF" },
            { label: "Unique Biomes", value: "8", color: "#22C55E" },
            { label: "Years Crafted", value: "7+", color: "#FF2D6B" },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              className="text-center"
              initial={{ opacity: 0, y: 30 }}
              animate={isStatsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.6 }}
            >
              <p
                className="text-5xl md:text-7xl mb-2"
                style={{ fontFamily: "var(--font-display)", color: stat.color }}
              >
                {stat.value}
              </p>
              <p className="text-label text-xs text-white/30">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Locations grid */}
      <section className="py-20">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {locations.map((loc, i) => (
              <LocationCard
                key={loc.id}
                loc={loc}
                index={i}
                onSelect={setSelected}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Leonida outro */}
      <section className="py-32 relative overflow-hidden text-center">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(255,107,0,0.05) 0%, transparent 70%)",
          }}
        />
        <div className="relative z-10 max-w-[900px] mx-auto px-6">
          <Image
            src="https://www.rockstargames.com/VI/_next/static/media/visit-leonida.ed170c18.svg"
            alt="Visit Leonida"
            width={400}
            height={100}
            className="mx-auto mb-8 opacity-80"
            unoptimized
          />
          <p className="text-xl text-white/40" style={{ fontFamily: "var(--font-body)" }}>
            Tour a few of the must-see destinations across the sunshine state.
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
}
