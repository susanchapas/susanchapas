"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import BackToProjects from "@/components/BackToProjects";
import { ReactNode, useState, useCallback, useRef } from "react";
import AccessibleButton from "@/components/AccessibleButton";
import ProjectHero from "@/components/ProjectHero";
import SectionTabs from "@/components/SectionTabs";

const projectData = {
  title: "BrandComms",
  subtitle:
    "AI-assisted brand compliance for university communities",
  description:
    "BrandComms is a product concept for an AI-powered brand management platform designed for universities. It was developed as a semester-long academic project at NJIT by a team of four designers. The core problem: university brand guidelines are dense, the approval process for using them is slow and opaque, and the people who need the most help get the least guidance. BrandComms uses AI agents to translate brand standards into clear, specific feedback and automate compliance checks before human review.",
  tags: ["UX Research", "Product Design", "AI/ML Concept"],
  year: "2025",
  role: "UX Researcher & Product Designer",
  team: "4-person team",
};

const atAGlance = [
  { label: "My role", value: "UX Research & Product Design" },
  { label: "Team", value: "4 designers" },
  { label: "Platform", value: "Web (desktop-first)" },
  { label: "Methods", value: "Stakeholder analysis, persona development, scenario modeling" },
];

const researchStats = [
  { value: "8", label: "Stakeholder categories mapped" },
  { value: "10", label: "User personas developed" },
  { value: "3", label: "Scenario types modeled (problem, activity, key path)" },
];

const insights = [
  {
    title: "Brand guidelines are written for the wrong audience.",
    body: "The people who most frequently produce branded materials (students running clubs and events) are the least equipped to interpret the documentation. The manuals assume familiarity with design terminology, color systems, and layout rules.",
  },
  {
    title: "Approval is invisible.",
    body: "Students submit work and receive no confirmation, no timeline, and no progress indicator. The first communication is often a rejection. Compliance officers set the standards and approve the materials, but their process has no outward-facing structure.",
  },
  {
    title: "Feedback without direction creates rework cycles.",
    body: "Rejections rarely explain what went wrong or how to fix it. Students revise by guessing, which produces more rejections and wastes time for both sides.",
  },
  {
    title: "Inconsistency breaks trust in the system.",
    body: "Different reviewers evaluate the same guidelines differently. When students get contradictory feedback from different staff members, they stop seeing the process as reliable.",
  },
  {
    title: "External partners face the same barriers.",
    body: "Local businesses and organizations collaborating on co-branded campaigns encounter the same unclear permissions, fragmented communication, and delayed responses.",
  },
];

const personas = [
  {
    name: "Maya Torres",
    archetype: "The Organizer",
    description: "22, student club president. Designs flyers and t-shirts for events. Wants to follow brand rules but finds the process inaccessible and unresponsive.",
    image: "/assets/projects/brandcomms/BrandComms%20personas/maya%20torres.png",
  },
  {
    name: "Sophia Sharp",
    archetype: "The Digital Voice",
    description: "21, social media chair. Needs fast turnarounds for posts and campaigns. Delayed approvals mean missed opportunities.",
    image: "/assets/projects/brandcomms/BrandComms%20personas/sofia%20sharp.png",
  },
  {
    name: "Karina Mitev",
    archetype: "The Storykeeper",
    description: "42, assistant director of strategic communications. Oversees brand consistency across all student and external projects.",
    image: "/assets/projects/brandcomms/BrandComms%20personas/karina%20mitev.png",
  },
  {
    name: "Anthony Vega",
    archetype: "The Gatekeeper",
    description: "42, compliance officer. Enforces design standards and ensures submissions meet visual and legal criteria. Workload is high and largely manual.",
    image: "/assets/projects/brandcomms/BrandComms%20personas/anthony%20vega.png",
  },
  {
    name: "Dr. Evelyn Cho",
    archetype: "The Mentor",
    description: "46, assistant professor. Supervises student projects that use university branding. Constantly mediates between students and the marketing department.",
    image: "/assets/projects/brandcomms/BrandComms%20personas/evelyn%20cho.png",
  },
];

