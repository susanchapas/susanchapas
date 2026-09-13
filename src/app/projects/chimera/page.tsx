import Image from "next/image";
import BackToProjects from "@/components/BackToProjects";
import FadeIn from "@/components/FadeIn";
import AccessibleButton from "@/components/AccessibleButton";
import ProjectHero from "@/components/ProjectHero";
import SectionTabs from "@/components/SectionTabs";
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
import ChimeraLightbox from "./ChimeraLightbox";
import { PrinciplesCarousel, ProductTourCarousel } from "./carousels";

const projectData = {
  title: "Chimera 2.0",
  subtitle:
    "Redesigning a self-built home security system into a camera app people can actually navigate",
  description:
    "Jay built his own home security camera system from the ground up. The infrastructure is solid, yet the app he wrapped around it grew feature by feature until everyday tasks like finding an event or exporting a clip felt like work. Chimera 2.0 is a mobile-first redesign grounded in a deep heuristic analysis, rebuilding the app around the timeline so the core actions take fewer taps and less guesswork.",
  heroImage: "/assets/projects/chimera/Chimera-Hero.webp",
  tags: ["UX Research", "Heuristic Evaluation", "Mobile Design"],
  year: "2026",
  role: "UX Researcher & Product Designer",
  team: "Solo designer",
  platform: "Figma, Mobile",
};

const atAGlance = [
  { label: "My role", value: "UX Research & Product Design" },
  { label: "Team", value: "Solo designer" },
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
    src: "",
    alt: "Live state principle screen",
  },
  {
    name: "Visible system status",
    body: "Every action reports back, so an export or a deletion always shows what the system is doing.",
    src: "",
    alt: "System status principle screen",
  },
  {
    name: "Progressive disclosure",
    body: "Surface the controls people reach for first and tuck power features one layer down.",
    src: "",
    alt: "Progressive disclosure principle screen",
  },
  {
    name: "Consistency across flows",
    body: "The timeline behaves the same way in live viewing, event history, and clip making.",
    src: "",
    alt: "Consistency principle screen",
  },
  {
    name: "Minimal cognitive load",
    body: "Fewer choices per screen, clearer labels, and a navigation depth that stays shallow.",
    src: "",
    alt: "Minimal cognitive load principle screen",
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


export default function ChimeraProject() {
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
                        Jay is a software engineer, and his camera system reflects that.
                        The backend is reliable and capable. The mobile app he wrapped
                        around it grew feature by feature, so navigation and control
                        became a maze. Finding an event, scrubbing a timeline, exporting a
                        clip, and managing storage each lived in their own corner, and the
                        interface kept swinging between overloaded screens and functions
                        buried two or three taps deep.
                      </p>
                    </Reveal>

                    <Reveal delay={0.1}>
                      <div className="border-accent-blue/15 bg-primary/40 relative aspect-video overflow-hidden rounded-2xl border lg:hidden">
                        <Image
                          src="/assets/projects/chimera/chimera%20og%20dashboard%20blurred.webp"
                          alt="Chimera dashboard overview"
                          fill
                          loading="lazy"
                          sizes="100vw"
                          className="object-cover"
                        />
                      </div>
                      <ChimeraLightbox />
                    </Reveal>
                  </div>

                  <HowMightWe>rebuild Jay&apos;s camera app around the way he actually uses it, so live viewing, event retrieval, and exporting take fewer steps and less guesswork?</HowMightWe>
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

                    <ResearchStats stats={researchStats} />

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

                    <InsightGrid
                      items={frictions}
                      thesis={<>The timeline was the answer. Anchor it across every flow and the friction falls away.</>}
                    />
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
                        Built for the phone in your pocket
                      </h2>
                      <p className="font-body text-secondary/80 text-lg leading-relaxed">
                        Chimera is mobile-first. Jay checks his cameras from his phone, so
                        we designed every flow for one-handed use on a small screen, with
                        the timeline anchored where the thumb can reach it.
                      </p>
                    </Reveal>

                    <ProductTourCarousel items={productScreens} />

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
                        <ArrowRightIcon className="h-4 w-4" />
                      </AccessibleButton>
                      {/* Replace href with your hosted walkthrough video */}
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
                        A dashboard that puts the timeline first
                      </h2>
                      <p className="font-body text-secondary/80 text-lg leading-relaxed">
                        We rebuilt the app around a single dashboard hub. Four primary
                        actions sit one tap away, navigation depth drops, and viewing
                        stays cleanly separated from processing.
                      </p>
                    </Reveal>

                    <FeatureGrid features={features} columns={2} />
                  </div>
                </section>
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

                    <PrinciplesCarousel items={principles} />
                  </div>
                </section>
              </>
            ),
          },
        ]}
      />

      <ProjectNavFooter nextHref="/projects/file-finder" />
    </div>
  );
}
