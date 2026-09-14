"use client";

import FadeIn from "@/components/FadeIn";
import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRightIcon } from "@/components/Icons";
import { SPRING_HOVER, SPRING_GENTLE } from "@/lib/motion";

interface ProjectCardProps {
  title: string;
  description: string;
  href: string;
  image: string;
  tags: string[];
  index: number;
  badge?: string;
  priority?: boolean;
  inactive?: boolean;
}

export default function ProjectCard({
  title,
  description,
  href,
  image,
  tags,
  index,
  badge,
  priority = false,
  inactive = false,
}: ProjectCardProps) {
  const reduce = useReducedMotion();
  const encodedImage = image ? encodeURI(image) : "";

  const content = (
    <>
      <div className="relative aspect-[16/10] overflow-hidden">
        <div className="from-primary/80 via-primary/30 absolute inset-0 z-10 bg-gradient-to-t to-transparent" />
        {encodedImage ? (
          <motion.div
            className="relative h-full w-full"
            variants={{ rest: { scale: 1 }, hover: { scale: 1.06 } }}
            transition={SPRING_GENTLE}
          >
            <Image
              src={encodedImage}
              alt={`${title} project preview`}
              fill
              priority={priority}
              loading={priority ? "eager" : "lazy"}
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </motion.div>
        ) : (
          <div className="bg-accent-blue/10 h-full w-full" />
        )}

        {!inactive && (
          <motion.div
            className="absolute inset-0 z-20 flex items-center justify-center"
            variants={{ rest: { opacity: 0 }, hover: { opacity: 1 } }}
            transition={SPRING_GENTLE}
          >
            <motion.div
              className="bg-accent-lime flex h-14 w-14 items-center justify-center rounded-full"
              variants={{ rest: { scale: 0.6, opacity: 0 }, hover: { scale: 1, opacity: 1 } }}
              transition={SPRING_HOVER}
            >
              <ArrowRightIcon className="text-primary h-7 w-7" />
            </motion.div>
          </motion.div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-6 lg:p-8">
        <div className="mb-4 flex flex-wrap gap-2">
          {badge && (
            <span className="bg-accent-lime/10 text-accent-lime rounded-full px-3 py-1 font-mono text-xs font-medium">
              {badge}
            </span>
          )}
          {tags.map((tag) => (
            <span
              key={tag}
              className="bg-accent-blue/10 text-accent-blue rounded-full px-3 py-1 text-xs font-medium"
            >
              {tag}
            </span>
          ))}
        </div>

        <h3 className={`font-display text-secondary mb-3 text-2xl font-bold transition-colors duration-700 ease-[var(--ease-liquid)] lg:text-3xl ${!inactive ? "group-hover:text-accent-lime" : ""}`}>
          {title}
        </h3>

        <p className="text-secondary/70 font-body line-clamp-2">{description}</p>

        {!inactive ? (
          <motion.div
            className="text-accent-lime mt-auto flex items-center gap-2 pt-6 font-medium"
            variants={{ rest: { x: 0 }, hover: { x: 8 } }}
            transition={SPRING_HOVER}
          >
            View Case Study
            <ArrowRightIcon className="h-4 w-4" />
          </motion.div>
        ) : (
          <div className="text-secondary/40 mt-auto pt-6 font-medium">
            Coming Soon
          </div>
        )}
      </div>
    </>
  );

  return (
    <FadeIn as="article" delay={index * 0.1} className={inactive ? "opacity-60" : "group"}>
      {inactive ? (
        <div
          className="bg-accent-blue/5 border-accent-blue/10 relative flex h-full flex-col overflow-hidden rounded-2xl border"
          aria-label={`${title} — in progress`}
        >
          {content}
        </div>
      ) : (
        <motion.div initial="rest" whileHover={reduce ? undefined : "hover"} animate="rest">
          <Link
            href={href}
            className="bg-accent-blue/5 border-accent-blue/10 hover:border-accent-lime/30 relative flex h-full flex-col overflow-hidden rounded-2xl border transition-[border-color] duration-500 ease-[var(--ease-liquid)]"
            aria-label={`View ${title} case study`}
          >
            {content}
          </Link>
        </motion.div>
      )}
    </FadeIn>
  );
}
