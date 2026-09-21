import FadeIn from "@/components/FadeIn";
import Image from "next/image";
import BackToProjects from "@/components/BackToProjects";
import AccessibleButton from "@/components/AccessibleButton";
import ProjectHero from "@/components/ProjectHero";
import SectionTabs from "@/components/SectionTabs";
import NeuralMap from "@/components/NeuralMap";
import type { NeuralMapNode } from "@/components/NeuralMap";
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
import { StrengthsCarousel } from "./carousels";

const FB = "/assets/projects/file-finder/file-finder-challenge";

const ffNodes: NeuralMapNode[] = [
  { label: "To-Do", src: `${FB}/stickynote1.webp`, s: 195, rx: 8, bare: true, z: 2 },
  { label: "Bookshelf", src: `${FB}/photo2.webp`, s: 265, rx: 8, bare: false, z: 0 },
  { label: "Reminder", src: `${FB}/sticky2.webp`, s: 195, rx: 8, bare: true, z: 2 },
  { label: "Paper Stack", src: `${FB}/photo1.webp`, s: 265, rx: 8, bare: false, z: 0 },
  { label: "Documents", src: `${FB}/photo3.webp`, s: 265, rx: 8, bare: false, z: 0 },
  { label: "Design Book", src: `${FB}/photobook.webp`, s: 245, rx: 8, bare: false, z: 0 },
  { label: "Figma", src: `${FB}/logo-figma.webp`, s: 165, rx: 48, bare: false, z: 3 },
  { label: "Miro", src: `${FB}/logo-miro.webp`, s: 165, rx: 48, bare: false, z: 3 },
  { label: "Drive", src: `${FB}/logo1.webp`, s: 165, rx: 48, bare: false, z: 3 },
  { label: "Gmail", src: `${FB}/logo2.webp`, s: 150, rx: 48, bare: false, z: 3 },
  { label: "Canvas", src: `${FB}/logo3.webp`, s: 150, rx: 8, bare: false, z: 3 },
  { label: "Discord", src: `${FB}/logo4.webp`, s: 150, rx: 8, bare: false, z: 3 },
  { label: "Docs", src: `${FB}/logo5.webp`, s: 150, rx: 48, bare: false, z: 3 },
  { label: "YouTube", src: `${FB}/logo6.webp`, s: 150, rx: 8, bare: false, z: 3 },
  { label: "NJIT", src: `${FB}/logo7.webp`, s: 165, rx: 8, bare: false, z: 3 },
];

const ffEdges: [number, number][] = [
  [0, 3], [0, 10], [1, 5], [1, 14], [2, 4], [2, 7], [3, 8], [3, 12],
  [4, 9], [5, 6], [6, 7], [8, 9], [8, 12], [10, 14], [10, 13], [11, 1],
  [11, 13], [12, 0],
];

const ffTheme = {
  edge: "#bbcdf3",
  highlight: "#6fcd9d",
  dot: "rgba(187,205,243,0.18)",
  bg: "rgba(187,205,243,0.04)",
  border: "rgba(187,205,243,0.2)",
};

const projectData = {
  title: "File Finder",
  subtitle:
    "A teaching resource tool that organizes files by intent and teaching context",
  description:
    "Prof. S teaches across multiple courses and semesters. His files live in Google Drive, organized by class and color-coded, but none of that helps when a student asks a question mid-lecture and he needs to find the right resource in seconds. File Finder is a research-led product concept that lets him tag, search, and find materials by topic and teaching context.",
  heroImage: "/assets/projects/file-finder/File-Finder-Hero.webp",
  tags: ["UX Research", "Product Design", "Prototyping"],
  year: "2026",
  role: "UX Researcher & Product Designer",
  team: "3-person team",
  platform: "Figma",
};

const atAGlance = [
  { label: "My role", value: "UX Research & Product Design" },
  { label: "Team", value: "3 designers" },
  { label: "Timeline", value: "2 weeks" },
  { label: "Methods", value: "Semi-structured interview, student survey, affinity mapping" },
];

