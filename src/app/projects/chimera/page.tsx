"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";
import AccessibleButton from "@/components/AccessibleButton";
import ProjectHero from "@/components/ProjectHero";
import SectionTabs from "@/components/SectionTabs";

const projectData = {
  title: "Chimera 2.0",
  subtitle:
    "Redesigning a self-built home security system into a camera app people can actually navigate",
  description:
    "Jay built his own home security camera system from the ground up. The infrastructure is solid, yet the app he wrapped around it grew feature by feature until everyday tasks like finding an event or exporting a clip felt like work. Chimera 2.0 is a mobile-first redesign grounded in a deep heuristic analysis, rebuilding the app around the timeline so the core actions take fewer taps and less guesswork.",
  heroImage: "/assets/projects/chimera/home hero.png",
  tags: ["UX Research", "Heuristic Evaluation", "Mobile Design"],
  year: "2026",
  role: "UX Researcher & Product Designer",
  team: "3-person team",
  platform: "Figma, Mobile",
};

const atAGlance = [
  { label: "My role", value: "UX Research & Product Design" },
  { label: "Team", value: "3 designers" },
  { label: "Stakeholder", value: "Jay, the engineer who built the system" },
  { label: "Platform", value: "iOS, mobile-first" },
];

const researchStats = [
  { value: "4", label: "Competitor apps benchmarked: Ring, Nest, Arlo, Eufy" },
  { value: "10", label: "Usability heuristics applied to the existing app" },
  { value: "4", label: "Core flows mapped and rebuilt end to end" },
];

const competitors = [
  {
    name: "Ring",
    style: "Alert-based, feed-first",
    strengths: "Fast live view, obvious alerts, simple timeline, community features",
    weaknesses: "Cluttered at scale, weak filtering, noisy notifications",
    bestFor: "Quick reactions",
  },
  {
    name: "Google Nest",
    style: "Minimal, AI-organized",
    strengths:
      "Clean UI, strong categorization, smooth timeline scrubbing, deep Google integration",
    weaknesses: "Slower access, hidden controls, a real learning curve",
    bestFor: "Browsing and clarity",
  },
  {
    name: "Arlo",
    style: "Control-heavy, modular",
    strengths: "Deep customization, strong multi-camera view, flexible modes",
    weaknesses: "Awkward navigation, high effort to manage",
    bestFor: "Power users",
  },
  {
    name: "Eufy",
    style: "Simple, local-first",
    strengths: "Straightforward layout, fast and lightweight",
    weaknesses: "Less polished, buried settings, weak organization",
    bestFor: "Cost-conscious users",
  },
];

const frictions = [
  {
    title: "Export was stranded.",
    body: "Making a clip meant leaving the scrubber, re-entering timestamps, and starting over. The scrubber and the export flow belonged on one screen.",
  },
  {
    title: "Timestamps were typed by hand.",
    body: "Users had to remember and type the exact times they wanted, with no way to mark a moment directly on the timeline.",
  },
  {
    title: "One wrong tap lost the work.",
    body: "Committing a selection sat right beside the action that exited the flow, so a single misfire sent users back to the start.",
  },
  {
    title: "Nothing confirmed it was working.",
    body: "After kicking off an export, the app gave no status, leaving users to wait and wonder whether anything was happening.",
  },
  {
    title: "The path ran deep.",
    body: "Reaching a core action took several screens from the dashboard, and viewing and processing were tangled together.",
  },
];

const principles = [
  {
    name: "Immediate access to live state",
    body: "Open the app and the cameras are right there, no hunting for the feed that matters most.",
  },
  {
    name: "Visible system status",
    body: "Every action reports back, so an export or a deletion always shows what the system is doing.",
  },
  {
    name: "Progressive disclosure",
    body: "Surface the controls people reach for first and tuck power features one layer down.",
  },
  {
    name: "Consistency across flows",
    body: "The timeline behaves the same way in live viewing, event history, and clip making.",
  },
  {
    name: "Minimal cognitive load",
    body: "Fewer choices per screen, clearer labels, and a navigation depth that stays shallow.",
  },
];

