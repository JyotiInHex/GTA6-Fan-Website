"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function getTimeLeft(): TimeLeft {
  const target = new Date("2026-11-19T00:00:00");
  const now = new Date();
  const diff = target.getTime() - now.getTime();

  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

function CountdownUnit({ value, label }: { value: number; label: string }) {
  const prev = useRef(value);
  const [flip, setFlip] = useState(false);

  useEffect(() => {
    if (prev.current !== value) {
      setFlip(true);
      const t = setTimeout(() => setFlip(false), 300);
      prev.current = value;
      return () => clearTimeout(t);
    }
  }, [value]);

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative">
        <div
          className={`neon-border bg-gta-card w-20 h-20 md:w-28 md:h-28 flex items-center justify-center transition-all duration-300 ease-linear ${
            flip ? "opacity-50" : "opacity-100"
          }`}
        >
          <span
            className="text-4xl md:text-5xl text-gta-orange"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {String(value).padStart(2, "0")}
          </span>
        </div>
      </div>
      <span className="text-label text-white/40 text-xs">{label}</span>
    </div>
  );
}

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(getTimeLeft());
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(getTimeLeft());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      ref={ref}
      className="py-24 relative overflow-hidden"
      style={{ background: "linear-gradient(180deg, #0A0A0F 0%, #0d0015 100%)" }}
    >
      {/* Background glow */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-[800px] h-[300px] bg-gta-orange/5 blur-[100px] rounded-full" />
      </div>

      <div className="relative z-10 max-w-[1200px] mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <p className="text-label text-gta-orange mb-2">Launch Countdown</p>
          <h2
            className="text-display-lg text-white mb-12"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Coming Soon
          </h2>
        </motion.div>

        <motion.div
          className="grid grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr] items-center justify-center gap-1 md:gap-8"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <CountdownUnit value={timeLeft.days} label="DAYS" />
          <Separator />
          <CountdownUnit value={timeLeft.hours} label="HOURS" />
          <Separator />
          <CountdownUnit value={timeLeft.minutes} label="MINUTES" />
          <Separator />
          <CountdownUnit value={timeLeft.seconds} label="SECONDS" />
        </motion.div>

        <motion.p
          className="mt-10 text-white/30 text-label text-xs"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          Until November 19, 2026 &bull; Vice City, Leonida
        </motion.p>
      </div>
    </section>
  );
}

function Separator() {
  return (
    <div className="text-4xl md:text-5xl text-gta-orange/40 pb-6" style={{ fontFamily: "var(--font-display)" }}>
      :
    </div>
  );
}
