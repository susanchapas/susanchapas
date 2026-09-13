"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useRef,
  useEffect,
  ReactNode,
} from "react";
import { useRouter, usePathname } from "next/navigation";

const COLS = 6;
const ROWS = 4;
const STAGGER = 18;
const MAX_DELAY = (COLS - 1 + ROWS - 1) * STAGGER;
const SAFETY_TIMEOUT = 800;

type Phase = "idle" | "covering" | "holding" | "revealing";

interface TransitionContextType {
  phase: Phase;
  triggerTransition: (href: string) => void;
}

const TransitionContext = createContext<TransitionContextType | null>(null);

export function usePageTransition() {
  return useContext(TransitionContext);
}

const tiles = Array.from({ length: ROWS * COLS }, (_, i) => {
  const r = Math.floor(i / COLS);
  const c = i % COLS;
  const dIn = (COLS - 1 - c + r) * STAGGER;
  return { r, c, dIn, dOut: MAX_DELAY - dIn };
});

function PixelMorphOverlay({
  phase,
  onCoverDone,
  onRevealDone,
}: {
  phase: Phase;
  onCoverDone: () => void;
  onRevealDone: () => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const lastEnterRef = useRef<HTMLDivElement>(null);
  const lastExitRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (phase !== "covering" && phase !== "revealing") return;

    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      (phase === "covering" ? onCoverDone : onRevealDone)();
      return;
    }

    const el = containerRef.current;
    if (!el) return;

    const done = phase === "covering" ? onCoverDone : onRevealDone;
    const lastTile = phase === "covering" ? lastEnterRef.current : lastExitRef.current;
    const safety = setTimeout(done, SAFETY_TIMEOUT);

    const handler = (e: TransitionEvent) => {
      if (e.propertyName !== "transform") return;
      clearTimeout(safety);
      done();
    };
    lastTile?.addEventListener("transitionend", handler, { once: true });

    if (phase === "covering") {
      requestAnimationFrame(() =>
        requestAnimationFrame(() => el.setAttribute("data-morph", "enter")),
      );
    } else {
      el.setAttribute("data-morph", "exit");
    }

    return () => {
      clearTimeout(safety);
      lastTile?.removeEventListener("transitionend", handler);
    };
  }, [phase, onCoverDone, onRevealDone]);

  if (phase === "idle") return null;

  return (
    <div ref={containerRef} className="pixel-morph-overlay" aria-hidden="true">
      {tiles.map(({ r, c, dIn, dOut }) => (
        <div
          key={`${r}-${c}`}
          ref={
            dIn === MAX_DELAY
              ? lastEnterRef
              : dIn === 0
                ? lastExitRef
                : undefined
          }
          className="pixel-morph-tile"
          style={{ "--d-in": `${dIn}ms`, "--d-out": `${dOut}ms` } as React.CSSProperties}
        />
      ))}
    </div>
  );
}

export default function PageTransitionProvider({ children }: { children: ReactNode }) {
  const [phase, setPhase] = useState<Phase>("idle");
  const router = useRouter();
  const pathname = usePathname();
  const pendingHref = useRef<string | null>(null);

  const triggerTransition = useCallback(
    (href: string) => {
      if (href === pathname || phase !== "idle") return;
      pendingHref.current = href;
      setPhase("covering");
    },
    [pathname, phase],
  );

  const coveredPathRef = useRef(pathname);

  const onCoverDone = useCallback(() => {
    coveredPathRef.current = pathname;
    const href = pendingHref.current;
    pendingHref.current = null;
    if (href) router.push(href);
    setPhase("holding");
  }, [router, pathname]);

  useEffect(() => {
    if (phase !== "holding") return;
    if (pathname !== coveredPathRef.current) {
      setPhase("revealing");
      return;
    }
    const fallback = setTimeout(() => setPhase("revealing"), 600);
    return () => clearTimeout(fallback);
  }, [phase, pathname]);

  const onRevealDone = useCallback(() => {
    setPhase("idle");
  }, []);

  return (
    <TransitionContext.Provider value={{ phase, triggerTransition }}>
      {children}
      <PixelMorphOverlay phase={phase} onCoverDone={onCoverDone} onRevealDone={onRevealDone} />
    </TransitionContext.Provider>
  );
}
