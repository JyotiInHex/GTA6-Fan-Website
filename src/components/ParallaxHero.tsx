"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ParallaxHero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax bg
      gsap.to(bgRef.current, {
        yPercent: 30,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      // Content fade out
      gsap.to(contentRef.current, {
        opacity: 0,
        y: -80,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "30% top",
          end: "80% top",
          scrub: true,
        },
      });

      // Logo scale
      gsap.to(logoRef.current, {
        scale: 0.5,
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "20% top",
          end: "60% top",
          scrub: true,
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative h-screen min-h-[700px] overflow-hidden flex items-center justify-center"
    >
      {/* Background image with parallax */}
      <div ref={bgRef} className="absolute inset-0 ">
        <Image
          src="https://www.rockstargames.com/VI/_next/image?url=%2FVI%2F_next%2Fstatic%2Fmedia%2FJason_and_Lucia_02_With_Logos_landscape.93ab5523.jpg&w=1366&q=75"
          alt="GTA VI Key Art"
          fill
          className="object-cover object-center"
          priority
          unoptimized
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 video-overlay" />
        <div className="absolute inset-0 bg-gta-darker/30" />
      </div>

      {/* Vignette */}
      <div className="absolute inset-0 vignette pointer-events-none" />

      {/* Main Content */}
      <div
        ref={contentRef}
        className="relative z-10 text-center px-6 translate-y-24"
      >      
        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
        >
          <Link
            href="/trailers"
            className="btn-gta bg-gta-orange text-gta-dark px-8 py-3.5 text-label font-bold hover:bg-gta-pink hover:text-white transition-colors duration-300"
          >
            ▶ Watch Trailer
          </Link>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
      >
        <span className="text-label text-white/50 text-base font-semibold">
          Scroll
        </span>
        <motion.div
          className="w-1 rounded-t-full h-12 bg-gradient-to-b from-gta-orange to-transparent"
          animate={{ scaleY: [1, 0.5, 1], opacity: [1, 0.3, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>

      {/* Corner decorations */}
      <div className="absolute top-20 left-6 w-16 h-16 border-l-2 border-t-2 border-gta-orange/40" />
      <div className="absolute top-20 right-6 w-16 h-16 border-r-2 border-t-2 border-gta-orange/40" />
      <div className="absolute bottom-8 left-6 w-16 h-16 border-l-2 border-b-2 border-gta-orange/40" />
      <div className="absolute bottom-8 right-6 w-16 h-16 border-r-2 border-b-2 border-gta-orange/40" />
    </section>
  );
}
