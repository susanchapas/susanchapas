"use client";

import { motion } from "framer-motion";
import ProjectCard from "./ProjectCard";
import { featuredProjects } from "@/lib/projects";

export default function SelectedWork() {
  return (
    <section
      className="bg-primary content-visibility-auto py-24 lg:py-32 lg:pl-20"
      aria-labelledby="selected-work-heading"
    >
      <div className="container mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16 lg:mb-24"
        >
          <span className="text-accent-lime font-body mb-4 block text-sm tracking-widest uppercase">
            Portfolio
          </span>
          <h2
            id="selected-work-heading"
            className="font-display text-secondary mb-6 text-4xl font-bold lg:text-5xl xl:text-6xl"
          >
            Selected Work
          </h2>
          <p className="font-body text-secondary/70 max-w-2xl text-lg">
            A collection of projects where strategy meets execution. Each case study
            demonstrates the intersection of design thinking, marketing expertise, and
            technical implementation.
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-10 xl:grid-cols-3">
          {featuredProjects.map((project, index) => (
            <ProjectCard
              key={project.title}
              {...project}
              index={index}
              priority={index === 0}
            />
          ))}
        </div>

        {/* View All Link */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-16 text-center"
        >
          <a
            href="/projects"
            className="text-accent-lime font-display inline-flex items-center gap-3 text-lg font-semibold transition-all duration-300 hover:gap-5"
          >
            View All Projects
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
