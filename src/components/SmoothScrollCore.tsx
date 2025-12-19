"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";

export default function SmoothScrollCore() {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Check if touch device - skip Lenis on touch devices
    const isTouchDevice =
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0 ||
      window.matchMedia("(pointer: coarse)").matches;

    if (isTouchDevice) return;

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) return;

    // Delay initialization to avoid blocking main thread
    const timeoutId = setTimeout(() => {
      const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: "vertical",
        gestureOrientation: "vertical",
        smoothWheel: true,
        touchMultiplier: 2,
      });

      lenisRef.current = lenis;

      function raf(time: number) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }

      requestAnimationFrame(raf);
    }, 100);

    return () => {
      clearTimeout(timeoutId);
      if (lenisRef.current) {
        lenisRef.current.destroy();
      }
    };
  }, []);

  return null;
}
