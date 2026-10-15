import Image from "next/image";
import FadeIn from "@/components/FadeIn";
import BackToProjects from "@/components/BackToProjects";
import AccessibleButton from "@/components/AccessibleButton";
import ProjectHero from "@/components/ProjectHero";
import SectionTabs from "@/components/SectionTabs";
import Reveal from "@/components/Reveal";
import Tile from "@/components/Tile";
import ProjectSummary from "@/components/ProjectSummary";
import ProjectNavFooter from "@/components/ProjectNavFooter";
import HowMightWe from "@/components/HowMightWe";
import InsightGrid from "@/components/InsightGrid";
import FeatureGrid from "@/components/FeatureGrid";
import WickUserFlow from "@/components/WickUserFlow";
import WickStack from "@/components/WickStack";
import BystanderAscii from "@/components/BystanderAscii";
import { ArrowRightIcon, GitHubIcon } from "@/components/Icons";
import { pageMetadata } from "@/lib/metadata";

const projectData = {
  title: "Wick",
  subtitle:
    "Practice before the moment asks you to act: an AI bystander-intervention coach",
  description:
    "The mandatory harassment training at work and school teaches three things: how not to cause harm, how to recognize harassment, and how to report it. Almost none of it teaches what to do when you see harassment happen to someone else, so in the moment most people freeze. Wick is an AI bystander-intervention coach built to fill that need. You pick a campus scenario, rehearse stepping in through live voice or text role-play with AI characters who push back, and then get calm, specific coaching on what you said. Our team of three built it in 24 hours at GirlHacks (NJIT).",
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

export const metadata = pageMetadata({
  title: projectData.title,
  description: projectData.subtitle,
  image: "/assets/projects/wick/wick-grove.webp",
});

const outcomes = [
  {
    label: "Awards",
    value: "Best Use of ElevenLabs (MLH) and Best Beginner Hack, GirlHacks 2026",
  },
  {
    label: "Scope",
    value: "Three campus scenarios, voice and text role-play, and a custom scenario studio",
  },
  {
    label: "Deliverables",
    value: "Live app, open-source repo, Devpost submission, and a 3-minute demo",
  },
];

const atAGlance = [
  {
    label: "My role",
    value: "Product Design and Frontend Development",
  },
  { label: "Team", value: "3 people" },
  { label: "Timeline", value: "24 hours" },
  {
    label: "Methods",
    value: "Rapid prototyping, prompt iteration, contract-first APIs, accessibility",
  },
];

const trainingCovers = [
  { text: "How not to cause harm yourself", image: "/assets/projects/wick/wick-training.webp" },
  { text: "How to recognize harassment", image: "/assets/projects/wick/wick-recognize.webp" },
  { text: "How to report it", image: "/assets/projects/wick/wick-report.webp" },
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
              <>
                <section className="bg-accent-blue/5 py-16 lg:py-24">
                  <div className="container mx-auto px-6 lg:px-12">
                    <div className="grid items-center gap-12 lg:grid-cols-[3fr_2fr]">
                      <Reveal className="max-w-3xl">
                        <h2 className="font-display text-secondary mb-6 text-2xl font-bold lg:text-3xl">
                          Most people never get bystander training.
                        </h2>
                        <p className="font-body text-secondary/80 text-lg leading-relaxed">
                          The harassment training that schools and employers require is
                          written for potential perpetrators and witnesses who report.
                          Few people ever receive bystander-intervention training, and
                          fewer still get to practice it. Most people care about what
                          happens around them. They have never been taught or rehearsed
                          what to say, so they freeze. Wick exists because nobody was
                          filling that need.
                        </p>
                      </Reveal>
                      <BystanderAscii className="mx-auto max-w-md" />
                    </div>

                    <div className="mt-12 max-w-3xl">
                      <HowMightWe>give people a safe place to rehearse intervening under realistic pressure, with zero risk, until the response feels natural?</HowMightWe>
                    </div>
                  </div>
                </section>
              </>
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
                      <h2 className="font-display text-secondary mb-6 text-2xl font-bold lg:text-3xl">
                        Most training covers
                      </h2>
                      <p className="font-body text-secondary/80 text-lg leading-relaxed">
                        Mandatory training at work and school sticks to the same three
                        topics. None of them prepare a bystander to step in while
                        harassment is happening.
                      </p>
                    </Reveal>

                    <ul className="grid grid-cols-2 gap-6 sm:grid-cols-4 lg:gap-10">
                      {trainingCovers.map((item, i) => (
                        <li key={item.text}>
                          <Tile
                            delay={i * 0.08}
                            className="bg-primary border-accent-blue/10 relative flex aspect-square items-end justify-center overflow-hidden rounded-2xl border p-5 text-center"
                          >
                            <Image
                              src={item.image}
                              alt=""
                              fill
                              sizes="(min-width: 640px) 25vw, 50vw"
                              className="object-cover"
                            />
                            <div
                              aria-hidden="true"
                              className="from-primary via-primary/60 absolute inset-0 bg-gradient-to-t to-transparent"
                            />
                            <p className="font-display text-secondary relative text-lg leading-snug font-bold lg:text-xl">
                              {item.text}
                            </p>
                          </Tile>
                        </li>
                      ))}
                      <li>
                        <Tile
                          delay={trainingCovers.length * 0.08}
                          className="border-accent-lime/50 flex aspect-square flex-col items-center justify-center rounded-2xl border-2 p-5 text-center"
                        >
                          <h3 className="text-accent-lime font-body mb-2 text-xs tracking-widest uppercase">
                            What Wick adds
                          </h3>
                          <p className="font-display text-secondary text-lg leading-snug font-bold lg:text-xl">
                            What to do when you see it happen to someone else
                          </p>
                        </Tile>
                      </li>
                    </ul>
                  </div>
                </section>
                <section className="bg-accent-blue/5 py-16 lg:py-24">
                  <div className="container mx-auto px-6 lg:px-12">
                    <Reveal className="mb-12 max-w-3xl">
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
                <section className="bg-primary py-16 lg:py-24">
                  <div className="container mx-auto px-6 lg:px-12">
                    <Reveal className="mb-12 max-w-3xl">
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
                  </div>
                </section>
                <section className="bg-accent-blue/5 py-16 lg:py-24">
                  <div className="container mx-auto px-6 lg:px-12">
                    <Reveal className="mb-12 max-w-3xl">
                      <h2 className="font-display text-secondary mb-6 text-2xl font-bold lg:text-3xl">
                        Every path through Wick
                      </h2>
                      <p className="font-body text-secondary/80 text-lg leading-relaxed">
                        New visitors pass through Welcome, Access, and Awareness before they
                        reach the Grove. Every role-play starts with a content note, and
                        users can step out of the Clearing at any point.
                      </p>
                    </Reveal>

                    <Reveal delay={0.1}>
                      <WickUserFlow />
                    </Reveal>
                  </div>
                </section>
                <section className="bg-primary py-16 lg:py-24">
                  <div className="container mx-auto px-6 lg:px-12">
                    <Reveal className="mb-12 max-w-3xl">
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

                    <Reveal delay={0.1}>
                      <WickStack />
                    </Reveal>
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
                    <Reveal className="mb-8">
                      <h3 className="font-display text-secondary text-xl font-bold lg:text-2xl">
                        What we shipped
                      </h3>
                    </Reveal>
                    <FeatureGrid features={shipped} columns={3} />
                  </div>
                </section>
                <section className="bg-primary py-16 lg:py-24">
                  <div className="container mx-auto px-6 lg:px-12">
                    <Reveal className="mb-12 max-w-3xl">
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
