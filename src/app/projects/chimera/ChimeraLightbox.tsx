"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { createPortal } from "react-dom";
import { useEffect, useState } from "react";

export default function ChimeraLightbox() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="border-accent-blue/15 bg-primary/40 relative hidden aspect-video w-full overflow-hidden rounded-2xl border cursor-pointer lg:block"
        aria-label="View full dashboard image"
      >
        <Image
          src="/assets/projects/chimera/chimera%20og%20dashboard%20blurred.webp"
          alt="Chimera dashboard overview"
          fill
          loading="lazy"
          sizes="50vw"
          className="object-cover"
        />
      </button>

      {open && createPortal(
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-6 sm:p-10 lg:p-16"
          >
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setOpen(false)} />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ type: "spring", stiffness: 200, damping: 24 }}
              className="relative max-h-full max-w-6xl overflow-hidden rounded-2xl border border-accent-blue/30 bg-accent-blue/15 p-3 shadow-2xl"
            >
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close"
                className="absolute top-4 right-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-accent-blue/30 text-white backdrop-blur transition-colors hover:bg-accent-blue/50"
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 6l12 12M6 18L18 6" />
                </svg>
              </button>
              <Image
                src="/assets/projects/chimera/chimera%20og%20dashboard%20blurred.webp"
                alt="Chimera dashboard overview"
                width={1920}
                height={1080}
                loading="lazy"
                className="rounded-xl"
                sizes="100vw"
              />
            </motion.div>
          </motion.div>
        </AnimatePresence>,
        document.body
      )}
    </>
  );
}
