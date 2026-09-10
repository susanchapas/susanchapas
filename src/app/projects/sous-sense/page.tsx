"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import BackToProjects from "@/components/BackToProjects";
import AccessibleButton from "@/components/AccessibleButton";
import ProjectHero from "@/components/ProjectHero";
import SectionTabs from "@/components/SectionTabs";

const projectData = {
  title: "Sous Sense",
  subtitle: "Modular IoT Food Intelligence for the Modern Kitchen",
  description:
    "Sous Sense started as an entrepreneurship project at NJIT and became a fully developed product concept. The sensor kit retrofits into any fridge, freezer, or pantry and tells you what food you have, how fresh it is, and what to buy next. The project includes brand identity, package design, advertising, and a business plan with five-year financial projections.",
  tags: ["Brand Identity", "Package Design", "Business Strategy", "Advertising"],
  year: "2026",
  role: "Founder & Designer",
  type: "Academic Project",
};

const caseStudy = {
  situation: {
    title: "Situation",
    content:
      "American households throw away about $1,500 worth of food every year. Small restaurants lose even more, sometimes over $100,000 annually from spoiled inventory. Smart refrigerators have the right technology for this problem. The issue is price: they start at $2,500, and you need to replace your whole appliance to get one.",
  },
  task: {
    title: "Task",
    content:
      "Design the full product from concept to investor presentation. That meant building a brand, designing packaging for both consumer and commercial kits, creating advertising posters, writing a 24-page business plan with five-year projections, and assembling a 16-slide investor pitch deck.",
  },
  action: {
    title: "Action",
    points: [
      "Researched the U.S. food waste landscape ($161 billion in annual losses) and the smart home market ($338 billion projected by 2030)",
      "Analyzed three competitor categories: smart refrigerator manufacturers, manual pantry tracking apps, and general-purpose IoT platforms",
      "Developed the Sous Sense brand identity, including a serif wordmark with an integrated chef's hat motif",
      "Designed consumer sensor kit packaging at $149 and commercial system packaging at $499",
      "Created two advertising poster designs for the product launch",
      "Built five-year financial projections using the SCORE model, with all balance sheets verified",
      "Designed a 16-slide investor pitch deck covering revenue architecture, cost structure, and risk mitigation",
    ],
  },
  result: {
    title: "Result",
    metrics: [
      { value: "$4.4M", label: "Projected Year 5 revenue" },
      { value: "72.3%", label: "Gross margin by Year 5" },
      { value: "88.5%", label: "Software subscription margin" },
      { value: "Year 2", label: "Projected profitability" },
    ],
    content:
      "The financial model projects $200K in first-year revenue growing to $4.4M by Year 5, with profitability beginning in Year 2. Revenue comes from two sources: one-time hardware sales that build the installed base, and recurring SaaS subscriptions that grow with it. The subscription side carries gross margins above 85%, creating stable, predictable cash flow as the customer base expands.",
  },
};

const posters = [
  {
    src: "/gallery/sous-sense-posters-01.png",
    alt: "Sous Sense advertising poster, design 1",
  },
  {
    src: "/gallery/sous-sense-posters-02.png",
    alt: "Sous Sense advertising poster, design 2",
  },
];

const tools = ["Adobe Illustrator", "Procreate", "SCORE Financial Model", "Figma"];

