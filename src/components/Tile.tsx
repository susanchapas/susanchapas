"use client";

import FadeIn from "./FadeIn";
import { ReactNode } from "react";

export default function Tile({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <FadeIn
      delay={delay}
      direction="up"
      className={`transition-transform duration-500 ease-[var(--ease-liquid)] hover:-translate-y-1 hover:scale-[1.015] ${className}`}
      style={{ "--ty": "32px", "--ts": "0.94" } as React.CSSProperties}
    >
      {children}
    </FadeIn>
  );
}
