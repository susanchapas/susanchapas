"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { createPortal } from "react-dom";
import { useEffect, useState } from "react";

const items = [
  { src: "/assets/projects/archlog/archlog-research/quote1.webp", alt: "Student quote about design process" },
  { src: "/assets/projects/archlog/archlog-research/bar1.webp", alt: "Bar chart of survey responses" },
  { src: "/assets/projects/archlog/archlog-research/pie-1.webp", alt: "Pie chart of design habits" },
  { src: "/assets/projects/archlog/archlog-research/quote2.webp", alt: "Student quote about iteration" },
  { src: "/assets/projects/archlog/archlog-research/bar2.webp", alt: "Bar chart of tool usage" },
  { src: "/assets/projects/archlog/archlog-research/pie2.webp", alt: "Pie chart of process challenges" },
  { src: "/assets/projects/archlog/archlog-research/quote3.webp", alt: "Student quote about critique prep" },
  { src: "/assets/projects/archlog/archlog-research/bar3.webp", alt: "Bar chart of documentation habits" },
];

export default function ResearchPinboard() {
  const [selected, setSelected] = useState<number | null>(null);

  useEffect(() => {
    if (selected === null) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelected(null);
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
    };
  }, [selected]);

  return (
    <div className="overflow-hidden rounded-2xl">
      <div className="flex overflow-hidden">
        <div
          className="animate-marquee flex gap-6 px-3 hover:[animation-play-state:paused]"
          style={{ width: "max-content", willChange: "transform" }}
        >
          {[...items, ...items].map((item, i) => (
            <button
              key={`${item.alt}-${i}`}
              type="button"
              onClick={() => {
                if (window.innerWidth >= 1024) setSelected(i % items.length);
              }}
              className="relative h-52 w-80 flex-shrink-0 overflow-hidden rounded-xl border border-white/10 transition-transform duration-300 hover:scale-[1.03] lg:cursor-pointer"
              aria-label={`View: ${item.alt}`}
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                loading="lazy"
                className="object-contain"
                sizes="20rem"
              />
            </button>
          ))}
        </div>
      </div>

      {selected !== null && createPortal(
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-6 sm:p-10 lg:p-16"
          >
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setSelected(null)} />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ type: "spring", stiffness: 200, damping: 24 }}
              className="relative max-w-fit overflow-hidden rounded-2xl border border-accent-blue/30 bg-accent-blue/15 p-3 shadow-2xl"
            >
              <button
                type="button"
                onClick={() => setSelected(null)}
                aria-label="Close"
                className="absolute top-4 right-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-accent-blue/30 text-white backdrop-blur transition-colors hover:bg-accent-blue/50"
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 6l12 12M6 18L18 6" />
                </svg>
              </button>
              <Image
                src={items[selected].src}
                alt={items[selected].alt}
                width={1280}
                height={800}
                className="h-[350px] w-auto rounded-xl object-contain"
                sizes="100vw"
              />
            </motion.div>
          </motion.div>
        </AnimatePresence>,
        document.body
      )}
    </div>
  );
}
