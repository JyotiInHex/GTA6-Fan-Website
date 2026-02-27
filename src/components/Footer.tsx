"use client";

import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer
      className="relative py-16 border-t border-white/5"
      style={{
        background: "linear-gradient(180deg, #0A0A0F 0%, #050508 100%)",
      }}
    >
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="group flex items-center gap-3">
              <svg
                fill="none"
                height="9%"
                width="9%"
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
            <p
              className="text-sm text-white/80 max-w-xs leading-relaxed"
              style={{ fontFamily: "var(--font-body)" }}
            >
              A Rockstar Games production. Coming November 19, 2026 to
              PlayStation 5 and Xbox Series X|S.
            </p>
          </div>

          {/* Nav */}
          <div>
            <p className="text-label text-gta-orange text-xs mb-5">
              Navigation
            </p>
            <ul className="space-y-3">
              {[
                { href: "/", label: "Home" },
                { href: "/trailers", label: "Trailers" },
                { href: "/characters", label: "Characters" },
                { href: "/world", label: "World" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-base font-semibold text-white/40 hover:text-white transition-colors duration-300"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* External */}
          <div>
            <p className="text-label text-gta-orange text-xs mb-5">
              Official Links
            </p>
            <ul className="space-y-3">
              {[
                {
                  href: "https://www.rockstargames.com/VI",
                  label: "Rockstar Games",
                },
                {
                  href: "https://www.playstation.com/games/grand-theft-auto-vi",
                  label: "Wishlist on PS5",
                },
                {
                  href: "https://www.xbox.com/en-US/games/store/grand-theft-auto-vi/9nl3wwnzlzzn",
                  label: "Wishlist on Xbox",
                },
              ].map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-base font-semibold text-white/40 hover:text-gta-cyan transition-colors duration-300"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    {link.label} ↗
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/5 pt-8 flex flex-col items-center justify-between gap-4">
          <p className="text-label text-xs text-center text-white/40">
            This is an independent fan-made portfolio project inspired by Grand
            Theft Auto VI. It is not affiliated with, endorsed by, or sponsored
            by Rockstar Games or Take-Two Interactive.
          </p>
          <p className="text-label text-xs text-center text-white/40">
            Grand Theft Auto and GTA VI are trademarks of Rockstar Games. All
            game-related content and assets belong to their respective owners.
          </p>
        </div>
      </div>
    </footer>
  );
}
