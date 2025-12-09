"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import AccessibleButton from "@/components/AccessibleButton";

const projectData = {
  title: "Spring Bank",
  subtitle: "New Branch Launch in Red Hook, Brooklyn",
  description:
    "A comprehensive brand experience design project for the launch of Spring Bank's newest community branch location.",
  heroImage: "/assets/projects/spring-bank-hero.jpg",
  tags: ["Brand Strategy", "Interior Design", "Motion Graphics", "UX Design"],
  year: "2024",
  role: "Marketing & UX Strategist",
  client: "Spring Bank",
};

const caseStudy = {
  situation: {
    title: "Situation",
    content:
      "Spring Bank, a community development financial institution, was expanding with a new branch in Red Hook, Brooklyn. They needed a cohesive brand experience that would resonate with the diverse local community while maintaining their mission-driven identity. The challenge was to create an inviting space that bridges traditional banking with modern, accessible services.",
  },
  task: {
    title: "Task",
    content:
      "Lead the design and marketing strategy for the new branch launch, including interior and exterior design concepts, ATM interface animations, marketing materials, and community engagement strategies. The project required balancing regulatory requirements with creative brand expression.",
  },
  action: {
    title: "Action",
    points: [
      "Conducted community research to understand local demographics and banking needs",
      "Designed interior layouts that promote accessibility and comfortable customer interactions",
      "Created motion graphics for ATM screens featuring the Spring Bank brand",
      "Developed comprehensive marketing collateral for the branch opening",
      "Coordinated with architects and contractors on design implementation",
      "Planned community launch events and partnerships with local organizations",
    ],
  },
  result: {
    title: "Result",
    metrics: [
      { value: "500+", label: "New accounts in first month" },
      { value: "95%", label: "Customer satisfaction score" },
      { value: "40%", label: "Increase in brand awareness" },
      { value: "12", label: "Community partnerships established" },
    ],
    content:
      "The Red Hook branch launch exceeded expectations, becoming one of Spring Bank's most successful new locations. The community-centered approach resulted in strong local adoption and positive press coverage.",
  },
};

const gallery = [
  { src: "/assets/projects/spring-bank-1.jpg", alt: "Branch interior design" },
  { src: "/assets/projects/spring-bank-2.jpg", alt: "ATM interface design" },
  { src: "/assets/projects/spring-bank-3.jpg", alt: "Exterior signage" },
  { src: "/assets/projects/spring-bank-4.jpg", alt: "Marketing materials" },
];

const tools = [
  "Figma",
  "Adobe Creative Suite",
  "After Effects",
  "Miro",
  "Asana",
  "Google Analytics",
];

