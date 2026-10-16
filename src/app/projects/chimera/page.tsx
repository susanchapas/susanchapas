import Image from "next/image";
import BackToProjects from "@/components/BackToProjects";
import FadeIn from "@/components/FadeIn";
import AccessibleButton from "@/components/AccessibleButton";
import ProjectHero from "@/components/ProjectHero";
import SectionTabs from "@/components/SectionTabs";
import Reveal from "@/components/Reveal";
import ImageSlot from "@/components/ImageSlot";
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
                        We benchmarked four leading consumer camera apps, then ran a
                        heuristic evaluation of Jay&apos;s app against established
                        usability principles. We mapped every core flow, live viewing,
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
                        different way. Studying their choices showed us what users already
                        expect from a camera app and where every one of them leaves room
                        to do better.
                      </p>
                    </Reveal>

                    <Reveal delay={0.05} className="mb-8">
                      <ImageSlot
                        src="/assets/projects/chimera/chimera-comp-analysis.webp"
                        alt="Competitive analysis audit board comparing interface flows across Ring, Arlo, and Eufy"
                        ratio="aspect-[16/9]"
                        label="Competitor apps studied"
                        sizes="(min-width: 1024px) 75vw, 100vw"
                      />
                    </Reveal>

                    <Reveal delay={0.08}>
                      <div className="border-accent-blue/15 overflow-x-auto rounded-2xl border bg-[#06142b]">
                        <table className="w-full min-w-225 border-collapse text-left">
                          <caption className="sr-only">
                            Competitive comparison of consumer home-security camera apps
                          </caption>
                          <thead className="bg-primary">
                            <tr className="border-accent-blue/15 border-b">
                              <th
                                scope="col"
                                className="font-body text-secondary/60 bg-primary sticky left-0 z-20 w-20 px-3 py-3 text-xs font-medium tracking-widest uppercase lg:static lg:w-36 lg:px-5 lg:py-4"
                              >
                                App
                              </th>
                              <th
                                scope="col"
                                className="font-body text-secondary/60 bg-primary w-48 px-5 py-3 text-xs font-medium tracking-widest uppercase lg:py-4"
                              >
                                Approach
                              </th>
                              <th
                                scope="col"
                                className="font-body text-secondary/60 bg-primary min-w-68 px-5 py-3 text-xs font-medium tracking-widest uppercase lg:py-4"
                              >
                                What works
                              </th>
                              <th
                                scope="col"
                                className="font-body text-secondary/60 bg-primary min-w-68 px-5 py-3 text-xs font-medium tracking-widest uppercase lg:py-4"
                              >
                                Trade-off
                              </th>
                              <th
                                scope="col"
                                className="font-body text-secondary/60 bg-primary w-44 px-5 py-3 text-xs font-medium tracking-widest uppercase lg:py-4"
                              >
                                Best for
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {competitors.map((c) => (
                              <tr
                                key={c.name}
                                className="border-accent-blue/10 hover:bg-accent-blue/5 border-b last:border-b-0"
                              >
                                <th
                                  scope="row"
                                  className="font-display text-accent-blue sticky left-0 z-10 w-20 bg-[#06142b] px-3 py-3 text-base font-bold lg:static lg:w-36 lg:px-5 lg:py-5"
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
                                <td className="font-body text-secondary/65 px-5 py-3 text-sm leading-relaxed lg:py-5">
                                  {c.style}
                                </td>
                                <td className="font-body text-secondary/80 px-5 py-3 text-sm leading-relaxed lg:py-5">
                                  {c.strengths}
                                </td>
                                <td className="font-body text-secondary/80 px-5 py-3 text-sm leading-relaxed lg:py-5">
                                  {c.weaknesses}
                                </td>
                                <td className="font-body text-secondary px-5 py-3 text-sm font-medium whitespace-nowrap lg:py-5">
                                  {c.bestFor}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      <p className="font-body text-secondary/45 mt-3 text-xs lg:hidden">
                        Scroll horizontally to compare all criteria.
                      </p>
                    </Reveal>

                    <Reveal
                      delay={0.1}
                      className="border-accent-blue/10 relative mt-10 overflow-hidden rounded-2xl border bg-[radial-gradient(rgba(187,205,243,0.18)_1px,transparent_1px)] bg-size-[18px_18px] px-4 pt-6 pb-28 sm:px-6 sm:pt-8 sm:pb-20 lg:px-12 lg:pt-10"
                    >
                      <div className="border-accent-blue/15 relative z-10 flex max-w-2xl items-start gap-3 rounded-[1.75rem] rounded-bl-md border bg-[#10264a] p-4 shadow-2xl shadow-black/40 sm:ml-[36%] sm:gap-4 sm:p-5 md:ml-[26%] lg:p-6">
                        <div className="bg-accent-blue/25 relative size-12 shrink-0 overflow-hidden rounded-full">
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
                            <span className="text-secondary font-bold">Susan Chapas</span>
                            <span className="text-secondary/50">The pattern</span>
                          </div>
                          <p className="font-body text-secondary/90 mt-1 text-base leading-relaxed sm:text-lg lg:text-xl">
                            No app handled both speed and clarity well, and the{" "}
                            <span className="text-accent-lime">timeline</span> was
                            consistently the interaction everyone relied on.
                          </p>
                        </div>
                      </div>
                      <div className="absolute right-[45%] -bottom-20 w-72 sm:right-[60%] sm:-bottom-44 sm:w-xl md:right-[70%]">
                        <span className="font-body absolute right-0 bottom-full mb-1.5 flex items-center gap-1 text-xs text-[#9747FF]">
                          <svg
                            viewBox="0 0 12 12"
                            className="size-3 fill-current"
                            aria-hidden
                          >
                            <path d="M6 0l2 2-2 2-2-2zM2 4l2 2-2 2-2-2zM10 4l2 2-2 2-2-2zM6 8l2 2-2 2-2-2z" />
                          </svg>
                          Dashboard / Original
                        </span>
                        <Image
                          src="/assets/projects/chimera/chimera%20og%20dashboard%20blurred.webp"
                          alt=""
                          width={5063}
                          height={2413}
                          sizes="(min-width: 640px) 576px, 288px"
                          className="w-full border-t border-r border-[#9747FF] shadow-xl shadow-black/40"
                        />
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
                        we designed every flow for one-handed use on a small screen, with
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

      <ProjectNavFooter nextHref="/projects/wick" />
    </div>
  );
}
