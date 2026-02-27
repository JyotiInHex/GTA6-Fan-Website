import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import CustomCursor from "@/components/CustomCursor";
import SmoothScroll from "@/components/SmoothScroll";

export const metadata: Metadata = {
  title: "Grand Theft Auto VI | November 19, 2026",
  description:
    "Grand Theft Auto VI. Vice City, USA. Coming November 19, 2026 to PlayStation 5 and Xbox Series X|S. Jason and Lucia in the darkest side of the sunniest place in America.",
  keywords: ["GTA 6", "GTA VI", "Grand Theft Auto", "Rockstar Games", "Vice City", "Leonida"],
  openGraph: {
    title: "Grand Theft Auto VI | November 19, 2026",
    description: "Vice City, USA. Coming November 19, 2026.",
    images: [
      {
        url: "https://www.rockstargames.com/VI/_next/image?url=%2FVI%2F_next%2Fimage%3Furl%3D%252FVI%252F_next%252Fstatic%252Fmedia%252FheroKeyArt_mobile.9d16011a.jpg%26w%3D3840%26q%3D100&w=1200&q=75",
        width: 1200,
        alt: "GTA VI Key Art",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow+Condensed:ital,wght@0,300;0,400;0,600;0,700;0,900;1,300;1,400;1,700&family=Space+Mono:ital,wght@0,400;0,700;1,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-gta-darker text-white antialiased">
        <SmoothScroll>
          <div className="noise-overlay" />
          <div className="scanlines" />
          <CustomCursor />
          <Navbar />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
