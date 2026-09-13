import FadeIn from "@/components/FadeIn";
import Image from "next/image";
import BackToProjects from "@/components/BackToProjects";
import AccessibleButton from "@/components/AccessibleButton";
import ProjectHero from "@/components/ProjectHero";
import SectionTabs from "@/components/SectionTabs";
import NeuralMap from "@/components/NeuralMap";
import Reveal from "@/components/Reveal";
import Tile from "@/components/Tile";
import Eyebrow from "@/components/Eyebrow";
import ImageSlot from "@/components/ImageSlot";
import ProjectNavFooter from "@/components/ProjectNavFooter";
import HowMightWe from "@/components/HowMightWe";
import ResearchStats from "@/components/ResearchStats";
import InsightGrid from "@/components/InsightGrid";
import FeatureGrid from "@/components/FeatureGrid";
import { ArrowRightIcon } from "@/components/Icons";

const projectData = {
  title: "ArchLog",
  subtitle:
    "Documenting design thinking: a decision-tracking tool for architecture studios",
  description:
    "Architecture students are graded on the strength of their process, yet that process lives in notebooks, Miro boards, and “shower thoughts.” ArchLog is a research-led product concept that captures each design move at the moment it happens, so the reasoning survives all the way to critique.",
  heroImage: "/assets/projects/archlog/ArchLog-Hero.webp",
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
    src: "/gallery/ArchLog Overview page.webp",
    alt: "ArchLog project overview screen showing the decision log",
    caption: "Project Overview: every decision and its visuals in one place.",
  },
  {
    src: "/gallery/ArchLog Overview page.webp",
    alt: "Placeholder, replace with the Decision Logging screen",
    caption: "Decision Logging: capture the move and the reasoning together.",
  },
  {
    src: "/gallery/ArchLog Overview page.webp",
    alt: "Placeholder, replace with the Design Narrative screen",
    caption: "Design Narrative: a critique-ready story generated from your log.",
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

export default function ArchLogProject() {
  const maxScore = 7;

  return (
    <div className="">
      <ProjectHero src={projectData.heroImage} alt={projectData.title}>
        <FadeIn trigger="mount">
          <BackToProjects />

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

          <div className="mt-6 flex flex-wrap gap-2">
            {projectData.tags.map((tag) => (
              <span
                key={tag}
                className="bg-accent-blue/20 text-accent-blue rounded-full px-3 py-1 text-xs font-medium"
              >
                {tag}
              </span>
            ))}
          </div>
        </FadeIn>
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

                    <NeuralMap />
                  </div>

                  <HowMightWe>create a low-friction tool that helps architecture students develop concepts with greater clarity inside the studio?</HowMightWe>
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

                    <ResearchStats stats={researchStats} />

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

                    <InsightGrid
                      items={insights}
                      thesis={
                        <>
                          The hard part is{" "}
                          <span className="text-accent-lime">traceability</span>: capturing
                          the reasoning behind every design move.
                        </>
                      }
                    />
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
                        <div className="space-y-5 sm:space-y-4">
                          {concepts.map((concept, i) => (
                            <FadeIn
                              key={concept.name}
                              direction="left"
                              delay={i * 0.06}
                              margin="-40px"
                              style={{
                                "--tx": "-16px",
                                "--bar-w": `${(concept.score / maxScore) * 100}%`,
                                "--bar-delay": `${0.3 + i * 0.08}s`,
                              } as React.CSSProperties}
                              className="hover:bg-accent-blue/5 hover:translate-x-1 flex flex-wrap items-center gap-x-4 gap-y-1 rounded-lg px-1 transition-[colors,transform] sm:flex-nowrap"
                            >
                              <div className="flex w-full items-center justify-between sm:w-52 sm:shrink-0 sm:justify-start">
                                <span
                                  className={`font-body text-sm ${
                                    concept.winner
                                      ? "text-secondary font-semibold"
                                      : "text-secondary/70"
                                  }`}
                                >
                                  {concept.name}
                                </span>
                                <div className="flex items-center gap-2 sm:hidden">
                                  <span
                                    className={`font-display text-sm ${
                                      concept.winner
                                        ? "text-accent-lime font-bold"
                                        : "text-secondary/50"
                                    }`}
                                  >
                                    {concept.score.toFixed(2)}
                                  </span>
                                  {concept.winner && (
                                    <span className="bg-accent-lime text-primary rounded-full px-2 py-0.5 text-[10px] font-bold tracking-wide uppercase">
                                      Winner
                                    </span>
                                  )}
                                </div>
                              </div>
                              <div className="bg-primary/60 relative h-3 w-full overflow-hidden rounded-full sm:flex-1 sm:w-auto">
                                <div
                                  className={`bar-fill h-full rounded-full ${
                                    concept.winner
                                      ? "bg-accent-lime"
                                      : "bg-accent-blue/40"
                                  }`}
                                />
                              </div>
                              <div className="hidden w-20 shrink-0 items-center justify-end gap-2 sm:flex">
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
                            </FadeIn>
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
                            <div
                              className="ring-accent-blue/0 group-hover:ring-accent-lime/40 overflow-hidden rounded-2xl ring-2 transition-all"
                              style={{ backgroundColor: "#EAEFF9" }}
                            >
                              <Image
                                src={encodeURI(screen.src)}
                                alt={screen.alt}
                                width={2560}
                                height={1600}
                                loading="lazy"
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
                      <AccessibleButton
                        href="https://www.figma.com/"
                        external
                        variant="primary"
                      >
                        View Figma Prototype
                        <ArrowRightIcon className="h-4 w-4" />
                      </AccessibleButton>
                      <AccessibleButton href="#" variant="outline">
                        Watch Video Walkthrough
                      </AccessibleButton>
                    </Reveal>
                  </div>
                </section>
                <section className="bg-primary py-16 lg:py-24">
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

                    <FeatureGrid features={features} />
                  </div>
                </section>
                <section className="bg-accent-blue/5 py-16 lg:py-24">
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

                    <Tile
                      delay={0.1}
                      className="grid grid-cols-[auto_1fr] items-start gap-x-5 p-8 lg:p-10"
                    >
                      <div className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 border-accent-lime">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-accent-lime" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2z"/></svg>
                      </div>
                      <div>
                        <span className="text-accent-lime font-body text-xs tracking-widest uppercase">
                          The takeaway
                        </span>
                        <h3 className="font-display text-secondary mt-2 text-xl leading-snug font-bold lg:text-2xl">
                          Value the process as much as the result.
                        </h3>
                        <p className="font-body text-secondary/80 mt-3 leading-relaxed">
                          Process visibility, iteration, and design rationale deserve the
                          same weight as the final artifact, both in studio culture and in
                          the tools students reach for.
                        </p>
                      </div>
                    </Tile>
                  </div>
                </section>
              </>
            ),
          },
        ]}
      />

      <ProjectNavFooter nextHref="/projects/sous-sense" />
    </div>
  );
}
