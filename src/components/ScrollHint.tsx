"use client";

import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function ScrollHint() {
  const { scrollY } = useScroll();
  const [dismissed, setDismissed] = useState(false);

  useMotionValueEvent(scrollY, "change", (value) => {
    if (value > 160 && !dismissed) setDismissed(true);
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: dismissed ? 0 : 1 }}
      transition={{
        duration: dismissed ? 0.4 : 0.8,
        delay: dismissed ? 0 : 1.6,
        ease: [0.22, 1, 0.36, 1],
      }}
      aria-hidden="true"
      className="pointer-events-none absolute top-[calc(100vh-5.5rem)] left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 landscape:flex"
    >
      <span className="text-accent-lime font-display text-xs font-semibold tracking-[0.35em] uppercase">
        Scroll
      </span>
      <span className="border-accent-lime/60 bg-accent-lime/10 flex h-11 w-11 items-center justify-center rounded-full border-2 backdrop-blur-sm">
        <ChevronDown
          className="text-accent-lime animate-bounce-slow h-6 w-6"
          strokeWidth={2.5}
          aria-hidden="true"
        />
      </span>
    </motion.div>
  );
}
