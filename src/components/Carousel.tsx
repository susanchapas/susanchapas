"use client";

import { type ReactNode, useCallback, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeftIcon, ChevronRightIcon } from "@/components/Icons";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export interface CarouselCtx {
  index: number;
  count: number;
  direction: number;
  prev: () => void;
  next: () => void;
  go: (i: number) => void;
  dots: ReactNode;
}

interface CarouselProps<T> {
  items: T[];
  renderSlide: (item: T, ctx: CarouselCtx) => ReactNode;
  ariaLabel: string;
  swipeable?: boolean;
  dotVariant?: "secondary" | "accent";
  controlsLayout?: "flanking" | "bottom" | "none";
  controlsClassName?: string;
  className?: string;
}

export function Carousel<T>({
  items,
  renderSlide,
  ariaLabel,
  swipeable,
  dotVariant = "accent",
  controlsLayout = "bottom",
  controlsClassName,
  className,
}: CarouselProps<T>) {
  const [active, setActive] = useState(0);
  const dirRef = useRef(0);
  const touchRef = useRef<number | null>(null);

  const go = useCallback(
    (i: number) => {
      setActive((prev) => {
        dirRef.current = i > prev ? 1 : -1;
        return i;
      });
    },
    [],
  );

  const prev = useCallback(
    () =>
      setActive((cur) => {
        dirRef.current = -1;
        return (cur - 1 + items.length) % items.length;
      }),
    [items.length],
  );

  const next = useCallback(
    () =>
      setActive((cur) => {
        dirRef.current = 1;
        return (cur + 1) % items.length;
      }),
    [items.length],
  );

  const onTouchStart = useCallback((e: React.TouchEvent) => {
    touchRef.current = e.touches[0].clientX;
  }, []);

  const onTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      if (touchRef.current === null) return;
      const delta = e.changedTouches[0].clientX - touchRef.current;
      if (Math.abs(delta) > 50) (delta < 0 ? next : prev)();
      touchRef.current = null;
    },
    [next, prev],
  );

  const touchProps = swipeable ? { onTouchStart, onTouchEnd } : {};

  const dotActive = "bg-accent-lime w-6";
  const dotInactive =
    dotVariant === "secondary"
      ? "bg-secondary/20 hover:bg-secondary/40 w-2"
      : "bg-accent-blue/30 hover:bg-accent-blue/50 w-2";

  const dots = items.map((_, i) => (
    <button
      key={i}
      type="button"
      onClick={() => go(i)}
      aria-label={`Go to ${ariaLabel} ${i + 1}`}
      className={`h-2 rounded-full transition-colors ${i === active ? dotActive : dotInactive}`}
    />
  ));

  const dotsEl = <div className="flex gap-2">{dots}</div>;
  const ctx: CarouselCtx = { index: active, count: items.length, direction: dirRef.current, prev, next, go, dots: dotsEl };

  if (controlsLayout === "none") {
    return (
      <div className={className} {...touchProps}>
        {renderSlide(items[active], ctx)}
      </div>
    );
  }

  if (controlsLayout === "flanking") {
    const arrowCls =
      "border-accent-blue/20 text-secondary hover:border-accent-lime hover:text-accent-lime shrink-0 rounded-full border p-2 transition-colors";

    return (
      <div className={className} {...touchProps}>
        <div className="flex items-center gap-3">
          <button type="button" onClick={prev} className={arrowCls} aria-label={`Previous ${ariaLabel}`}>
            <ChevronLeftIcon className="h-4 w-4 lg:h-5 lg:w-5" />
          </button>
          {renderSlide(items[active], ctx)}
          <button type="button" onClick={next} className={arrowCls} aria-label={`Next ${ariaLabel}`}>
            <ChevronRightIcon className="h-4 w-4 lg:h-5 lg:w-5" />
          </button>
        </div>
        <div className="mt-4 flex justify-center gap-2">{dots}</div>
      </div>
    );
  }

  const arrowCls =
    "border-accent-blue/20 bg-accent-blue/5 text-secondary hover:border-accent-lime hover:text-accent-lime flex h-10 w-10 shrink-0 items-center justify-center rounded-full border transition-colors";

  return (
    <div className={`flex flex-col gap-6 ${className || ""}`} {...touchProps}>
      <div className="flex items-center gap-4">
        <button type="button" onClick={prev} aria-label={`Previous ${ariaLabel}`} className={arrowCls}>
          <ChevronLeftIcon className="h-4 w-4" />
        </button>
        <div className="min-w-0 flex-1">
          {renderSlide(items[active], ctx)}
        </div>
        <button type="button" onClick={next} aria-label={`Next ${ariaLabel}`} className={arrowCls}>
          <ChevronRightIcon className="h-4 w-4" />
        </button>
      </div>
      <div className={`flex justify-center ${controlsClassName || ""}`}>
        <div className="flex gap-2">{dots}</div>
      </div>
    </div>
  );
}

export function CarouselSlide({
  slideKey,
  direction,
  offset = 40,
  className,
  children,
}: {
  slideKey: string | number;
  direction: number;
  offset?: number;
  className?: string;
  children: ReactNode;
}) {
  const variants = useMemo(
    () => ({
      initial: (d: number) => ({ opacity: 0, x: d * offset }),
      animate: { opacity: 1, x: 0 },
      // `popLayout` keeps the departing slide above its replacement while it
      // exits. Fade it as it moves so an old image cannot visibly overlay the
      // incoming slide.
      exit: (d: number) => ({ opacity: 0, x: d * -offset }),
    }),
    [offset],
  );

  return (
    <AnimatePresence mode="popLayout" initial={false} custom={direction}>
      <motion.div
        key={slideKey}
        custom={direction}
        variants={variants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{ duration: 0.25, ease: EASE }}
        className={className}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

const FADE_VARIANTS = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -16 },
};

export function CarouselFade({
  slideKey,
  className,
  children,
}: {
  slideKey: string | number;
  className?: string;
  children: ReactNode;
}) {
  return (
    <AnimatePresence mode="popLayout" initial={false}>
      <motion.div
        key={slideKey}
        variants={FADE_VARIANTS}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{ duration: 0.25, ease: EASE }}
        className={className}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
