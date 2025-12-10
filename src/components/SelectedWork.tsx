"use client";

import { motion } from "framer-motion";
import ProjectCard from "./ProjectCard";

const projects = [
  {
    title: "Spring Bank",
    description:
      "Launching a new bank branch in Red Hook, Brooklyn — designed the new branch interior & exterior, including ATM videography & animations.",
    href: "/projects/spring-bank",
    image: "/gallery/SB Bike Shop Info Sheet.svg",
    tags: ["Brand Strategy", "Interior Design", "Motion Graphics"],
  },
  {
    title: "All Executive Clean",
    description:
      "Redesigning the brand for professionalism & consistency — website auditing, new marketing materials including capability statement, business cards, and portfolio.",
    href: "/projects/all-executive-clean",
    image: "/assets/projects/all-executive-clean-hero.svg",
    tags: ["Brand Identity", "Web Design", "Marketing"],
  },
  {
    title: "Schematic Marketing",
    description:
      "Launched and scaled an accessibility-focused design agency for small businesses, nonprofits and entrepreneurs.",
    href: "/projects/schematic-marketing",
    image: "/assets/projects/schematic-marketing-hero.svg",
    tags: ["Entrepreneurship", "Accessibility", "UX Design"],
  },
];

export default function SelectedWork() {
  return (
    <section
      className="bg-primary py-24 lg:py-32 lg:pl-20"
      aria-labelledby="selected-work-heading"
    >
      <div className="container mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
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
          {projects.map((project, index) => (
            <ProjectCard key={project.title} {...project} index={index} />
          ))}
        </div>

        {/* View All Link */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-16 text-center"
        >
          <motion.a
            href="/projects"
            className="text-accent-lime font-display inline-flex items-center gap-3 text-lg font-semibold transition-all hover:gap-5"
            whileHover={{ x: 5 }}
          >
            View All Projects
            <svg
              className="h-5 w-5"
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
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
