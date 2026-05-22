"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";
import AccessibleButton from "@/components/AccessibleButton";
import ProjectHero from "@/components/ProjectHero";
import SectionTabs from "@/components/SectionTabs";

const projectData = {
  title: "ArchLog",
  subtitle:
    "Documenting design thinking: a decision-tracking tool for architecture studios",
  description:
    "Architecture students are graded on the strength of their process, yet that process lives in notebooks, Miro boards, and “shower thoughts.” ArchLog is a research-led product concept that captures each design move at the moment it happens, so the reasoning survives all the way to critique.",
  heroImage: "/gallery/ArchLog Hero.jpg",
  tags: ["UX Research", "Product Design", "Prototyping"],
  year: "2026",
  role: "UX Researcher & Product Designer",
  team: "3-person team",
  platform: "Figma",
};

const atAGlance = [
  { label: "My role", value: "UX Research & Product Design" },
  { label: "Team", value: "3 designers" },
  { label: "Timeline", value: "6 weeks" },
  { label: "Methods", value: "Survey, focus group, A/B usability" },
];

const researchStats = [
  { value: "17+", label: "Survey responses from architecture students" },
  { value: "4", label: "Focus-group participants (3rd-year)" },
  { value: "6", label: "A/B usability sessions (2nd-year)" },
];

const insights = [
  {
    title: "Starting is the hardest part.",
    body: "2 in 3 students said their approach “depends on the project.” Studio culture rewards adaptability while leaving students without a methodology to lean on.",
  },
  {
    title: "There's no shared design process.",
    body: "7 of 17 students named concept development the most difficult phase, and nearly half named iteration. Momentum stalls right when a project begins.",
  },
  {
    title: "Constraints are creative fuel.",
    body: "Across interviews, structure kept coming up as a source of ideas. “One of the biggest things we're taught is to use constraints as an opportunity.”",
  },
  {
    title: "Decision-making lives in students' heads.",
    body: "Ideas surface in fragments like sketches, conversations, and “shower thoughts,” and rarely get captured in a way that survives to critique.",
  },
  {
    title: "Critique is where the gap shows up.",
    body: "Without a record of why a decision was made, students reconstruct their narrative from memory, hours before the review.",
  },
];

const concepts = [
  { name: "Design Decision Tracker", score: 1.75, winner: true },
  { name: "Precedent Deconstructor", score: 4.0, winner: false },
  { name: "Constraint Curator", score: 4.25, winner: false },
  { name: "Swap Simulator", score: 4.25, winner: false },
  { name: "Peer Challenge", score: 4.25, winner: false },
  { name: "Starting Prompt Injector", score: 4.5, winner: false },
  { name: "Ideation Gym", score: 5.0, winner: false },
];

const features = [
  {
    name: "Decision Logging",
    body: "Capture each design move with intent: what changed, why, and what it improves or trades off.",
  },
  {
    name: "Project Overview",
    body: "Upload visuals for every decision so the iteration lives in the same place as the rationale.",
  },
  {
    name: "Design Narratives",
    body: "Generate a critique-ready story from your decision log, so you walk into reviews ready to defend every choice.",
  },
  {
    name: "Task Management",
    body: "Track feedback and action items from critiques or from your own design decisions.",
  },
  {
    name: "Designer Profiles",
    body: "Export projects with ease so your crits can follow your thinking, wherever the work travels.",
  },
];

/**
 * Swap each `src` with your exported MacBook Air screens.
 * Recommended export: render the UI on a 2560×1600 (16:10) canvas and bake a
 * #EAEFF9 background behind the laptop so it sits flush against the panel below
 * (the panel uses the same hex). Drop files in /public/assets/projects/archlog/.
 */
const productScreens = [
  {
    src: "/gallery/ArchLog Overview page.png",
    alt: "ArchLog project overview screen showing the decision log",
    caption: "Project Overview: every decision and its visuals in one place.",
  },
  {
    src: "/gallery/ArchLog Overview page.png",
    alt: "Placeholder, replace with the Decision Logging screen",
    caption: "Decision Logging: capture the move and the reasoning together.",
  },
  {
    src: "/gallery/ArchLog Overview page.png",
    alt: "Placeholder, replace with the Design Narrative screen",
    caption: "Design Narrative: a critique-ready story generated from your log.",
  },
];

