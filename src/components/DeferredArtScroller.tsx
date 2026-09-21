"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

const ArtScroller = dynamic(() => import("@/components/ArtScroller"), {
  ssr: false,
  loading: () => <div className="h-[40rem]" aria-hidden="true" />,
});

/** Loads this decorative, below-the-fold animation only when it is needed. */
export default function DeferredArtScroller() {
  const ref = useRef<HTMLDivElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element || shouldLoad) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: "600px 0px" },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [shouldLoad]);

  return <div ref={ref}>{shouldLoad ? <ArtScroller /> : <div className="h-[40rem]" aria-hidden="true" />}</div>;
}