const researchStats = [
  { value: "1", label: "In-depth semi-structured interview with Prof. S" },
  { value: "5", label: "Affinity map themes synthesized from research" },
  { value: "5", label: "Design opportunities identified" },
];

const themes = [
  {
    title: "Built for storage only.",
    body: "Files are organized by course and semester. Cross-topic reuse depends on memory, and the context of why something matters is lost over time.",
  },
  {
    title: "The professor handles all the cognitive load.",
    body: "Students rely on Prof. S to locate and interpret resources. Repeated, similar requests replace self-service. Email and messaging add to the workload without resolving anything.",
  },
  {
    title: "The system fails under live teaching conditions.",
    body: "File search breaks down in class. Teaching is interrupted, and public failure creates frustration and embarrassment.",
  },
  {
    title: "More structure increases time wasted.",
    body: "Adding folders and \"best of\" collections only adds complexity. Reorganization attempts feel risky and unrewarding.",
  },
  {
    title: "His preferred mental model is already visible.",
    body: "Prof. S is comfortable with multi-placement tools like Pinterest and Discord. Visual, flexible organization reduces decision pressure. He wants students to navigate on their own.",
  },
];

const designOpportunities = [
  {
    name: "Tagging over folder structure",
    body: "Prof. S struggles with a hierarchy that assumes a file belongs in one place. Many of his documents serve multiple purposes across different courses.",
  },
  {
    name: "Shared document hub",
    body: "Students want to respect his time and figure things out on their own first. A shared space reduces the need to create individual resources per student, and lets students contribute too.",
  },
  {
    name: "Google Calendar integration",
    body: "Relevant files suggested based on daily meetings and classes, so materials appear when they are most likely needed.",
  },
  {
    name: "Fuzzy search",
    body: "When searching for projects, Prof. S may not remember the exact section or assignment name. Fuzzy matching also handles misspellings.",
  },
  {
    name: "Content scanning",
    body: "For when he remembers the content but forgot the file name. Search inside file contents to match by what the document says.",
  },
];

const designConcepts = [
  {
    name: "Multiple Entry Points",
    body: "Search-led discovery with fuzzy search, tag-led discovery, and recommendation-led discovery. The goal: support both known search and exploratory browsing.",
  },
  {
    name: "Intelligent File Upload",
    body: "Preview with AI-suggested keywords and topics, suggested placement, and the ability to edit or annotate metadata before saving. The goal: organize resources at the moment of upload.",
  },
  {
    name: "Landing Page",
    body: "Central dashboard for courses and files, access to frequent searches, and messaging with other professors. The goal: easy navigation across department content.",
  },
];

const strengths = [
  {
    category: "Flexible Discovery",
    items: [
      "System is adaptive",
      "Supports both precision and exploration",
      "Retrieve info whether he remembers a file name, a concept, or nothing at all",
    ],
  },
  {
    category: "Intelligent Organization at Upload",
    items: [
      "Organization supported at moment of upload",
      "Prevents retrieval problems before they start",
      "Consistent across courses and semesters",
    ],
  },
  {
    category: "Reduced Cognitive Load",
    items: [
      "Offloads reliance on memory",
      "More efficient under time constraints",
      "Minimizes assumptions or guessing during retrieval",
    ],
  },
  {
    category: "Collaborative Workspace",
    items: [
      "Encourages sharing resources among faculty",
      "Supports material reuse across different semesters",
      "Enables visibility across different classes and courses",
    ],
  },
];

const recommendations = [
  {
    title: "Organize by use",
    body: "Let files exist in multiple places through tags and contextual grouping. A single \"correct\" location for a multipurpose document creates more problems than it solves.",
  },
  {
    title: "Reduce reliance on the instructor as intermediary",
    body: "Enable student self-service access to course resources. When students can find answers themselves, it frees up the professor's time for higher-priority support.",
  },
  {
    title: "Design around existing mental models",
    body: "Prof. S already thinks in spatial, board-like terms. The system should match how he organizes information in his head.",
  },
  {
    title: "Retrieval should be as easy as storage",
    body: "When the time cost of finding a resource is lower than the time cost of recreating it, the system works. File Finder moves the organizational effort to the moment of upload, so retrieval can be fast, flexible, and forgiving.",
  },
];

