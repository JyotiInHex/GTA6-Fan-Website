"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Footer from "@/components/Footer";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const trailers = [
  {
    id: "trailer-1",
    title: "Trailer 1",
    subtitle: "The First Look",
    description:
      "The first reveal of Grand Theft Auto VI. Jason and Lucia step into the light — Vice City, USA comes alive.",
    youtubeId: "QdBZY2fkU-0",
    date: "December 5, 2023",
    views: "200M+",
    tag: "Official Trailer",
    tagColor: "#FF6B00",
  },
  {
    id: "trailer-2",
    title: "Trailer 2",
    subtitle: "A Deeper Look",
    description:
      "The second trailer dives deeper into the world of Leonida. More characters, more chaos, more Vice City.",
    youtubeId: "VQRLujxTm3c",
    date: "May 6, 2025",
    views: "80M+",
    tag: "Official Trailer",
    tagColor: "#FF2D6B",
  },
];

function TrailerCard({ trailer, index }: { trailer: typeof trailers[0]; index: number }) {
  const [playing, setPlaying] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      className="relative"
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Trailer number */}
      <div className="mb-6 flex items-center gap-4">
        <span
          className="text-[8rem] leading-none text-white/5"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {String(index + 1).padStart(2, "0")}
        </span>
        <div>
          <span
            className="text-label text-xs px-3 py-1 inline-block mb-2"
            style={{ backgroundColor: trailer.tagColor + "20", color: trailer.tagColor, border: `1px solid ${trailer.tagColor}40` }}
          >
            {trailer.tag}
          </span>
          <h2
            className="text-display-lg text-white"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {trailer.title}
          </h2>
        </div>
      </div>

      {/* Video */}
      <div className="relative aspect-video overflow-hidden group">
        {!playing ? (
          <>
            <img
              src={`https://img.youtube.com/vi/${trailer.youtubeId}/maxresdefault.jpg`}
              alt={trailer.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gta-darker/50 group-hover:bg-gta-darker/30 transition-colors duration-300" />

            {/* Play button */}
            <button
              onClick={() => setPlaying(true)}
              className="absolute inset-0 flex items-center justify-center group/btn"
              aria-label="Play trailer"
            >
              <div
                className="w-20 h-20 rounded-full flex items-center justify-center transition-all duration-300 group-hover/btn:scale-110"
                style={{
                  background: `radial-gradient(circle, ${trailer.tagColor}, ${trailer.tagColor}88)`,
                  boxShadow: `0 0 40px ${trailer.tagColor}60`,
                }}
              >
                <svg
                  className="w-8 h-8 text-white ml-1"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </button>

            {/* Info overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-gta-darker to-transparent">
              <p className="text-white/60 text-label text-xs">{trailer.date}</p>
            </div>
          </>
        ) : (
          <iframe
            src={`https://www.youtube.com/embed/${trailer.youtubeId}?autoplay=1&rel=0`}
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title={trailer.title}
          />
        )}

        {/* Corner decorations */}
        <div
          className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 pointer-events-none"
          style={{ borderColor: trailer.tagColor }}
        />
        <div
          className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 pointer-events-none"
          style={{ borderColor: trailer.tagColor }}
        />
      </div>

      {/* Info */}
      <div className="mt-8 grid md:grid-cols-3 gap-6 items-start">
        <div className="md:col-span-2">
          <h3
            className="text-2xl text-white mb-3"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {trailer.subtitle}
          </h3>
          <p className="text-white/50 leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
            {trailer.description}
          </p>
        </div>
        <div className="flex gap-8 md:justify-end">
          <div>
            <p
              className="text-4xl text-gta-orange"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {trailer.views}
            </p>
            <p className="text-label text-xs text-white/30">YouTube Views</p>
          </div>
          <div>
            <p
              className="text-4xl text-white"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {trailer.date.split(" ")[2]}
            </p>
            <p className="text-label text-xs text-white/30">Year Released</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function TrailersPage() {
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".trailers-title span",
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

  return (
    <main className="bg-gta-darker min-h-screen overflow-hidden">
      {/* Page Header */}
      <div
        ref={headerRef}
        className="relative pt-40 pb-20 overflow-hidden"
        style={{
          background:
            "linear-gradient(180deg, #0d0015 0%, #0A0A0F 100%)",
        }}
      >
        {/* Background grid */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,107,0,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,107,0,1) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />

        {/* Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gta-orange/5 blur-[150px] rounded-full" />

        <div className="relative z-10 max-w-[1400px] mx-auto px-6">
          <p className="text-label text-gta-orange mb-4">Rockstar Games</p>
          <div className="overflow-hidden">
            <div
              className="trailers-title text-display-xl text-white"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {["Official", " Trailers"].map((word) => (
                <span key={word} className="block overflow-hidden leading-none">
                  <span className="block">{word}</span>
                </span>
              ))}
            </div>
          </div>
          <p className="mt-6 text-white/40 text-lg max-w-xl" style={{ fontFamily: "var(--font-body)" }}>
            Watch the official trailers for Grand Theft Auto VI. Experience Vice City, Leonida like never before.
          </p>
        </div>
      </div>

      {/* Trailers */}
      <section className="py-20">
        <div className="max-w-[1400px] mx-auto px-6 space-y-32">
          {trailers.map((trailer, i) => (
            <TrailerCard key={trailer.id} trailer={trailer} index={i} />
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-20 text-center border-t border-white/5">
        <div className="max-w-[600px] mx-auto px-6">
          <p className="text-label text-gta-orange mb-4">Stay Updated</p>
          <h2
            className="text-display-md text-white mb-6"
            style={{ fontFamily: "var(--font-display)" }}
          >
            More Coming Soon
          </h2>
          <p className="text-white/40 mb-8" style={{ fontFamily: "var(--font-body)" }}>
            Follow Rockstar Games for the latest trailers, gameplay reveals, and news about GTA VI.
          </p>
          <a
            href="https://www.rockstargames.com/VI"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gta bg-gta-orange text-gta-dark px-8 py-3 text-label font-bold inline-block"
          >
            Visit Official Site ↗
          </a>
        </div>
      </section>

      <Footer />
    </main>
  );
}