const features = [
  {
    name: "Real-Time Compliance Feedback",
    body: "AI agents scan uploaded designs against the university's brand standards and flag issues with specific, actionable suggestions. Auto-fix options handle common violations like incorrect logo placement or wrong color values.",
  },
  {
    name: "Visual Learning Tools",
    body: "Interactive tutorials teach brand literacy through visual examples. Students learn what the guidelines mean and why they matter, right when they need the information.",
  },
  {
    name: "Smart Brand Kit",
    body: "Adaptive templates pre-loaded with correct fonts, colors, and logo files. Students start from a compliant baseline and customize from there.",
  },
  {
    name: "Centralized Dashboard",
    body: "A single view where students, reviewers, and partners see every submission, its status, and its feedback history. No more emailing into silence.",
  },
  {
    name: "AI Policy Guard",
    body: "Automatic content screening for policy violations, sensitive material, and brand misuse before a human reviewer sees the submission.",
  },
  {
    name: "Collaborative Campaign Mode",
    body: "A shared workspace for co-branded projects between the university and external partners. Both parties see the same guidelines and the same approval status.",
  },
];

const resolvedProblems = [
  "Confusion over inconsistent or outdated branding guidelines",
  "Lengthy, unclear approval processes",
  "Redundant faculty oversight and repetitive manual corrections",
  "Miscommunication between departments, students, and partners",
  "Delays and defensiveness caused by inconsistent feedback",
];

const tools = ["Lovable", "Miro", "Google Workspace", "Canva"];

function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ type: "spring", stiffness: 140, damping: 18, mass: 0.6, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function Tile({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32, scale: 0.94 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ type: "spring", stiffness: 280, damping: 22, mass: 0.7, delay }}
      whileHover={{
        y: -8,
        scale: 1.03,
        transition: { type: "spring", stiffness: 400, damping: 24 },
      }}
      className={`will-change-transform ${className}`}
    >
      {children}
    </motion.div>
  );
}

function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <span className="text-accent-lime font-body mb-4 block text-sm tracking-widest uppercase">
      {children}
    </span>
  );
}

const screenshots = [
  {
    src: "/assets/projects/brandcomms/Dashboard.webp",
    alt: "BrandComms dashboard showing project status and submission list",
    title: "Submission Dashboard",
    description:
      "A centralized view of all submissions with status indicators, so students always know where their projects stand.",
  },
  {
    src: "/assets/projects/brandcomms/Branding-AI-Review.webp",
    alt: "AI review screen with before-and-after slider and compliance summary",
    title: "AI Compliance Review",
    description:
      "The AI scans uploaded designs against brand standards and flags issues with specific fixes. A before-and-after slider shows exactly what changed.",
  },
  {
    src: "/assets/projects/brandcomms/Branding-AI-Edits-1stRound.webp",
    alt: "Final design preview with summary of automated fixes",
    title: "AI Edit Summary",
    description:
      "After auto-corrections, students review a summary of every change before submitting to human review.",
  },
  {
    src: "/assets/projects/brandcomms/Branding-Human-Review.webp",
    alt: "Human compliance review with action items and progress tracker",
    title: "Human Compliance Review",
    description:
      "Compliance officers leave structured feedback with suggested additions. Students accept or respond to each item inline.",
  },
];