const productScreens = [
  {
    src: "",
    alt: "File Finder landing page dashboard",
    caption: "Landing Page: central dashboard for courses, files, and frequent searches.",
  },
  {
    src: "",
    alt: "File Finder search and discovery interface",
    caption: "Search: fuzzy search with tag-led and recommendation-led discovery.",
  },
  {
    src: "",
    alt: "File Finder upload flow with AI-suggested tags",
    caption: "Upload: AI-suggested keywords and placement at the moment of upload.",
  },
];

export default function FileFinderProject() {
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
                        Prof. S manages materials across different classes and semesters.
                        His files are color-coded by class in Google Drive, but there
                        is no structure beyond that. Finding a specific resource means
                        remembering the file name, the folder, and which semester it came
                        from. During lecture, searching for something takes long enough
                        to interrupt the flow of class. Students depend on him to locate
                        and interpret resources, which adds to his workload without
                        making the next request any easier.
                      </p>
                    </Reveal>

                    <Reveal delay={0.1}>
                      <NeuralMap nodes={ffNodes} edges={ffEdges} theme={ffTheme} />
                    </Reveal>
                  </div>

                  <HowMightWe>let the system handle ambiguity so Prof. S doesn&apos;t have to?</HowMightWe>
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
                        Two methods, two perspectives
                      </h2>
                      <p className="font-body text-secondary/80 text-lg leading-relaxed">
                        We ran a semi-structured interview with Prof. S to follow his
                        workflow and observe behaviors, emotional responses, and
                        workarounds that would not appear in a structured format. We
                        then surveyed current and former students via Google Forms to
                        validate whether his problems were isolated or experienced
                        across the board.
                      </p>
                    </Reveal>

                    <ResearchStats stats={researchStats} />

                    <Reveal delay={0.1} className="mt-8">
                      <ImageSlot
                        ratio="aspect-[21/9]"
                        label="Research in action"
                        hint="Affinity map, survey results, or interview notes"
                        sizes="(min-width: 1024px) 75vw, 100vw"
                      />
                    </Reveal>
                  </div>
                </section>
                <section className="bg-accent-blue/5 py-16 lg:py-24">
                  <div className="container mx-auto px-6 lg:px-12">
                    <Reveal className="mb-12 max-w-3xl">
                      <Eyebrow>Key Themes</Eyebrow>
                      <h2 className="font-display text-secondary text-2xl font-bold lg:text-3xl">
                        Five themes from the affinity map
                      </h2>
                    </Reveal>

                    <InsightGrid
                      items={themes}
                      thesis={<>The core problem is <span className="text-accent-lime">retrieval</span>. His tools organize files by where they came from, which makes finding them later difficult.</>}
                    />
                  </div>
                </section>
                <section className="bg-primary py-16 lg:py-24">
                  <div className="container mx-auto px-6 lg:px-12">
                    <Reveal className="mb-12 max-w-3xl">
                      <Eyebrow>Design Opportunities</Eyebrow>
                      <h2 className="font-display text-secondary mb-6 text-2xl font-bold lg:text-3xl">
                        Five opportunities from the research
                      </h2>
                      <p className="font-body text-secondary/80 text-lg leading-relaxed">
                        Each opportunity maps directly to a theme from the affinity map.
                        We prioritized features that would reduce the time between a
                        student&apos;s question and the professor&apos;s answer.
                      </p>
                    </Reveal>

                    <FeatureGrid features={designOpportunities} />
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
                        Designed for the teaching desk
                      </h2>
                      <p className="font-body text-secondary/80 text-lg leading-relaxed">
                        File Finder is desktop-first. Prof. S works from a laptop during
                        lectures and office hours, so we built the Figma prototype for
                        the screen he already uses. The layout stays calm and
                        functional so finding a file takes seconds.
                      </p>
                    </Reveal>

                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                      {productScreens.map((screen, i) => (
                        <Tile key={i} delay={(i % 3) * 0.08} className="group h-full">
                          <figure className="h-full">
                            <div
                              className="ring-accent-blue/0 group-hover:ring-accent-lime/40 overflow-hidden rounded-2xl ring-2 transition-[ring-color] duration-700 ease-[var(--ease-liquid)]"
                              style={{ backgroundColor: "#EAEFF9" }}
                            >
                              {screen.src ? (
                                <Image
                                  src={encodeURI(screen.src)}
                                  alt={screen.alt}
                                  width={2560}
                                  height={1600}
                                  loading="lazy"
                                  className="h-auto w-full transition-transform duration-700 ease-[var(--ease-liquid)] group-hover:scale-[1.05]"
                                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                                />
                              ) : (
                                <div className="flex aspect-[16/10] items-center justify-center">
                                  <span className="font-body text-secondary/40 text-sm">
                                    Screen placeholder
                                  </span>
                                </div>
                              )}
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
                    </Reveal>
                  </div>
                </section>
                <section className="bg-primary py-16 lg:py-24">
                  <div className="container mx-auto px-6 lg:px-12">
                    <Reveal className="mb-12 max-w-3xl">
                      <Eyebrow>The Solution</Eyebrow>
                      <h2 className="font-display text-secondary mb-6 text-2xl font-bold lg:text-3xl">
                        Three design concepts for a flexible resource system
                      </h2>
                      <p className="font-body text-secondary/80 text-lg leading-relaxed">
                        File Finder organizes resources visually, by intent, topic,
                        and reusability. It lets Prof. S find files dynamically and
                        contextually. Students can also collaborate and find
                        specific examples by searching for topics and keywords.
                      </p>
                    </Reveal>

                    <div className="grid gap-6 md:grid-cols-3">
                      {designConcepts.map((concept, i) => (
                        <Tile
                          key={concept.name}
                          delay={(i % 3) * 0.08}
                          className="group bg-accent-blue/5 border-accent-blue/10 hover:border-accent-lime/40 h-full rounded-2xl border p-7 transition-colors"
                        >
                          <h3 className="font-display text-accent-blue group-hover:text-accent-lime mb-3 text-lg font-bold transition-colors">
                            {concept.name}
                          </h3>
                          <p className="font-body text-secondary/70 text-sm leading-relaxed">
                            {concept.body}
                          </p>
                        </Tile>
                      ))}
                    </div>
                  </div>
                </section>
                <section className="bg-accent-blue/5 py-16 lg:py-24">
                  <div className="container mx-auto px-6 lg:px-12">
                    <Reveal className="mb-12 max-w-3xl">
                      <Eyebrow>System Strengths</Eyebrow>
                      <h2 className="font-display text-secondary mb-6 text-2xl font-bold lg:text-3xl">
                        What the system does well
                      </h2>
                      <p className="font-body text-secondary/80 text-lg leading-relaxed">
                        The system keeps class moving, freeing time and attention
                        for learning. It lets Prof. S spend more time on
                        higher-priority tasks.
                      </p>
                    </Reveal>

                    <StrengthsCarousel items={strengths} />
                  </div>
                </section>
                <section className="bg-primary py-16 lg:py-24">
                  <div className="container mx-auto px-6 lg:px-12">
                    <Reveal className="mb-12 max-w-3xl">
                      <Eyebrow>What We Recommend</Eyebrow>
                      <h2 className="font-display text-secondary text-2xl font-bold lg:text-3xl">
                        For educators, beyond the tool
                      </h2>
                    </Reveal>

                    <div className="grid gap-6 md:grid-cols-2">
                      {recommendations.map((rec, i) => (
                        <Tile
                          key={rec.title}
                          delay={(i % 2) * 0.08}
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
                  </div>
                </section>
              </>
            ),
          },
        ]}
      />

      <ProjectNavFooter nextHref="/projects/brandcomms" />
    </div>
  );
}