const features = [
  {
    name: "Live Feed",
    body: "Enter from a dashboard camera card, expand to full-screen live view, swipe between cameras, and drop into a multi-camera grid when you want it. Controls stay minimal.",
  },
  {
    name: "Event History (Scrubber)",
    body: "A central timeline for every camera. Filter by camera and date, navigate by thumbnail, scrub to a frame, and move straight to detail or export.",
  },
  {
    name: "Clip Maker",
    body: "Pick a camera and time range, mark start and end frames on the timeline, choose clip, timelapse, or frame package, and watch a clear status as it processes.",
  },
  {
    name: "Data Management",
    body: "See storage by camera and date, clear by date range or by camera, read the storage impact before you act, and confirm before anything is deleted.",
  },
];

/**
 * Drop your exported mobile screens in /public/assets/projects/chimera/ and set
 * each `src`. Leave `src` empty to keep the labeled placeholder. Tall 9/19.5
 * device-shaped slots, designed for one screen each.
 */
const productScreens = [
  {
    src: "",
    alt: "Chimera dashboard screen",
    caption: "Dashboard: the timeline-first hub with all core actions one tap away.",
  },
  {
    src: "",
    alt: "Chimera live feeds screen",
    caption: "Live Feed: full-screen viewing with swipe between cameras.",
  },
  {
    src: "",
    alt: "Chimera event history scrubber screen",
    caption: "Event History: scrub the timeline and jump straight to export.",
  },
  {
    src: "",
    alt: "Chimera clip maker screen",
    caption: "Clip Maker: mark frames, pick an output, and follow the status.",
  },
];

const nextSteps = [
  {
    title: "Smarter data rules",
    body: "Automated deletion by date or by percentage of storage remaining, so the system maintains itself.",
  },
  {
    title: "AI detection",
    body: "Object and motion detection that surfaces the moments worth watching before anyone goes looking.",
  },
  {
    title: "Account flows",
    body: "Registration, forgot-password, and two-factor authentication to round out the experience.",
  },
];

const outcomes = [
  "More predictable navigation",
  "Faster access to core actions",
  "Reduced cognitive load",
  "A scalable structure for advanced features",
];

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

/**
 * Image slot. Leave `src` empty to show a labeled placeholder; add a `src`
 * (drop the file in /public/gallery/ or /public/assets/projects/chimera/) and
 * it renders the real image with the same framing.
 */
function ImageSlot({
  src,
  alt = "",
  label,
  hint,
  ratio = "aspect-[16/9]",
  className = "",
  sizes = "100vw",
}: {
  src?: string;
  alt?: string;
  label: string;
  hint?: string;
  ratio?: string;
  className?: string;
  sizes?: string;
}) {
  return (
    <div
      className={`group border-accent-blue/20 bg-accent-blue/5 relative w-full overflow-hidden rounded-2xl border ${ratio} ${className}`}
    >
      {src ? (
        <Image
          src={encodeURI(src)}
          alt={alt}
          fill
          sizes={sizes}
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
        />
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
          <span className="border-accent-blue/30 mb-4 flex h-12 w-12 items-center justify-center rounded-full border border-dashed">
            <svg
              className="text-accent-blue/60 h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </span>
          <p className="font-display text-secondary/80 text-sm font-semibold">{label}</p>
          {hint && (
            <p className="font-body text-secondary/40 mt-1 max-w-xs text-xs">{hint}</p>
          )}
        </div>
      )}
    </div>
  );
}

/**
 * Tall device-shaped slot for a single mobile screen. Leave `src` empty for the
 * placeholder; add a `src` to render the exported screen with the same framing.
 */
