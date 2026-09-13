"use client";

import FadeIn from "./FadeIn";
import { ReactNode } from "react";

export default function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <FadeIn delay={delay} className={className}>
      {children}
    </FadeIn>
  );
}
