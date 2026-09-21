import FadeIn from "@/components/FadeIn";
import BackToProjects from "@/components/BackToProjects";
import AccessibleButton from "@/components/AccessibleButton";
import ProjectHero from "@/components/ProjectHero";
import SectionTabs from "@/components/SectionTabs";
import NeuralMap from "@/components/NeuralMap";
import type { NeuralMapNode } from "@/components/NeuralMap";
import Reveal from "@/components/Reveal";
import Tile from "@/components/Tile";
import Eyebrow from "@/components/Eyebrow";
import ResearchPinboard from "@/components/ResearchPinboard";
import ProjectNavFooter from "@/components/ProjectNavFooter";
import HowMightWe from "@/components/HowMightWe";
import ResearchStats from "@/components/ResearchStats";
import InsightGrid from "@/components/InsightGrid";
import FeatureGrid from "@/components/FeatureGrid";
import ArchLogPrototype from "@/components/ArchLogPrototype";
import { ArrowRightIcon } from "@/components/Icons";
import { ProductTourCarousel } from "./carousels";

const AB = "/assets/projects/archlog/ArchLog%20challenge%20pinboard";

const archlogNodes: NeuralMapNode[] = [
  { label: "To-Do", src: `${AB}/To-Do-sticky-note.webp`, s: 195, rx: 8, bare: true, z: 2 },
  { label: "Render", src: `${AB}/building-render.webp`, s: 265, rx: 8, bare: false, z: 0 },
  { label: "Sketch Paper", src: `${AB}/building-sketch-paper.webp`, s: 195, rx: 8, bare: true, z: 0 },
  { label: "Building Sketch", src: `${AB}/building-sketch.webp`, s: 265, rx: 8, bare: false, z: 0 },
  { label: "Site Photo", src: `${AB}/building-with-graffiti.webp`, s: 265, rx: 8, bare: false, z: 0 },
  { label: "Cheesecloth", src: `${AB}/cheesecloth-texture.webp`, s: 165, rx: 8, bare: true, z: 1 },
  { label: "Concrete", src: `${AB}/concrete-texture.webp`, s: 165, rx: 8, bare: true, z: 1 },
  { label: "Crit Notes", src: `${AB}/crit-sticky-note.webp`, s: 195, rx: 8, bare: true, z: 2 },
  { label: "Flood Zone", src: `${AB}/flood-zone-sticky-note.webp`, s: 195, rx: 8, bare: true, z: 2 },
  { label: "Journal", src: `${AB}/house-sketch-in-journal.webp`, s: 265, rx: 8, bare: false, z: 0 },
  { label: "Instagram", src: `${AB}/instagram-icon.webp`, s: 180, rx: 48, bare: false, z: 3 },
  { label: "Moss", src: `${AB}/moss-texture.webp`, s: 165, rx: 8, bare: true, z: 1 },
  { label: "Circulation", src: `${AB}/new-circulation-sticky-note.webp`, s: 195, rx: 8, bare: true, z: 2 },
  { label: "Pinterest", src: `${AB}/pinterest-logo.webp`, s: 180, rx: 90, bare: false, z: 3 },
  { label: "Sketchbook", src: `${AB}/sketchbook-with-triangle.webp`, s: 265, rx: 8, bare: false, z: 0 },
  { label: "Window Detail", src: `${AB}/window-sketch-sticky-note.webp`, s: 195, rx: 8, bare: true, z: 2 },
];

const archlogEdges: [number, number][] = [
  [0, 3], [0, 9], [1, 5], [1, 13], [2, 8], [2, 11], [3, 7], [4, 12],
  [4, 6], [5, 14], [6, 15], [7, 10], [8, 1], [9, 12], [10, 14], [11, 3],
  [13, 15], [14, 0],
];

const projectData = {
  title: "ArchLog",
  subtitle:
    "Documenting design thinking: a decision-tracking tool for architecture studios",
  description:
    "Architecture students are graded on the strength of their process, yet that process lives in notebooks, Miro boards, and “shower thoughts.” ArchLog is a research-led product concept that captures each design move at the moment it happens, so the reasoning is available at critique.",
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
    body: "2 in 3 students said their approach “depends on the project.” Studio culture rewards adaptability while leaving students without a methodology to rely on.",
  },
  {
    title: "There's no shared design process.",
    body: "7 of 17 students named concept development the most difficult phase, and nearly half named iteration. Progress stalls right when a project begins.",
  },
  {
    title: "Constraints generate ideas.",
    body: "Across interviews, structure kept coming up as a source of ideas. “One of the biggest things we're taught is to use constraints as an opportunity.”",
  },
  {
    title: "Decision-making stays in students' heads.",
    body: "Ideas appear in fragments like sketches, conversations, and “shower thoughts,” and rarely get captured in a way that lasts through critique.",
  },
  {
    title: "Critique exposes the missing rationale.",
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
    body: "Export projects with ease so your crits can follow your thinking, wherever you present it.",
  },
];

