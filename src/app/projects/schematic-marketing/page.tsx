"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import AccessibleButton from "@/components/AccessibleButton";

const projectData = {
  title: "Schematic Marketing",
  subtitle: "Building an Accessibility-Focused Design Agency",
  description:
    "Founded and scaled a design agency dedicated to making professional branding and web solutions accessible to small businesses, nonprofits, and entrepreneurs.",
  heroImage: "/assets/projects/schematic-marketing-hero.jpg",
  tags: ["Entrepreneurship", "Accessibility", "UX Design", "Agency"],
  year: "2021 - 2023",
  role: "Founder & Director",
  client: "Own Venture",
};

const caseStudy = {
  situation: {
    title: "Situation",
    content:
      "Small businesses, nonprofits, and individual entrepreneurs often lack access to quality design and marketing services due to budget constraints. Many agencies price out smaller clients, leaving them with DIY solutions that don't effectively represent their brands. There was a clear gap in the market for accessible, professional-quality design services at fair prices.",
  },
  task: {
    title: "Task",
    content:
      "Launch and grow a design agency that prioritizes accessibility in two ways: making design services financially accessible to underserved markets, and ensuring all deliverables meet WCAG accessibility standards. Build sustainable business operations while maintaining a mission-driven approach.",
  },
  action: {
    title: "Action",
    points: [
      "Developed tiered pricing models to accommodate different budget levels",
      "Created streamlined processes to deliver quality work efficiently",
      "Built partnerships with local business development organizations",
      "Established accessibility-first design practices across all projects",
      "Mentored junior designers and interns from underrepresented backgrounds",
      "Developed educational content helping clients understand design ROI",
    ],
  },
  result: {
    title: "Result",
    metrics: [
      { value: "50+", label: "Clients served" },
      { value: "100%", label: "WCAG compliance rate" },
      { value: "4.9★", label: "Average client rating" },
      { value: "15", label: "Nonprofit organizations helped" },
    ],
    content:
      "Schematic Marketing successfully proved that quality design can be made accessible without sacrificing profitability. The agency helped dozens of small businesses establish professional brand identities, with a particular focus on organizations serving underrepresented communities.",
  },
};

const gallery = [
  { src: "/assets/projects/sm-1.jpg", alt: "Client branding project" },
  { src: "/assets/projects/sm-2.jpg", alt: "Website design mockup" },
  { src: "/assets/projects/sm-3.jpg", alt: "Marketing collateral" },
  { src: "/assets/projects/sm-4.jpg", alt: "Accessibility audit report" },
];

const tools = [
  "Figma",
  "Adobe Creative Suite",
  "WordPress",
  "Shopify",
  "WAVE Accessibility Tool",
  "Asana",
  "Notion",
];

const services = [
  "Brand Identity Design",
  "Website Design & Development",
  "Marketing Collateral",
  "Accessibility Audits",
  "Social Media Graphics",
  "Email Marketing Templates",
];

export default function SchematicMarketingProject() {
  return (
    <div className="lg:pl-20">
      {/* Hero Section */}
      <section className="relative flex min-h-[70vh] items-end py-16 lg:py-24">
        <div className="absolute inset-0 z-0">
          <Image
            src={projectData.heroImage}
            alt={projectData.title}
            fill
            className="object-cover"
            priority
          />
          <div className="from-primary via-primary/70 to-primary/30 absolute inset-0 bg-gradient-to-t" />
        </div>

        <div className="relative z-10 container mx-auto px-6 lg:px-12">
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
                <span className="text-secondary/50 mb-1 block">Type</span>
                <span className="text-secondary font-medium">{projectData.client}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

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

      {/* Services Offered */}
      <section className="bg-accent-blue/5 py-16 lg:py-24">
        <div className="container mx-auto px-6 lg:px-12">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-secondary mb-12 text-2xl font-bold lg:text-3xl"
          >
            Services Offered
          </motion.h2>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
            {services.map((service, index) => (
              <motion.div
                key={service}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-primary border-accent-blue/10 rounded-xl border p-6 text-center"
              >
                <span className="font-body text-secondary">{service}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* STAR Case Study */}
      <section className="bg-primary py-16 lg:py-24">
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
                  className="bg-accent-blue/5 border-accent-blue/10 rounded-xl border p-6 text-center"
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
      <section className="bg-accent-blue/5 py-16 lg:py-24">
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
                key={image.src}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative aspect-[4/3] overflow-hidden rounded-xl"
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
      <section className="bg-primary py-16 lg:py-24">
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
                className="bg-accent-blue/5 border-accent-blue/20 text-secondary font-body rounded-full border px-4 py-2 text-sm"
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
            <AccessibleButton href="/projects/all-executive-clean" variant="outline">
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
            <AccessibleButton href="/projects">
              All Projects
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
