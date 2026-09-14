"use client";

import { motion, useReducedMotion } from "framer-motion";
import FadeIn from "./FadeIn";
import { ReactNode } from "react";
import { SPRING_HOVER } from "@/lib/motion";

export default function Tile({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduce = useReducedMotion();

  return (
    <FadeIn
      delay={delay}
      direction="up"
      style={{ "--ty": "32px", "--ts": "0.94" } as React.CSSProperties}
    >
      <motion.div
        className={className}
        whileHover={reduce ? undefined : { scale: 1.03, y: -6 }}
        transition={SPRING_HOVER}
      >
        {children}
      </motion.div>
    </FadeIn>
  );
}
