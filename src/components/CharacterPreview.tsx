"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const featuredCharacters = [
  {
    name: "Jason Duval",
    tagline: "Wants an easy life, but things just keep getting harder.",
    image:
      "https://www.rockstargames.com/VI/_next/image?url=%2FVI%2F_next%2Fstatic%2Fmedia%2FJason_Duval_06.e498e308.jpg&w=1366&q=75",
    color: "#FF6B00",
    role: "Protagonist",
    quote: '"Another day in paradise, right?"',
  },
  {
    name: "Lucia Caminos",
    tagline: "Father taught her to fight as soon as she could walk.",
    image:
      "https://www.rockstargames.com/VI/_next/image?url=%2FVI%2F_next%2Fstatic%2Fmedia%2FLucia_Caminos_02.f833743a.jpg&w=1366&q=75",
    color: "#FF2D6B",
    role: "Protagonist",
    quote: '"The only thing that matters is who you know and what you got."',
  },
  {
    name: "Boobie Ike",
    tagline: "Local Vice City legend — and acts like it.",
    image:
      "https://www.rockstargames.com/VI/_next/image?url=%2FVI%2F_next%2Fstatic%2Fmedia%2FBoobie_Ike_portrait.9b0b402b.jpg&w=1366&q=75",
    color: "#7B2FBE",
    role: "Supporting",
    quote: '"It\'s all about heart — the Jack of Hearts."',
  },
];

export default function CharacterPreview() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Staggered card entrance
      gsap.fromTo(
        ".char-card",
        { opacity: 0, y: 80, rotateX: 15 },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 0.9,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-32 relative overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(180deg, #0A0A0F 0%, #050508 50%, #0A0A0F 100%)",
        }}
      />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6">
        {/* Header */}
        <div className="flex items-end justify-between mb-16">
          <div>
            <p className="text-label text-gta-pink mb-3">The Cast</p>
            <h2
              className="text-display-lg text-white"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Characters
            </h2>
          </div>
          <Link
            href="/characters"
            className="hidden md:flex items-center gap-2 text-label text-white/40 hover:text-gta-orange transition-colors duration-300 group"
          >
            View All
            <span className="w-8 h-px bg-white/20 group-hover:w-16 group-hover:bg-gta-orange transition-all duration-300" />
          </Link>
        </div>

        {/* Cards grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {featuredCharacters.map((char) => (
            <div
              key={char.name}
              className="char-card character-card relative overflow-hidden group cursor-pointer"
              style={{ perspective: "1000px" }}
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
                  className="absolute inset-0 bg-gradient-to-t from-gta-darker via-gta-darker/50 to-transparent"
                />
                {/* Color tint on hover */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500"
                  style={{ backgroundColor: char.color }}
                />
              </div>

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="mb-2 flex items-center gap-2">
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: char.color }}
                  />
                  <span className="text-label text-xs text-white/40">{char.role}</span>
                </div>
                <h3
                  className="text-3xl text-white mb-2 leading-tight"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {char.name}
                </h3>
                <p className="text-sm text-white/50 italic mb-4 line-clamp-2">{char.quote}</p>

                {/* Hover reveal */}
                <div className="overflow-hidden h-0 group-hover:h-auto transition-all duration-500">
                  <p className="text-sm text-white/40 mb-3 pt-2">{char.tagline}</p>
                </div>
              </div>

              {/* Animated border */}
              <div
                className="absolute inset-0 border opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ borderColor: char.color, boxShadow: `0 0 20px ${char.color}40` }}
              />

              {/* Corner accent */}
              <div
                className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 opacity-60"
                style={{ borderColor: char.color }}
              />
            </div>
          ))}
        </div>

        {/* Mobile View All */}
        <div className="mt-10 text-center md:hidden">
          <Link
            href="/characters"
            className="btn-gta neon-border text-white px-8 py-3 text-label font-bold inline-block"
          >
            View All Characters →
          </Link>
        </div>
      </div>
    </section>
  );
}