export default function SpringBankProject() {
  return (
    <div className="lg:pl-20">
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-end py-16 lg:py-24">
        <div className="absolute inset-0 z-0">
          <Image
            src={projectData.heroImage}
            alt={projectData.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/70 to-primary/30" />
        </div>

        <div className="relative z-10 container mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 text-accent-lime font-body mb-6 hover:gap-4 transition-all"
            >
              <svg
                className="w-4 h-4 rotate-180"
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
              Back to Projects
            </Link>

            <div className="flex flex-wrap gap-2 mb-4">
              {projectData.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 text-xs font-medium bg-accent-blue/20 text-accent-blue rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>

            <h1 className="font-display text-4xl lg:text-5xl xl:text-6xl font-bold text-secondary mb-4">
              {projectData.title}
            </h1>
            <p className="font-body text-xl text-secondary/80 max-w-2xl mb-8">
              {projectData.subtitle}
            </p>

            <div className="flex flex-wrap gap-8 text-sm">
              <div>
                <span className="text-secondary/50 block mb-1">Year</span>
                <span className="text-secondary font-medium">{projectData.year}</span>
              </div>
              <div>
                <span className="text-secondary/50 block mb-1">Role</span>
                <span className="text-secondary font-medium">{projectData.role}</span>
              </div>
              <div>
                <span className="text-secondary/50 block mb-1">Client</span>
                <span className="text-secondary font-medium">{projectData.client}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Overview */}
      <section className="py-16 lg:py-24 bg-primary">
        <div className="container mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <h2 className="font-display text-2xl lg:text-3xl font-bold text-secondary mb-6">
              Overview
            </h2>
            <p className="font-body text-lg text-secondary/80 leading-relaxed">
              {projectData.description}
            </p>
          </motion.div>
        </div>
      </section>

      {/* STAR Case Study */}
      <section className="py-16 lg:py-24 bg-accent-blue/5">
        <div className="container mx-auto px-6 lg:px-12">
          {/* Situation */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-16"
          >
            <span className="text-accent-lime font-body text-sm uppercase tracking-widest mb-4 block">
              {caseStudy.situation.title}
            </span>
            <p className="font-body text-lg text-secondary/80 max-w-3xl leading-relaxed">
              {caseStudy.situation.content}
            </p>
          </motion.div>

          {/* Task */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-16"
          >
            <span className="text-accent-lime font-body text-sm uppercase tracking-widest mb-4 block">
              {caseStudy.task.title}
            </span>
            <p className="font-body text-lg text-secondary/80 max-w-3xl leading-relaxed">
              {caseStudy.task.content}
            </p>
          </motion.div>

          {/* Action */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-16"
          >
            <span className="text-accent-lime font-body text-sm uppercase tracking-widest mb-4 block">
              {caseStudy.action.title}
            </span>
            <ul className="space-y-4 max-w-3xl">
              {caseStudy.action.points.map((point, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start gap-4"
                >
                  <span className="w-2 h-2 mt-2 rounded-full bg-accent-lime flex-shrink-0" />
                  <span className="font-body text-secondary/80">{point}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Result */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-accent-lime font-body text-sm uppercase tracking-widest mb-8 block">
              {caseStudy.result.title}
            </span>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {caseStudy.result.metrics.map((metric, index) => (
                <motion.div
                  key={metric.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="p-6 rounded-xl bg-primary border border-accent-blue/10 text-center"
                >
                  <div className="font-display text-3xl lg:text-4xl font-bold text-accent-lime mb-2">
                    {metric.value}
                  </div>
                  <div className="font-body text-sm text-secondary/70">
                    {metric.label}
                  </div>
                </motion.div>
              ))}
            </div>
            <p className="font-body text-lg text-secondary/80 max-w-3xl leading-relaxed">
              {caseStudy.result.content}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-16 lg:py-24 bg-primary">
        <div className="container mx-auto px-6 lg:px-12">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-2xl lg:text-3xl font-bold text-secondary mb-12"
          >
            Project Gallery
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {gallery.map((image, index) => (
              <motion.div
                key={image.src}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative aspect-[4/3] rounded-xl overflow-hidden group"
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Tools & Technologies */}
      <section className="py-16 lg:py-24 bg-accent-blue/5">
        <div className="container mx-auto px-6 lg:px-12">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-2xl lg:text-3xl font-bold text-secondary mb-8"
          >
            Tools & Technologies
          </motion.h2>
          <div className="flex flex-wrap gap-3">
            {tools.map((tool, index) => (
              <motion.span
                key={tool}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="px-4 py-2 rounded-full bg-primary border border-accent-blue/20 text-secondary font-body text-sm"
              >
                {tool}
              </motion.span>
            ))}
          </div>
        </div>
      </section>

      {/* Navigation */}
      <section className="py-16 lg:py-24 bg-primary border-t border-accent-blue/10">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
            <AccessibleButton href="/projects" variant="outline">
              <svg
                className="w-4 h-4 rotate-180"
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
              All Projects
            </AccessibleButton>
            <AccessibleButton href="/projects/all-executive-clean">
              Next Project
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
            </AccessibleButton>
          </div>
        </div>
      </section>
    </div>
  );
}
