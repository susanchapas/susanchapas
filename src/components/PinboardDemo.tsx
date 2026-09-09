"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { EASE_SMOOTH, m } from "@/lib/motion";
import { getLenis } from "@/lib/lenis";

interface Step {
  title: string;
  description: string;
}

const STEPS: Step[] = [
  {
    title: "Hover to explore",
    description: "Hover over any tile to read its description.",
  },
  {
    title: "Grab & throw",
    description: "Click and drag tiles to push them around the board.",
  },
  {
    title: "Reset the board",
    description: "Click the reset button at the top to snap tiles back.",
  },
];

function HoverAnimation() {
  return (
    <div className="relative flex h-full items-center justify-center">
      <div className="relative">
        <motion.div
          className="bg-secondary ring-accent-lime/40 flex w-36 flex-col gap-1.5 rounded-xl p-3 text-left shadow-xl ring-2"
          animate={{ scale: [1, 1.02, 1] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <span className="bg-mint-ink h-1 w-full rounded-full" />
          <span className="bg-primary/10 block h-8 w-full rounded-md" />
          <span className="font-body text-primary/50 text-[0.55rem] tracking-widest uppercase">
            Based in Jersey City
          </span>
          <span className="font-display text-primary text-sm font-bold leading-tight">
            Hi, I'm Susan
          </span>
        </motion.div>

        <motion.div
          className="ring-accent-lime/20 bg-panel absolute -right-20 -bottom-2 z-10 w-44 rounded-lg p-3 shadow-[0_16px_40px_-8px_rgba(0,0,0,0.7)] ring-1"
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: [0, 1, 1, 0], y: [6, 0, 0, 6] }}
          transition={{
            duration: 3,
            repeat: Infinity,
            times: [0, 0.15, 0.8, 1],
            ease: "easeInOut",
          }}
        >
          <span className="text-secondary/80 font-body block text-[0.65rem] leading-relaxed">
            I'm a UX strategist, developer, and artist.
          </span>
        </motion.div>

        <motion.svg
          viewBox="0 0 24 24"
          className="absolute -top-2 -right-3 z-20 h-6 w-6 drop-shadow-lg"
          animate={{
            x: [20, 0, 0, 20],
            y: [20, 0, 0, 20],
            opacity: [0, 1, 1, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            times: [0, 0.12, 0.82, 1],
            ease: "easeInOut",
          }}
        >
          <path
            d="M5.65 1.55 3.18 12.24l4.04-2.07 2.46 5.75 2.25-.97-2.46-5.75 4.04-2.07z"
            fill="currentColor"
            className="text-secondary"
            stroke="currentColor"
            strokeWidth="0.5"
            strokeLinejoin="round"
          />
        </motion.svg>
      </div>
    </div>
  );
}

function GrabAnimation() {
  return (
    <div className="relative flex h-full items-center justify-center">
      <motion.div
        className="bg-secondary flex w-32 flex-col gap-1.5 rounded-xl p-3 text-left shadow-xl ring-1 ring-black/5"
        animate={{
          x: [0, 0, 12, 0, -10, 0, 0, 160, 160],
          y: [0, 0, -4, 0, 3, 0, 0, -50, -50],
          rotate: [4, 4, -2, 4, 6, 4, 4, -18, -18],
          scale: [1, 1.05, 1.05, 1.05, 1.05, 1.05, 1.05, 0.95, 0.95],
        }}
        transition={{
          duration: 4.5,
          repeat: Infinity,
          times: [0, 0.1, 0.2, 0.3, 0.4, 0.48, 0.55, 0.72, 1],
          ease: "easeInOut",
        }}
      >
        <span className="bg-clay-ink h-1 w-full rounded-full" />
        <span className="bg-primary/10 block h-6 w-full rounded-md" />
        <span className="font-body text-primary/50 text-[0.55rem] tracking-widest uppercase">
          How I approach work
        </span>
        <span className="font-display text-primary text-sm font-bold leading-tight">
          Designed for everyone
        </span>
      </motion.div>

      <motion.div
        className="bg-secondary absolute top-1/2 left-1/3 -z-10 flex w-28 -translate-y-1/2 flex-col gap-1 rounded-xl p-3 text-left opacity-40 shadow-lg ring-1 ring-black/5"
        style={{ rotate: -6 }}
        animate={{
          x: [0, 0, 0, 0, 60, 60],
          y: [0, 0, 0, 0, 25, 25],
          rotate: [-6, -6, -6, -6, 10, 10],
        }}
        transition={{
          duration: 4.5,
          repeat: Infinity,
          times: [0, 0.55, 0.65, 0.72, 0.85, 1],
          ease: "easeInOut",
        }}
      >
        <span className="bg-sky-ink h-1 w-full rounded-full" />
        <span className="bg-primary/10 block h-5 w-full rounded-md" />
        <span className="font-display text-primary/60 text-xs font-bold">Always learning</span>
      </motion.div>

      <motion.svg
        viewBox="0 0 24 24"
        className="absolute top-[38%] left-[28%] z-20 h-7 w-7 drop-shadow-lg"
        animate={{
          x: [0, 0, 12, 0, -10, 0, 0, 160, 160],
          y: [0, 0, -4, 0, 3, 0, 0, -50, -50],
          scale: [1, 0.9, 0.9, 0.9, 0.9, 0.9, 0.9, 1, 1],
        }}
        transition={{
          duration: 4.5,
          repeat: Infinity,
          times: [0, 0.1, 0.2, 0.3, 0.4, 0.48, 0.55, 0.72, 1],
          ease: "easeInOut",
        }}
      >
        <motion.path
          d="M5.65 1.55 3.18 12.24l4.04-2.07 2.46 5.75 2.25-.97-2.46-5.75 4.04-2.07z"
          fill="currentColor"
          className="text-secondary"
          stroke="currentColor"
          strokeWidth="0.5"
          strokeLinejoin="round"
          animate={{ scale: [1, 0.85, 0.85, 0.85, 0.85, 0.85, 0.85, 1, 1] }}
          transition={{
            duration: 4.5,
            repeat: Infinity,
            times: [0, 0.1, 0.2, 0.3, 0.4, 0.48, 0.72, 0.75, 1],
          }}
        />
      </motion.svg>
    </div>
  );
}

function ResetAnimation() {
  return (
    <div className="relative flex h-full flex-col items-center justify-center gap-4">
      <motion.div
        className="bg-accent-blue text-primary flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold shadow-md"
        animate={{
          scale: [1, 1, 0.92, 1.05, 1, 1],
        }}
        transition={{
          duration: 3.5,
          repeat: Infinity,
          times: [0, 0.3, 0.38, 0.46, 0.5, 1],
          ease: "easeInOut",
        }}
      >
        <motion.svg
          viewBox="0 0 24 24"
          className="h-3.5 w-3.5"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          animate={{ rotate: [0, 0, -360, -360] }}
          transition={{
            duration: 3.5,
            repeat: Infinity,
            times: [0, 0.3, 0.7, 1],
            ease: "easeInOut",
          }}
        >
          <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
          <path d="M3 3v5h5" />
        </motion.svg>
        Reset board
      </motion.div>

      <div className="relative h-28 w-56">
        {[
          { x: -40, y: 20, r: 12, color: "bg-mint-ink", delay: 0 },
          { x: 40, y: -15, r: -8, color: "bg-clay-ink", delay: 0.04 },
          { x: 0, y: 30, r: 6, color: "bg-sky-ink", delay: 0.08 },
        ].map((tile, i) => (
          <motion.div
            key={i}
            className="bg-secondary absolute top-1/2 left-1/2 flex w-24 flex-col gap-1 rounded-lg p-2 shadow-lg ring-1 ring-black/5"
            animate={{
              x: [tile.x, tile.x, -48 + i * 48, -48 + i * 48],
              y: [tile.y, tile.y, -24, -24],
              rotate: [tile.r, tile.r, 0, 0],
            }}
            transition={{
              duration: 3.5,
              repeat: Infinity,
              times: [0, 0.38 + tile.delay, 0.65 + tile.delay, 1],
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <span className={cn("h-0.5 w-full rounded-full", tile.color)} />
            <span className="bg-primary/10 block h-3 w-full rounded" />
            <span className="bg-primary/8 block h-2 w-3/4 rounded" />
          </motion.div>
        ))}
      </div>
    </div>
  );
}

const ANIMATIONS = [HoverAnimation, GrabAnimation, ResetAnimation];

export default function PinboardDemo({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const reduce = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  const [step, setStep] = useState(0);
  const closeRef = useRef<HTMLButtonElement>(null);
  const restoreRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) {
      setStep(0);
      return;
    }
    restoreRef.current = document.activeElement as HTMLElement | null;
    const root = document.documentElement;
    const prevHtml = root.style.overflow;
    const prevBody = document.body.style.overflow;
    root.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    getLenis()?.stop();
    const id = requestAnimationFrame(() => closeRef.current?.focus());
    return () => {
      root.style.overflow = prevHtml;
      document.body.style.overflow = prevBody;
      getLenis()?.start();
      cancelAnimationFrame(id);
      restoreRef.current?.focus();
    };
  }, [open]);

  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight" && step < STEPS.length - 1) setStep((s) => s + 1);
      else if (e.key === "ArrowLeft" && step > 0) setStep((s) => s - 1);
    },
    [onClose, step]
  );

  useEffect(() => {
    if (!open) return;
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [open, handleKey]);

  if (!mounted) return null;

  const Anim = ANIMATIONS[step];

  return createPortal(
    <AnimatePresence>
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-label="Pinboard demo"
        >
          <motion.div
            onClick={onClose}
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={m(reduce, { duration: 0.25, ease: EASE_SMOOTH })}
            className="bg-primary/80 absolute inset-0 backdrop-blur-sm"
          />

          <motion.div
            initial={reduce ? false : { opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.97, y: 8 }}
            transition={m(reduce, { duration: 0.32, ease: EASE_SMOOTH })}
            className="border-accent-lime/30 bg-primary relative flex w-full max-w-md flex-col overflow-hidden rounded-2xl border shadow-2xl"
          >
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              aria-label="Close demo"
              className="bg-secondary/90 text-primary hover:bg-accent-lime absolute top-3 right-3 z-10 flex h-9 w-9 items-center justify-center rounded-full shadow-lg transition-colors"
            >
              <X size={18} strokeWidth={2.5} />
            </button>

            <div
              className="relative h-52 overflow-hidden"
              style={{ backgroundColor: "#102f5d" }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.25, ease: EASE_SMOOTH }}
                  className="absolute inset-0"
                >
                  <Anim />
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="flex flex-col gap-4 px-6 pt-5 pb-6">
              <div className="flex items-center gap-2">
                {STEPS.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setStep(i)}
                    aria-label={`Step ${i + 1}`}
                    className={cn(
                      "h-1.5 rounded-full transition-all duration-300",
                      i === step
                        ? "bg-accent-lime w-6"
                        : "bg-secondary/20 hover:bg-secondary/40 w-1.5"
                    )}
                  />
                ))}
                <span className="text-secondary/40 font-body ml-auto text-xs">
                  {step + 1}/{STEPS.length}
                </span>
              </div>

              <div>
                <h3 className="font-display text-secondary text-lg font-bold">
                  {STEPS[step].title}
                </h3>
                <p className="text-secondary/70 font-body mt-1 text-sm">
                  {STEPS[step].description}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setStep((s) => s - 1)}
                  disabled={step === 0}
                  aria-label="Previous step"
                  className="border-accent-blue/20 text-secondary hover:border-accent-lime/50 hover:text-accent-lime flex h-10 w-10 items-center justify-center rounded-full border transition-colors disabled:pointer-events-none disabled:opacity-30"
                >
                  <ChevronLeft size={18} />
                </button>
                {step < STEPS.length - 1 ? (
                  <button
                    type="button"
                    onClick={() => setStep((s) => s + 1)}
                    className="bg-accent-lime text-primary hover:bg-accent-lime/90 font-body ml-auto flex h-10 items-center gap-1.5 rounded-full px-5 text-sm font-semibold transition-colors"
                  >
                    Next
                    <ChevronRight size={16} />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={onClose}
                    className="bg-accent-lime text-primary hover:bg-accent-lime/90 font-body ml-auto flex h-10 items-center rounded-full px-5 text-sm font-semibold transition-colors"
                  >
                    Got it
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
}
