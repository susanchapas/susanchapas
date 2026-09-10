"use client";

import { motion } from "framer-motion";
import ProjectCard from "@/components/ProjectCard";
import { projects } from "@/lib/projects";

export default function ProjectsPage() {
  return (
    <div className="">
      <section className="bg-primary py-16 lg:py-24" aria-label="Project list">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-10 xl:grid-cols-3">
            {projects.map((project, index) => (
              <ProjectCard key={project.title} {...project} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-accent-blue/5 py-24 lg:py-32">
        <div className="container mx-auto px-6 text-center lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-display text-secondary mb-6 text-3xl font-bold lg:text-4xl">
              Have a project in mind?
            </h2>
            <p className="font-body text-secondary/70 mx-auto mb-8 max-w-xl text-lg">
              I&apos;m always open to discussing new opportunities and creative
              challenges. Let&apos;s create something meaningful together.
            </p>
            <motion.a
              href="/contact"
              className="bg-accent-lime text-primary font-display hover:bg-accent-lime/90 inline-flex items-center gap-3 rounded-full px-8 py-4 font-semibold transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Start a Conversation
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
    </div>
  );
}
