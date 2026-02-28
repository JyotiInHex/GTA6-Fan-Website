"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

// ─────────────────────────────────────────────────────────────
// Data
// ─────────────────────────────────────────────────────────────
const navLinks = [
  { href: "/", label: "Home" },
  { href: "/trailers", label: "Trailers" },
  { href: "/characters", label: "Characters" },
  { href: "/world", label: "World" },
];

const tabs = ["People", "Places", "Trailers"] as const;
type Tab = (typeof tabs)[number];

type NavItem = {
  label: string;
  href: string;
  sub?: string;
  image?: string;
};

const tabContent: Record<Tab, NavItem[]> = {
  People: [
    {
      label: "Jason Duval",
      href: "/characters",
      sub: "Protagonist",
      image:
        "https://www.rockstargames.com/VI/_next/image?url=%2FVI%2F_next%2Fstatic%2Fmedia%2FJason_Duval_06.e498e308.jpg&w=1366&q=75",
    },
    {
      label: "Lucia Caminos",
      href: "/characters",
      sub: "Protagonist",
      image:
        "https://www.rockstargames.com/VI/_next/image?url=%2FVI%2F_next%2Fstatic%2Fmedia%2FLucia_Caminos_06.a158f77c.jpg&w=1366&q=75",
    },
    {
      label: "Cal Hampton",
      href: "/characters",
      sub: "Supporting",
      image:
        "https://www.rockstargames.com/VI/_next/image?url=%2FVI%2F_next%2Fstatic%2Fmedia%2FCal_Hampton_03.cba3d4d8.jpg&w=1366&q=75",
    },
    {
      label: "Boobie Ike",
      href: "/characters",
      sub: "Supporting",
      image:
        "https://www.rockstargames.com/VI/_next/image?url=%2FVI%2F_next%2Fstatic%2Fmedia%2FBoobie_Ike_01.8aee3bef.jpg&w=1366&q=75",
    },
    {
      label: "Dre'Quan Priest",
      href: "/characters",
      sub: "Supporting",
      image:
        "https://www.rockstargames.com/VI/_next/image?url=%2FVI%2F_next%2Fstatic%2Fmedia%2FDreQuan_Priest_03.7aa48b92.jpg&w=1366&q=75",
    },
    {
      label: "Real Dimez",
      href: "/characters",
      sub: "Supporting",
      image:
        "https://www.rockstargames.com/VI/_next/image?url=%2FVI%2F_next%2Fstatic%2Fmedia%2FReal_Dimez_01.c74db009.jpg&w=1366&q=75",
    },
    {
      label: "Raul Bautista",
      href: "/characters",
      sub: "Supporting",
      image:
        "https://www.rockstargames.com/VI/_next/image?url=%2FVI%2F_next%2Fstatic%2Fmedia%2FRaul_Bautista_03.f57b4046.jpg&w=1366&q=75",
    },
    {
      label: "Brian Heder",
      href: "/characters",
      sub: "Supporting",
      image:
        "https://www.rockstargames.com/VI/_next/image?url=%2FVI%2F_next%2Fstatic%2Fmedia%2FBrian_Heder_03.1bd6d8bd.jpg&w=1366&q=75",
    },
  ],
  Places: [
    {
      label: "Vice City",
      href: "/world",
      sub: "Urban Metropolis",
      image:
        "https://www.rockstargames.com/VI/_next/image?url=%2FVI%2F_next%2Fstatic%2Fmedia%2FVice_City_01.332891cf.jpg&w=1366&q=75",
    },
    {
      label: "Leonida Keys",
      href: "/world",
      sub: "Island Chain",
      image:
        "https://www.rockstargames.com/VI/_next/image?url=%2FVI%2F_next%2Fstatic%2Fmedia%2FLeonida_Keys_04.ef02d8b3.jpg&w=1366&q=75",
    },
    {
      label: "Grassrivers",
      href: "/world",
      sub: "Wilderness",
      image:
        "https://www.rockstargames.com/VI/_next/image?url=%2FVI%2F_next%2Fstatic%2Fmedia%2FGrassrivers_02.9d9c5cbf.jpg&w=1366&q=75",
    },
    {
      label: "Port Gellhorn",
      href: "/world",
      sub: "Industrial Port",
      image:
        "https://www.rockstargames.com/VI/_next/image?url=%2FVI%2F_next%2Fstatic%2Fmedia%2FPort_Gellhorn_04.580f17d9.jpg&w=1366&q=75",
    },
    {
      label: "Ambrosia",
      href: "/world",
      sub: "Luxury Resort",
      image:
        "https://www.rockstargames.com/VI/_next/image?url=%2FVI%2F_next%2Fstatic%2Fmedia%2FAmbrosia_03.6a1e258e.jpg&w=1366&q=75",
    },
    {
      label: "Mount Kalaga",
      href: "/world",
      sub: "Highland",
      image:
        "https://www.rockstargames.com/VI/_next/image?url=%2FVI%2F_next%2Fstatic%2Fmedia%2FMount_Kalaga_National_Park_02.ec9a34c4.jpg&w=1366&q=75",
    },
  ],
  Trailers: [
    {
      label: "Trailer 1",
      href: "/trailers",
      sub: "December 5, 2023",
      image: "https://img.youtube.com/vi/QdBZY2fkU-0/maxresdefault.jpg",
    },
    {
      label: "Trailer 2",
      href: "/trailers",
      sub: "May 6, 2025",
      image: "https://img.youtube.com/vi/VQRLujxTm3c/maxresdefault.jpg",
    },
  ],
};

