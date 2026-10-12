import FadeIn from "@/components/FadeIn";
import BackToProjects from "@/components/BackToProjects";
import AccessibleButton from "@/components/AccessibleButton";
import ProjectHero from "@/components/ProjectHero";
import SectionTabs from "@/components/SectionTabs";
import Reveal from "@/components/Reveal";
import Tile from "@/components/Tile";
import Eyebrow from "@/components/Eyebrow";
import ProjectOutcomes from "@/components/ProjectOutcomes";
import ProjectNavFooter from "@/components/ProjectNavFooter";
import HowMightWe from "@/components/HowMightWe";
import ResearchStats from "@/components/ResearchStats";
import InsightGrid from "@/components/InsightGrid";
import FeatureGrid from "@/components/FeatureGrid";
import { ArrowRightIcon, GitHubIcon } from "@/components/Icons";

const projectData = {
  title: "Wick",
  subtitle:
    "Practice before the moment asks you to act: an AI bystander-intervention coach",
  description:
    "Most harassment training covers how to recognize harassment, how to report it, and how to avoid doing it yourself. It does not teach what to do when you see it happen to someone else, so in the moment most people freeze. Wick is an AI bystander-intervention coach. You pick a campus scenario, rehearse stepping in through live voice or text role-play with AI characters who push back, and then get calm, specific coaching on what you said. Our team of three built it in 24 hours at GirlHacks (NJIT).",
  heroImage: "/assets/projects/wick/wick-hero-placeholder.svg",
  tags: [
    "UX Design",
    "AI Interaction Design",
    "Frontend Development",
    "Accessibility",
    "Rapid Prototyping",
  ],
  year: "2026",
  role: "Product Designer & Frontend Developer",
  platform: "Web (React)",
};

const outcomes = [
  {
    label: "Awards",
    value: "Best Use of ElevenLabs (MLH) and Best Beginner Hack, GirlHacks 2026",
  },
  {
    label: "Validation",
    value: "Live at wick.courses. Anyone can start a role-play in under a minute, no sign-in",
  },
  {
    label: "Deliverables",
    value: "Live app, open-source repo, Devpost submission, and a 3-minute demo",
  },
];

const atAGlance = [
  {
    label: "My role",
    value:
      "Product design & frontend development. Led UX, the Enchanted Grove brand system, and the React frontend",
  },
  { label: "Team", value: "3 people: Neta (PM, brand & content), Antony (backend & AI)" },
  { label: "Timeline", value: "24 hours" },
  {
    label: "Methods",
    value: "Rapid prototyping, prompt iteration, contract-first API design, accessibility-first design",
  },
];

const trainingCovers = [
  "How to recognize harassment",
  "How to report it",
  "How to avoid doing it yourself",
];

const fiveDs = [
  {
    name: "Direct",
    body: "Speak up in the moment, to the person causing harm or the person being targeted.",
  },
  {
    name: "Distract",
    body: "Interrupt with an unrelated question or action that breaks up the situation.",
  },
  {
    name: "Delegate",
    body: "Bring in someone with more authority or context, like a bartender, an RA, or a friend.",
  },
  {
    name: "Delay",
    body: "Check in with the person who was targeted once the moment has passed.",
  },
  {
    name: "Document",
    body: "Record what happened so the person targeted has it if they need it later.",
  },
];

const decisions = [
  {
    title: "Trust comes first.",
    body: "The subject is sensitive, so users need to feel in control before they practice. A “What you’re stepping into” screen explains that the AI characters will say pressuring things on purpose. Each trail has a content note, users can step out at any time with nothing saved, and voice audio is deleted after 24 hours.",
  },
  {
    title: "The voice loop.",
    body: "ElevenLabs Scribe v2 transcribes what the user says, and Flash v2.5 gives each AI character its own expressive voice. Replies arrive in about two seconds, and a text fallback always works if voice fails. This loop won Best Use of ElevenLabs.",
  },
  {
    title: "Feedback names the strategy.",
    body: "Each debrief names the strategy the user chose and points to a line from their own session: “You used Delegate by telling the bartender. Next time, stay with Priya until her friend arrives.”",
  },
  {
    title: "Accessible from the first commit.",
    body: "Captions are on by default. Wick also supports reduced motion, a type-instead mode, a fallback when the mic is blocked, and keyboard controls for every core action.",
  },
  {
    title: "A restrained brand.",
    body: "The Enchanted Grove is a dark-forest shell lit by lanterns. Locations, names, dialogue, and scoring stay realistic. The streak system runs on one line: “keep your wick lit.”",
  },
];

const shortcuts = [
  { key: "Space", action: "Speak" },
  { key: "P", action: "Pause" },
  { key: "T", action: "Type instead" },
  { key: "Esc", action: "Step out" },
];

