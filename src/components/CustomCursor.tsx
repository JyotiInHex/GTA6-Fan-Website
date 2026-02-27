"use client";

import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const mousePos = useRef({ x: 0, y: 0 });
  const ringPos = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number>();

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    const onMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      dot.style.left = `${e.clientX}px`;
      dot.style.top = `${e.clientY}px`;
    };

    const onMouseEnterLink = () => ring?.classList.add("hover");
    const onMouseLeaveLink = () => ring?.classList.remove("hover");

    const animate = () => {
      const lag = 0.12;
      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * lag;
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * lag;
      ring.style.left = `${ringPos.current.x}px`;
      ring.style.top = `${ringPos.current.y}px`;
      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    document.addEventListener("mousemove", onMouseMove);

    const links = document.querySelectorAll("a, button, [data-cursor-hover]");
    links.forEach((link) => {
      link.addEventListener("mouseenter", onMouseEnterLink);
      link.addEventListener("mouseleave", onMouseLeaveLink);
    });

    // Observer for dynamically added elements
    const observer = new MutationObserver(() => {
      document
        .querySelectorAll(
          "a:not([data-cursor-bound]), button:not([data-cursor-bound])",
        )
        .forEach((el) => {
          el.addEventListener("mouseenter", onMouseEnterLink);
          el.addEventListener("mouseleave", onMouseLeaveLink);
          (el as HTMLElement).dataset.cursorBound = "true";
        });
    });
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="hidden lg:block cursor-dot" />
      <div ref={ringRef} className="hidden lg:block cursor-ring" />
    </>
  );
}
