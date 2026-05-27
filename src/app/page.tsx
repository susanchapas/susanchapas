"use client";

import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import AboutStudioWall from "@/components/AboutStudioWall";
import AccessibleButton from "@/components/AccessibleButton";
import SelectedWork from "@/components/SelectedWork";

const ArtScroller = dynamic(() => import("@/components/ArtScroller"), {
  ssr: false,
  loading: () => <div className="h-[40rem]" aria-hidden="true" />,
});

type Role = {
  id: string;
  year: string;
  role: string;
  company: string;
  description: string;
};

const currentRoles: Role[] = [
  {
    id: "njit",
    year: "2026 — Present",
    role: "Research Assistant — UX in Accessibility",
    company: "New Jersey Institute of Technology",
    description:
      "Researching AI-assisted accessibility — efficacy of Meta Glasses for visually impaired users, and caption improvements for content creators with NSI.",
  },
  {
    id: "spring-bank",
    year: "2025 — Present",
    role: "Marketing & UX Strategist",
    company: "Spring Bank",
    description:
      "Leading website redesign, copywriting, translations, and UX improvements informed by user flow analysis and staff/customer feedback. CRM administrator and marketing operations lead, partnering with leadership to translate priorities into campaigns, product launches, and community initiatives.",
  },
  {
    id: "aec",
    year: "2025 — Present",
    role: "Marketing & Business Development Manager",
    company: "All Executive Clean",
    description:
      "Rebuilt the brand identity and the marketing it ran on — website audit, capability statements, business cards, and portfolio materials.",
  },
  {
    id: "schematic",
    year: "2024 — Present",
    role: "Founder & Director",
    company: "Schematic Marketing",
    description:
      "Founded an à la carte marketing agency serving small businesses and nonprofits across the tri-state area. Consulting on brand positioning, go-to-market planning, and growth — tailored to each client's needs and budget.",
  },
];

const previousSpringRole: Role = {
  id: "spring-bank-coordinator",
  year: "2022 — 2024",
  role: "Marketing Coordinator",
  company: "Spring Bank",
  description:
    "Organized activation events, workshops, and trade shows — with a focus on financial wellness for youth through the bank's nonprofit partners. Produced accessible content for social, blog, and email, and designed sales decks, regulator presentations, flyers, and in-branch materials.",
};

