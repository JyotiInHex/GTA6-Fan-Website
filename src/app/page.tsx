"use client";

import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import Image from "next/image";
import Countdown from "@/components/Countdown";
import MarqueeSection from "@/components/MarqueeSection";
import ParallaxHero from "@/components/ParallaxHero";
import StorySection from "@/components/StorySection";
import CharacterPreview from "@/components/CharacterPreview";
import WorldSection from "@/components/WorldSection";
import Footer from "@/components/Footer";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Home() {
  return (
    <main className="bg-gta-darker overflow-hidden">
      {/* Hero */}
      <ParallaxHero />

      {/* Countdown */}
      <Countdown />

      {/* Marquee */}
      <MarqueeSection />

      {/* Story Section */}
      <StorySection />

      {/* Characters Preview */}
      <CharacterPreview />

      {/* World Section */}
      <WorldSection />

      {/* CTA Section */}
      <CTASection />

      {/* Footer */}
      <Footer />
    </main>
  );
}

function CTASection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      className="relative py-40 overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #0A0A0F 0%, #1a0030 50%, #0A0A0F 100%)",
      }}
    >
      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,107,0,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(255,107,0,0.2) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Glow orbs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gta-purple/20 blur-[120px]" />
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-gta-orange/10 blur-[100px]" />

      <div className="relative z-10 max-w-[1200px] mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <p className="text-label text-gta-orange mb-4 tracking-widest">NOVEMBER 19, 2026</p>
          <h2
            className="text-display-xl mb-8"
            style={{ fontFamily: "var(--font-display)" }}
          >
            <span className="gradient-text">Only in Leonida</span>
          </h2>
          <p className="text-xl text-white/60 max-w-2xl mx-auto mb-12 font-light tracking-wide leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
            When the sun fades and the neon glows, everyone has something to gain — and more to lose.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://www.playstation.com/games/grand-theft-auto-vi"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gta bg-gta-orange text-gta-dark px-10 py-4 text-label font-bold text-sm hover:bg-gta-pink hover:text-white transition-colors duration-300 inline-flex items-center gap-2"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8.985 2.596v17.548l3.915 1.856V6.688c0-.69.304-1.151.794-.991.636.181.76.814.76 1.505v5.876c2.441 1.193 4.362-.002 4.362-3.153 0-3.237-1.126-4.675-4.438-5.932-1.07-.405-3.575-1.21-4.393-1.397"/>
              </svg>
              Wishlist on PS5
            </a>
            <a
              href="https://www.xbox.com/en-US/games/store/grand-theft-auto-vi/9nl3wwnzlzzn"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gta neon-border-cyan text-gta-cyan px-10 py-4 text-label font-bold text-sm hover:bg-gta-cyan hover:text-gta-dark transition-colors duration-300 inline-flex items-center gap-2"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M4.102 21.033c1.794 1.666 4.299 2.053 4.299 2.053-1.47-1.178-2.633-2.36-2.633-2.36-.695-.612-1.309-1.284-1.666-2.052zm-.43-4.778c-.695-.612-.948-1.396-.948-2.053 0-.668.253-1.453.948-2.064.695-.613 1.309-.91 1.666-1.26-.357.35-.971.647-1.666 1.26-.695.611-.948 1.396-.948 2.064 0 .657.253 1.441.948 2.053zm13.127 5.065c-.695.612-1.454 1.19-2.272 1.604 1.454-.486 2.819-1.422 3.838-2.734-1.019 1.312-1.384.52-1.566 1.13zm3.284-8.7c-.695-.612-.948-1.396-.948-2.053 0-.668.253-1.453.948-2.064.695-.613 1.309-.91 1.666-1.26-.357.35-.971.647-1.666 1.26-.695.611-.948 1.396-.948 2.064 0 .657.253 1.441.948 2.053zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/>
              </svg>
              Wishlist on Xbox
            </a>
          </div>

          <div className="mt-16 flex items-center justify-center gap-8 text-white/30">
            <div className="h-px w-16 bg-white/10" />
            <span className="text-label text-xs">PlayStation 5 & Xbox Series X|S</span>
            <div className="h-px w-16 bg-white/10" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