function ScreenshotCarousel() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);
  const touchStart = useRef<number | null>(null);

  const go = useCallback(
    (dir: 1 | -1) => {
      setDirection(dir);
      setCurrent((prev) => (prev + dir + screenshots.length) % screenshots.length);
    },
    [],
  );

  const onTouchStart = useCallback((e: React.TouchEvent) => {
    touchStart.current = e.touches[0].clientX;
  }, []);

  const onTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      if (touchStart.current === null) return;
      const delta = e.changedTouches[0].clientX - touchStart.current;
      if (Math.abs(delta) > 50) go(delta < 0 ? 1 : -1);
      touchStart.current = null;
    },
    [go],
  );

  const slide = screenshots[current];

  return (
    <div onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => go(-1)}
          className="border-accent-blue/20 text-secondary hover:border-accent-lime hover:text-accent-lime hidden shrink-0 rounded-full border p-2 transition-colors lg:block"
          aria-label="Previous screenshot"
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <div className="bg-accent-blue/5 border-accent-blue/10 min-w-0 flex-1 overflow-hidden rounded-2xl border">
          <div className="relative aspect-[16/10] w-full overflow-hidden">
            <AnimatePresence mode="wait" initial={false} custom={direction}>
              <motion.div
                key={slide.src}
                custom={direction}
                initial={{ opacity: 0, x: direction * 60 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction * -60 }}
                transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0"
              >
                <Image
                  src={slide.src}
                  alt={slide.alt}
                  fill
                  sizes="(min-width: 1024px) 60vw, 100vw"
                  className="object-cover object-top"
                />
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex items-start justify-between gap-4 p-5">
            <div className="min-w-0">
              <h3 className="font-display text-secondary mb-1 text-lg font-bold">
                {slide.title}
              </h3>
              <p className="font-body text-secondary/70 text-sm leading-relaxed">
                {slide.description}
              </p>
            </div>
            <span className="text-secondary/40 font-body shrink-0 text-sm">
              {current + 1}/{screenshots.length}
            </span>
          </div>
        </div>

        <button
          type="button"
          onClick={() => go(1)}
          className="border-accent-blue/20 text-secondary hover:border-accent-lime hover:text-accent-lime hidden shrink-0 rounded-full border p-2 transition-colors lg:block"
          aria-label="Next screenshot"
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      <div className="mt-4 flex items-center justify-center gap-4 lg:hidden">
        <button
          type="button"
          onClick={() => go(-1)}
          className="border-accent-blue/20 text-secondary hover:border-accent-lime hover:text-accent-lime rounded-full border p-2 transition-colors"
          aria-label="Previous screenshot"
        >
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <div className="flex gap-2">
          {screenshots.map((s, i) => (
            <button
              key={s.title}
              type="button"
              onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i); }}
              className={`h-2 rounded-full transition-all ${
                i === current
                  ? "bg-accent-lime w-6"
                  : "bg-secondary/20 hover:bg-secondary/40 w-2"
              }`}
              aria-label={`Go to ${s.title}`}
            />
          ))}
        </div>
        <button
          type="button"
          onClick={() => go(1)}
          className="border-accent-blue/20 text-secondary hover:border-accent-lime hover:text-accent-lime rounded-full border p-2 transition-colors"
          aria-label="Next screenshot"
        >
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      <div className="mt-4 hidden justify-center gap-2 lg:flex">
        {screenshots.map((s, i) => (
          <button
            key={s.title}
            type="button"
            onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i); }}
            className={`h-2 rounded-full transition-all ${
              i === current
                ? "bg-accent-lime w-6"
                : "bg-secondary/20 hover:bg-secondary/40 w-2"
            }`}
            aria-label={`Go to ${s.title}`}
          />
        ))}
      </div>
    </div>
  );
}

