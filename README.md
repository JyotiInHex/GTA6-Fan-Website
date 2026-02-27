# 🎮 Grand Theft Auto VI — Fan Website

A **fully animated, production-grade fan website** for Grand Theft Auto VI, built as a portfolio project showcasing modern web development techniques.

## 🚀 Live Demo
Deploy to Vercel with one click!

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/gta6-portfolio)

---

## ✨ Features

- **Smooth Scroll** — Lenis smooth scrolling throughout
- **GSAP ScrollTrigger** — Advanced scroll-based animations on every section
- **Framer Motion** — Page transitions, entrance animations, modal overlays
- **Parallax Hero** — Cinematic parallax effect on the main hero
- **Live Countdown** — Real-time countdown to November 19, 2026
- **Interactive Characters** — Click-to-expand character modals with full bios
- **World Explorer** — Click-to-explore location cards with details
- **Trailer Player** — Embedded YouTube trailers with custom play UI
- **Custom Cursor** — Animated cursor with hover states
- **Responsive** — Fully responsive on all screen sizes
- **Performance Optimized** — Next.js Image optimization, lazy loading

---

## 🛠 Tech Stack

| Technology | Purpose |
|---|---|
| **Next.js 14** | App Router, SSR, Image optimization |
| **TypeScript** | Type safety |
| **Tailwind CSS** | Utility-first styling |
| **Framer Motion** | React animations & transitions |
| **GSAP + ScrollTrigger** | Scroll-based animations & parallax |
| **Lenis** | Smooth scroll |

---

## 📦 Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🗂 Project Structure

```
src/
├── app/
│   ├── page.tsx          # Home page
│   ├── trailers/         # Trailers page
│   ├── characters/       # Characters page
│   ├── world/            # World/locations page
│   ├── layout.tsx        # Root layout
│   └── globals.css       # Global styles
├── components/
│   ├── Navbar.tsx         # Navigation
│   ├── ParallaxHero.tsx   # Hero with parallax
│   ├── Countdown.tsx      # Release countdown
│   ├── MarqueeSection.tsx # Scrolling marquee
│   ├── StorySection.tsx   # Story with GSAP
│   ├── CharacterPreview.tsx
│   ├── WorldSection.tsx
│   ├── CustomCursor.tsx
│   ├── SmoothScroll.tsx
│   └── Footer.tsx
```

---

## 🚀 Deploy to Vercel

1. Push this repository to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your repository
4. Click **Deploy** — no configuration needed!

---

## ⚠️ Disclaimer

This is a **fan-made portfolio project** and is **not affiliated with Rockstar Games or Take-Two Interactive** in any way.

All GTA VI images, logos, character names, and trademarks are the property of Rockstar Games / Take-Two Interactive.

---

## 📄 License

MIT — Free to use for portfolio/learning purposes.

---

*Built with ❤️ as a portfolio showcase project.*
