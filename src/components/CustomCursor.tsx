"use client";

import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0 ||
      window.matchMedia("(pointer: coarse)").matches ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;
    el.hidden = false;

    const onMove = (e: MouseEvent) => {
      el.style.transform = `translate(${e.clientX}px,${e.clientY}px)`;
      if (!el.classList.contains("visible")) el.classList.add("visible");
    };

    let hovering = false;
    const onOver = (e: MouseEvent) => {
      const hit = !!(e.target as HTMLElement).closest(
        'a,button,[role="button"],input,textarea,select,[tabindex]:not([tabindex="-1"])'
      );
      if (hit !== hovering) {
        hovering = hit;
        el.classList.toggle("hovering", hit);
      }
    };

    const onDown = () => el.classList.add("clicking");
    const onUp = () => el.classList.remove("clicking");
    const onLeave = () => el.classList.remove("visible");
    const onEnter = () => el.classList.add("visible");

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    document.body.addEventListener("mouseleave", onLeave);
    document.body.addEventListener("mouseenter", onEnter);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      document.body.removeEventListener("mouseleave", onLeave);
      document.body.removeEventListener("mouseenter", onEnter);
    };
  }, []);

  return (
    <>
      <div ref={ref} className="cursor-dot" hidden aria-hidden="true" />
      <style jsx global>{`
        @media (pointer: fine) {
          * { cursor: none !important; }
        }

        .cursor-dot {
          position: fixed;
          top: 0;
          left: 0;
          z-index: 99999;
          pointer-events: none;
          mix-blend-mode: difference;
          width: 12px;
          height: 12px;
          margin: -6px 0 0 -6px;
          background: var(--accent-lime);
          border-radius: 50%;
          opacity: 0;
          will-change: transform;
          transition: width .2s, height .2s, margin .2s, opacity .15s;
        }

        .cursor-dot::after {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 40px;
          height: 40px;
          border: 2px solid rgb(111 205 157 / .5);
          border-radius: 50%;
          transition: width .2s, height .2s;
        }

        .cursor-dot.visible { opacity: 1; }

        .cursor-dot.hovering {
          width: 48px;
          height: 48px;
          margin: -24px 0 0 -24px;
        }
        .cursor-dot.hovering::after {
          width: 64px;
          height: 64px;
        }

        .cursor-dot.clicking {
          width: 8px;
          height: 8px;
          margin: -4px 0 0 -4px;
        }
        .cursor-dot.clicking::after {
          width: 24px;
          height: 24px;
        }
      `}</style>
    </>
  );
}