function PersonaCarousel() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);
  const touchStart = useRef<number | null>(null);

  const go = useCallback(
    (dir: 1 | -1) => {
      setDirection(dir);
      setCurrent((prev) => (prev + dir + personas.length) % personas.length);
    },
    [],
  );

  const onTouchStart = useCallback((e: React.TouchEvent) => {
    touchStart.current = e.touches[0].clientX;
  }, []);

  const onTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      if (touchStart.current === null) return;
      const delta = e.changedTouches[0].clientX - touchStart.current;
      if (Math.abs(delta) > 50) go(delta < 0 ? 1 : -1);
      touchStart.current = null;
    },
    [go],
  );

  const persona = personas[current];

  return (
    <div onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => go(-1)}
          className="border-accent-blue/20 text-secondary hover:border-accent-lime hover:text-accent-lime hidden shrink-0 rounded-full border p-2 transition-colors lg:block"
          aria-label="Previous persona"
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <div className="bg-accent-blue/5 border-accent-blue/10 min-w-0 flex-1 overflow-hidden rounded-2xl border">
          <div className="relative aspect-[16/10] w-full overflow-hidden">
            <AnimatePresence mode="wait" initial={false} custom={direction}>
              <motion.div
                key={persona.image}
                custom={direction}
                initial={{ opacity: 0, x: direction * 60 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction * -60 }}
                transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0"
              >
                <Image
                  src={persona.image}
                  alt={`Persona sheet for ${persona.name}, ${persona.archetype}`}
                  fill
                  sizes="(min-width: 1024px) 60vw, 100vw"
                  className="object-cover object-top"
                />
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex items-start justify-between gap-4 p-5">
            <div className="min-w-0">
              <span className="text-accent-blue font-body mb-1 block text-xs font-semibold tracking-widest uppercase">
                {persona.archetype}
              </span>
              <h3 className="font-display text-secondary text-lg font-bold">
                {persona.name}
              </h3>
            </div>
            <span className="text-secondary/40 font-body shrink-0 text-sm">
              {current + 1}/{personas.length}
            </span>
          </div>
        </div>

        <button
          type="button"
          onClick={() => go(1)}
          className="border-accent-blue/20 text-secondary hover:border-accent-lime hover:text-accent-lime hidden shrink-0 rounded-full border p-2 transition-colors lg:block"
          aria-label="Next persona"
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      <div className="mt-4 flex items-center justify-center gap-4 lg:hidden">
        <button
          type="button"
          onClick={() => go(-1)}
          className="border-accent-blue/20 text-secondary hover:border-accent-lime hover:text-accent-lime rounded-full border p-2 transition-colors"
          aria-label="Previous persona"
        >
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <div className="flex gap-2">
          {personas.map((p, i) => (
            <button
              key={p.name}
              type="button"
              onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i); }}
              className={`h-2 rounded-full transition-all ${
                i === current
                  ? "bg-accent-lime w-6"
                  : "bg-secondary/20 hover:bg-secondary/40 w-2"
              }`}
              aria-label={`Go to ${p.name}`}
            />
          ))}
        </div>
        <button
          type="button"
          onClick={() => go(1)}
          className="border-accent-blue/20 text-secondary hover:border-accent-lime hover:text-accent-lime rounded-full border p-2 transition-colors"
          aria-label="Next persona"
        >
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      <div className="mt-4 hidden justify-center gap-2 lg:flex">
        {personas.map((p, i) => (
          <button
            key={p.name}
            type="button"
            onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i); }}
            className={`h-2 rounded-full transition-all ${
              i === current
                ? "bg-accent-lime w-6"
                : "bg-secondary/20 hover:bg-secondary/40 w-2"
            }`}
            aria-label={`Go to ${p.name}`}
          />
        ))}
      </div>
    </div>
  );
}

