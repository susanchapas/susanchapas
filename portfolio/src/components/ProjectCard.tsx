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
}

export default function ProjectCard({
  title,
  description,
  href,
  image,
  tags,
  index,
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
        className="block relative overflow-hidden rounded-2xl bg-accent-blue/5 border border-accent-blue/10 transition-all duration-500 hover:border-accent-lime/30"
        aria-label={`View ${title} case study`}
      >
        {/* Image Container */}
        <div className="relative aspect-[16/10] overflow-hidden">
          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-primary via-primary/50 to-transparent z-10"
            initial={{ opacity: 0.6 }}
            whileHover={{ opacity: 0.8 }}
          />
          <motion.div
            className="relative w-full h-full"
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
              className="w-20 h-20 rounded-full bg-accent-lime flex items-center justify-center"
              initial={{ scale: 0 }}
              whileHover={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
            >
              <svg
                className="w-8 h-8 text-primary"
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
        <div className="p-6 lg:p-8">
          <div className="flex flex-wrap gap-2 mb-4">
            {tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 text-xs font-medium bg-accent-blue/10 text-accent-blue rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>

          <h3 className="font-display text-2xl lg:text-3xl font-bold text-secondary mb-3 group-hover:text-accent-lime transition-colors">
            {title}
          </h3>

          <p className="text-secondary/70 font-body line-clamp-2">{description}</p>

          <motion.div
            className="mt-6 flex items-center gap-2 text-accent-lime font-medium"
            initial={{ x: 0 }}
            whileHover={{ x: 8 }}
          >
            View Case Study
            <svg
              className="w-4 h-4"
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
