"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import AccessibleButton from "@/components/AccessibleButton";
import ProjectHero from "@/components/ProjectHero";

const projectData = {
  title: "All Executive Clean",
  subtitle: "Brand Redesign for Professional Cleaning Services",
  description:
    "A comprehensive brand transformation project focused on elevating professionalism and consistency across all marketing touchpoints.",
  heroImage: "/gallery/Construction Site Photo.webp",
  tags: ["Brand Identity", "Web Design", "Marketing Materials", "Strategy"],
  year: "2023",
  role: "Marketing & Business Development Manager",
  client: "All Executive Clean",
};

const caseStudy = {
  situation: {
    title: "Situation",
    content:
      "All Executive Clean, a commercial cleaning company, was struggling with inconsistent branding and outdated marketing materials that didn't reflect their professional service quality. Their existing website was difficult to navigate and failed to convert visitors into leads. The company needed a complete brand overhaul to compete effectively in the B2B space.",
  },
  task: {
    title: "Task",
    content:
      "Lead a comprehensive brand redesign initiative including website auditing and recommendations, new marketing materials development, and establishing brand guidelines. The goal was to position All Executive Clean as a premium, reliable choice for commercial and government contracts.",
  },
  action: {
    title: "Action",
    points: [
      "Conducted thorough website audit identifying UX issues and conversion barriers",
      "Developed new visual identity system with updated logo, color palette, and typography",
      "Created professional capability statement for government contracting bids",
      "Designed cohesive business cards, letterheads, and presentation templates",
      "Built a comprehensive portfolio showcasing completed projects and client testimonials",
      "Implemented SEO best practices and content strategy recommendations",
    ],
  },
  result: {
    title: "Result",
    metrics: [
      { value: "75%", label: "Increase in qualified leads" },
      { value: "3x", label: "RFP response rate improvement" },
      { value: "50%", label: "Reduction in sales cycle time" },
      { value: "8", label: "New government contracts secured" },
    ],
    content:
      "The brand refresh positioned All Executive Clean as a trusted partner for commercial and government clients. The new materials helped the company win several competitive bids and significantly improved their market presence.",
  },
};

const gallery = [
  { src: "/assets/projects/aec-1.svg", alt: "New logo design" },
  { src: "/assets/projects/aec-2.svg", alt: "Capability statement" },
  { src: "/assets/projects/aec-3.svg", alt: "Business card design" },
  { src: "/assets/projects/aec-4.svg", alt: "Portfolio presentation" },
];

const tools = [
  "Adobe Illustrator",
  "Adobe InDesign",
  "Figma",
  "Webflow",
  "Google Analytics",
  "Mailchimp",
];