function RoleCard({
  role,
  index,
  previousRole,
}: {
  role: Role;
  index: number;
  previousRole?: Role;
}) {
  const [expanded, setExpanded] = useState(false);
  const panelId = `${role.id}-previous`;

  return (
    <motion.article
      id={`role-${role.id}`}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="bg-black/25 flex flex-col rounded-xl p-6 backdrop-blur-sm lg:p-8"
    >
      <span className="text-accent-lime font-display text-sm font-semibold tracking-widest tabular-nums">
        {role.year}
      </span>
      <h3 className="font-display text-secondary mt-1 mb-1 text-xl font-bold lg:text-2xl">
        {role.role}
      </h3>
      <p className="text-accent-blue font-body mb-3 font-medium">{role.company}</p>
      <p className="text-secondary/70 font-body flex-1">{role.description}</p>
      {previousRole && (
        <div className="mt-6">
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            aria-expanded={expanded}
            aria-controls={panelId}
            className="text-accent-blue/80 hover:text-accent-blue focus-visible:ring-accent-blue focus-visible:ring-offset-primary font-display -mx-1 inline-flex items-center gap-1.5 rounded px-1 text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
          >
            {expanded ? "Hide previous role" : "Previous role"}
            <ChevronDown
              className={`h-4 w-4 transition-transform ${expanded ? "rotate-180" : ""}`}
              aria-hidden="true"
            />
          </button>
          <AnimatePresence initial={false}>
            {expanded && (
              <motion.div
                key="panel"
                id={panelId}
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="overflow-hidden"
              >
                <div className="border-accent-blue/25 mt-5 border-t pt-5">
                  <span className="text-accent-lime font-display text-sm font-semibold tracking-widest tabular-nums">
                    {previousRole.year}
                  </span>
                  <h4 className="font-display text-secondary mt-1 mb-2 text-lg font-bold">
                    {previousRole.role}
                  </h4>
                  <p className="text-secondary/70 font-body">{previousRole.description}</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </motion.article>
  );
}

function CurrentRoles() {
  return (
    <div className="grid grid-cols-1 items-start gap-6 md:grid-cols-2 md:items-stretch lg:gap-8">
      {currentRoles.map((role, index) => (
        <RoleCard
          key={role.id}
          role={role}
          index={index}
          previousRole={role.id === "spring-bank" ? previousSpringRole : undefined}
        />
      ))}
    </div>
  );
}

export default function Home() {
  const { scrollY } = useScroll();
  const [scrollHintDismissed, setScrollHintDismissed] = useState(false);
  useMotionValueEvent(scrollY, "change", (value) => {
    if (value > 160 && !scrollHintDismissed) {
      setScrollHintDismissed(true);
    }
  });

  return (
    <div className="bg-primary relative overflow-hidden">
      <div className="relative z-10 lg:pl-20">
        <section className="relative flex min-h-screen flex-col justify-center overflow-hidden pt-24 pb-12 lg:pt-40 lg:pb-28">
          <div className="gradient-mesh absolute inset-0">
            <div
              className="bg-accent-lime/5 animate-float-slow absolute top-1/4 left-1/4 h-96 w-96 rounded-full blur-3xl"
              style={{ transform: "translateZ(0)" }}
            />
            <div
              className="bg-accent-blue/10 animate-float-slow-reverse absolute right-1/4 bottom-1/4 h-80 w-80 rounded-full blur-3xl"
              style={{ transform: "translateZ(0)", animationDelay: "-5s" }}
            />
          </div>
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `linear-gradient(rgba(244, 244, 245, 0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(244, 244, 245, 0.5) 1px, transparent 1px)`,
              backgroundSize: "60px 60px",
            }}
            aria-hidden="true"
          />
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 container mx-auto max-w-7xl px-6 lg:px-12"
          >
            <div
              className="pointer-events-none absolute inset-0 flex items-center justify-center xl:hidden"
              aria-hidden="true"
            >
              <Image
                src="/assets/misc/susan-hero.png"
                alt=""
                width={1630}
                height={2005}
                priority
                sizes="90vw"
                className="h-auto w-[min(95vw,32rem)] opacity-[0.12] select-none"
                draggable={false}
              />
            </div>
            <div className="relative grid items-center gap-10 xl:grid-cols-[auto_minmax(0,1fr)] xl:gap-16">
              <div>
                <span className="text-accent-lime font-body mb-6 inline-flex items-center gap-2 text-sm tracking-widest uppercase lg:text-base">
                  UX Strategist &amp; Marketing Professional
                </span>
                <h1 className="font-display text-secondary mb-6 text-4xl leading-[1.1] font-bold sm:text-5xl md:text-6xl lg:text-7xl">
                  <span className="whitespace-nowrap">I&apos;m a designer</span>
                  <br />
                  <span className="whitespace-nowrap">who refuses to</span>
                  <br />
                  <span className="text-gradient whitespace-nowrap">stop at the</span>{" "}
                  <span className="text-gradient whitespace-nowrap">mockup.</span>
                </h1>
                <p className="font-body text-secondary/70 mb-8 max-w-2xl text-lg lg:text-xl">
                  Susan Chapas — UX strategist, front-end developer, and award-winning artist. I
                  figure out what people actually need, design it to work for everyone, then build
                  and ship it myself.
                </p>
                <div className="flex flex-wrap gap-4">
                  <AccessibleButton href="/projects" size="lg">
                    View My Work
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      />
                    </svg>
                  </AccessibleButton>
                  <AccessibleButton href="/contact" variant="outline" size="lg">
                    Get in Touch
                  </AccessibleButton>
                </div>
              </div>
              <div className="hidden justify-self-end self-end xl:block">
                <Image
                  src="/assets/misc/susan-hero.png"
                  alt=""
                  width={1630}
                  height={2005}
                  priority
                  sizes="22rem"
                  className="h-auto w-full max-w-[22rem] select-none"
                  draggable={false}
                />
              </div>
            </div>
          </motion.div>

          <div className="relative z-10 container mx-auto mt-24 max-w-7xl px-6 lg:px-12 lg:mt-32">
            <AboutStudioWall />
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: scrollHintDismissed ? 0 : 1 }}
            transition={{
              duration: scrollHintDismissed ? 0.4 : 0.8,
              delay: scrollHintDismissed ? 0 : 1.6,
              ease: [0.22, 1, 0.36, 1],
            }}
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-[calc(100vh-5.5rem)] hidden -translate-x-1/2 flex-col items-center gap-3 landscape:flex"
          >
            <span className="text-accent-lime font-display text-xs font-semibold tracking-[0.35em] uppercase">
              Scroll
            </span>
            <span className="border-accent-lime/60 bg-accent-lime/10 flex h-11 w-11 items-center justify-center rounded-full border-2 backdrop-blur-sm">
              <ChevronDown
                className="text-accent-lime animate-bounce-slow h-6 w-6"
                strokeWidth={2.5}
                aria-hidden="true"
              />
            </span>
          </motion.div>
        </section>

        <SelectedWork />

        <section
          className="bg-accent-blue/5 relative py-16 lg:py-24"
          aria-labelledby="experience-heading"
        >
          <div className="container mx-auto max-w-5xl px-6 lg:px-12">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="mb-12"
            >
              <span className="text-accent-lime font-body mb-4 block text-sm tracking-widest uppercase">
                Currently
              </span>
              <h2
                id="experience-heading"
                className="font-display text-secondary text-3xl font-bold lg:text-4xl"
              >
                Where I am now
              </h2>
            </motion.div>

            <CurrentRoles />
          </div>
        </section>

        <ArtScroller />
      </div>
    </div>
  );
}
