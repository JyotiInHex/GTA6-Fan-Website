"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { motion, useInView } from "framer-motion";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function StorySection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Horizontal reveal on text paragraphs
      gsap.fromTo(
        ".story-para",
        { opacity: 0, x: -60 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: textRef.current,
            start: "top 80%",
            end: "bottom 20%",
          },
        },
      );

      // Image parallax
      gsap.fromTo(
        imageRef.current,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: imageRef.current,
            start: "top 85%",
          },
        },
      );

      // Big text reveal
      gsap.fromTo(
        ".big-story-text span",
        { yPercent: 110 },
        {
          yPercent: 0,
          duration: 0.9,
          stagger: 0.06,
          ease: "power4.out",
          scrollTrigger: {
            trigger: ".big-story-text",
            start: "top 80%",
          },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-40 overflow-hidden">
      {/* BG */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% 100%, rgba(123,47,190,0.15) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6">
        {/* Big heading with staggered reveal */}
        <div className="overflow-hidden mb-20">
          <div
            className="big-story-text flex flex-wrap text-display-xl text-white leading-none gap-x-6"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {["Vice", "City,", "USA."].map((word) => (
              <span key={word} className="block overflow-hidden">
                <span className="block">{word}</span>
              </span>
            ))}
          </div>
        </div>

        {/* Two column layout */}
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Text */}
          <div ref={textRef} className="space-y-6">
            <p className="story-para text-label text-gta-orange mb-8">
              The Story
            </p>

            <p
              className="story-para text-xl md:text-2xl text-white/80 font-light leading-relaxed tracking-wide"
              style={{ fontFamily: "var(--font-body)" }}
            >
              Jason and Lucia have always known the deck is stacked against
              them. But when an easy score goes wrong, they find themselves on
              the{" "}
              <span className="text-gta-orange font-medium">
                darkest side of the sunniest place in America.
              </span>
            </p>

            <p
              className="story-para text-lg text-white/50 leading-relaxed tracking-wide"
              style={{ fontFamily: "var(--font-body)" }}
            >
              In the middle of a criminal conspiracy stretching across the state
              of Leonida — forced to rely on each other more than ever if they
              want to make it out alive.
            </p>

            <div className="story-para pt-6">
              <div className="h-px w-full bg-gradient-to-r from-gta-orange/50 to-transparent mb-8" />

              <div className="grid grid-cols-2 md:grid-cols-3 text-center">
                {/* Release Year */}
                <div className="py-6 md:border-r md:border-white/10">
                  <p className="text-display-md text-gta-orange glow-text">
                    2026
                  </p>
                  <p className="text-label text-xs text-white/40 tracking-widest">
                    RELEASE YEAR
                  </p>
                </div>

                {/* Platforms */}
                <div className="py-6 md:border-r md:border-white/10">
                  <p className="text-display-md text-gta-cyan">PS5</p>
                  <p className="text-label text-xs text-white/40 tracking-widest">
                    & XBOX SERIES
                  </p>
                </div>

                {/* Protagonists */}
                <div className="py-6 col-span-2 lg:col-span-1">
                  <p className="text-display-md text-gta-pink">2</p>
                  <p className="text-label text-xs text-white/40 tracking-widest">
                    PROTAGONISTS
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Image */}
          <div ref={imageRef} className="relative">
            <div className="relative aspect-[3/4] overflow-hidden">
              <Image
                src="https://www.rockstargames.com/VI/_next/image?url=%2FVI%2F_next%2Fstatic%2Fmedia%2FJason_and_Lucia_01_square.ea99a15d.jpg&w=1366&q=75"
                alt="Jason and Lucia"
                fill
                className="object-cover object-top"
                unoptimized
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gta-darker via-transparent to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-gta-darker/50" />
            </div>

            {/* Quote overlay */}
            <div className="absolute bottom-6 left-6 right-6">
              <p
                className="text-sm text-white/70 italic"
                style={{ fontFamily: "var(--font-body)" }}
              >
                &ldquo;Another day in paradise, right?&rdquo;
              </p>
              <p className="text-label text-gta-orange text-xs mt-1">
                — Jason Duval
              </p>
            </div>

            {/* Decorative border */}
            <div className="absolute inset-0 neon-border pointer-events-none" />
            <div className="absolute -top-3 -right-3 w-8 h-8 border-t-2 border-r-2 border-gta-orange" />
            <div className="absolute -bottom-3 -left-3 w-8 h-8 border-b-2 border-l-2 border-gta-orange" />
          </div>
        </div>
      </div>
    </section>
  );
}
