import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "gta-orange": "#FF6B00",
        "gta-pink": "#FF2D6B",
        "gta-cyan": "#00E5FF",
        "gta-yellow": "#FFD600",
        "gta-purple": "#7B2FBE",
        "gta-dark": "#0A0A0F",
        "gta-darker": "#050508",
        "gta-card": "#111118",
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        body: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      animation: {
        "float": "float 6s ease-in-out infinite",
        "glow-pulse": "glowPulse 2s ease-in-out infinite",
        "scanline": "scanline 8s linear infinite",
        "text-shimmer": "textShimmer 3s ease-in-out infinite",
        "border-spin": "borderSpin 3s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        glowPulse: {
          "0%, 100%": { opacity: "1", filter: "drop-shadow(0 0 10px #FF6B00)" },
          "50%": { opacity: "0.7", filter: "drop-shadow(0 0 30px #FF6B00)" },
        },
        scanline: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100vh)" },
        },
        textShimmer: {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
        borderSpin: {
          "0%": { backgroundPosition: "0% 0%" },
          "100%": { backgroundPosition: "200% 200%" },
        },
      },
      backgroundImage: {
        "gradient-gta": "linear-gradient(135deg, #FF6B00, #FF2D6B, #7B2FBE)",
        "gradient-vice": "linear-gradient(180deg, #0A0A0F 0%, #1a0030 50%, #0d0020 100%)",
        "gradient-neon": "linear-gradient(90deg, #FF6B00, #FF2D6B, #00E5FF, #FF6B00)",
      },
    },
  },
  plugins: [],
};
export default config;