export default function BrandCommsProject() {
  return (
    <div className="">
      <ProjectHero src="/assets/projects/brandcomms/BrandComms-Hero.webp" alt={projectData.title}>
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
              <span className="text-secondary/50 mb-1 block">Team</span>
              <span className="text-secondary font-medium">{projectData.team}</span>
            </div>
          </div>
        </motion.div>
      </ProjectHero>

      <section className="bg-primary py-16 lg:py-24">
        <div className="container mx-auto grid gap-12 px-6 lg:grid-cols-3 lg:px-12">
          <Reveal className="lg:col-span-2">
            <h2 className="font-display text-secondary mb-6 text-2xl font-bold lg:text-3xl">
              Overview
            </h2>
            <p className="font-body text-secondary/80 text-lg leading-relaxed">
              {projectData.description}
            </p>
          </Reveal>

          <Tile
            delay={0.1}
            className="bg-accent-blue/5 border-accent-blue/10 rounded-2xl border p-6"
          >
            <h3 className="font-display text-secondary mb-5 text-sm tracking-widest uppercase">
              At a glance
            </h3>
            <dl className="space-y-4">
              {atAGlance.map((item) => (
                <div key={item.label}>
                  <dt className="text-secondary/50 text-xs tracking-wide uppercase">
                    {item.label}
                  </dt>
                  <dd className="font-body text-secondary mt-0.5">{item.value}</dd>
                </div>
              ))}
            </dl>
          </Tile>
        </div>
      </section>

      <SectionTabs
        tabs={[
          {
            id: "challenge",
            label: "Challenge",
            content: (
              <section className="bg-accent-blue/5 py-16 lg:py-24">
                <div className="container mx-auto px-6 lg:px-12">
                  <div className="mb-12 grid items-start gap-10 lg:grid-cols-5">
                    <Reveal className="lg:col-span-3">
                      <Eyebrow>The Challenge</Eyebrow>
                      <p className="font-body text-secondary/80 text-lg leading-relaxed">
                        University brand guidelines are typically written as 50-to-60-page
                        documents for trained designers. Most students are not trained
                        designers. When a club president needs to print flyers for an event,
                        or a student org wants to post on social media, they have to navigate
                        rules they were never taught to read.
                      </p>
                      <p className="font-body text-secondary/80 mt-4 text-lg leading-relaxed">
                        The submission process compounds the confusion: materials go into
                        a compliance portal, and days or weeks pass with no status update.
                        Rejections arrive as one-line emails with no explanation of what
                        to fix. This leaves students guessing, revising blindly, and
                        sometimes printing unapproved work because the deadline
                        won&apos;t wait.
                      </p>
                      <p className="font-body text-secondary/80 mt-4 text-lg leading-relaxed">
                        On the staff side, compliance officers and marketing teams review
                        a high volume of submissions by hand with no centralized way to
                        track them. The workload is repetitive, and the feedback they give
                        is inconsistent because there is no shared standard for how to
                        evaluate and communicate.
                      </p>
                    </Reveal>

                    <Reveal delay={0.1} className="lg:col-span-2">
                      <div className="bg-primary/40 border-accent-blue/10 overflow-hidden rounded-2xl border">
                        <Image
                          src="/assets/projects/brandcomms/Brand-Request-Current.png"
                          alt="Current brand request workflow showing a confusing, multi-step approval process"
                          width={800}
                          height={600}
                          className="h-auto w-full"
                        />
                      </div>
                    </Reveal>
                  </div>

                  <Reveal delay={0.1}>
                    <div className="border-accent-lime bg-primary/40 rounded-r-2xl border-l-4 p-8 lg:p-10">
                      <span className="text-accent-lime font-body text-sm tracking-widest uppercase">
                        How might we
                      </span>
                      <p className="font-display text-secondary mt-3 text-2xl leading-snug font-bold lg:text-3xl">
                        &hellip;make brand compliance understandable, feedback immediate,
                        and the approval process transparent for everyone who touches
                        university branding?
                      </p>
                    </div>
                  </Reveal>
                </div>
              </section>
            ),
          },
          {
            id: "research",
            label: "Research",
            content: (
              <>
                <section className="bg-primary py-16 lg:py-24">
                  <div className="container mx-auto px-6 lg:px-12">
                    <Reveal className="mb-12 max-w-3xl">
                      <Eyebrow>The Research</Eyebrow>
                      <h2 className="font-display text-secondary mb-6 text-2xl font-bold lg:text-3xl">
                        Mapping the ecosystem
                      </h2>
                      <p className="font-body text-secondary/80 text-lg leading-relaxed">
                        We started by identifying everyone who interacts with university
                        branding: students, marketing staff, compliance officers, faculty
                        advisors, external partners, IT administrators, and university
                        leadership. For each group, we documented their goals, pain
                        points, influence level, and how the current system fails them.
                        From there, we developed detailed personas and modeled their
                        workflows through problem, activity, and key path scenarios.
                      </p>
                    </Reveal>

                    <div className="grid gap-6 sm:grid-cols-3">
                      {researchStats.map((stat, i) => (
                        <Tile
                          key={stat.label}
                          delay={i * 0.08}
                          className="bg-accent-blue/5 border-accent-blue/10 hover:border-accent-lime/40 h-full rounded-2xl border p-8 text-center transition-colors"
                        >
                          <motion.div
                            initial={{ scale: 0.5, opacity: 0 }}
                            whileInView={{ scale: 1, opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{
                              type: "spring",
                              stiffness: 320,
                              damping: 16,
                              delay: i * 0.08 + 0.12,
                            }}
                            className="font-display text-accent-lime mb-3 text-4xl font-bold lg:text-5xl"
                          >
                            {stat.value}
                          </motion.div>
                          <p className="font-body text-secondary/70 text-sm leading-relaxed">
                            {stat.label}
                          </p>
                        </Tile>
                      ))}
                    </div>
                  </div>
                </section>

                <section className="bg-accent-blue/5 py-16 lg:py-24">
                  <div className="container mx-auto grid items-start gap-12 px-6 lg:grid-cols-3 lg:px-12">
                    <Reveal>
                      <Eyebrow>Personas</Eyebrow>
                      <h2 className="font-display text-secondary mb-6 text-2xl font-bold lg:text-3xl">
                        Ten personas across the compliance ecosystem
                      </h2>
                      <p className="font-body text-secondary/80 text-lg leading-relaxed">
                        We developed ten personas spanning five stakeholder tiers: students
                        who produce materials, staff who review them, compliance officers
                        who enforce the standards, faculty who supervise student work,
                        and external partners who collaborate on co-branded projects.
                        Here are five of them.
                      </p>
                    </Reveal>

                    <div className="lg:col-span-2">
                      <PersonaCarousel />
                    </div>
                  </div>
                </section>

                <section className="bg-primary py-16 lg:py-24">
                  <div className="container mx-auto px-6 lg:px-12">
                    <Reveal className="mb-12 max-w-3xl">
                      <Eyebrow>Key Insights</Eyebrow>
                      <h2 className="font-display text-secondary text-2xl font-bold lg:text-3xl">
                        Five findings that framed the solution
                      </h2>
                    </Reveal>

                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                      {insights.map((insight, i) => (
                        <Tile
                          key={insight.title}
                          delay={(i % 3) * 0.08}
                          className="group bg-accent-blue/5 border-accent-blue/10 hover:border-accent-lime/40 h-full rounded-2xl border p-7 transition-colors"
                        >
                          <div className="bg-accent-lime/10 text-accent-lime font-display group-hover:bg-accent-lime group-hover:text-primary mb-5 flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold transition-all group-hover:scale-110">
                            {String(i + 1).padStart(2, "0")}
                          </div>
                          <h3 className="font-display text-secondary mb-3 text-lg font-bold">
                            {insight.title}
                          </h3>
                          <p className="font-body text-secondary/70 text-sm leading-relaxed">
                            {insight.body}
                          </p>
                        </Tile>
                      ))}

                      <Tile
                        delay={0.16}
                        className="bg-primary border-accent-lime/50 flex h-full flex-col justify-center rounded-2xl border-2 p-7"
                      >
                        <span className="text-accent-lime font-body text-xs tracking-widest uppercase">
                          The thesis
                        </span>
                        <p className="font-display text-secondary mt-3 text-xl leading-snug font-bold">
                          Three things compound the problem: the rules are{" "}
                          <span className="text-accent-lime">inaccessible</span>, the
                          process is{" "}
                          <span className="text-accent-lime">invisible</span>, and the
                          feedback is too{" "}
                          <span className="text-accent-lime">vague</span> to act on.
                        </p>
                      </Tile>
                    </div>
                  </div>
                </section>
              </>
            ),
          },
          {
            id: "product",
            label: "Product",
            content: (
              <>
                <section className="bg-primary py-16 lg:py-24">
                  <div className="container mx-auto grid items-start gap-12 px-6 lg:grid-cols-3 lg:px-12">
                    <Reveal>
                      <Eyebrow>The Product</Eyebrow>
                      <h2 className="font-display text-secondary mb-6 text-2xl font-bold lg:text-3xl">
                        What BrandComms looks like
                      </h2>
                      <p className="font-body text-secondary/80 text-lg leading-relaxed">
                        The platform gives every stakeholder a clear view of where a
                        submission stands. Students see AI feedback on their designs
                        before human review. Compliance officers see structured
                        recommendations instead of raw uploads. Every step is visible.
                      </p>
                    </Reveal>

                    <div className="lg:col-span-2">
                      <ScreenshotCarousel />
                    </div>
                  </div>
                </section>

                <section className="bg-accent-blue/5 py-16 lg:py-24">
                  <div className="container mx-auto px-6 lg:px-12">
                    <Reveal className="mb-12 max-w-3xl">
                      <Eyebrow>The Solution</Eyebrow>
                      <h2 className="font-display text-secondary mb-6 text-2xl font-bold lg:text-3xl">
                        BrandComms puts compliance in the hands of the
                        people doing the work
                      </h2>
                      <p className="font-body text-secondary/80 text-lg leading-relaxed">
                        The platform concept is built around AI agents that understand
                        the university&apos;s brand guidelines and can explain them in
                        plain language. Students get immediate, specific feedback on their
                        designs before they ever reach a human reviewer. Staff spend less
                        time on routine checks and more time on decisions that require
                        judgment.
                      </p>
                    </Reveal>

                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                      {features.map((feature, i) => (
                        <Tile
                          key={feature.name}
                          delay={(i % 3) * 0.08}
                          className="group bg-primary border-accent-blue/10 hover:border-accent-lime/40 h-full rounded-2xl border p-7 transition-colors"
                        >
                          <h3 className="font-display text-accent-blue group-hover:text-accent-lime mb-3 text-lg font-bold transition-colors">
                            {feature.name}
                          </h3>
                          <p className="font-body text-secondary/70 text-sm leading-relaxed">
                            {feature.body}
                          </p>
                        </Tile>
                      ))}
                    </div>
                  </div>
                </section>

                <section className="bg-primary py-16 lg:py-24">
                  <div className="container mx-auto px-6 lg:px-12">
                    <Reveal>
                      <Eyebrow>Problems Addressed</Eyebrow>
                      <h2 className="font-display text-secondary mb-8 text-2xl font-bold lg:text-3xl">
                        What BrandComms resolves
                      </h2>
                    </Reveal>
                    <ul className="max-w-3xl space-y-4">
                      {resolvedProblems.map((problem, index) => (
                        <motion.li
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-start gap-4"
                        >
                          <span className="bg-accent-lime mt-2 h-2 w-2 flex-shrink-0 rounded-full" />
                          <span className="font-body text-secondary/80 text-lg">
                            {problem}
                          </span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </section>

                <section className="bg-accent-blue/5 py-16 lg:py-24">
                  <div className="container mx-auto px-6 lg:px-12">
                    <Reveal>
                      <Eyebrow>Tools Used</Eyebrow>
                      <h2 className="font-display text-secondary mb-8 text-2xl font-bold lg:text-3xl">
                        Tools &amp; Technologies
                      </h2>
                    </Reveal>
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
              </>
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
            <AccessibleButton href="/projects/sous-sense">
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