const limitations = [
  {
    title: "Brief project timeline",
    body: "A 6-week window limited deeper iteration, extended testing, and long-term refinement of the prototype.",
  },
  {
    title: "Limited student availability",
    body: "Recruiting and scheduling architecture students was hard against demanding studio schedules, critiques, and heavy workloads.",
  },
  {
    title: "Small participant pool",
    body: "Every method ran with a relatively small group, which may not fully represent the broader architecture-student experience.",
  },
  {
    title: "Broad, evolving problem space",
    body: "Scoping was itself a challenge. Research surfaced a wide range of needs and interpretations of what it means to “design better.”",
  },
];

const recommendations = [
  {
    title: "Make the design process visible",
    body: "Encourage students to document and organize decisions, iterations, and process work continuously, from the first sketch through the final crit.",
  },
  {
    title: "Support personalized systems",
    body: "Let students build systems that work for them: Notion, sketch journals, or organized collections of references, constraints, and recurring preferences.",
  },
  {
    title: "Build in reflection",
    body: "Create moments for students to reflect on how and why ideas evolved, reinforcing process and rationale as core parts of architectural learning.",
  },
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
 * (drop the file in /public/gallery/ or /public/assets/projects/archlog/) and
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

export default function ArchLogProject() {
  const maxScore = 7;

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
                        Across studio environments, students struggle to initiate and
                        structure their process. Once they&apos;re in motion, there&apos;s
                        no consistent way to capture <em>why</em> they made the moves they
                        made. Critiques rely on memory while decisions live in scattered
                        places. The result is a fragmented, hard-to-defend process that
                        varies wildly from project to project and critic to critic.
                      </p>
                    </Reveal>

                    {/* Swap in a photo or collage of the current, scattered process */}
                    <Reveal delay={0.1}>
                      <ImageSlot
                        ratio="aspect-[4/3]"
                        label="The fragmented process today"
                        hint="Photo or collage: scattered sketches, Miro boards, sticky notes, notebooks"
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
                        …create a low-friction tool that helps architecture students
                        develop concepts with greater clarity inside the studio?
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
                        A mixed-method approach
                      </h2>
                      <p className="font-body text-secondary/80 text-lg leading-relaxed">
                        A five-section survey mapped habits, blockers, and tooling gaps. A
                        focus group surfaced <em>why</em> the data looked the way it did.
                        A/B usability studies then pressure-tested two design directions
                        before we committed to a single path.
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

                    {/* Swap in research artifacts: affinity map, survey charts, focus-group photos */}
                    <Reveal delay={0.1} className="mt-8">
                      <ImageSlot
                        ratio="aspect-[21/9]"
                        label="Research in action"
                        hint="Affinity map, survey charts, or focus-group session photos"
                        sizes="(min-width: 1024px) 75vw, 100vw"
                      />
                    </Reveal>
                  </div>
                </section>
                <section className="bg-accent-blue/5 py-16 lg:py-24">
                  <div className="container mx-auto px-6 lg:px-12">
                    <Reveal className="mb-12 max-w-3xl">
                      <Eyebrow>Key Insights</Eyebrow>
                      <h2 className="font-display text-secondary text-2xl font-bold lg:text-3xl">
                        Five findings reframed the problem
                      </h2>
                    </Reveal>

                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                      {insights.map((insight, i) => (
                        <Tile
                          key={insight.title}
                          delay={(i % 3) * 0.08}
                          className="group bg-primary border-accent-blue/10 hover:border-accent-lime/40 h-full rounded-2xl border p-7 transition-colors"
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
                          The hard part is{" "}
                          <span className="text-accent-lime">traceability</span>:
                          capturing the reasoning behind every design move.
                        </p>
                      </Tile>
                    </div>
                  </div>
                </section>
                <section className="bg-primary py-16 lg:py-24">
                  <div className="container mx-auto px-6 lg:px-12">
                    <Reveal className="mb-12 max-w-3xl">
                      <Eyebrow>Scope Refinement</Eyebrow>
                      <h2 className="font-display text-secondary mb-6 text-2xl font-bold lg:text-3xl">
                        Seven concepts. One winner.
                      </h2>
                      <p className="font-body text-secondary/80 text-lg leading-relaxed">
                        We put seven feature concepts in front of participants and asked
                        them to rank what they&apos;d <em>actually</em> use. The Design
                        Decision Tracker won by a wide margin, with three of four naming
                        it their top choice. That result confirmed our research thesis:
                        the hard part is traceability, capturing the reasoning behind each
                        move.
                      </p>
                    </Reveal>

                    {/* Swap in sketches or screenshots of the seven concepts you tested */}
                    <Reveal delay={0.05} className="mb-8">
                      <ImageSlot
                        ratio="aspect-[21/9]"
                        label="Seven concepts explored"
                        hint="Sketches, wireframes, or screenshots of the concepts that went to ranking"
                        sizes="(min-width: 1024px) 75vw, 100vw"
                      />
                    </Reveal>

                    <Reveal delay={0.1}>
                      <div className="bg-accent-blue/5 border-accent-blue/10 rounded-2xl border p-6 lg:p-8">
                        <div className="mb-6 flex items-center justify-between">
                          <span className="font-body text-secondary/50 text-xs tracking-widest uppercase">
                            Weighted ranking
                          </span>
                          <span className="font-body text-secondary/50 text-xs tracking-wide">
                            lower score = ranked higher
                          </span>
                        </div>
                        <div className="space-y-4">
                          {concepts.map((concept, i) => (
                            <motion.div
                              key={concept.name}
                              initial={{ opacity: 0, x: -16 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              viewport={{ once: true, margin: "-40px" }}
                              transition={{
                                type: "spring",
                                stiffness: 300,
                                damping: 24,
                                delay: i * 0.06,
                              }}
                              whileHover={{
                                x: 4,
                                transition: {
                                  type: "spring",
                                  stiffness: 500,
                                  damping: 28,
                                },
                              }}
                              className="hover:bg-accent-blue/5 flex items-center gap-4 rounded-lg px-1 transition-colors"
                            >
                              <div className="w-40 shrink-0 sm:w-52">
                                <span
                                  className={`font-body text-sm ${
                                    concept.winner
                                      ? "text-secondary font-semibold"
                                      : "text-secondary/70"
                                  }`}
                                >
                                  {concept.name}
                                </span>
                              </div>
                              <div className="bg-primary/60 relative h-3 flex-1 overflow-hidden rounded-full">
                                <motion.div
                                  initial={{ width: 0 }}
                                  whileInView={{
                                    width: `${(concept.score / maxScore) * 100}%`,
                                  }}
                                  viewport={{ once: true }}
                                  transition={{
                                    duration: 0.7,
                                    delay: 0.15 + i * 0.06,
                                    ease: [0.22, 1, 0.36, 1],
                                  }}
                                  className={`h-full rounded-full ${
                                    concept.winner
                                      ? "bg-accent-lime"
                                      : "bg-accent-blue/40"
                                  }`}
                                />
                              </div>
                              <div className="flex w-20 shrink-0 items-center justify-end gap-2">
                                <span
                                  className={`font-display text-sm ${
                                    concept.winner
                                      ? "text-accent-lime font-bold"
                                      : "text-secondary/50"
                                  }`}
                                >
                                  {concept.score.toFixed(2)}
                                </span>
                              </div>
                              {concept.winner && (
                                <span className="bg-accent-lime text-primary hidden rounded-full px-2 py-0.5 text-[10px] font-bold tracking-wide uppercase sm:inline-block">
                                  Winner
                                </span>
                              )}
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </Reveal>
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
                      <Eyebrow>The Solution</Eyebrow>
                      <h2 className="font-display text-secondary mb-6 text-2xl font-bold lg:text-3xl">
                        ArchLog captures the move and the reasoning together
                      </h2>
                      <p className="font-body text-secondary/80 text-lg leading-relaxed">
                        Five connected features turn a scattered process into a record
                        students can defend. Log a decision the moment it happens, attach
                        the visuals, and let ArchLog build the narrative for critique.
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
                      <Eyebrow>Product Tour</Eyebrow>
                      <h2 className="font-display text-secondary mb-6 text-2xl font-bold lg:text-3xl">
                        Designed for the studio desk
                      </h2>
                      <p className="font-body text-secondary/80 text-lg leading-relaxed">
                        We designed ArchLog desktop-first. Architecture design happens
                        mostly on laptops and desktops, so we built the Figma prototype
                        for the larger canvas students already work on. The layout stays
                        calm and document-like, so logging a decision feels as quick as
                        jotting a note.
                      </p>
                    </Reveal>

                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                      {productScreens.map((screen, i) => (
                        <Tile key={i} delay={(i % 3) * 0.08} className="group h-full">
                          <figure className="h-full">
                            {/* Panel hex matches the recommended #EAEFF9 backdrop baked into each PNG */}
                            <div
                              className="ring-accent-blue/0 group-hover:ring-accent-lime/40 overflow-hidden rounded-2xl ring-2 transition-all"
                              style={{ backgroundColor: "#EAEFF9" }}
                            >
                              <Image
                                src={encodeURI(screen.src)}
                                alt={screen.alt}
                                width={2560}
                                height={1600}
                                className="h-auto w-full transition-transform duration-500 ease-out group-hover:scale-[1.05]"
                                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                              />
                            </div>
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
                      {/* Replace href with your hosted walkthrough video (e.g. /gallery/archlog-prototype.mp4) */}
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
                <section className="bg-accent-blue/5 py-16 lg:py-24">
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
                          className="group bg-primary/40 hover:bg-primary flex gap-5 rounded-2xl p-5 transition-colors"
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
                <section className="bg-primary py-16 lg:py-24">
                  <div className="container mx-auto px-6 lg:px-12">
                    <Reveal className="mb-12 max-w-3xl">
                      <Eyebrow>What We Recommend</Eyebrow>
                      <h2 className="font-display text-secondary text-2xl font-bold lg:text-3xl">
                        For studios, beyond the tool
                      </h2>
                    </Reveal>

                    <div className="mb-8 grid gap-6 md:grid-cols-3">
                      {recommendations.map((rec, i) => (
                        <Tile
                          key={rec.title}
                          delay={i * 0.08}
                          className="group bg-accent-blue/5 border-accent-blue/10 hover:border-accent-lime/40 h-full rounded-2xl border p-7 transition-colors"
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

                    <Tile
                      delay={0.1}
                      className="bg-accent-blue/5 border-accent-lime rounded-r-2xl border-l-4 p-8 lg:p-10"
                    >
                      <h3 className="font-display text-accent-lime mb-2 text-xl font-bold">
                        Value the process as much as the result.
                      </h3>
                      <p className="font-body text-secondary/80 leading-relaxed">
                        Process visibility, iteration, and design rationale deserve the
                        same weight as the final artifact, both in studio culture and in
                        the tools students reach for.
                      </p>
                    </Tile>
                  </div>
                </section>
                <section className="bg-accent-blue/5 py-16 lg:py-24">
                  <div className="container mx-auto px-6 lg:px-12">
                    <div className="grid items-center gap-10 lg:grid-cols-2">
                      <Reveal>
                        <Eyebrow>Reflection</Eyebrow>
                        <h2 className="font-display text-secondary mb-6 text-2xl font-bold lg:text-3xl">
                          What I&apos;d do with another sprint
                        </h2>
                        <p className="font-body text-secondary/80 mb-4 text-lg leading-relaxed">
                          The sharpest lesson was that good research can move scope. We
                          walked in assuming the problem was ideation. The data redirected
                          us toward traceability, and the strongest concept grew out of
                          that pivot.
                        </p>
                        <p className="font-body text-secondary/80 text-lg leading-relaxed">
                          With more time I&apos;d run a longitudinal study across a full
                          studio project to test whether in-the-moment logging survives
                          deadline pressure. I&apos;d measure the share of decisions
                          captured live and the time it takes to prep a critique. Those
                          are the metrics that would prove ArchLog earns its place on the
                          desk.
                        </p>
                      </Reveal>

                      {/* Swap in a process snapshot: team working, whiteboard, or the design wall */}
                      <Reveal delay={0.1}>
                        <ImageSlot
                          ratio="aspect-[4/3]"
                          label="Behind the process"
                          hint="Team working session, whiteboard, or the design wall"
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
            <AccessibleButton href="/projects/spring-bank">
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