// ─────────────────────────────────────────────────────────────
// useBodyLock — position:fixed is the only iOS Safari safe approach
// ─────────────────────────────────────────────────────────────
function useBodyLock(active: boolean) {
  useEffect(() => {
    if (!active) return;
    const scrollY = window.scrollY;
    const scrollbarW = window.innerWidth - document.documentElement.clientWidth;
    Object.assign(document.body.style, {
      position: "fixed",
      top: `-${scrollY}px`,
      left: "0",
      right: "0",
      overflow: "hidden",
      paddingRight: `${scrollbarW}px`,
    });
    return () => {
      Object.assign(document.body.style, {
        position: "",
        top: "",
        left: "",
        right: "",
        overflow: "",
        paddingRight: "",
      });
      window.scrollTo({ top: scrollY, behavior: "instant" as ScrollBehavior });
    };
  }, [active]);
}

// ─────────────────────────────────────────────────────────────
// useWheelTrap — hard JS boundary on scroll element
// ─────────────────────────────────────────────────────────────
function useWheelTrap<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      const { scrollTop, scrollHeight, clientHeight } = el;
      if (
        (scrollTop <= 0 && e.deltaY < 0) ||
        (scrollTop + clientHeight >= scrollHeight - 1 && e.deltaY > 0)
      ) {
        e.preventDefault();
        e.stopPropagation();
      }
    };
    let ty = 0;
    const onTS = (e: TouchEvent) => {
      ty = e.touches[0].clientY;
    };
    const onTM = (e: TouchEvent) => {
      const dy = ty - e.touches[0].clientY;
      const { scrollTop, scrollHeight, clientHeight } = el;
      if (
        (scrollTop <= 0 && dy < 0) ||
        (scrollTop + clientHeight >= scrollHeight - 1 && dy > 0)
      ) {
        e.preventDefault();
        e.stopPropagation();
      }
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    el.addEventListener("touchstart", onTS, { passive: true });
    el.addEventListener("touchmove", onTM, { passive: false });
    return () => {
      el.removeEventListener("wheel", onWheel);
      el.removeEventListener("touchstart", onTS);
      el.removeEventListener("touchmove", onTM);
    };
  }, []);
  return ref;
}

// Backdrop: just opacity
const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.25 } },
  exit: { opacity: 0, transition: { duration: 0.3, delay: 0.18 } },
};

