"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Award } from "lucide-react";
import Link from "next/link";
import ArtMedia from "@/components/ArtMedia";
import { cn } from "@/lib/utils";
import { useMagneticTilt } from "@/hooks/useMagneticTilt";
import { EASE_SMOOTH } from "@/lib/motion";

interface BentoTileProps {
  title: string;
  eyebrow: string;
  src: string;
  type?: "image" | "video";
  award?: boolean;
  hero?: boolean;
  width: number;
  height: number;
  index: number;
  href?: string;
  onOpen?: () => void;
}

export default function BentoTile({
  title,
  eyebrow,
  src,
  type = "image",
  award,
  hero,
  width,
  height,
  index,
  href,
  onOpen,
}: BentoTileProps) {
  const reduce = useReducedMotion();
  const { ref, handlers, tiltStyle, imgStyle, reset } = useMagneticTilt({
    isHero: !!hero,
  });

  const linkProps = {
    "aria-label": `View ${title}`,
    className: "block h-full w-full cursor-pointer text-left",
  };
  const content = (
    <div className="relative h-full w-full">
      <motion.div
        style={imgStyle}
        className="absolute inset-0 overflow-hidden rounded-xl"
      >
        <ArtMedia
          src={src}
          alt={title}
          type={type}
          className="transition-transform duration-700 ease-[var(--ease-liquid)] group-hover/tile:scale-[1.05]"
          containerClassName="absolute inset-0 h-full w-full"
          objectFit="cover"
        />
      </motion.div>

      {award && (
        <span className="border-accent-lime/30 bg-primary/70 text-accent-lime font-body pointer-events-none absolute top-3 left-3 z-10 inline-flex items-center gap-1 rounded-full border px-2 py-1 text-[0.6rem] font-medium tracking-widest uppercase backdrop-blur">
          <Award size={11} aria-hidden />
          Award
        </span>
      )}

      <div
        data-dim
        aria-hidden
        className="bg-primary pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 ease-[var(--ease-liquid)] group-focus-within/tile:!opacity-0 group-hover/grid:opacity-55 group-hover/tile:!opacity-0"
      />

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-10 opacity-0 mix-blend-screen transition-opacity duration-500 ease-[var(--ease-liquid)] group-hover/tile:opacity-100"
        style={{
          background:
            "radial-gradient(circle at var(--mx,50%) var(--my,50%), rgba(255,255,255,0.34), transparent 42%)",
        }}
      />
      <div className="from-primary via-primary/55 pointer-events-none absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t to-transparent p-4 pt-10">
        <span className="text-accent-lime font-body text-[0.65rem] tracking-widest uppercase">
          {eyebrow}
        </span>
        <h3 className="font-display text-secondary text-base font-bold lg:text-lg">
          {title}
        </h3>
      </div>
    </div>
  );

  return (
    <motion.article
      ref={ref as React.Ref<HTMLElement>}
      initial={reduce ? false : { opacity: 0, filter: "blur(6px)" }}
      animate={{ opacity: 1, filter: "blur(0px)" }}
      transition={
        reduce
          ? { duration: 0 }
          : { duration: 0.55, ease: EASE_SMOOTH, delay: Math.min(index * 0.04, 0.4) }
      }
      {...handlers}
      style={{ width, height, ...(tiltStyle ?? {}) }}
      className={cn(
        "group/tile relative shrink-0 overflow-hidden rounded-xl border transition-[border-color]",
        "border-accent-blue/10 hover:border-accent-lime/40 hover:z-20"
      )}
    >
      {href ? (
        <Link href={href} onClick={reset} {...linkProps}>
          {content}
        </Link>
      ) : (
        <button
          type="button"
          onClick={() => {
            reset();
            onOpen?.();
          }}
          aria-haspopup="dialog"
          {...linkProps}
        >
          {content}
        </button>
      )}
    </motion.article>
  );
}
