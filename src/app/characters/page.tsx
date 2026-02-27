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

const characters = [
  {
    id: "jason",
    name: "Jason Duval",
    role: "Protagonist",
    tagline: "Wants an easy life, but things just keep getting harder.",
    description:
      "Jason grew up around grifters and crooks. After a stint in the Army trying to shake off his troubled teens, he found himself in the Keys doing what he knows best, working for local drug runners. Meeting Lucia could be the best or worst thing to ever happen to him.",
    quotes: [
      '"Another day in paradise, right?"',
      '"If anything happens, I\'m right behind you."',
    ],
    image:
      "https://www.rockstargames.com/VI/_next/image?url=%2FVI%2F_next%2Fstatic%2Fmedia%2FJason_Duval_06.e498e308.jpg&w=1366&q=75",
    color: "#FF6B00",
    accent: "#FFD600",
    location: "Leonida Keys",
  },
  {
    id: "lucia",
    name: "Lucia Caminos",
    role: "Protagonist",
    tagline: "Father taught her to fight as soon as she could walk.",
    description:
      "Life has been coming at her swinging ever since. Fighting for her family landed her in the Leonida Penitentiary. Sheer luck got her out. Lucia's learned her lesson — only smart moves from here. More than anything, Lucia wants the good life her mom has dreamed of since their days in Liberty City.",
    quotes: [
      '"The only thing that matters is who you know and what you got."',
      '"A life with Jason could be her way out."',
    ],
    image:
      "https://www.rockstargames.com/VI/_next/image?url=%2FVI%2F_next%2Fstatic%2Fmedia%2FLucia_Caminos_06.a158f77c.jpg&w=1366&q=75",
    color: "#FF2D6B",
    accent: "#FF6B00",
    location: "Liberty City → Leonida",
  },
  {
    id: "cal",
    name: "Cal Hampton",
    role: "Supporting",
    tagline: "What if everything on the internet was true?",
    description:
      "Jason's friend and a fellow associate of Brian's, Cal feels safest hanging at home, snooping on Coast Guard comms with a few beers and some private browser tabs open. Cal is at the low tide of America and happy there.",
    quotes: [
      '"There are way too many birds flying around in perfect formation."',
      '"The psychopaths are in charge. Get used to it."',
    ],
    image:
      "https://www.rockstargames.com/VI/_next/image?url=%2FVI%2F_next%2Fstatic%2Fmedia%2FCal_Hampton_03.cba3d4d8.jpg&w=1366&q=75",
    color: "#00E5FF",
    accent: "#7B2FBE",
    location: "Leonida Keys",
  },
  {
    id: "boobie",
    name: "Boobie Ike",
    role: "Supporting",
    tagline: "Local Vice City legend — and acts like it.",
    description:
      "One of the few to transform his time in the streets into a legitimate empire spanning real estate, a strip club, and a recording studio — Boobie's all smiles until it's time to talk business. His partnership with Dre'Quan for Only Raw Records is what he's most invested in.",
    quotes: [
      '"It\'s all about heart — the Jack of Hearts."',
      '"The club money pay for the studio, and the drug money pay for it all."',
    ],
    image:
      "https://www.rockstargames.com/VI/_next/image?url=%2FVI%2F_next%2Fstatic%2Fmedia%2FBoobie_Ike_01.8aee3bef.jpg&w=1366&q=75",
    color: "#7B2FBE",
    accent: "#FFD600",
    location: "Vice City",
  },
  {
    id: "drequan",
    name: "Dre'Quan Priest",
    role: "Supporting",
    tagline: "Only Raw... Records",
    description:
      "Dre'Quan was always more of a hustler than a gangster. Even when he was dealing on the streets to make ends meet, breaking into music was the goal. Now that he's signed the Real Dimez, his days of booking acts into Boobie's strip club might be numbered.",
    quotes: [
      '"Dancers are like my A&Rs. If the record\'s a hit, DJs gonna be spinnin\' it."',
      '"You\'re with the label now."',
    ],
    image:
      "https://www.rockstargames.com/VI/_next/image?url=%2FVI%2F_next%2Fstatic%2Fmedia%2FDreQuan_Priest_03.7aa48b92.jpg&w=1366&q=75",
    color: "#FFD600",
    accent: "#FF6B00",
    location: "Vice City",
  },
  {
    id: "real-dimez",
    name: "Real Dimez",
    role: "Supporting",
    tagline: "Viral videos. Viral hooks.",
    description:
      "Bae-Luxe and Roxy aka Real Dimez have been friends since high school — girls with the savvy to turn their time shaking down local dealers into cold, hard cash via spicy rap tracks and a relentless social media presence. An early hit single with DWNPLY took them to new heights.",
    quotes: [
      '"All my dimes in this club. Meet my twin, make it a dub."',
      '"One hit away from fame."',
    ],
    image:
      "https://www.rockstargames.com/VI/_next/image?url=%2FVI%2F_next%2Fstatic%2Fmedia%2FReal_Dimez_01.c74db009.jpg&w=1366&q=75",
    color: "#FF2D6B",
    accent: "#00E5FF",
    location: "Vice City",
  },
  {
    id: "raul",
    name: "Raul Bautista",
    role: "Supporting",
    tagline: "Experience counts.",
    description:
      "Confidence, charm, and cunning — Raul's a seasoned bank robber always on the hunt for talent ready to take the risks that bring the biggest rewards. Raul's recklessness raises the stakes with every score.",
    quotes: [
      '"Life is full of surprises, my friend. I think we\'d all be wise to remember that."',
      '"A professional adapts."',
    ],
    image:
      "https://www.rockstargames.com/VI/_next/image?url=%2FVI%2F_next%2Fstatic%2Fmedia%2FRaul_Bautista_03.f57b4046.jpg&w=1366&q=75",
    color: "#FF6B00",
    accent: "#FF2D6B",
    location: "Ambrosia",
  },
  {
    id: "brian",
    name: "Brian Heder",
    role: "Supporting",
    tagline: "Nothing better than a Mudslide at sunset.",
    description:
      "Brian's a classic drug runner from the golden age of smuggling in the Keys. Still moving product through his boat yard with his third wife, Lori. He's been around long enough to let others do his dirty work — including Jason.",
    quotes: [
      '"I hauled so much grass in that plane, I could make the state of Leonida levitate."',
      '"Looks like a Leonida beach bum — moves like a great white shark."',
    ],
    image:
      "https://www.rockstargames.com/VI/_next/image?url=%2FVI%2F_next%2Fstatic%2Fmedia%2FBrian_Heder_03.1bd6d8bd.jpg&w=1366&q=75",
    color: "#00E5FF",
    accent: "#22C55E",
    location: "Leonida Keys",
  },
];