export default function AllExecutiveCleanProject() {
  return (
    <div className="lg:pl-20">
      {/* Hero Section */}
      <ProjectHero src={projectData.heroImage} alt={projectData.title}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <Link
            href="/projects"
            className="text-accent-lime font-body mb-6 inline-flex items-center gap-2 transition-all hover:gap-4"
          >
            <svg
              className="h-4 w-4 rotate-180"
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

          <div className="mb-4 flex flex-wrap gap-2">
            {projectData.tags.map((tag) => (
              <span
                key={tag}
                className="bg-accent-blue/20 text-accent-blue rounded-full px-3 py-1 text-xs font-medium"
              >
                {tag}
              </span>
            ))}
          </div>

          <h1 className="font-display text-secondary mb-4 text-4xl font-bold lg:text-5xl xl:text-6xl">
            {projectData.title}
          </h1>
          <p className="font-body text-secondary/80 mb-8 max-w-2xl text-xl">
            {projectData.subtitle}
          </p>

          <div className="flex flex-wrap gap-8 text-sm">
            <div>
              <span className="text-secondary/50 mb-1 block">Year</span>
              <span className="text-secondary font-medium">{projectData.year}</span>
            </div>
            <div>
              <span className="text-secondary/50 mb-1 block">Role</span>
              <span className="text-secondary font-medium">{projectData.role}</span>
            </div>
            <div>
              <span className="text-secondary/50 mb-1 block">Client</span>
              <span className="text-secondary font-medium">{projectData.client}</span>
            </div>
          </div>
        </motion.div>
      </ProjectHero>

      {/* Overview */}
      <section className="bg-primary py-16 lg:py-24">
        <div className="container mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <h2 className="font-display text-secondary mb-6 text-2xl font-bold lg:text-3xl">
              Overview
            </h2>
            <p className="font-body text-secondary/80 text-lg leading-relaxed">
              {projectData.description}
            </p>
          </motion.div>
        </div>
      </section>

      {/* STAR Case Study */}
      <section className="bg-accent-blue/5 py-16 lg:py-24">
        <div className="container mx-auto px-6 lg:px-12">
          {/* Situation */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-16"
          >
            <span className="text-accent-lime font-body mb-4 block text-sm tracking-widest uppercase">
              {caseStudy.situation.title}
            </span>
            <p className="font-body text-secondary/80 max-w-3xl text-lg leading-relaxed">
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
            <span className="text-accent-lime font-body mb-4 block text-sm tracking-widest uppercase">
              {caseStudy.task.title}
            </span>
            <p className="font-body text-secondary/80 max-w-3xl text-lg leading-relaxed">
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
            <span className="text-accent-lime font-body mb-4 block text-sm tracking-widest uppercase">
              {caseStudy.action.title}
            </span>
            <ul className="max-w-3xl space-y-4">
              {caseStudy.action.points.map((point, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start gap-4"
                >
                  <span className="bg-accent-lime mt-2 h-2 w-2 flex-shrink-0 rounded-full" />
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
            <span className="text-accent-lime font-body mb-8 block text-sm tracking-widest uppercase">
              {caseStudy.result.title}
            </span>
            <div className="mb-8 grid grid-cols-2 gap-6 lg:grid-cols-4">
              {caseStudy.result.metrics.map((metric, index) => (
                <motion.div
                  key={metric.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-primary border-accent-blue/10 rounded-xl border p-6 text-center"
                >
                  <div className="font-display text-accent-lime mb-2 text-3xl font-bold lg:text-4xl">
                    {metric.value}
                  </div>
                  <div className="font-body text-secondary/70 text-sm">
                    {metric.label}
                  </div>
                </motion.div>
              ))}
            </div>
            <p className="font-body text-secondary/80 max-w-3xl text-lg leading-relaxed">
              {caseStudy.result.content}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Gallery */}
      <section className="bg-primary py-16 lg:py-24">
        <div className="container mx-auto px-6 lg:px-12">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-secondary mb-12 text-2xl font-bold lg:text-3xl"
          >
            Project Gallery
          </motion.h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {gallery.map((image, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group border-accent-blue/10 bg-accent-blue/5 relative flex aspect-[4/3] items-center justify-center overflow-hidden rounded-xl border"
              >
                <div className="p-6 text-center">
                  <span className="text-accent-lime font-display mb-2 block text-xl font-bold">
                    {image.alt}
                  </span>
                  <span className="text-secondary/50 text-sm">Image coming soon</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Tools & Technologies */}
      <section className="bg-accent-blue/5 py-16 lg:py-24">
        <div className="container mx-auto px-6 lg:px-12">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-secondary mb-8 text-2xl font-bold lg:text-3xl"
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
                className="bg-primary border-accent-blue/20 text-secondary font-body rounded-full border px-4 py-2 text-sm"
              >
                {tool}
              </motion.span>
            ))}
          </div>
        </div>
      </section>

      {/* Navigation */}
      <section className="bg-primary border-accent-blue/10 border-t py-16 lg:py-24">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
            <AccessibleButton href="/projects/spring-bank" variant="outline">
              <svg
                className="h-4 w-4 rotate-180"
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
              Previous Project
            </AccessibleButton>
            <AccessibleButton href="/projects/schematic-marketing">
              Next Project
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
            </AccessibleButton>
          </div>
        </div>
      </section>
    </div>
  );
}
