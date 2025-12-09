"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import AccessibleButton from "@/components/AccessibleButton";
import SectionDivider from "@/components/SectionDivider";

const timeline = [
  {
    year: "2024 - Present",
    role: "Marketing & UX Strategist",
    company: "Spring Bank",
    description:
      "Leading UX strategy and marketing initiatives for community banking products. Designing user-centered solutions that bridge traditional banking with modern digital experiences.",
  },
  {
    year: "2023 - 2024",
    role: "Marketing & Business Development Manager",
    company: "All Executive Clean",
    description:
      "Redesigned brand identity and developed comprehensive marketing materials. Led website auditing and created capability statements, business cards, and portfolio materials.",
  },
  {
    year: "2021 - 2023",
    role: "Founder & Director",
    company: "Schematic Marketing",
    description:
      "Founded and scaled an accessibility-focused design agency serving small businesses, nonprofits, and entrepreneurs. Delivered end-to-end branding and web solutions.",
  },
  {
    year: "2019 - 2021",
    role: "Marketing Coordinator",
    company: "Spring Bank",
    description:
      "Coordinated marketing campaigns and community outreach. Supported the launch of new banking products and managed social media presence.",
  },
  {
    year: "2018 - 2019",
    role: "Marketing Liaison",
    company: "MaxWell Medical",
    description:
      "Bridged communication between marketing teams and medical professionals. Developed patient-facing materials and coordinated healthcare marketing initiatives.",
  },
];

const education = [
  {
    degree: "M.S. Human-Computer Interaction",
    school: "New Jersey Institute of Technology (NJIT)",
    year: "In Progress",
    description: "Focus on UX Research, Accessibility, and Design Systems",
  },
  {
    degree: "Full-Stack Web Development Certificate",
    school: "MIT xPRO",
    year: "2023",
    description: "MERN Stack, React, Node.js, MongoDB, Express",
  },
];

export default function AboutPage() {
  return (
    <div className="lg:pl-20">
      {/* Hero Section */}
      <section className="min-h-[70vh] flex items-center py-24 lg:py-32 gradient-mesh">
        <div className="container mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center"
          >
            <div>
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-accent-lime font-body text-sm uppercase tracking-widest mb-4 block"
              >
                About Me
              </motion.span>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="font-display text-4xl lg:text-5xl xl:text-6xl font-bold text-secondary mb-6"
              >
                The Strategic
                <br />
                <span className="text-gradient">Architect</span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="font-body text-lg text-secondary/70 mb-8 max-w-lg"
              >
                I bridge design, marketing strategy, and technical implementation 
                to create meaningful experiences. Bilingual in English and Spanish, 
                I bring a unique perspective to every project.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="flex gap-4"
              >
                <AccessibleButton href="/contact">
                  Let&apos;s Connect
                </AccessibleButton>
                <AccessibleButton
                  href="/Susan_Chapas_Resume.pdf"
                  variant="outline"
                  external
                >
                  Download Resume
                </AccessibleButton>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="relative aspect-square max-w-md mx-auto lg:mx-0"
            >
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-accent-lime/20 via-accent-blue/20 to-accent-clay/20 blur-2xl" />
              <div className="relative rounded-3xl overflow-hidden border border-accent-blue/20">
                <Image
                  src="/assets/profile.jpg"
                  alt="Susan Chapas"
                  width={500}
                  height={500}
                  className="object-cover"
                  priority
                />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <SectionDivider variant="curved" />

      {/* Timeline Section */}
      <section className="py-24 lg:py-32 bg-primary" aria-labelledby="experience-heading">
        <div className="container mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-16"
          >
            <span className="text-accent-lime font-body text-sm uppercase tracking-widest mb-4 block">
              Experience
            </span>
            <h2
              id="experience-heading"
              className="font-display text-3xl lg:text-4xl font-bold text-secondary"
            >
              Professional Journey
            </h2>
          </motion.div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-0 lg:left-1/2 top-0 bottom-0 w-px bg-accent-blue/20 transform lg:-translate-x-1/2" />

            {timeline.map((item, index) => (
              <motion.div
                key={item.role}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`relative pl-8 lg:pl-0 pb-12 lg:pb-16 ${
                  index % 2 === 0 ? "lg:pr-[50%] lg:text-right" : "lg:pl-[50%]"
                }`}
              >
                {/* Timeline dot */}
                <div
                  className={`absolute left-0 lg:left-1/2 top-2 w-3 h-3 rounded-full bg-accent-lime transform lg:-translate-x-1/2 ${
                    index === 0 ? "ring-4 ring-accent-lime/20" : ""
                  }`}
                />

                <div className={index % 2 === 0 ? "lg:pr-12" : "lg:pl-12"}>
                  <span className="text-accent-lime font-body text-sm mb-2 block">
                    {item.year}
                  </span>
                  <h3 className="font-display text-xl lg:text-2xl font-bold text-secondary mb-1">
                    {item.role}
                  </h3>
                  <p className="text-accent-blue font-body font-medium mb-3">
                    {item.company}
                  </p>
                  <p className="text-secondary/70 font-body">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section className="py-24 lg:py-32 bg-accent-blue/5" aria-labelledby="education-heading">
        <div className="container mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-16"
          >
            <span className="text-accent-lime font-body text-sm uppercase tracking-widest mb-4 block">
              Education
            </span>
            <h2
              id="education-heading"
              className="font-display text-3xl lg:text-4xl font-bold text-secondary"
            >
              Academic Background
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {education.map((item, index) => (
              <motion.div
                key={item.degree}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="p-8 rounded-2xl bg-primary border border-accent-blue/10 hover:border-accent-lime/30 transition-colors"
              >
                <span className="text-accent-lime font-body text-sm mb-3 block">
                  {item.year}
                </span>
                <h3 className="font-display text-xl font-bold text-secondary mb-2">
                  {item.degree}
                </h3>
                <p className="text-accent-blue font-body font-medium mb-3">
                  {item.school}
                </p>
                <p className="text-secondary/70 font-body">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Art Section */}
      <section className="py-24 lg:py-32 bg-primary" aria-labelledby="art-heading">
        <div className="container mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <span className="text-accent-lime font-body text-sm uppercase tracking-widest mb-4 block">
              Creative Side
            </span>
            <h2
              id="art-heading"
              className="font-display text-3xl lg:text-4xl font-bold text-secondary mb-4"
            >
              Art & Photography
            </h2>
            <p className="font-body text-lg text-secondary/70 max-w-2xl mx-auto">
              Beyond design and development, I express creativity through visual arts. 
              My piece &quot;Mindless Mirth&quot; received recognition for its unique exploration 
              of human emotion and abstraction.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative max-w-3xl mx-auto"
          >
            <div className="aspect-[4/3] rounded-2xl overflow-hidden border border-accent-blue/20">
              <Image
                src="/assets/art/mindless-mirth.jpg"
                alt="Mindless Mirth - Award-winning artwork by Susan Chapas"
                fill
                className="object-cover"
              />
            </div>
            <div className="mt-6 text-center">
              <h3 className="font-display text-xl font-bold text-secondary mb-2">
                Mindless Mirth
              </h3>
              <p className="text-accent-clay font-body mb-6">Award-Winning Piece</p>
              <Link
                href="/gallery"
                className="inline-flex items-center gap-2 text-accent-lime font-display font-semibold hover:gap-4 transition-all"
              >
                View Full Gallery
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
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
