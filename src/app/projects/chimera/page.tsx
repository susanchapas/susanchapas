import Image from "next/image";
import BackToProjects from "@/components/BackToProjects";
import FadeIn from "@/components/FadeIn";
import AccessibleButton from "@/components/AccessibleButton";
import ProjectHero from "@/components/ProjectHero";
import SectionTabs from "@/components/SectionTabs";
import Reveal from "@/components/Reveal";
import ProjectSummary from "@/components/ProjectSummary";
import ProjectNavFooter from "@/components/ProjectNavFooter";
import HowMightWe from "@/components/HowMightWe";
import InsightGrid from "@/components/InsightGrid";
import FeatureGrid from "@/components/FeatureGrid";
import ChimeraUserFlow from "@/components/ChimeraUserFlow";
// Interactive prototype preserved for future use:
// import ChimeraPrototype from "@/components/ChimeraPrototype";
import { ArrowRightIcon } from "@/components/Icons";
import ChimeraLightbox from "./ChimeraLightbox";
import { PrinciplesCarousel, ProductTourCarousel } from "./carousels";
import { pageMetadata } from "@/lib/metadata";

const projectData = {
  title: "Chimera 2.0",
  subtitle:
    "Redesigning a self-built home security system into a camera app people can navigate",
  description:
    "Jay designed and built his own home security camera system. The infrastructure is solid, yet the app he built for it grew feature by feature until everyday tasks like finding an event or exporting a clip felt like work. Chimera 2.0 is a mobile-first redesign grounded in a thorough heuristic analysis, rebuilding the app around the timeline so the core actions take fewer taps and less guesswork.",
  heroImage: "/assets/projects/chimera/Chimera-Hero-1600.webp",
  tags: ["UX Research", "Heuristic Evaluation", "Mobile Design"],
  year: "2026",
  role: "UX Researcher & Product Designer",
  team: "Solo designer",
  platform: "Figma, Mobile",
};

export const metadata = pageMetadata({
  title: projectData.title,
  description: projectData.subtitle,
  image: "/assets/projects/chimera/Chimera-Hero-1600.webp",
});

const outcomes = [
  { label: "Core action depth", value: "Reduced from 3+ screens to 1 tap" },
  { label: "Frictions resolved", value: "5 heuristic breakdowns identified and fixed" },
  { label: "Design system", value: "Unified timeline interaction across all 4 flows" },
];

const atAGlance = [
  { label: "My role", value: "UX Research & Product Design" },
  { label: "Team", value: "Solo designer" },
  { label: "Stakeholder", value: "Jay, the engineer who built the system" },
  { label: "Platform", value: "iOS, mobile-first" },
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
    weaknesses: "Slower access, hidden controls, difficult to learn",
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
    weaknesses: "Less polished, hidden settings, weak organization",
    bestFor: "Cost-conscious users",
  },
];

const CA = "/assets/projects/chimera/comp-apps";

const compApps = [
  {
    name: "Ring",
    frames: [
      {
        label: "Timeline",
        src: `${CA}/Ring-timeline-settings.webp`,
        width: 1422,
        height: 900,
        offset: "mt-2",
      },
      {
        label: "Live view",
        src: `${CA}/Ring-plus-settings-2.webp`,
        width: 491,
        height: 981,
        offset: "mt-0",
      },
      {
        label: "Doorbell",
        src: `${CA}/ring-app.webp`,
        width: 1200,
        height: 675,
        offset: "mt-1",
      },
    ],
  },
  {
    name: "Google Nest",
    frames: [
      {
        label: "Home",
        src: `${CA}/goog-nest.webp`,
        width: 576,
        height: 695,
        offset: "mt-2",
      },
      {
        label: "Flows",
        src: `${CA}/goognest.webp`,
        width: 2048,
        height: 1344,
        offset: "mt-0",
      },
      {
        label: "Live view",
        src: `${CA}/google-nest.webp`,
        width: 1300,
        height: 731,
        offset: "mt-2",
      },
    ],
  },
  {
    name: "Arlo",
    frames: [
      {
        label: "Dashboard",
        src: `${CA}/arlo.webp`,
        width: 1200,
        height: 899,
        offset: "mt-0",
      },
      {
        label: "Notifications",
        src: `${CA}/arlo2.webp`,
        width: 1046,
        height: 720,
        offset: "mt-1",
      },
      {
        label: "Library",
        src: `${CA}/arlo3.webp`,
        width: 720,
        height: 720,
        offset: "mt-1",
      },
    ],
  },
  {
    name: "Eufy",
    frames: [
      { label: "Home", src: `${CA}/eufy.webp`, width: 1600, height: 792, offset: "mt-2" },
      {
        label: "Events",
        src: `${CA}/eufy3.webp`,
        width: 1035,
        height: 720,
        offset: "mt-0",
      },
      {
        label: "Settings",
        src: `${CA}/eufy2.webp`,
        width: 1312,
        height: 738,
        offset: "mt-2",
      },
    ],
  },
];

