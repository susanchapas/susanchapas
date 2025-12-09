"use client";

import { motion } from "framer-motion";
import ProjectCard from "@/components/ProjectCard";

const projects = [
  {
    title: "Spring Bank",
    description:
      "Launching a new bank branch in Red Hook, Brooklyn — designed the new branch interior & exterior, including ATM videography & animations.",
    href: "/projects/spring-bank",
    image: "/assets/projects/spring-bank.jpg",
    tags: ["Brand Strategy", "Interior Design", "Motion Graphics"],
  },
  {
    title: "All Executive Clean",
    description:
      "Redesigning the brand for professionalism & consistency — website auditing, new marketing materials including capability statement, business cards, and portfolio.",
    href: "/projects/all-executive-clean",
    image: "/assets/projects/all-executive-clean.jpg",
    tags: ["Brand Identity", "Web Design", "Marketing"],
  },
  {
    title: "Schematic Marketing",
    description:
      "Launched and scaled an accessibility-focused design agency for small businesses, nonprofits and entrepreneurs.",
    href: "/projects/schematic-marketing",
    image: "/assets/projects/schematic-marketing.jpg",
    tags: ["Entrepreneurship", "Accessibility", "UX Design"],
  },
];

export default function ProjectsPage() {
  return (
    <div className="lg:pl-20">
      {/* Hero Section */}
      <section className="py-24 lg:py-32 gradient-mesh">
        <div className="container mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-3xl"
          >
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-accent-lime font-body text-sm uppercase tracking-widest mb-4 block"
            >
              Portfolio
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="font-display text-4xl lg:text-5xl xl:text-6xl font-bold text-secondary mb-6"
            >
              Selected
              <br />
              <span className="text-gradient">Case Studies</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="font-body text-lg text-secondary/70 max-w-2xl"
            >
              A collection of projects where strategy meets execution. Each case study
              demonstrates the intersection of design thinking, marketing expertise,
              and technical implementation.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-16 lg:py-24 bg-primary" aria-label="Project list">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 lg:gap-10">
            {projects.map((project, index) => (
              <ProjectCard key={project.title} {...project} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 lg:py-32 bg-accent-blue/5">
        <div className="container mx-auto px-6 lg:px-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-display text-3xl lg:text-4xl font-bold text-secondary mb-6">
              Have a project in mind?
            </h2>
            <p className="font-body text-lg text-secondary/70 max-w-xl mx-auto mb-8">
              I&apos;m always open to discussing new opportunities and creative challenges.
              Let&apos;s create something meaningful together.
            </p>
            <motion.a
              href="/contact"
              className="inline-flex items-center gap-3 px-8 py-4 bg-accent-lime text-primary font-display font-semibold rounded-full hover:bg-accent-lime/90 transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Start a Conversation
              <svg
                className="w-5 h-5"
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
    </div>
  );
}
