"use client";

import dynamic from "next/dynamic";
import { ReactNode, Suspense } from "react";

// Dynamically import Lenis for smooth scroll - only loads on desktop, non-blocking
const SmoothScrollCore = dynamic(() => import("./SmoothScrollCore"), {
  ssr: false,
});

interface SmoothScrollProviderProps {
  children: ReactNode;
}

export default function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  return (
    <>
      {children}
      <Suspense fallback={null}>
        <SmoothScrollCore />
      </Suspense>
    </>
  );
}