const frictions = [
  {
    title: "Export was disconnected.",
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
    body: "After starting an export, the app gave no status, leaving users to wait and wonder whether anything was happening.",
  },
  {
    title: "Too many screens to reach a core action.",
    body: "Reaching a core action took several screens from the dashboard, and viewing and processing were combined on the same screens.",
  },
];

const principles = [
  {
    name: "Immediate access to live state",
    body: "Open the app and the cameras are right there, no searching for the feed that matters most.",
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
    body: "Show the most-used controls first and place power features one layer down.",
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
    src: "/assets/projects/chimera/chimera screens/chimera-dashboard.webp",
    alt: "Chimera dashboard screen",
    title: "Dashboard",
    description: "The timeline-first hub with all core actions one tap away.",
  },
  {
    src: "/assets/projects/chimera/chimera screens/chimera-live-feed.webp",
    alt: "Chimera live feeds screen",
    title: "Live Feed",
    description: "Full-screen viewing with swipe between cameras.",
  },
  {
    src: "/assets/projects/chimera/chimera screens/chimera-event-history.webp",
    alt: "Chimera event history scrubber screen",
    title: "Event History",
    description: "Scrub the timeline and jump straight to export.",
  },
  {
    src: "/assets/projects/chimera/chimera screens/chimera-clip-maker.webp",
    alt: "Chimera clip maker screen",
    title: "Clip Maker",
    description: "Mark frames, pick an output, and follow the status.",
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

      {/* Interactive prototype preserved for future use:
      <div className="bg-primary">
        <div className="container mx-auto px-6 lg:px-12">
          <ChimeraPrototype />
        </div>
      </div>
      */}

      <ProjectSummary
        overview={projectData.description}
        glance={atAGlance}
        outcomes={outcomes}
      />

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
                      <h2 className="font-display text-secondary mb-6 text-2xl font-bold lg:text-3xl">
                        A capable system behind a hard-to-use app
                      </h2>
                      <p className="font-body text-secondary/80 text-lg leading-relaxed">
                        Jay is a software engineer, and his camera system reflects that.
                        The backend is reliable and capable. The mobile app he built for
                        it grew feature by feature, so navigation and control became
                        difficult to follow. Finding an event, scrubbing a timeline,
                        exporting a clip, and managing storage each sat in a separate part
                        of the app, and the interface alternated between overloaded
                        screens and functions placed two or three taps deep.
                      </p>
                    </Reveal>

                    <Reveal delay={0.1}>
                      <ChimeraLightbox />
                    </Reveal>
                  </div>

                  <HowMightWe>
                    rebuild Jay&apos;s camera app around the way he uses it, so live
                    viewing, event retrieval, and exporting take fewer steps and less
                    guesswork?
                  </HowMightWe>
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
                      <h2 className="font-display text-secondary mb-6 text-2xl font-bold lg:text-3xl">
                        A heuristic-first approach
                      </h2>
                      <p className="font-body text-secondary/80 text-lg leading-relaxed">
                        I benchmarked four leading consumer camera apps, then ran a
                        heuristic evaluation of Jay&apos;s app against established
                        usability principles. I mapped every core flow, live viewing,
                        event retrieval, clip creation, and data management, to pin down
                        where the friction was.
                      </p>
                    </Reveal>

                    <Reveal delay={0.1} className="mt-8">
                      <ChimeraUserFlow />
                    </Reveal>
                  </div>
                </section>
                <section className="bg-accent-blue/5 py-16 lg:py-24">
                  <div className="container mx-auto px-6 lg:px-12">
                    <Reveal className="mb-12 max-w-3xl">
                      <h2 className="font-display text-secondary mb-6 text-2xl font-bold lg:text-3xl">
                        Four apps, four trade-offs
                      </h2>
                      <p className="font-body text-secondary/80 text-lg leading-relaxed">
                        Ring, Google Nest, Arlo, and Eufy each solve the same problem in a
                        different way. Studying their choices showed me what users already
                        expect from a camera app and where every one of them leaves room
                        to do better.
                      </p>
                    </Reveal>

                    <Reveal delay={0.08}>
                      <div className="overflow-x-auto rounded-2xl">
                        <table className="w-full min-w-225 border-collapse text-left">
                          <caption className="sr-only">
                            Competitive comparison of consumer home-security camera apps
                          </caption>
                          <thead>
                            <tr className="border-accent-lime/40 border-b">
                              <th
                                scope="col"
                                className="font-body text-accent-lime bg-primary sticky left-0 z-20 w-20 px-3 py-3 text-sm font-bold tracking-widest uppercase lg:static lg:w-36 lg:px-5 lg:py-4"
                              >
                                App
                              </th>
                              <th
                                scope="col"
                                className="font-body text-accent-lime bg-primary w-48 px-5 py-3 text-sm font-bold tracking-widest uppercase lg:py-4"
                              >
                                Approach
                              </th>
                              <th
                                scope="col"
                                className="font-body text-accent-lime bg-primary min-w-68 px-5 py-3 text-sm font-bold tracking-widest uppercase lg:py-4"
                              >
                                What works
                              </th>
                              <th
                                scope="col"
                                className="font-body text-accent-lime bg-primary min-w-68 px-5 py-3 text-sm font-bold tracking-widest uppercase lg:py-4"
                              >
                                Trade-off
                              </th>
                              <th
                                scope="col"
                                className="font-body text-accent-lime bg-primary w-44 px-5 py-3 text-sm font-bold tracking-widest uppercase lg:py-4"
                              >
                                Best for
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {competitors.map((c) => (
                              <tr
                                key={c.name}
                                className="border-accent-blue/20 hover:bg-accent-blue/5 border-b last:border-b-0"
                              >
                                <th
                                  scope="row"
                                  className="font-display text-secondary sticky left-0 z-10 w-20 bg-[color-mix(in_srgb,var(--accent-blue)_5%,var(--primary))] px-3 py-3 text-base font-bold lg:static lg:w-36 lg:bg-transparent lg:px-5 lg:py-5"
                                >
                                  {c.name === "Google Nest" ? (
                                    <>
                                      Google
                                      <span className="lg:hidden">
                                        <br />
                                      </span>{" "}
                                      Nest
                                    </>
                                  ) : (
                                    c.name
                                  )}
                                </th>
                                <td className="font-body text-secondary/70 px-5 py-3 text-base leading-relaxed lg:py-5">
                                  {c.style}
                                </td>
                                <td className="font-body text-secondary/90 px-5 py-3 text-base leading-relaxed lg:py-5">
                                  {c.strengths}
                                </td>
                                <td className="font-body text-secondary/90 px-5 py-3 text-base leading-relaxed lg:py-5">
                                  {c.weaknesses}
                                </td>
                                <td className="font-body text-secondary px-5 py-3 text-base font-semibold whitespace-nowrap lg:py-5">
                                  {c.bestFor}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      <p className="font-body text-secondary/70 mt-3 text-sm lg:hidden">
                        Scroll horizontally to compare all criteria.
                      </p>
                    </Reveal>

                    <Reveal
                      delay={0.1}
                      className="relative mt-10 overflow-hidden rounded-2xl border border-black/10 bg-[#f5f5f5] bg-[radial-gradient(rgba(0,0,0,0.14)_1px,transparent_1px)] bg-size-[18px_18px] px-3 py-3 sm:px-4 sm:py-4 lg:px-6"
                    >
                      <div
                        aria-hidden
                        className="pointer-events-none absolute inset-0 z-5 bg-[#cfe6ff]/50"
                      />
                      <div className="relative mx-auto grid max-w-5xl gap-2 sm:grid-cols-2 lg:gap-3">
                        {compApps.map((app) => (
                          <section
                            key={app.name}
                            aria-label={app.name}
                            className="relative rounded-md border border-black/10 bg-white px-2 pt-7 pb-3 shadow-black/15 transition duration-200 ease-out hover:z-1 hover:scale-[1.02] hover:shadow-xl motion-reduce:transition-none motion-reduce:hover:scale-100 sm:px-3"
                          >
                            <span className="font-body absolute top-1.5 left-2 rounded-sm bg-black/5 px-1.5 py-0.5 text-[10px] text-black/60">
                              {app.name}
                            </span>
                            <div className="flex items-start gap-2 sm:gap-3">
                              {app.frames.map((f) => (
                                <div
                                  key={f.label}
                                  className={`min-w-0 ${f.offset}`}
                                  style={{ flex: `${f.width / f.height} 1 0%` }}
                                >
                                  <span className="font-body mb-1 flex items-center gap-1 text-[10px] whitespace-nowrap text-[#9747FF]">
                                    <svg
                                      viewBox="0 0 12 12"
                                      className="size-2.5 shrink-0 fill-current"
                                      aria-hidden
                                    >
                                      <path d="M6 0l2 2-2 2-2-2zM2 4l2 2-2 2-2-2zM10 4l2 2-2 2-2-2zM6 8l2 2-2 2-2-2z" />
                                    </svg>
                                    <span className="truncate">{f.label}</span>
                                  </span>
                                  <Image
                                    src={f.src}
                                    alt=""
                                    width={f.width}
                                    height={f.height}
                                    sizes="(min-width: 640px) 220px, 140px"
                                    className="h-auto w-full border border-[#9747FF] shadow-xl shadow-black/10"
                                  />
                                </div>
                              ))}
                            </div>
                          </section>
                        ))}
                        {[
                          {
                            text: "One focused view with list of other clips right below",
                            className: "top-[8%] right-2 sm:top-[10%] sm:right-[6%]",
                          },
                          {
                            text: "Event summary --> pre-suggest clips based on detected motion",
                            className: "bottom-[8%] left-2 sm:bottom-[10%] sm:left-[6%]",
                          },
                        ].map((note) => (
                          <div
                            key={note.text}
                            aria-hidden
                            className={`absolute z-2 flex w-[min(60%,16rem)] items-start gap-2 rounded-2xl rounded-bl-sm border border-black/10 bg-white p-2 shadow-xl shadow-black/15 transition duration-200 ease-out hover:scale-105 hover:shadow-2xl motion-reduce:transition-none motion-reduce:hover:scale-100 sm:p-2.5 ${note.className}`}
                          >
                            <div className="relative size-6 shrink-0 overflow-hidden rounded-full bg-[#e5f4ff]">
                              <Image
                                src="/assets/misc/hero-portrait-768.webp"
                                alt=""
                                width={768}
                                height={1004}
                                sizes="54px"
                                className="absolute -top-0.5 -left-5 w-13.5 max-w-none"
                              />
                            </div>
                            <div className="font-body min-w-0 text-[9px] leading-snug sm:text-[11px]">
                              <span className="font-bold text-[#1e1e1e]">
                                Susan Chapas
                              </span>
                              <p className="mt-0.5 text-[#1e1e1e]/80">{note.text}</p>
                            </div>
                          </div>
                        ))}
                        <div className="absolute top-1/2 left-1/2 z-10 flex w-[calc(100%-1rem)] max-w-2xl -translate-x-1/2 -translate-y-1/2 items-start gap-3 rounded-[1.75rem] rounded-bl-md border border-black/10 bg-white p-4 shadow-2xl shadow-black/15 transition duration-200 ease-out hover:scale-[1.02] hover:shadow-black/25 motion-reduce:transition-none motion-reduce:hover:scale-100 sm:gap-4 sm:p-5 lg:p-6">
                          <div className="relative size-12 shrink-0 overflow-hidden rounded-full bg-[#e5f4ff]">
                            <Image
                              src="/assets/misc/hero-portrait-768.webp"
                              alt=""
                              width={768}
                              height={1004}
                              sizes="108px"
                              className="absolute -top-1 -left-10 w-27 max-w-none"
                            />
                          </div>
                          <div>
                            <div className="font-body flex flex-wrap items-baseline gap-x-2">
                              <span className="font-bold text-[#1e1e1e]">
                                Susan Chapas
                              </span>
                              <span className="text-[#1e1e1e]/50">The pattern</span>
                            </div>
                            <p className="font-body mt-1 text-base leading-relaxed text-[#1e1e1e]/90 sm:text-lg lg:text-xl">
                              No app handled both speed and clarity well, and the{" "}
                              <span className="text-[#007be5]">timeline</span> was
                              consistently the interaction everyone relied on.
                            </p>
                          </div>
                        </div>
                      </div>
                    </Reveal>
                  </div>
                </section>
                <section className="bg-primary py-16 lg:py-24">
                  <div className="container mx-auto px-6 lg:px-12">
                    <Reveal className="mb-12 max-w-3xl">
                      <h2 className="font-display text-secondary mb-6 text-2xl font-bold lg:text-3xl">
                        Where the app broke down
                      </h2>
                      <p className="font-body text-secondary/80 text-lg leading-relaxed">
                        Walking the existing flows identified five specific breakdowns
                        behind the clutter. Five frictions came up repeatedly, and each
                        one indicated a clear fix.
                      </p>
                    </Reveal>

                    <InsightGrid
                      items={frictions}
                      thesis={
                        <>
                          The timeline was the answer. Anchor it across every flow and the
                          friction disappears.
                        </>
                      }
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
                      <h2 className="font-display text-secondary mb-6 text-2xl font-bold lg:text-3xl">
                        A mobile-first redesign
                      </h2>
                      <p className="font-body text-secondary/80 text-lg leading-relaxed">
                        Chimera is mobile-first. Jay checks his cameras from his phone, so
                        I designed every flow for one-handed use on a small screen, with
                        the timeline anchored where the thumb can reach it.
                      </p>
                    </Reveal>

                    <ProductTourCarousel items={productScreens} />

                    <Reveal
                      delay={0.1}
                      className="mt-12 flex flex-wrap justify-center gap-4"
                    >
                      <AccessibleButton
                        href="https://www.figma.com/proto/KsnMHMy2uUtQr5TCrGbd7M/chimera2?page-id=0%3A1&node-id=18-6566&p=f&viewport=82%2C206%2C0.4&t=J44BLoKUK87wUEBr-1&scaling=scale-down&content-scaling=fixed&starting-point-node-id=18%3A6566"
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
                      <h2 className="font-display text-secondary mb-6 text-2xl font-bold lg:text-3xl">
                        A dashboard that puts the timeline first
                      </h2>
                      <p className="font-body text-secondary/80 text-lg leading-relaxed">
                        I rebuilt the app around a single dashboard hub. Four primary
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
                      <h2 className="font-display text-secondary mb-6 text-2xl font-bold lg:text-3xl">
                        Five principles guided every screen
                      </h2>
                      <p className="font-body text-secondary/80 text-lg leading-relaxed">
                        Each principle traces back to a friction I found, so the redesign
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

      <ProjectNavFooter nextHref="/projects/wick" />
    </div>
  );
}