// Left panel: slides from left, exits back left
const leftPanelVariants = {
  hidden: { x: "-100%", opacity: 0 },
  visible: {
    x: "0%",
    opacity: 1,
    transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
  },
  exit: {
    x: "-100%",
    opacity: 0,
    transition: { duration: 0.4, ease: [0.4, 0, 1, 1] },
  },
};

// Right panel on DESKTOP: slides from right
// On MOBILE: slides up from bottom
// We pass a `mobile` prop to choose the variant
const rightPanelDesktop = {
  hidden: { x: "100%", opacity: 0 },
  visible: {
    x: "0%",
    opacity: 1,
    transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
  },
  exit: {
    x: "100%",
    opacity: 0,
    transition: { duration: 0.4, ease: [0.4, 0, 1, 1] },
  },
};

const rightPanelMobile = {
  hidden: { y: "100%", opacity: 0 },
  visible: {
    y: "0%",
    opacity: 1,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
  exit: {
    y: "100%",
    opacity: 0,
    transition: { duration: 0.38, ease: [0.4, 0, 1, 1] },
  },
};

// List items stagger in after panel
const listVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.04, delayChildren: 0.15 } },
  exit: { transition: { staggerChildren: 0.02, staggerDirection: -1 } },
};

const itemVariants = {
  hidden: { opacity: 0, x: 20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
  },
  exit: { opacity: 0, x: 10, transition: { duration: 0.15 } },
};

// Hamburger → X morph
const topBarVariants = {
  open: { rotate: 45, y: 8 },
  closed: { rotate: 0, y: 0 },
};
const midBarVariants = {
  open: { opacity: 0, scaleX: 0 },
  closed: { opacity: 1, scaleX: 1 },
};
const bottomBarVariants = {
  open: { rotate: -45, y: -8 },
  closed: { rotate: 0, y: 0 },
};

