"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
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
  },
  {
    name: "Sophia Sharp",
    archetype: "The Digital Voice",
    description: "21, social media chair. Needs fast turnarounds for posts and campaigns. Delayed approvals mean missed opportunities.",
  },
  {
    name: "Karina Mitev",
    archetype: "The Storykeeper",
    description: "42, assistant director of strategic communications. Oversees brand consistency across all student and external projects.",
  },
  {
    name: "Anthony Vega",
    archetype: "The Gatekeeper",
    description: "42, compliance officer. Enforces design standards and ensures submissions meet visual and legal criteria. Workload is high and largely manual.",
  },
  {
    name: "Dr. Evelyn Cho",
    archetype: "The Mentor",
    description: "46, assistant professor. Supervises student projects that use university branding. Constantly mediates between students and the marketing department.",
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

const limitations = [
  {
    title: "Concept-stage project",
    body: "BrandComms exists as a design concept with stakeholder analysis, personas, scenarios, and storyboards. No interactive prototype was built within the project timeline.",
  },
  {
    title: "Single-institution focus",
    body: "All research centered on NJIT's brand compliance ecosystem. Other universities may have different structures, tools, and pain points.",
  },
  {
    title: "No direct user testing",
    body: "Personas and scenarios were built from stakeholder analysis and domain research. Validating the concept with a working prototype and participant sessions would be the logical next step.",
  },
  {
    title: "AI scope is aspirational",
    body: "The AI compliance agents are specified at a functional level. Training data, accuracy requirements, and integration with existing university systems remain open questions.",
  },
];

const recommendations = [
  {
    title: "Write brand guidelines for the people who use them",
    body: "Students and non-designers need visual, example-based documentation. Reducing reliance on technical language would cut down on confusion and misinterpretation.",
  },
  {
    title: "Make the approval process visible",
    body: "Status tracking, timeline estimates, and feedback history should be available to the person who submitted. Transparency reduces anxiety and repeat inquiries.",
  },
  {
    title: "Invest in automated compliance for routine checks",
    body: "AI can handle straightforward validations like logo placement, color values, and font usage. This frees compliance officers to spend their time on nuanced brand decisions that require human judgment.",
  },
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
    <div
      className="relative"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <div className="bg-accent-blue/5 border-accent-blue/10 overflow-hidden rounded-2xl border">
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
                sizes="(min-width: 1024px) 70vw, 100vw"
                className="object-cover object-top"
              />
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex items-start justify-between gap-4 p-6">
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
        onClick={() => go(-1)}
        className="bg-primary/80 border-accent-blue/20 text-secondary hover:border-accent-lime hover:text-accent-lime absolute top-[20%] left-3 -translate-y-1/2 rounded-full border p-2 backdrop-blur-sm transition-colors"
        aria-label="Previous screenshot"
      >
        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        type="button"
        onClick={() => go(1)}
        className="bg-primary/80 border-accent-blue/20 text-secondary hover:border-accent-lime hover:text-accent-lime absolute top-[20%] right-3 -translate-y-1/2 rounded-full border p-2 backdrop-blur-sm transition-colors"
        aria-label="Next screenshot"
      >
        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      <div className="mt-4 flex justify-center gap-2">
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

export default function BrandCommsProject() {
  return (
    <div className="lg:pl-20">
      <ProjectHero src="/assets/projects/brandcomms/BrandComms-Hero.webp" alt={projectData.title}>
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
                  <Reveal className="mb-12 max-w-3xl">
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
                  <div className="container mx-auto px-6 lg:px-12">
                    <Reveal className="mb-12 max-w-3xl">
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

                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                      {personas.map((persona, i) => (
                        <Tile
                          key={persona.name}
                          delay={(i % 3) * 0.08}
                          className="group bg-primary border-accent-blue/10 hover:border-accent-lime/40 h-full rounded-2xl border p-7 transition-colors"
                        >
                          <span className="text-accent-blue group-hover:text-accent-lime font-body mb-1 block text-xs font-semibold tracking-widest uppercase transition-colors">
                            {persona.archetype}
                          </span>
                          <h3 className="font-display text-secondary mb-3 text-lg font-bold">
                            {persona.name}
                          </h3>
                          <p className="font-body text-secondary/70 text-sm leading-relaxed">
                            {persona.description}
                          </p>
                        </Tile>
                      ))}
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
                  <div className="container mx-auto px-6 lg:px-12">
                    <Reveal className="mb-12 max-w-3xl">
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

                    <ScreenshotCarousel />
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
                    <Reveal className="mb-12 max-w-3xl">
                      <Eyebrow>Key Path Scenario</Eyebrow>
                      <h2 className="font-display text-secondary mb-6 text-2xl font-bold lg:text-3xl">
                        Maya&apos;s flyer, from upload to approval
                      </h2>
                      <p className="font-body text-secondary/80 text-lg leading-relaxed">
                        To ground the concept, we modeled a complete scenario using our
                        primary persona, Maya Torres. Maya is the president of NJIT&apos;s
                        Society of Hispanic and Latine Appreciation. She designs a flyer
                        for the club&apos;s Multicultural Night and needs it approved
                        before printing.
                      </p>
                    </Reveal>

                    <div className="grid gap-6 md:grid-cols-2">
                      {[
                        {
                          when: "November 23, 8:45 PM",
                          where: "Maya's family home",
                          what: "Maya designs a flyer for SHLA's Multicultural Night over Thanksgiving break. Free from campus pressure, she experiments with layout, color, and language until the event's tone feels right.",
                        },
                        {
                          when: "November 27, 4:10 PM",
                          where: "NJIT Campus Center",
                          what: "She presents the flyer to her club's board. The group approves the design and is ready to move forward.",
                        },
                        {
                          when: "December 1, 3:22 PM",
                          where: "NJIT campus cafe",
                          what: "Maya opens BrandComms, starts a new submission, enters event details, and uploads the flyer. The AI scans the design, extracts event information, and suggests improvements. She accepts the changes and submits for review.",
                        },
                        {
                          when: "December 5, 9:14 AM",
                          where: "NJIT campus lawn",
                          what: "Maya receives an email confirming the flyer has passed marketing review. She checks BrandComms, sees the status confirmed, and continues with her day.",
                        },
                        {
                          when: "December 7, 8:37 PM",
                          where: "Maya's dorm at NJIT",
                          what: "A notification from compliance arrives with one minor suggestion: add the university logo to the bottom-right corner. The AI shows a preview of the fix. Maya accepts it and logs off.",
                        },
                        {
                          when: "December 8, 9:52 AM",
                          where: "NJIT Van Houten Library",
                          what: "An email confirms the flyer has passed all checks. From her BrandComms dashboard, Maya sees the finalized flyer, a prewritten caption, and posting options ready for distribution.",
                        },
                      ].map((step, index) => (
                        <Tile
                          key={step.when}
                          delay={(index % 2) * 0.08}
                          className="group bg-accent-blue/5 border-accent-blue/10 hover:border-accent-lime/40 rounded-2xl border p-7 transition-colors"
                        >
                          <div className="mb-4 flex items-start justify-between">
                            <div>
                              <span className="font-display text-secondary text-sm font-bold">
                                {step.when}
                              </span>
                              <span className="text-secondary/50 font-body mt-0.5 block text-xs">
                                {step.where}
                              </span>
                            </div>
                            <span className="bg-accent-lime/10 text-accent-lime font-display flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold">
                              {index + 1}
                            </span>
                          </div>
                          <p className="font-body text-secondary/70 text-sm leading-relaxed">
                            {step.what}
                          </p>
                        </Tile>
                      ))}
                    </div>
                  </div>
                </section>

                <section className="bg-accent-blue/5 py-16 lg:py-24">
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
              </>
            ),
          },
          {
            id: "learnings",
            label: "Learnings",
            content: (
              <>
                <section className="bg-primary py-16 lg:py-24">
                  <div className="container mx-auto px-6 lg:px-12">
                    <Reveal className="mb-12 max-w-3xl">
                      <Eyebrow>Limitations &amp; Challenges</Eyebrow>
                      <h2 className="font-display text-secondary text-2xl font-bold lg:text-3xl">
                        What we&apos;d caveat, and why
                      </h2>
                    </Reveal>

                    <div className="grid gap-6 md:grid-cols-2">
                      {limitations.map((item, i) => (
                        <Tile
                          key={item.title}
                          delay={(i % 2) * 0.08}
                          className="group bg-accent-blue/5 hover:bg-accent-blue/10 flex gap-5 rounded-2xl p-5 transition-colors"
                        >
                          <span className="bg-primary text-accent-lime font-display flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-bold transition-transform group-hover:scale-110">
                            {i + 1}
                          </span>
                          <div>
                            <h3 className="font-display text-secondary mb-2 font-bold">
                              {item.title}
                            </h3>
                            <p className="font-body text-secondary/70 text-sm leading-relaxed">
                              {item.body}
                            </p>
                          </div>
                        </Tile>
                      ))}
                    </div>
                  </div>
                </section>

                <section className="bg-accent-blue/5 py-16 lg:py-24">
                  <div className="container mx-auto px-6 lg:px-12">
                    <Reveal className="mb-12 max-w-3xl">
                      <Eyebrow>What We Recommend</Eyebrow>
                      <h2 className="font-display text-secondary text-2xl font-bold lg:text-3xl">
                        For universities, beyond the tool
                      </h2>
                    </Reveal>

                    <div className="mb-8 grid gap-6 md:grid-cols-3">
                      {recommendations.map((rec, i) => (
                        <Tile
                          key={rec.title}
                          delay={i * 0.08}
                          className="group bg-primary border-accent-blue/10 hover:border-accent-lime/40 h-full rounded-2xl border p-7 transition-colors"
                        >
                          <h3 className="font-display text-accent-blue group-hover:text-accent-lime mb-3 font-bold transition-colors">
                            {rec.title}
                          </h3>
                          <p className="font-body text-secondary/70 text-sm leading-relaxed">
                            {rec.body}
                          </p>
                        </Tile>
                      ))}
                    </div>
                  </div>
                </section>

                <section className="bg-primary py-16 lg:py-24">
                  <div className="container mx-auto px-6 lg:px-12">
                    <Reveal className="max-w-3xl">
                      <Eyebrow>Reflection</Eyebrow>
                      <h2 className="font-display text-secondary mb-6 text-2xl font-bold lg:text-3xl">
                        What I&apos;d do with more time
                      </h2>
                      <p className="font-body text-secondary/80 mb-4 text-lg leading-relaxed">
                        The strongest finding from this project was how mismatched the
                        brand compliance system is with its primary audience. The
                        guidelines exist for good reasons, and students generally want
                        to follow them. The breakdown happens in translation: rules written
                        in design language, a submission portal that offers no guidance,
                        and feedback that arrives too late to be useful.
                      </p>
                      <p className="font-body text-secondary/80 mb-4 text-lg leading-relaxed">
                        BrandComms proposes that AI can serve as the translator between
                        institutional standards and the people who need to meet them.
                        With more time, I would build an interactive prototype and test
                        it with students and compliance staff at NJIT to measure whether
                        the platform reduces revision cycles and improves submission
                        quality.
                      </p>
                    </Reveal>

                    <Tile
                      delay={0.1}
                      className="bg-accent-blue/5 border-accent-lime mt-8 max-w-3xl rounded-r-2xl border-l-4 p-8 lg:p-10"
                    >
                      <h3 className="font-display text-accent-lime mb-2 text-xl font-bold">
                        Good systems teach, they don&apos;t just enforce.
                      </h3>
                      <p className="font-body text-secondary/80 leading-relaxed">
                        The most important design decision in BrandComms was making
                        compliance feedback educational. Every flagged issue comes with
                        an explanation and a suggested fix, so students learn the rules
                        by using the tool. Over time, the system produces fewer flags
                        because users internalize the standards.
                      </p>
                    </Tile>
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