const stack = [
  { label: "Frontend", value: "React 19, TypeScript, and Vite, hosted on GitHub Pages" },
  { label: "Backend", value: "Node.js 22 on Azure Functions" },
  { label: "Role-play", value: "Google Gemini for character replies, coaching, and custom scenarios" },
  { label: "Voice", value: "ElevenLabs Scribe v2 (speech-to-text) and Flash v2.5 (character voices)" },
  { label: "Storage", value: "Azure Table Storage for sessions" },
];

const resultStats = [
  { value: "2", label: "Awards won from the 3 tracks we entered" },
  { value: "<1 min", label: "From opening wick.courses to a live role-play, with no sign-in" },
  { value: "~2 s", label: "For an AI character to reply out loud" },
];

const shipped = [
  {
    name: "Three scenarios",
    body: "Complete campus scenarios, each with a content note and the Five Ds strategies that fit it.",
  },
  {
    name: "Custom scenario studio",
    body: "Generates a new scenario from a user’s own description of a situation they want to practice.",
  },
  {
    name: "Coaching debrief",
    body: "Grounded in the user’s session transcript and mapped to the Five Ds.",
  },
  {
    name: "Difficulty settings",
    body: "Gentle, Realistic, and Intense, so users decide how much pressure the characters apply.",
  },
];

const reflections = [
  {
    title: "Proudest of",
    body: "The trust design. Every decision that told users they were in control did more for the experience than any technical feature.",
  },
  {
    title: "Hardest problem",
    body: "Prompt boundary-setting. Writing prompts that keep a character pressuring but safe took more iteration than any API integration.",
  },
];