// ─────────────────────────────────────────────────────────────
// MenuOverlay
// ─────────────────────────────────────────────────────────────
function MenuOverlay({ onClose }: { onClose: () => void }) {
  const [activeTab, setActiveTab] = useState<Tab>("People");
  const [hoveredItem, setHoveredItem] = useState<NavItem | null>(null);
  const pathname = usePathname();

  useBodyLock(true);
  const listRef = useWheelTrap<HTMLDivElement>();

  useEffect(() => {
    const fn = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [onClose]);

  useEffect(() => {
    if (listRef.current) listRef.current.scrollTop = 0;
  }, [activeTab]);

  const items = tabContent[activeTab];

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex overflow-hidden"
      variants={backdropVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      onWheel={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
      onTouchMove={(e) => e.stopPropagation()}
    >
      {/* Semi-transparent backdrop behind everything */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      {/* ═══════ LEFT PANEL — desktop only ═══════ */}
      <motion.div
        className="
          relative hidden md:flex flex-col justify-between
          w-[40%] lg:w-[36%]
          bg-[#08080f]
          border-r border-white/[0.06]
          overflow-hidden
        "
        variants={leftPanelVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        {/* Default BG */}
        <div className="absolute inset-0">
          <Image
            src="https://www.rockstargames.com/VI/_next/image?url=%2FVI%2F_next%2Fstatic%2Fmedia%2FJason_and_Lucia_01_With_Logos_square.35d8f26b.jpg&w=1366&q=75"
            alt=""
            fill
            className="object-cover object-center opacity-75"
            unoptimized
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[#08080f]/65 via-[#08080f]/35 to-[#08080f]/72" />
        </div>

        {/* Hover preview */}
        <AnimatePresence>
          {hoveredItem?.image && (
            <motion.div
              key={hoveredItem.image}
              className="absolute inset-0 z-[1]"
              initial={{ opacity: 0, scale: 1.04 }}
              animate={{
                opacity: 1,
                scale: 1,
                transition: { duration: 0.4, ease: "easeOut" },
              }}
              exit={{ opacity: 0, scale: 1.02, transition: { duration: 0.25 } }}
            >
              <Image
                src={hoveredItem.image}
                alt=""
                fill
                className="object-cover object-top"
                unoptimized
                aria-hidden="true"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-[#08080f]/60 via-[#08080f]/20 to-[#08080f]/65" />
              <div className="absolute inset-0 bg-gradient-to-t  from-[#08080f]/80 via-transparent to-transparent" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Orb */}
        <motion.div
          aria-hidden="true"
          className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full blur-[130px] pointer-events-none z-[2]"
          animate={{
            background: hoveredItem
              ? "rgba(255,107,0,0.13)"
              : "rgba(200,168,75,0.06)",
          }}
          transition={{ duration: 0.6 }}
        />

        {/* Logo */}
        <div className="relative z-[3] p-10 flex-shrink-0">
          <Link href="/" onClick={onClose}>
            <Image
              src="https://www.rockstargames.com/VI/_next/image?url=%2FVI%2F_next%2Fstatic%2Fmedia%2Fvi.b9b99ab9.png&w=3840&q=75"
              alt="Grand Theft Auto VI"
              width={220}
              height={70}
              className="w-auto h-11 drop-shadow-2xl"
              unoptimized
            />
          </Link>
        </div>

        {/* Ghost label */}
        <div className="relative z-[3] flex-1 flex items-center px-10 select-none overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.p
              key={hoveredItem?.label ?? activeTab}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0, transition: { duration: 0.28 } }}
              exit={{ opacity: 0, y: -12, transition: { duration: 0.18 } }}
              className="uppercase leading-none break-words"
              style={{
                fontFamily: "'Oswald', sans-serif",
                fontSize: "clamp(2rem, 4.5vw, 4rem)",
                letterSpacing: "0.04em",
                color: hoveredItem
                  ? "rgba(255,255,255,0.92)"
                  : "rgba(255,255,255,0.72)",
              }}
            >
              {hoveredItem?.label ?? activeTab}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* Bottom */}
        <div className="relative z-[3] p-10 flex-shrink-0">
          <p className="font-mono text-[10px] tracking-[0.35em] text-white/22 uppercase">
            Coming November 19, 2026
          </p>
          <p className="font-mono text-[10px] tracking-[0.25em] text-white/13 uppercase mt-1">
            PlayStation 5 · Xbox Series X|S
          </p>
        </div>
      </motion.div>

      {/* ═══════ RIGHT PANEL ═══════ */}
      {/*
        OPEN:  slides in from right (desktop) / up from bottom (mobile)
        CLOSE: reverses exactly — slides right / slides down
        The panel is a flex-col with 3 fixed zones + 1 scrollable zone.
      */}
      <motion.div
        className="
          relative flex flex-col flex-1
          bg-[#0c0c11]
          overflow-hidden
        "
        variants={rightPanelDesktop}
        initial="hidden"
        animate="visible"
        exit="exit"
        // Override for mobile via inline style trick — we use CSS breakpoint via
        // a wrapping div instead since Framer variants can't read CSS breakpoints.
      >
        {/* Mobile: slide-up overlay — covers full screen on small devices */}
        {/* We re-animate for mobile using a CSS media wrapper approach:
            On mobile the left panel is hidden so right panel IS the full overlay.
            We want it to slide up from bottom on mobile.
            Solution: render a second motion.div clone for mobile, hide desktop one.
            Simpler: use CSS to control which variant plays via data attribute. */}

        {/* Noise */}
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-[0.02] pointer-events-none z-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          }}
        />

        {/* ── TOP BAR (flex-shrink-0) ── */}
        <div
          className="
          relative z-10 flex-shrink-0
          flex items-center justify-between gap-3
          px-5 sm:px-8 md:px-12
          pt-5 sm:pt-6 pb-4 sm:pb-5
          border-b border-white/[0.07]
        "
        >
          {/* Tabs */}
          <div className="flex items-center gap-0.5 sm:gap-1">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`
                  relative px-3.5 sm:px-5 py-1.5 sm:py-2 rounded-full
                  text-[11px] sm:text-xs font-semibold tracking-[0.12em] sm:tracking-[0.15em] uppercase
                  transition-colors duration-250 z-10 whitespace-nowrap
                  ${activeTab === tab ? "text-black" : "text-white/40 hover:text-white/80"}
                `}
                style={{ fontFamily: "'Oswald', sans-serif" }}
              >
                {activeTab === tab && (
                  <motion.span
                    layoutId="tab-pill"
                    className="absolute inset-0 rounded-full bg-white -z-10"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                {tab}
              </button>
            ))}
          </div>

          {/* Close button — always in fixed header, always visible */}
          <motion.button
            onClick={onClose}
            aria-label="Close menu"
            className="
              flex-shrink-0 ml-auto
              w-9 h-9 sm:w-10 sm:h-10 rounded-full
              border border-white/20 bg-white/[0.06]
              flex items-center justify-center
              text-white/55 hover:text-white
              hover:border-white/40 hover:bg-white/[0.12]
              transition-colors duration-200
              group
            "
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.93 }}
          >
            <motion.svg
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              className="group-hover:text-white text-white/55 transition-colors"
              initial={{ rotate: 0 }}
              animate={{ rotate: 0 }}
              whileHover={{ rotate: 90 }}
              transition={{ duration: 0.3 }}
            >
              <path
                d="M6 6L18 18M18 6L6 18"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
              />
            </motion.svg>
          </motion.button>
        </div>

        {/* ── SCROLL LIST (flex-1 min-h-0) ── */}
        <div
          ref={listRef}
          className="
            relative z-10
            flex-1 min-h-0
            overflow-y-scroll overscroll-y-contain
            px-5 sm:px-8 md:px-12
            py-2
            [&::-webkit-scrollbar]:w-[2px]
            [&::-webkit-scrollbar-thumb]:rounded-full
            [&::-webkit-scrollbar-thumb]:bg-white/10
            [&::-webkit-scrollbar-thumb:hover]:bg-white/25
          "
          onWheel={(e) => {
            const el = e.currentTarget;
            const { scrollTop, scrollHeight, clientHeight } = el;
            if (
              (scrollTop <= 0 && e.deltaY < 0) ||
              (scrollTop + clientHeight >= scrollHeight - 1 && e.deltaY > 0)
            ) {
              e.stopPropagation();
            }
          }}
        >
          <AnimatePresence mode="wait">
            <motion.ul
              key={activeTab}
              variants={listVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="list-none py-1"
            >
              {items.map((item, i) => (
                <motion.li key={item.label} variants={itemVariants}>
                  <Link
                    href={item.href}
                    onClick={onClose}
                    onMouseEnter={() => setHoveredItem(item)}
                    onMouseLeave={() => setHoveredItem(null)}
                    className="
                      group flex items-center justify-between
                      py-4 sm:py-5 md:py-[1.35rem]
                      border-b border-white/[0.05] hover:border-white/[0.13]
                      transition-colors duration-200
                    "
                  >
                    <div className="flex items-center gap-4 sm:gap-5 min-w-0">
                      <span className="font-mono text-[10px] w-5 sm:w-6 flex-shrink-0 text-white/15 group-hover:text-white/35 transition-colors duration-250 tabular-nums">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div className="min-w-0">
                        <span
                          className="block uppercase tracking-[0.04em] leading-[1.1] text-white/70 group-hover:text-white transition-colors duration-200"
                          style={{
                            fontFamily: "'Oswald', sans-serif",
                            fontSize: "clamp(1.2rem, 2.6vw, 2.3rem)",
                          }}
                        >
                          {item.label}
                        </span>
                        {item.sub && (
                          <span className="block font-mono text-[10px] tracking-[0.2em] uppercase mt-0.5 text-white/18 group-hover:text-white/42 transition-colors duration-250">
                            {item.sub}
                          </span>
                        )}
                      </div>
                    </div>
                    <motion.svg
                      className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0 ml-4 text-white/14 group-hover:text-white/55"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      whileHover={{ x: 4 }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 20,
                      }}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </motion.svg>
                  </Link>
                </motion.li>
              ))}
            </motion.ul>
          </AnimatePresence>
        </div>

        {/* ── FOOTER (flex-shrink-0) ── */}
        <div
          className="
          relative z-10 flex-shrink-0
          border-t border-white/[0.07]
          px-5 sm:px-8 md:px-12
          py-3 sm:py-4
        "
        >
          <div className="flex items-center gap-4 sm:gap-5 flex-wrap">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={onClose}
                className={`
                  font-mono text-[10px] tracking-[0.22em] uppercase whitespace-nowrap
                  transition-colors duration-250
                  ${pathname === link.href ? "text-[#C8A84B]" : "text-white/25 hover:text-white/60"}
                `}
              >
                {link.label}
              </Link>
            ))}
            <a
              href="https://www.rockstargames.com/VI"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-auto flex items-center gap-1.5 flex-shrink-0 font-mono text-[10px] tracking-[0.22em] uppercase text-[#C8A84B]/50 hover:text-[#C8A84B] transition-colors duration-250"
            >
              Official Site
              <svg
                className="w-3 h-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
            </a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────
// Navbar
// ─────────────────────────────────────────────────────────────
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <motion.nav
        className={`
          fixed top-0 left-0 right-0 z-[200]
          transition-all duration-500
          ${
            scrolled
              ? "py-3 bg-[#0a0a0f]/92 backdrop-blur-xl border-b border-white/[0.06]"
              : "py-5 sm:py-6"
          }
          ${menuOpen ? "pointer-events-none" : ""}
        `}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="max-w-[1600px] mx-auto px-5 sm:px-6 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="group flex-shrink-0">
            <svg
              fill="currentColor"
              height="24"
              width="24"
              viewBox="0 0 47 36"
              className="text-white group-hover:text-[#C8A84B] transition-colors duration-300"
              aria-label="Rockstar Games"
            >
              <path d="M46.2661 0.800781H34.7236V34.4008H46.2661V0.800781Z" />
              <path d="M33.9162 0.800781L17.3358 34.4008L0.776855 0.800781H12.3139L17.3332 11.5445L22.3766 0.800781H33.9162Z" />
            </svg>
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`
                  relative font-mono text-xs tracking-[0.22em] uppercase py-1 group
                  transition-colors duration-300
                  ${pathname === link.href ? "text-[#C8A84B]" : "text-white/50 hover:text-white"}
                `}
              >
                {link.label}
                <span
                  className={`absolute bottom-0 left-0 h-px bg-[#C8A84B] transition-all duration-300 ${pathname === link.href ? "w-full" : "w-0 group-hover:w-full"}`}
                />
              </Link>
            ))}
            <a
              href="https://www.rockstargames.com/VI"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 font-mono text-xs tracking-[0.18em] uppercase border border-[#C8A84B]/50 text-[#C8A84B] hover:bg-[#C8A84B] hover:text-black transition-all duration-300"
            >
              Official Site ↗
            </a>
          </div>

          {/* ── Hamburger / X morph ── */}
          <motion.button
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            className="group flex flex-col justify-center gap-[5px] p-2 ml-2 flex-shrink-0"
            animate={menuOpen ? "open" : "closed"}
          >
            <motion.span
              className="block h-px bg-white/65 origin-center"
              style={{ width: 24 }}
              variants={topBarVariants}
              transition={{ duration: 0.3 }}
            />
            <motion.span
              className="block h-px bg-white/65 origin-center"
              style={{ width: 16 }}
              variants={midBarVariants}
              transition={{ duration: 0.2 }}
            />
            <motion.span
              className="block h-px bg-white/65 origin-center"
              style={{ width: 24 }}
              variants={bottomBarVariants}
              transition={{ duration: 0.3 }}
            />
          </motion.button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {menuOpen && <MenuOverlay onClose={() => setMenuOpen(false)} />}
      </AnimatePresence>
    </>
  );
}
