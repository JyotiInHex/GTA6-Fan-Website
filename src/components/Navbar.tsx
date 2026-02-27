"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/trailers", label: "Trailers" },
  { href: "/characters", label: "Characters" },
  { href: "/world", label: "World" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-[200] transition-all duration-500 ${
          scrolled ? "py-3 glass border-b border-white/5" : "py-6"
        }`}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="max-w-[1600px] mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="group flex items-center gap-3">
            <svg
              fill="none"
              height="15%"
              width="15%"
              viewBox="0 0 46 35"
              aria-hidden="true"
              focusable="false"
            >
              <path
                d="M46.2661 0.800781H34.7236V34.4008H46.2661V0.800781Z"
                fill="currentColor"
              ></path>
              <path
                d="M33.9162 0.800781L17.3358 34.4008L0.776855 0.800781H12.3139L17.3332 11.5445L22.3766 0.800781H33.9162Z"
                fill="currentColor"
              ></path>
              <path
                d="M46.9194 1.43945C47.0056 1.43945 47.0488 1.47492 47.0488 1.54585C47.0488 1.60496 47.0155 1.63872 46.9489 1.64712L47.0573 1.81154H46.9939L46.8905 1.65148H46.828V1.81154H46.769V1.43945H46.9192H46.9194ZM46.8959 1.60465C46.9317 1.60465 46.9565 1.59999 46.9698 1.59065C46.9831 1.58132 46.9898 1.56561 46.9898 1.54336C46.9898 1.50541 46.9631 1.48628 46.9099 1.48628H46.8282V1.60465H46.8959Z"
                fill="currentColor"
              ></path>
              <path
                d="M46.8961 1.94775C46.7154 1.94775 46.5684 1.80355 46.5684 1.62622C46.5684 1.44889 46.7154 1.30469 46.8961 1.30469C47.0769 1.30469 47.2239 1.44889 47.2239 1.62622C47.2239 1.80355 47.0769 1.94775 46.8961 1.94775ZM46.8961 1.35509C46.7437 1.35509 46.6196 1.47673 46.6196 1.62638C46.6196 1.77602 46.7436 1.89767 46.8961 1.89767C47.0487 1.89767 47.1727 1.77602 47.1727 1.62638C47.1727 1.47673 47.0487 1.35509 46.8961 1.35509Z"
                fill="currentColor"
              ></path>
            </svg>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`relative text-label py-1 group transition-colors duration-300 ${
                  pathname === link.href
                    ? "text-gta-orange"
                    : "text-white/60 hover:text-white"
                }`}
              >
                {link.label}
                <span
                  className={`absolute bottom-0 left-0 h-px bg-gta-orange transition-all duration-300 ${
                    pathname === link.href ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </Link>
            ))}
            <a
              href="https://www.rockstargames.com/VI"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gta bg-gta-orange text-gta-dark px-5 py-2 text-label font-bold neon-border"
            >
              Official Site ↗
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <motion.span
              className="block w-6 h-0.5 bg-white origin-center"
              animate={menuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3 }}
            />
            <motion.span
              className="block w-6 h-0.5 bg-white"
              animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
              transition={{ duration: 0.3 }}
            />
            <motion.span
              className="block w-6 h-0.5 bg-white origin-center"
              animate={menuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3 }}
            />
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-[190] bg-gta-darker/95 backdrop-blur-xl flex flex-col items-center justify-center gap-8"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
          >
            {navLinks.map((link, i) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
              >
                <Link
                  href={link.href}
                  className={`text-display-lg hover:text-gta-orange transition-colors duration-300 ${
                    pathname === link.href ? "text-gta-orange" : "text-white"
                  }`}
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
            <motion.a
              href="https://www.rockstargames.com/VI"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 btn-gta bg-gta-orange text-gta-dark px-8 py-3 text-label font-bold"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.32, duration: 0.5 }}
            >
              Official Site ↗
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