export default function WickProject() {
  return (
    <div className="">
      <ProjectHero src={projectData.heroImage} alt="">
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
          <div className="space-y-10 lg:col-span-2">
            <Reveal>
              <h2 className="font-display text-secondary mb-6 text-2xl font-bold lg:text-3xl">
                Overview
              </h2>
              <p className="font-body text-secondary/80 text-lg leading-relaxed">
                {projectData.description}
              </p>
            </Reveal>

            <ProjectOutcomes items={outcomes} />
          </div>

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
                        Bystander-intervention training already exists. Most of it is
                        lectures and slide decks that students sit through once and
                        forget. Pilots train in simulators and athletes run drills before
                        games, while students facing the hardest social moments of college
                        get a one-hour video. Most people care about what is happening
                        around them. What they lack is practice: they have never rehearsed
                        what to say, so they freeze.
                      </p>
                    </Reveal>

                    <Tile className="bg-primary border-accent-blue/10 rounded-2xl border p-7 lg:p-8">
                      <h3 className="text-accent-clay font-body mb-4 text-xs tracking-widest uppercase">
                        Most training covers
                      </h3>
                      <ol className="mb-6 space-y-3">
                        {trainingCovers.map((item, i) => (
                          <li key={item} className="flex items-center gap-4">
                            <span
                              aria-hidden="true"
                              className="bg-accent-blue/10 text-accent-blue font-display flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold"
                            >
                              {i + 1}
                            </span>
                            <span className="font-body text-secondary/80">{item}</span>
                          </li>
                        ))}
                      </ol>
                      <div className="border-accent-lime/50 rounded-xl border-2 p-5">
                        <h3 className="text-accent-lime font-body mb-2 text-xs tracking-widest uppercase">
                          What Wick adds
                        </h3>
                        <p className="font-display text-secondary text-lg leading-snug font-bold">
                          What to do when you see it happen to someone else
                        </p>
                      </div>
                    </Tile>
                  </div>

                  <HowMightWe>give people a safe place to rehearse intervening under realistic pressure, with zero risk, until the response feels natural?</HowMightWe>
                </div>
              </section>
            ),
          },
          {
            id: "process",
            label: "Process",
            content: (
              <>
                <section className="bg-primary py-16 lg:py-24">
                  <div className="container mx-auto px-6 lg:px-12">
                    <Reveal className="mb-12 max-w-3xl">
                      <Eyebrow>The Framework</Eyebrow>
                      <h2 className="font-display text-secondary mb-6 text-2xl font-bold lg:text-3xl">
                        Built on the Five Ds of bystander intervention
                      </h2>
                      <p className="font-body text-secondary/80 text-lg leading-relaxed">
                        We anchored the design on an established framework. The in-app
                        Field Guide teaches the Five Ds, every trail lists the strategies
                        that fit it, and every debrief names the strategy the user chose.
                      </p>
                    </Reveal>

                    <FeatureGrid features={fiveDs} />
                  </div>
                </section>
                <section className="bg-accent-blue/5 py-16 lg:py-24">
                  <div className="container mx-auto px-6 lg:px-12">
                    <Reveal className="mb-12 max-w-3xl">
                      <Eyebrow>Design Decisions</Eyebrow>
                      <h2 className="font-display text-secondary text-2xl font-bold lg:text-3xl">
                        Five decisions that defined the experience
                      </h2>
                    </Reveal>

                    <InsightGrid
                      items={decisions}
                      thesis={
                        <>
                          With a sensitive subject, users need to feel in{" "}
                          <span className="text-accent-lime">control</span> before they
                          can practice.
                        </>
                      }
                    />

                    <Reveal delay={0.1} className="mt-8">
                      <div className="bg-primary border-accent-blue/10 rounded-2xl border p-6 lg:p-8">
                        <h3 className="font-body text-secondary/50 mb-5 text-xs tracking-widest uppercase">
                          Keyboard controls
                        </h3>
                        <dl className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                          {shortcuts.map((s) => (
                            <div key={s.key} className="flex items-center gap-3">
                              <dt>
                                <kbd className="bg-accent-blue/10 border-accent-blue/20 text-accent-blue font-display inline-flex min-w-11 justify-center rounded-md border px-2.5 py-1.5 text-sm font-bold">
                                  {s.key}
                                </kbd>
                              </dt>
                              <dd className="font-body text-secondary/80 text-sm">{s.action}</dd>
                            </div>
                          ))}
                        </dl>
                      </div>
                    </Reveal>
                  </div>
                </section>
                <section className="bg-primary py-16 lg:py-24">
                  <div className="container mx-auto grid gap-12 px-6 lg:grid-cols-2 lg:px-12">
                    <Reveal>
                      <Eyebrow>How We Worked</Eyebrow>
                      <h2 className="font-display text-secondary mb-6 text-2xl font-bold lg:text-3xl">
                        Contract-first collaboration
                      </h2>
                      <p className="font-body text-secondary/80 text-lg leading-relaxed">
                        We had 24 hours, and the rules allowed no work before the event.
                        Before anyone wrote code, we agreed on the request and response
                        format for every API call. Frontend and backend then built in
                        parallel, and we finished without a single merge conflict.
                      </p>
                    </Reveal>

                    <Tile
                      delay={0.1}
                      className="bg-accent-blue/5 border-accent-blue/10 rounded-2xl border p-6"
                    >
                      <h3 className="font-display mb-5 text-sm tracking-widest uppercase" style={{ color: 'var(--accent-lime)' }}>
                        Live stack
                      </h3>
                      <dl className="space-y-4">
                        {stack.map((item) => (
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
              </>
            ),
          },
          {
            id: "results",
            label: "Results",
            content: (
              <>
                <section className="bg-accent-blue/5 py-16 lg:py-24">
                  <div className="container mx-auto px-6 lg:px-12">
                    <Reveal className="mb-12 max-w-3xl">
                      <Eyebrow>Results</Eyebrow>
                      <h2 className="font-display text-secondary mb-6 text-2xl font-bold lg:text-3xl">
                        Two awards and a live app by morning
                      </h2>
                      <p className="font-body text-secondary/80 text-lg leading-relaxed">
                        Wick was live at wick.courses by the morning of judging. Anyone
                        can open it and start a role-play without creating an account.
                      </p>
                    </Reveal>

                    <ResearchStats stats={resultStats} />

                    <Reveal delay={0.05} className="mt-16 mb-8">
                      <h3 className="font-display text-secondary text-xl font-bold lg:text-2xl">
                        What we shipped
                      </h3>
                    </Reveal>
                    <FeatureGrid features={shipped} columns={2} />
                  </div>
                </section>
                <section className="bg-primary py-16 lg:py-24">
                  <div className="container mx-auto px-6 lg:px-12">
                    <Reveal className="mb-12 max-w-3xl">
                      <Eyebrow>Reflection</Eyebrow>
                      <h2 className="font-display text-secondary text-2xl font-bold lg:text-3xl">
                        What I took away
                      </h2>
                    </Reveal>

                    <div className="grid gap-6 md:grid-cols-2">
                      {reflections.map((item, i) => (
                        <Tile
                          key={item.title}
                          delay={i * 0.08}
                          className="group bg-accent-blue/5 border-accent-blue/10 hover:border-accent-lime/40 h-full rounded-2xl border p-7 transition-colors"
                        >
                          <h3 className="font-display text-accent-blue group-hover:text-accent-lime mb-3 font-bold transition-colors">
                            {item.title}
                          </h3>
                          <p className="font-body text-secondary/70 leading-relaxed">
                            {item.body}
                          </p>
                        </Tile>
                      ))}
                    </div>

                    <Reveal
                      delay={0.1}
                      className="mt-12 flex flex-wrap justify-center gap-4"
                    >
                      <AccessibleButton href="https://wick.courses" external variant="primary">
                        Try Wick
                        <ArrowRightIcon className="h-4 w-4" />
                      </AccessibleButton>
                      <AccessibleButton
                        href="https://github.com/susanchapas/wick-lit"
                        external
                        variant="outline"
                      >
                        <GitHubIcon className="h-4 w-4" />
                        View Repo
                      </AccessibleButton>
                      <AccessibleButton
                        href="https://devpost.com/software/wick-lwx1dc"
                        external
                        variant="outline"
                      >
                        View on Devpost
                      </AccessibleButton>
                    </Reveal>
                  </div>
                </section>
              </>
            ),
          },
        ]}
      />

      <ProjectNavFooter nextHref="/projects/blv-research" />
    </div>
  );
}
