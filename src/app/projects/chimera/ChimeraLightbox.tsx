"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { createPortal } from "react-dom";
import { useEffect, useState } from "react";
import { getLenis } from "@/lib/lenis";

export default function ChimeraLightbox() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- portal target is browser-only; mount post-hydration
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) return;
    const prevBodyOverflow = document.body.style.overflow;
    const prevHtmlOverflow = document.documentElement.style.overflow;
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    getLenis()?.stop();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevBodyOverflow;
      document.documentElement.style.overflow = prevHtmlOverflow;
      getLenis()?.start();
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="group border-accent-blue/15 bg-primary/40 hover:border-accent-lime/40 relative aspect-video w-full cursor-pointer overflow-hidden rounded-2xl border text-left transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-lime focus-visible:ring-offset-2 focus-visible:ring-offset-primary"
        aria-label="View Chimera's Original Dashboard"
      >
        <Image
          src="/assets/projects/chimera/chimera%20og%20dashboard%20blurred.webp"
          alt="Chimera's Original Dashboard"
          fill
          loading="lazy"
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
        />

        {/* Dark blue hover filter with centered subtle text */}
        <div className="bg-primary/75 absolute inset-0 flex items-center justify-center p-6 opacity-0 backdrop-blur-[2px] transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
          <span className="font-dm text-secondary/85 text-center text-sm font-normal tracking-wide sm:text-base">
            Chimera&apos;s Original Dashboard
          </span>
        </div>
      </button>

      {mounted &&
        createPortal(
          <AnimatePresence>
            {open && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                role="dialog"
                aria-modal="true"
                aria-label="Chimera's Original Dashboard"
                className="fixed inset-0 z-50 flex items-center justify-center p-6 sm:p-10 lg:p-16"
              >
                <div
                  className="absolute inset-0 bg-black/70 backdrop-blur-sm"
                  onClick={() => setOpen(false)}
                />
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ type: "spring", stiffness: 200, damping: 24 }}
                  className="relative max-w-fit overflow-hidden rounded-2xl border border-accent-blue/30 bg-accent-blue/15 p-3 shadow-2xl"
                >
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    aria-label="Close"
                    className="absolute top-4 right-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-accent-blue/30 text-white backdrop-blur transition-colors hover:bg-accent-blue/50 cursor-pointer"
                  >
                    <svg
                      className="h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 6l12 12M6 18L18 6"
                      />
                    </svg>
                  </button>
                  <Image
                    src="/assets/projects/chimera/chimera%20og%20dashboard%20blurred.webp"
                    alt="Chimera's Original Dashboard"
                    width={5063}
                    height={2413}
                    priority
                    className="max-h-[80vh] w-auto max-w-[90vw] rounded-xl object-contain"
                    sizes="(min-width: 1280px) 1400px, 90vw"
                  />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </>
  );
}
