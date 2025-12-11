"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

interface ProjectCardProps {
  title: string;
  description: string;
  href: string;
  image: string;
  tags: string[];
  index: number;
  badge?: string;
}

export default function ProjectCard({
  title,
  description,
  href,
  image,
  tags,
  index,
  badge,
}: ProjectCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{
        duration: 0.8,
        delay: index * 0.15,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group"
    >
      <Link
        href={href}
        className="bg-accent-blue/5 border-accent-blue/10 hover:border-accent-lime/30 relative flex h-full flex-col overflow-hidden rounded-2xl border transition-all duration-500"
        aria-label={`View ${title} case study`}
      >
        {/* Image Container */}
        <div className="relative aspect-[16/10] overflow-hidden">
          <motion.div
            className="from-primary via-primary/50 absolute inset-0 z-10 bg-gradient-to-t to-transparent"
            initial={{ opacity: 0.6 }}
            whileHover={{ opacity: 0.8 }}
          />
          <motion.div
            className="relative h-full w-full"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <Image
              src={image}
              alt={`${title} project preview`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </motion.div>

          {/* Hover Overlay */}
          <motion.div
            className="absolute inset-0 z-20 flex items-center justify-center"
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
          >
            <motion.div
              className="bg-accent-lime flex h-20 w-20 items-center justify-center rounded-full"
              initial={{ scale: 0 }}
              whileHover={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
            >
              <svg
                className="text-primary h-8 w-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </motion.div>
          </motion.div>
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col p-6 lg:p-8">
          <div className="mb-4 flex flex-wrap gap-2">
            {badge && (
              <span className="bg-accent-lime/10 text-accent-lime rounded-full px-3 py-1 text-xs font-medium font-mono">
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

          <h3 className="font-display text-secondary group-hover:text-accent-lime mb-3 text-2xl font-bold transition-colors lg:text-3xl">
            {title}
          </h3>

          <p className="text-secondary/70 font-body line-clamp-2">{description}</p>

          <motion.div
            className="text-accent-lime mt-auto flex items-center gap-2 pt-6 font-medium"
            initial={{ x: 0 }}
            whileHover={{ x: 8 }}
          >
            View Case Study
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
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </motion.div>
        </div>
      </Link>
    </motion.article>
  );
}
