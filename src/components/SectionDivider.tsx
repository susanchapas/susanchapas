"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

interface SectionDividerProps {
  variant?: "wave" | "diagonal" | "curved";
}

export default function SectionDivider({ variant = "wave" }: SectionDividerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [-30, 30]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 1, 0.3]);

  const renderPath = () => {
    switch (variant) {
      case "diagonal":
        return <path d="M0,100 L1440,0 L1440,100 Z" fill="url(#dividerGradient)" />;
      case "curved":
        return (
          <path
            d="M0,100 Q720,0 1440,100 L1440,100 L0,100 Z"
            fill="url(#dividerGradient)"
          />
        );
      case "wave":
      default:
        return (
          <path
            d="M0,50 C360,100 720,0 1080,50 C1260,75 1350,25 1440,50 L1440,100 L0,100 Z"
            fill="url(#dividerGradient)"
          />
        );
    }
  };

  return (
    <motion.div
      ref={ref}
      style={{ y, opacity }}
      className="pointer-events-none relative h-24 w-full overflow-hidden"
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1440 100"
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full"
      >
        <defs>
          <linearGradient id="dividerGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(187, 205, 243, 0.1)" />
            <stop offset="50%" stopColor="rgba(204, 255, 0, 0.15)" />
            <stop offset="100%" stopColor="rgba(224, 159, 125, 0.1)" />
          </linearGradient>
        </defs>
        {renderPath()}
      </svg>
    </motion.div>
  );
}