export default function SousSenseProject() {
  return (
    <div className="">
      <ProjectHero src="/assets/projects/sous-sense/Sous-Sense-Hero.webp" alt="Sous Sense brand cover">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <BackToProjects />

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
              <span className="text-secondary font-medium">{projectData.type}</span>
            </div>
          </div>
        </motion.div>
      </ProjectHero>

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

      <SectionTabs
        tabs={[
          {
            id: "case-study",
            label: "Case Study",
            content: (
              <section className="bg-accent-blue/5 py-16 lg:py-24">
                <div className="container mx-auto px-6 lg:px-12">
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
            ),
          },
          {
            id: "design",
            label: "Design",
            content: (
              <section className="bg-primary py-16 lg:py-24">
                <div className="container mx-auto px-6 lg:px-12">
                  <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="mb-16 max-w-3xl"
                  >
                    <h2 className="font-display text-secondary mb-6 text-2xl font-bold lg:text-3xl">
                      Brand Identity
                    </h2>
                    <p className="font-body text-secondary/80 text-lg leading-relaxed">
                      The name comes from &ldquo;sous chef,&rdquo; the second-in-command
                      in a professional kitchen. The product works in the background,
                      keeping track of inventory and freshness so you can focus on
                      cooking. The wordmark uses a serif typeface with a chef&rsquo;s hat
                      woven into the letterform, and the visual identity uses warm tones
                      that suit a kitchen environment.
                    </p>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="mb-16"
                  >
                    <h2 className="font-display text-secondary mb-6 text-2xl font-bold lg:text-3xl">
                      Advertising
                    </h2>
                    <p className="font-body text-secondary/80 mb-10 max-w-3xl text-lg leading-relaxed">
                      These posters were designed for the consumer product launch. They
                      explain what the product does and why it&rsquo;s worth buying.
                    </p>
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                      {posters.map((poster, index) => (
                        <motion.div
                          key={poster.src}
                          initial={{ opacity: 0, y: 30 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.15 }}
                          className="group relative overflow-hidden rounded-xl"
                        >
                          <Image
                            src={poster.src}
                            alt={poster.alt}
                            width={2550}
                            height={3300}
                            className="w-full transition-transform duration-500 group-hover:scale-[1.02]"
                          />
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                  >
                    <h2 className="font-display text-secondary mb-6 text-2xl font-bold lg:text-3xl">
                      Revenue Model
                    </h2>
                    <p className="font-body text-secondary/80 mb-8 max-w-3xl text-lg leading-relaxed">
                      The business model pairs one-time hardware sales with recurring
                      software subscriptions. The hardware is intentionally limited
                      without the app, so every kit sold becomes a subscriber.
                    </p>
                    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
                      {[
                        {
                          label: "Consumer Kit",
                          price: "$149",
                          margin: "65.1% GM",
                          recurring: false,
                        },
                        {
                          label: "Consumer App",
                          price: "$12.99/mo",
                          margin: "88.5% GM",
                          recurring: true,
                        },
                        {
                          label: "Commercial Kit",
                          price: "$499",
                          margin: "66.9% GM",
                          recurring: false,
                        },
                        {
                          label: "Commercial App",
                          price: "$69.99/mo",
                          margin: "85.7% GM",
                          recurring: true,
                        },
                      ].map((product, index) => (
                        <motion.div
                          key={product.label}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.1 }}
                          className={`rounded-xl border p-6 ${
                            product.recurring
                              ? "border-accent-lime/20 bg-accent-lime/5"
                              : "border-accent-blue/10 bg-accent-blue/5"
                          }`}
                        >
                          {product.recurring && (
                            <span className="text-accent-lime mb-2 block text-xs font-semibold tracking-widest uppercase">
                              Recurring
                            </span>
                          )}
                          <div className="font-display text-secondary mb-1 text-2xl font-bold">
                            {product.price}
                          </div>
                          <div className="font-body text-secondary/70 text-sm">
                            {product.label}
                          </div>
                          <div className="font-body text-secondary/50 mt-2 text-xs">
                            {product.margin}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="mt-16"
                  >
                    <h2 className="font-display text-secondary mb-8 text-2xl font-bold lg:text-3xl">
                      Tools & Technologies
                    </h2>
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
                  </motion.div>
                </div>
              </section>
            ),
          },
        ]}
      />

      <section className="bg-primary border-accent-blue/10 border-t py-16 lg:py-24">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
            <AccessibleButton href="/projects" variant="outline">
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
              All Projects
            </AccessibleButton>
            <AccessibleButton href="/projects/archlog">
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
