"use client";

import { useRef, useEffect, type ReactNode, type CSSProperties } from "react";

type FadeDirection = "up" | "down" | "left" | "right" | "scale" | "none";

const TRANSFORMS: Record<FadeDirection, CSSProperties> = {
  up: { "--tx": "0", "--ty": "40px", "--ts": "1" } as CSSProperties,
  down: { "--tx": "0", "--ty": "-40px", "--ts": "1" } as CSSProperties,
  left: { "--tx": "-40px", "--ty": "0", "--ts": "1" } as CSSProperties,
  right: { "--tx": "40px", "--ty": "0", "--ts": "1" } as CSSProperties,
  scale: { "--tx": "0", "--ty": "0", "--ts": "0.9" } as CSSProperties,
  none: {} as CSSProperties,
};

interface FadeInProps {
  children: ReactNode;
  as?: keyof React.JSX.IntrinsicElements;
  direction?: FadeDirection;
  delay?: number;
  className?: string;
  margin?: string;
  trigger?: "scroll" | "mount";
  style?: CSSProperties;
}

export default function FadeIn({
  children,
  as: Tag = "div",
  direction = "up",
  delay = 0,
  className = "",
  margin = "-80px",
  trigger = "scroll",
  style,
}: FadeInProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (
      trigger === "mount" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      el.classList.add("in-view");
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("in-view");
          observer.unobserve(el);
        }
      },
      { rootMargin: `${margin} 0px` },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [margin, trigger]);

  const mergedStyle: CSSProperties = {
    ...TRANSFORMS[direction],
    ...(delay ? { transitionDelay: `${Math.round(delay * 1000) / 1000}s` } : {}),
    ...style,
  };

  return (
    // @ts-expect-error — polymorphic ref
    <Tag ref={ref} className={`fade-in ${className}`} style={mergedStyle}>
      {children}
    </Tag>
  );
}