function CharacterModal({
  char,
  onClose,
}: {
  char: typeof characters[0];
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
      <div className="absolute inset-0 bg-gta-darker/90 backdrop-blur-xl" />
      <motion.div
        className="relative z-10 max-w-4xl w-full glass border border-white/10 overflow-hidden"
        initial={{ scale: 0.9, y: 40 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 40 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="grid md:grid-cols-2">
          {/* Image */}
          <div className="relative aspect-[3/4] md:aspect-auto">
            <Image
              src={char.image}
              alt={char.name}
              fill
              className="object-cover"
              unoptimized
            />
            <div
              className="absolute inset-0"
              style={{
                background: `linear-gradient(135deg, ${char.color}20, transparent 50%, ${char.accent}20)`,
              }}
            />
          </div>

          {/* Content */}
          <div className="p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: char.color }}
                />
                <span className="text-label text-xs text-white/40">{char.role}</span>
                <span className="text-label text-xs text-white/20">•</span>
                <span className="text-label text-xs text-white/40">{char.location}</span>
              </div>
              <h2
                className="text-4xl md:text-5xl text-white mb-4"
                style={{ fontFamily: "var(--font-display)", color: char.color }}
              >
                {char.name}
              </h2>
              <p className="text-white/60 text-sm italic mb-6">{char.tagline}</p>
              <p className="text-white/50 text-sm leading-relaxed mb-8">{char.description}</p>

              <div className="space-y-3">
                {char.quotes.map((q, i) => (
                  <blockquote
                    key={i}
                    className="text-sm italic border-l-2 pl-4 text-white/70"
                    style={{ borderColor: char.color }}
                  >
                    {q}
                  </blockquote>
                ))}
              </div>
            </div>

            <button
              onClick={onClose}
              className="mt-8 text-label text-xs text-white/30 hover:text-white transition-colors duration-300 text-left"
            >
              ← Close
            </button>
          </div>
        </div>

        {/* Border */}
        <div
          className="absolute inset-0 border pointer-events-none"
          style={{ borderColor: `${char.color}40` }}
        />
      </motion.div>
    </motion.div>
  );
}

export default function CharactersPage() {
  const [selected, setSelected] = useState<typeof characters[0] | null>(null);
  const [filter, setFilter] = useState<"All" | "Protagonist" | "Supporting">("All");
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".char-title span",
        { yPercent: 110 },
        {
          yPercent: 0,
          duration: 1,
          stagger: 0.08,
          ease: "power4.out",
          delay: 0.2,
        }
      );
    }, headerRef);

    return () => ctx.revert();
  }, []);

  // Lock body scroll when modal open
  useEffect(() => {
    if (selected) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [selected]);

  const filtered = filter === "All" ? characters : characters.filter((c) => c.role === filter);

  return (
    <main className="bg-gta-darker min-h-screen overflow-hidden">
      {/* Modal */}
      <AnimatePresence>
        {selected && (
          <CharacterModal char={selected} onClose={() => setSelected(null)} />
        )}
      </AnimatePresence>

      {/* Header */}
      <div
        ref={headerRef}
        className="relative pt-40 pb-20 overflow-hidden"
        style={{
          background: "linear-gradient(180deg, #1a0030 0%, #0A0A0F 100%)",
        }}
      >
        <div className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(255,45,107,0.8) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
        <div className="absolute top-0 right-0 w-[600px] h-[500px] bg-gta-pink/5 blur-[150px] rounded-full" />

        <div className="relative z-10 max-w-[1400px] mx-auto px-6">
          <p className="text-label text-gta-pink mb-4">GTA VI</p>
          <div className="overflow-hidden mb-6">
            <div
              className="char-title text-display-xl text-white"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {["The", "Cast"].map((word) => (
                <span key={word} className="block overflow-hidden leading-none">
                  <span className="block">{word}</span>
                </span>
              ))}
            </div>
          </div>
          <p className="text-white/40 text-lg max-w-xl" style={{ fontFamily: "var(--font-body)" }}>
            Meet the faces of Leonida — protagonists, criminals, dreamers, and legends.
          </p>

          {/* Filter */}
          <div className="flex gap-3 mt-8">
            {(["All", "Protagonist", "Supporting"] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`text-label text-xs px-4 py-2 transition-all duration-300 ${
                  filter === f
                    ? "bg-gta-pink text-white"
                    : "text-white/40 border border-white/10 hover:text-white hover:border-white/30"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Characters Grid */}
      <section className="py-20">
        <div className="max-w-[1400px] mx-auto px-6">
          <motion.div
            className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            layout
          >
            <AnimatePresence mode="wait">
              {filtered.map((char, i) => (
                <CharCard
                  key={char.id}
                  char={char}
                  index={i}
                  onClick={() => setSelected(char)}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

function CharCard({
  char,
  index,
  onClick,
}: {
  char: typeof characters[0];
  index: number;
  onClick: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      layout
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.6, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
      className="character-card relative overflow-hidden cursor-pointer group"
      onClick={onClick}
      data-cursor-hover="true"
    >
      {/* Image */}
      <div className="relative aspect-[3/4] overflow-hidden">
        <Image
          src={char.image}
          alt={char.name}
          fill
          className="object-cover object-top transition-transform duration-700 group-hover:scale-110"
          unoptimized
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-gta-darker via-gta-darker/40 to-transparent"
        />
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-500"
          style={{ background: `radial-gradient(circle at bottom, ${char.color}, transparent 70%)` }}
        />
      </div>

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-5">
        <div className="flex items-center gap-2 mb-2">
          <div
            className="w-1.5 h-1.5 rounded-full"
            style={{ backgroundColor: char.color }}
          />
          <span className="text-label text-xs text-white/40">{char.role}</span>
        </div>
        <h3
          className="text-2xl text-white leading-tight mb-1"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {char.name}
        </h3>
        <p className="text-xs text-white/40 italic line-clamp-2">{char.tagline}</p>

        {/* Hover CTA */}
        <div className="overflow-hidden h-0 group-hover:h-8 transition-all duration-400 mt-2">
          <span
            className="text-label text-xs font-bold"
            style={{ color: char.color }}
          >
            View Character →
          </span>
        </div>
      </div>

      {/* Border */}
      <div
        className="absolute inset-0 border-0 group-hover:border transition-all duration-400 pointer-events-none"
        style={{ borderColor: `${char.color}60`, boxShadow: `inset 0 0 30px ${char.color}10` }}
      />

      {/* Corner */}
      <div
        className="absolute top-3 right-3 w-5 h-5 border-t border-r opacity-40 group-hover:opacity-100 transition-opacity duration-300"
        style={{ borderColor: char.color }}
      />
    </motion.div>
  );
}