const productScreens = [
  {
    src: "/assets/projects/archlog/archlog-proj-overview.webp",
    alt: "ArchLog project overview showing brief, constraints, and milestones",
    caption:
      "Project Overview: input your brief, constraints, and milestones\nto ground every decision that follows.",
  },
  {
    src: "/assets/projects/archlog/archlog-log-decision.webp",
    alt: "ArchLog decision logging form and decision history timeline",
    caption:
      "Decision Logging: capture each design move with its rationale,\ntags, and references as it happens.",
  },
  {
    src: "/assets/projects/archlog/archlog-narrative-builder.webp",
    alt: "ArchLog narrative builder with audience, tone, and framing controls",
    caption:
      "Narrative Builder: shape a critique-ready story from your logged decisions\nwith audience and tone controls.",
  },
  {
    src: "/assets/projects/archlog/archlog-profile-sharing.webp",
    alt: "ArchLog designer profile alongside a generated design narrative",
    caption:
      "Profile & Export: build your designer profile and export narratives\nfor critiques, pin-ups, or reviews.",
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

      <div className="bg-primary">
        <div className="container mx-auto px-6 lg:px-12">
          <ArchLogPrototype />
        </div>
      </div>

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
            <h3 className="font-display mb-5 text-sm tracking-widest uppercase" style={{ color: 'var(--accent-lime)' }}>
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
                        structure their process. Once they&apos;ve started, there&apos;s
                        no consistent way to capture <em>why</em> they made the moves they
                        made. Critiques rely on memory while decisions end up scattered
                        across tools and notebooks. The result is a fragmented, hard-to-defend
                        process that varies from project to project and critic to critic.
                      </p>
                    </Reveal>

                    <NeuralMap nodes={archlogNodes} edges={archlogEdges} />
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
                        A five-section survey mapped habits, blockers, and tooling shortfalls. A
                        focus group revealed <em>why</em> the data looked the way it did.
                        A/B usability studies then tested two design directions
                        before we committed to a single path.
                      </p>
                    </Reveal>

                    <ResearchStats stats={researchStats} />

                    <Reveal delay={0.1} className="mt-8">
                      <ResearchPinboard />
                    </Reveal>
                  </div>
                </section>
                <section className="bg-accent-blue/5 py-16 lg:py-24">
                  <div className="container mx-auto px-6 lg:px-12">
                    <Reveal className="mb-12 max-w-3xl">
                      <Eyebrow>Key Insights</Eyebrow>
                      <h2 className="font-display text-secondary text-2xl font-bold lg:text-3xl">
                        Five findings clarified the problem
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
                        Narrowing seven concepts to one
                      </h2>
                      <p className="font-body text-secondary/80 text-lg leading-relaxed">
                        We put seven feature concepts in front of participants and asked
                        them to rank what they&apos;d use in practice. The Design
                        Decision Tracker won by a wide margin, with three of four naming
                        it their top choice. That result confirmed our research thesis:
                        the hard part is traceability, capturing the reasoning behind each
                        move.
                      </p>
                    </Reveal>

                    <Reveal delay={0.05}>
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

                    <div className="mx-auto max-w-4xl">
                      <ProductTourCarousel items={productScreens} />
                    </div>

                    <Reveal
                      delay={0.1}
                      className="mt-12 flex flex-wrap justify-center gap-4"
                    >
                      <AccessibleButton
                        href="https://www.figma.com/proto/meQB0AK1p3EVTFgzb1v58l/ArchLog?page-id=1814%3A1217&node-id=2041-1390&p=f&viewport=554%2C390%2C0.03&t=odeoxJPUEzyCWcMH-1&scaling=scale-down&content-scaling=fixed&starting-point-node-id=2041%3A1390"
                        external
                        variant="primary"
                      >
                        View Figma Prototype
                        <ArrowRightIcon className="h-4 w-4" />
                      </AccessibleButton>
                      <AccessibleButton
                        href="https://drive.google.com/file/d/1JnuSE68Q9JIEm_7NiYN1DavbWX4eXilW/view?usp=sharing"
                        external
                        variant="outline"
                      >
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
