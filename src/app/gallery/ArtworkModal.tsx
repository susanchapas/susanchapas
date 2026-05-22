"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Award, ChevronLeft, ChevronRight, ExternalLink, X } from "lucide-react";
import ArtMedia from "@/components/ArtMedia";
import { cn } from "@/lib/utils";
import { EASE_SMOOTH, m } from "@/lib/motion";
import { getLenis } from "@/lib/lenis";
import { tileCols, type Artwork } from "./artworks";

interface ArtworkModalProps {
  artwork: Artwork | null;
  items: readonly Artwork[];
  onClose: () => void;
  onNavigate: (id: number) => void;
}

export default function ArtworkModal({
  artwork,
  items,
  onClose,
  onNavigate,
}: ArtworkModalProps) {
  const reduce = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const restoreRef = useRef<HTMLElement | null>(null);

  const open = artwork !== null;
  const index = artwork ? items.findIndex((a) => a.id === artwork.id) : -1;
  const hasNav = index >= 0 && items.length > 1;

  const navigate = useCallback(
    (dir: 1 | -1) => {
      if (index < 0) return;
      const next = items[(index + dir + items.length) % items.length];
      onNavigate(next.id);
    },
    [index, items, onNavigate]
  );

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- portal target is browser-only; mount post-hydration
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) return;
    restoreRef.current = document.activeElement as HTMLElement | null;
    const root = document.documentElement;
    const prevHtmlOverflow = root.style.overflow;
    const prevBodyOverflow = document.body.style.overflow;
    root.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    getLenis()?.stop();
    const id = requestAnimationFrame(() => closeRef.current?.focus());
    return () => {
      root.style.overflow = prevHtmlOverflow;
      document.body.style.overflow = prevBodyOverflow;
      getLenis()?.start();
      cancelAnimationFrame(id);
      restoreRef.current?.focus();
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight") navigate(1);
      else if (e.key === "ArrowLeft") navigate(-1);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose, navigate]);

  if (!mounted) return null;

  const stacked = artwork ? tileCols(artwork) >= 2 : false;

  return createPortal(
    <AnimatePresence>
      {artwork && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8"
          role="dialog"
          aria-modal="true"
          aria-label={artwork.title}
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
            className={cn(
              "border-accent-lime/30 bg-primary relative flex max-h-[90vh] w-full overflow-hidden rounded-2xl border shadow-2xl",
              stacked
                ? "max-w-[min(92vw,56rem)] flex-col"
                : "max-w-[min(92vw,64rem)] flex-col md:flex-row"
            )}
          >
            <div
              className={cn(
                "relative flex min-h-0 items-center justify-center bg-black/30",
                stacked
                  ? "h-[38vh] shrink-0"
                  : "min-h-[40vh] md:min-h-[60vh] md:w-1/3"
              )}
            >
              <ArtMedia
                src={artwork.src}
                alt={artwork.title}
                type={artwork.type}
                objectFit="contain"
                className="object-contain"
                containerClassName="absolute inset-0 h-full w-full"
              />

              {hasNav && (
                <>
                  <button
                    type="button"
                    onClick={() => navigate(-1)}
                    aria-label="Previous piece"
                    className="bg-primary/70 text-secondary hover:bg-accent-lime hover:text-primary absolute top-1/2 left-2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full backdrop-blur transition-colors sm:left-3"
                  >
                    <ChevronLeft size={22} />
                  </button>
                  <button
                    type="button"
                    onClick={() => navigate(1)}
                    aria-label="Next piece"
                    className="bg-primary/70 text-secondary hover:bg-accent-lime hover:text-primary absolute top-1/2 right-2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full backdrop-blur transition-colors sm:right-3"
                  >
                    <ChevronRight size={22} />
                  </button>
                </>
              )}
            </div>

            <div
              data-lenis-prevent
              className={cn(
                "flex min-h-0 flex-col overflow-y-auto overscroll-contain p-6 lg:p-8",
                stacked ? "flex-1" : "md:w-2/3"
              )}
            >
              <span className="text-accent-lime font-body mb-1 text-xs tracking-wider uppercase">
                {artwork.category} • {artwork.year}
              </span>
              <h2 className="font-display text-secondary mb-2 text-xl font-bold lg:text-2xl">
                {artwork.title}
              </h2>

              {artwork.award && (
                <span className="border-accent-lime/30 bg-accent-lime/10 text-accent-lime font-body mb-3 inline-flex items-center gap-1.5 self-start rounded-full border px-3 py-1 text-xs font-medium">
                  <Award size={13} aria-hidden />
                  {artwork.award}
                </span>
              )}

              <div className="font-body text-secondary/85 space-y-3 text-base leading-relaxed">
                {artwork.description.split("\n\n").map((para) => (
                  <p key={para}>{para}</p>
                ))}
              </div>

              <dl className="border-accent-blue/15 mt-5 border-t pt-4">
                <dt className="text-accent-lime/90 font-body mb-1 text-[0.65rem] tracking-widest uppercase">
                  Medium
                </dt>
                <dd className="font-body text-secondary/75 text-sm leading-relaxed">
                  {artwork.medium}
                </dd>
              </dl>

              {artwork.links && artwork.links.length > 0 && (
                <div className="mt-5 flex flex-wrap gap-3">
                  {artwork.links.map((link, i) => (
                    <a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cn(
                        "font-body inline-flex min-h-11 items-center gap-2 rounded-full px-4 text-sm font-medium transition-colors",
                        i === 0
                          ? "bg-accent-lime text-primary hover:bg-accent-lime/90"
                          : "border-accent-blue/25 text-secondary hover:border-accent-lime/50 hover:text-accent-lime border"
                      )}
                    >
                      {link.label}
                      <ExternalLink size={14} aria-hidden />
                    </a>
                  ))}
                </div>
              )}
            </div>

            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              aria-label={`Close ${artwork.title}`}
              className="bg-primary/70 text-secondary hover:bg-accent-lime hover:text-primary absolute top-3 right-3 z-10 flex h-9 w-9 items-center justify-center rounded-full backdrop-blur transition-colors"
            >
              <X size={16} />
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
}
