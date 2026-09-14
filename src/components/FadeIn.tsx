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
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    let animationFrame: number | undefined;
    let releaseTimeout: number | undefined;

    const releaseWillChange = () => {
      if (releaseTimeout !== undefined) {
        clearTimeout(releaseTimeout);
        releaseTimeout = undefined;
      }
      el.classList.remove("fade-in-revealing");
      el.removeEventListener("transitionend", handleTransitionEnd);
      el.removeEventListener("transitioncancel", handleTransitionEnd);
    };

    const handleTransitionEnd = (event: TransitionEvent) => {
      // Ignore transitions from descendants and wait for the reveal's opacity
      // transition, which is present for every FadeIn direction.
      if (event.target === el && event.propertyName === "opacity") {
        releaseWillChange();
      }
    };

    const reveal = () => {
      el.addEventListener("transitionend", handleTransitionEnd);
      el.addEventListener("transitioncancel", handleTransitionEnd);
      el.classList.add("fade-in-revealing");
      // Give the browser one frame to honor will-change before the transition.
      animationFrame = requestAnimationFrame(() => {
        el.classList.add("in-view");
        // Covers interrupted or disabled transitions, which do not emit
        // transitionend.
        releaseTimeout = window.setTimeout(
          releaseWillChange,
          Math.max(0, delay) * 1000 + 800,
        );
      });
    };

    if (trigger === "mount" || reducedMotion) {
      if (reducedMotion) {
        el.classList.add("in-view");
      } else {
        reveal();
      }
    } else {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            reveal();
            observer.unobserve(el);
          }
        },
        { rootMargin: `${margin} 0px` },
      );
      observer.observe(el);
      return () => {
        observer.disconnect();
        if (animationFrame !== undefined) cancelAnimationFrame(animationFrame);
        if (releaseTimeout !== undefined) clearTimeout(releaseTimeout);
        releaseWillChange();
      };
    }

    return () => {
      if (animationFrame !== undefined) cancelAnimationFrame(animationFrame);
      if (releaseTimeout !== undefined) clearTimeout(releaseTimeout);
      releaseWillChange();
    };
  }, [delay, margin, trigger]);

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
