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
      className={`transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:-translate-y-2 hover:scale-[1.03] ${className}`}
      style={{ "--ty": "32px", "--ts": "0.94" } as React.CSSProperties}
    >
      {children}
    </FadeIn>
  );
}
