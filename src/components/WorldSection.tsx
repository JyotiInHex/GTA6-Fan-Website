"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const locations = [
  {
    name: "Vice City",
    description:
      "The crown jewel of Leonida — sun-soaked streets and neon-lit nights.",
    image:
      "https://www.rockstargames.com/VI/_next/image?url=%2FVI%2F_next%2Fstatic%2Fmedia%2FVice_City_03.9b0e117a.jpg&w=1366&q=75",
    tag: "Main City",
    color: "#FF6B00",
  },
  {
    name: "Leonida Keys",
    description: "Where drug runners and beach bums coexist in paradise.",
    image:
      "https://www.rockstargames.com/VI/_next/image?url=%2FVI%2F_next%2Fstatic%2Fmedia%2FLeonida_Keys_01.1af17390.jpg&w=1366&q=75",
    tag: "Islands",
    color: "#00E5FF",
  },
  {
    name: "Grassrivers",
    description: "The wild interior where anything can happen.",
    image:
      "https://www.rockstargames.com/VI/_next/image?url=%2FVI%2F_next%2Fstatic%2Fmedia%2FGrassrivers_04.375357e4.jpg&w=1366&q=75",
    tag: "Wilderness",
    color: "#22C55E",
  },
  {
    name: "Port Gellhorn",
    description: "Industrial docks where fortunes change hands daily.",
    image:
      "https://www.rockstargames.com/VI/_next/image?url=%2FVI%2F_next%2Fstatic%2Fmedia%2FPort_Gellhorn_01.386c1d6e.jpg&w=1366&q=75",
    tag: "Port District",
    color: "#FF2D6B",
  },
];

export default function WorldSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const container = document.querySelector(
        ".world-horizontal",
      ) as HTMLElement;

      if (!container || !sectionRef.current) return;

      const mm = gsap.matchMedia();

      // =========================
      // DESKTOP
      // =========================
      mm.add("(min-width: 1024px)", () => {
        const getScrollAmount = () =>
          container.scrollWidth - container.offsetWidth;

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top -8%",
            end: () => `+=${getScrollAmount()}`,
            scrub: 1,
            pin: true,
            invalidateOnRefresh: true,
            anticipatePin: 1,
          },
        });

        // Move container
        tl.to(
          container,
          {
            x: () => -getScrollAmount(),
            ease: "none",
          },
          0,
        );

        // Move images slower for depth
        tl.to(
          ".parallax-img",
          {
            xPercent: -8,
            ease: "none",
          },
          0,
        );
      });

      // =========================
      // MOBILE
      // =========================
      mm.add("(max-width: 1023px)", () => {
        gsap.utils.toArray(".parallax-img").forEach((img: any) => {
          gsap.to(img, {
            yPercent: -15,
            ease: "none",
            scrollTrigger: {
              trigger: img,
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
            },
          });
        });
      });

      ScrollTrigger.refresh();
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-32 pb-10 h-fit relative overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 80% 50%, rgba(0,229,255,0.05) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6">
        {/* Header */}
        <div className="flex items-end justify-between mb-16">
          <div>
            <p className="text-label text-gta-cyan mb-3">Explore</p>
            <h2
              className="text-display-lg text-white"
              style={{ fontFamily: "var(--font-display)" }}
            >
              The World
            </h2>
          </div>
          <Link
            href="/world"
            className="hidden md:flex items-center gap-2 text-label text-white/40 hover:text-gta-cyan transition-colors duration-300 group"
          >
            Explore All
            <span className="w-8 h-px bg-white/20 group-hover:w-16 group-hover:bg-gta-cyan transition-all duration-300" />
          </Link>
        </div>

        {/* World cards */}
        <div className="world-horizontal flex gap-12 overflow-x-auto lg:overflow-visible snap-x snap-mandatory scroll-smooth">
          {locations.map((loc) => (
            <div
              key={loc.name}
              className="world-card relative min-w-[85%] sm:min-w-[70%] md:min-w-[400px] snap-start cursor-pointer group"
              style={{ WebkitOverflowScrolling: "touch" }}
            >
              <div className="parallax-wrap relative aspect-[2/2] overflow-hidden">
                <Image
                  src={loc.image}
                  alt={loc.name}
                  fill
                  className="parallax-img object-cover group-hover:grayscale-0 scale-[1.25] will-change-transform grayscale"
                  unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gta-darker via-gta-darker/30 to-transparent" />
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500"
                  style={{
                    background: `radial-gradient(circle at center, ${loc.color}, transparent)`,
                  }}
                />
              </div>

              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-end p-4">
                <span
                  className="text-label text-base font-semibold mb-1 opacity-60 transition-all duration-100 group-hover:opacity-100"
                  style={{ color: loc.color }}
                >
                  {loc.tag}
                </span>

                <h3
                  className="text-2xl leading-tight text-white transition-all duration-500 origin-left group-hover:text-7xl"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {loc.name}
                </h3>

                <p className="text-base font-normal text-white/80 line-clamp-2 opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                  {loc.description}
                </p>
              </div>

              {/* Border */}
              <div
                className="absolute inset-0 border-0 group-hover:border transition-all duration-500 pointer-events-none"
                style={{ borderColor: `${loc.color}60` }}
              />
            </div>
          ))}
        </div>

        {/* Outro quote */}
        {/* <div className="mt-20 text-center">
          <div className="inline-block relative">
            <p
              className="text-display-md text-white/10"
              style={{ fontFamily: "var(--font-display)" }}
            >
              "Only in Leonida"
            </p>
            <p
              className="absolute inset-0 text-display-md gradient-text"
              style={{ fontFamily: "var(--font-display)" }}
            >
              "Only in Leonida"
            </p>
          </div>
          <p className="text-label text-white/20 mt-4 text-xs">
            When the sun fades and the neon glows, everyone has something to
            gain — and more to lose.
          </p>
        </div> */}
      </div>
    </section>
  );
}