function PhoneSlot({
  src,
  alt = "",
  label = "Mobile screen",
}: {
  src?: string;
  alt?: string;
  label?: string;
}) {
  return (
    <div className="group border-accent-blue/20 bg-accent-blue/5 relative aspect-[9/19.5] w-full overflow-hidden rounded-[2rem] border">
      {src ? (
        <Image
          src={encodeURI(src)}
          alt={alt}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
        />
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center">
          <span className="border-accent-blue/30 mb-3 flex h-10 w-10 items-center justify-center rounded-full border border-dashed">
            <svg
              className="text-accent-blue/60 h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M12 18h.01M8 21h8a1 1 0 001-1V4a1 1 0 00-1-1H8a1 1 0 00-1 1v16a1 1 0 001 1z"
              />
            </svg>
          </span>
          <p className="font-display text-secondary/80 text-xs font-semibold">{label}</p>
        </div>
      )}
    </div>
  );
}

export default function ChimeraProject() {
  return (
    <div className="lg:pl-20">
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
              <span className="text-secondary/50 mb-1 block">Platform</span>
              <span className="text-secondary font-medium">{projectData.platform}</span>
            </div>
          </div>
        </motion.div>
      </ProjectHero>

      {/* Overview + At a glance */}
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
                  <div className="mb-12 grid items-center gap-10 lg:grid-cols-2">
                    <Reveal>
                      <Eyebrow>The Challenge</Eyebrow>
                      <p className="font-body text-secondary/80 text-lg leading-relaxed">
                        Jay is a software engineer, and his camera system reflects that.
                        The backend is reliable and capable. The mobile app he wrapped
                        around it grew feature by feature, so navigation and control
                        became a maze. Finding an event, scrubbing a timeline, exporting a
                        clip, and managing storage each lived in their own corner, and the
                        interface kept swinging between overloaded screens and functions
                        buried two or three taps deep.
                      </p>
                    </Reveal>

                    {/* Swap in a screenshot or photo of the current app in use */}
                    <Reveal delay={0.1}>
                      <ImageSlot
                        ratio="aspect-[4/3]"
                        label="The current app"
                        hint="Screenshots of the existing interface, or a photo of Jay using it"
                        sizes="(min-width: 1024px) 50vw, 100vw"
                      />
                    </Reveal>
                  </div>

                  <Reveal delay={0.1}>
                    <div className="border-accent-lime bg-primary/40 rounded-r-2xl border-l-4 p-8 lg:p-10">
                      <span className="text-accent-lime font-body text-sm tracking-widest uppercase">
                        How might we
                      </span>
                      <p className="font-display text-secondary mt-3 text-2xl leading-snug font-bold lg:text-3xl">
                        …rebuild Jay&apos;s camera app around the way he actually uses it,
                        so live viewing, event retrieval, and exporting take fewer steps
                        and less guesswork?
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
                        A heuristic-first approach
                      </h2>
                      <p className="font-body text-secondary/80 text-lg leading-relaxed">
                        We benchmarked four leading consumer camera apps, then ran a
                        heuristic evaluation of Jay&apos;s app against established
                        usability principles. We mapped every core flow, live viewing,
                        event retrieval, clip creation, and data management, to pin down
                        where the friction hid.
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

                    {/* Swap in your heuristic artifacts: flow map, annotated screens, matrix */}
                    <Reveal delay={0.1} className="mt-8">
                      <ImageSlot
                        ratio="aspect-[21/9]"
                        label="Heuristic evaluation in action"
                        hint="Flow map, annotated screens, or the evaluation matrix"
                        sizes="(min-width: 1024px) 75vw, 100vw"
                      />
                    </Reveal>
                  </div>
                </section>
                <section className="bg-accent-blue/5 py-16 lg:py-24">
                  <div className="container mx-auto px-6 lg:px-12">
                    <Reveal className="mb-12 max-w-3xl">
                      <Eyebrow>Competitive Analysis</Eyebrow>
                      <h2 className="font-display text-secondary mb-6 text-2xl font-bold lg:text-3xl">
                        Four apps, four trade-offs
                      </h2>
                      <p className="font-body text-secondary/80 text-lg leading-relaxed">
                        Ring, Google Nest, Arlo, and Eufy each solve the same problem in a
                        different way. Studying their choices showed us what users already
                        expect from a camera app and where every one of them leaves room
                        to do better.
                      </p>
                    </Reveal>

                    {/* Swap in your competitive-analysis screenshots or audit board */}
                    <Reveal delay={0.05} className="mb-8">
                      <ImageSlot
                        ratio="aspect-[21/9]"
                        label="Competitor apps studied"
                        hint="Annotated screenshots of Ring, Nest, Arlo, and Eufy"
                        sizes="(min-width: 1024px) 75vw, 100vw"
                      />
                    </Reveal>

                    <div className="grid gap-6 md:grid-cols-2">
                      {competitors.map((c, i) => (
                        <Tile
                          key={c.name}
                          delay={(i % 2) * 0.08}
                          className="group bg-primary border-accent-blue/10 hover:border-accent-lime/40 h-full rounded-2xl border p-7 transition-colors"
                        >
                          <div className="mb-4 flex items-baseline justify-between gap-3">
                            <h3 className="font-display text-accent-blue group-hover:text-accent-lime text-lg font-bold transition-colors">
                              {c.name}
                            </h3>
                            <span className="font-body text-secondary/50 text-xs">
                              {c.style}
                            </span>
                          </div>
                          <dl className="space-y-3">
                            <div>
                              <dt className="text-secondary/50 text-xs tracking-wide uppercase">
                                Strengths
                              </dt>
                              <dd className="font-body text-secondary/80 mt-0.5 text-sm leading-relaxed">
                                {c.strengths}
                              </dd>
                            </div>
                            <div>
                              <dt className="text-secondary/50 text-xs tracking-wide uppercase">
                                Weaknesses
                              </dt>
                              <dd className="font-body text-secondary/80 mt-0.5 text-sm leading-relaxed">
                                {c.weaknesses}
                              </dd>
                            </div>
                            <div>
                              <dt className="text-secondary/50 text-xs tracking-wide uppercase">
                                Best for
                              </dt>
                              <dd className="font-body text-secondary mt-0.5 text-sm">
                                {c.bestFor}
                              </dd>
                            </div>
                          </dl>
                        </Tile>
                      ))}
                    </div>

                    <Reveal delay={0.1} className="mt-8">
                      <div className="bg-primary border-accent-lime/50 rounded-2xl border-2 p-7 lg:p-8">
                        <span className="text-accent-lime font-body text-xs tracking-widest uppercase">
                          The pattern
                        </span>
                        <p className="font-display text-secondary mt-3 text-xl leading-snug font-bold">
                          Speed and clarity kept trading off against each other, and the{" "}
                          <span className="text-accent-lime">timeline</span> kept showing
                          up as the interaction everyone leaned on.
                        </p>
                      </div>
                    </Reveal>
                  </div>
                </section>
                <section className="bg-primary py-16 lg:py-24">
                  <div className="container mx-auto px-6 lg:px-12">
                    <Reveal className="mb-12 max-w-3xl">
                      <Eyebrow>What We Found</Eyebrow>
                      <h2 className="font-display text-secondary mb-6 text-2xl font-bold lg:text-3xl">
                        Where the app fought back
                      </h2>
                      <p className="font-body text-secondary/80 text-lg leading-relaxed">
                        Walking the existing flows turned a vague sense of clutter into a
                        specific list of breakdowns. Five frictions came up again and
                        again, and each one pointed straight at a fix.
                      </p>
                    </Reveal>

                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                      {frictions.map((item, i) => (
                        <Tile
                          key={item.title}
                          delay={(i % 3) * 0.08}
                          className="group bg-accent-blue/5 border-accent-blue/10 hover:border-accent-lime/40 h-full rounded-2xl border p-7 transition-colors"
                        >
                          <div className="bg-accent-lime/10 text-accent-lime font-display group-hover:bg-accent-lime group-hover:text-primary mb-5 flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold transition-all group-hover:scale-110">
                            {String(i + 1).padStart(2, "0")}
                          </div>
                          <h3 className="font-display text-secondary mb-3 text-lg font-bold">
                            {item.title}
                          </h3>
                          <p className="font-body text-secondary/70 text-sm leading-relaxed">
                            {item.body}
                          </p>
                        </Tile>
                      ))}

                      <Tile
                        delay={0.16}
                        className="bg-accent-blue/5 border-accent-lime/50 flex h-full flex-col justify-center rounded-2xl border-2 p-7"
                      >
                        <span className="text-accent-lime font-body text-xs tracking-widest uppercase">
                          The throughline
                        </span>
                        <p className="font-display text-secondary mt-3 text-xl leading-snug font-bold">
                          The timeline was the answer. Anchor it across every flow and the
                          friction falls away.
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
                <section className="bg-accent-blue/5 py-16 lg:py-24">
                  <div className="container mx-auto px-6 lg:px-12">
                    <Reveal className="mb-12 max-w-3xl">
                      <Eyebrow>Design Principles</Eyebrow>
                      <h2 className="font-display text-secondary mb-6 text-2xl font-bold lg:text-3xl">
                        Five principles guided every screen
                      </h2>
                      <p className="font-body text-secondary/80 text-lg leading-relaxed">
                        Each principle traces back to a friction we found, so the redesign
                        stays accountable to the research at every step.
                      </p>
                    </Reveal>

                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                      {principles.map((p, i) => (
                        <Tile
                          key={p.name}
                          delay={(i % 3) * 0.08}
                          className="group bg-primary border-accent-blue/10 hover:border-accent-lime/40 h-full rounded-2xl border p-7 transition-colors"
                        >
                          <h3 className="font-display text-accent-blue group-hover:text-accent-lime mb-3 text-lg font-bold transition-colors">
                            {p.name}
                          </h3>
                          <p className="font-body text-secondary/70 text-sm leading-relaxed">
                            {p.body}
                          </p>
                        </Tile>
                      ))}
                    </div>
                  </div>
                </section>
                <section className="bg-primary py-16 lg:py-24">
                  <div className="container mx-auto px-6 lg:px-12">
                    <Reveal className="mb-12 max-w-3xl">
                      <Eyebrow>The Solution</Eyebrow>
                      <h2 className="font-display text-secondary mb-6 text-2xl font-bold lg:text-3xl">
                        A dashboard that puts the timeline first
                      </h2>
                      <p className="font-body text-secondary/80 text-lg leading-relaxed">
                        We rebuilt the app around a single dashboard hub. Four primary
                        actions sit one tap away, navigation depth drops, and viewing
                        stays cleanly separated from processing.
                      </p>
                    </Reveal>

                    <div className="grid gap-6 md:grid-cols-2">
                      {features.map((feature, i) => (
                        <Tile
                          key={feature.name}
                          delay={(i % 2) * 0.08}
                          className="group bg-accent-blue/5 border-accent-blue/10 hover:border-accent-lime/40 h-full rounded-2xl border p-7 transition-colors"
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
                <section className="bg-accent-blue/5 py-16 lg:py-24">
                  <div className="container mx-auto px-6 lg:px-12">
                    <Reveal className="mb-12 max-w-3xl">
                      <Eyebrow>Product Tour</Eyebrow>
                      <h2 className="font-display text-secondary mb-6 text-2xl font-bold lg:text-3xl">
                        Built for the phone in your pocket
                      </h2>
                      <p className="font-body text-secondary/80 text-lg leading-relaxed">
                        Chimera is mobile-first. Jay checks his cameras from his phone, so
                        we designed every flow for one-handed use on a small screen, with
                        the timeline anchored where the thumb can reach it.
                      </p>
                    </Reveal>

                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                      {productScreens.map((screen, i) => (
                        <Tile key={i} delay={(i % 4) * 0.08} className="group h-full">
                          <figure className="h-full">
                            <PhoneSlot
                              src={screen.src}
                              alt={screen.alt}
                              label={screen.caption.split(":")[0]}
                            />
                            <figcaption className="font-body text-secondary/60 mt-4 text-center text-sm">
                              {screen.caption}
                            </figcaption>
                          </figure>
                        </Tile>
                      ))}
                    </div>

                    <Reveal
                      delay={0.1}
                      className="mt-12 flex flex-wrap justify-center gap-4"
                    >
                      {/* Replace href with your published Figma prototype URL */}
                      <AccessibleButton
                        href="https://www.figma.com/"
                        external
                        variant="primary"
                      >
                        View Figma Prototype
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
                      {/* Replace href with your hosted walkthrough video */}
                      <AccessibleButton href="#" variant="outline">
                        Watch Video Walkthrough
                      </AccessibleButton>
                    </Reveal>
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
                      <Eyebrow>Outcome</Eyebrow>
                      <h2 className="font-display text-secondary text-2xl font-bold lg:text-3xl">
                        What the redesign delivers
                      </h2>
                    </Reveal>

                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                      {outcomes.map((outcome, i) => (
                        <Tile
                          key={outcome}
                          delay={(i % 4) * 0.08}
                          className="bg-accent-blue/5 border-accent-blue/10 hover:border-accent-lime/40 h-full rounded-2xl border p-7 transition-colors"
                        >
                          <span className="font-display text-accent-lime mb-3 block text-2xl font-bold">
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          <p className="font-body text-secondary/80 leading-relaxed">
                            {outcome}
                          </p>
                        </Tile>
                      ))}
                    </div>
                  </div>
                </section>
                <section className="bg-accent-blue/5 py-16 lg:py-24">
                  <div className="container mx-auto px-6 lg:px-12">
                    <Reveal className="mb-12 max-w-3xl">
                      <Eyebrow>What&apos;s Next</Eyebrow>
                      <h2 className="font-display text-secondary text-2xl font-bold lg:text-3xl">
                        Where Chimera goes from here
                      </h2>
                    </Reveal>

                    <div className="grid gap-6 md:grid-cols-3">
                      {nextSteps.map((step, i) => (
                        <Tile
                          key={step.title}
                          delay={i * 0.08}
                          className="group bg-primary border-accent-blue/10 hover:border-accent-lime/40 h-full rounded-2xl border p-7 transition-colors"
                        >
                          <h3 className="font-display text-accent-blue group-hover:text-accent-lime mb-3 font-bold transition-colors">
                            {step.title}
                          </h3>
                          <p className="font-body text-secondary/70 text-sm leading-relaxed">
                            {step.body}
                          </p>
                        </Tile>
                      ))}
                    </div>
                  </div>
                </section>
                <section className="bg-primary py-16 lg:py-24">
                  <div className="container mx-auto px-6 lg:px-12">
                    <div className="grid items-center gap-10 lg:grid-cols-2">
                      <Reveal>
                        <Eyebrow>Reflection</Eyebrow>
                        <h2 className="font-display text-secondary mb-6 text-2xl font-bold lg:text-3xl">
                          Designing for one real user
                        </h2>
                        <p className="font-body text-secondary/80 mb-4 text-lg leading-relaxed">
                          Designing for Jay kept the work honest. Every decision answered
                          to a person who knew exactly how his system worked and exactly
                          where it frustrated him. The heuristic evaluation did the heavy
                          lifting, turning a fuzzy sense of clutter into a concrete list of
                          fixes.
                        </p>
                        <p className="font-body text-secondary/80 text-lg leading-relaxed">
                          With another sprint I would put the prototype back in Jay&apos;s
                          hands, watch him run a real export end to end, and measure how
                          many taps the new flows actually save. That number is what would
                          prove the redesign earns its place on his phone.
                        </p>
                      </Reveal>

                      {/* Swap in a process snapshot: working session, whiteboard, or design wall */}
                      <Reveal delay={0.1}>
                        <ImageSlot
                          ratio="aspect-[4/3]"
                          label="Behind the process"
                          hint="Working session with Jay, whiteboard, or the design wall"
                          sizes="(min-width: 1024px) 50vw, 100vw"
                        />
                      </Reveal>
                    </div>
                  </div>
                </section>
              </>
            ),
          },
        ]}
      />

      {/* Navigation */}
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
