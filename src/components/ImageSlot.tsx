"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { SPRING_GENTLE } from "@/lib/motion";

interface ImageSlotProps {
  src?: string;
  alt?: string;
  label: string;
  hint?: string;
  ratio?: string;
  className?: string;
  sizes?: string;
  pinboard?: boolean;
}

export default function ImageSlot({
  src,
  alt = "",
  label,
  hint,
  ratio = "aspect-[16/9]",
  className = "",
  sizes = "100vw",
  pinboard = false,
}: ImageSlotProps) {
  return (
    <motion.div
      initial="rest"
      whileHover="hover"
      animate="rest"
      className={`group relative w-full overflow-hidden rounded-2xl border ${pinboard ? "" : "border-accent-blue/20 bg-accent-blue/5"} ${ratio} ${className}`}
      style={
        pinboard
          ? {
              backgroundImage:
                "radial-gradient(rgba(224,159,125,0.18) 1.5px, transparent 1.5px)",
              backgroundSize: "22px 22px",
            }
          : undefined
      }
    >
      {src ? (
        <motion.div
          className="absolute inset-0"
          variants={{ rest: { scale: 1 }, hover: { scale: 1.05 } }}
          transition={SPRING_GENTLE}
        >
          <Image
            src={encodeURI(src)}
            alt={alt}
            fill
            loading="lazy"
            sizes={sizes}
            className="object-cover"
          />
        </motion.div>
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
          <span className="border-accent-blue/30 mb-4 flex h-12 w-12 items-center justify-center rounded-full border border-dashed">
            <svg
              className="text-accent-blue/60 h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </span>
          <p className="font-display text-secondary/80 text-sm font-semibold">{label}</p>
          {hint && (
            <p className="font-body text-secondary/40 mt-1 max-w-xs text-xs">{hint}</p>
          )}
        </div>
      )}
    </motion.div>
  );
}
