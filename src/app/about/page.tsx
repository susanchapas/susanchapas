"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { ChevronDown, MapPin } from "lucide-react";
import ArtImage from "@/components/ArtImage";
import AboutStudioWall from "@/components/AboutStudioWall";
import AccessibleButton from "@/components/AccessibleButton";

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

export default function AboutPage() {
  return (
    <div className="bg-primary relative overflow-hidden">
      <div className="relative z-10 lg:pl-20">
        <section className="relative flex min-h-screen flex-col justify-center py-12 lg:py-28">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="container mx-auto max-w-7xl px-6 lg:px-12"
          >
            <span className="text-accent-lime font-body mb-4 inline-flex items-center gap-2 text-sm tracking-widest uppercase">
              <MapPin className="h-4 w-4" /> Jersey City, NJ
            </span>
            <h1 className="font-display text-secondary max-w-4xl text-4xl font-bold lg:text-5xl xl:text-6xl">
              I&apos;m a designer who refuses to
              <br />
              <span className="text-gradient">stop at the mockup.</span>
            </h1>
            <p className="font-body text-secondary/70 mt-6 max-w-xl text-lg">
              Susan Chapas — UX strategist, front-end developer, and award-winning artist. I figure
              out what people actually need, design it to work for everyone, then build and ship it
              myself.
            </p>
            <div className="mt-7 flex flex-wrap gap-4">
              <AccessibleButton href="/contact">Let&apos;s Connect</AccessibleButton>
              <AccessibleButton href="/Susan_Chapas_Resume.pdf" variant="outline" external>
                Download Resume
              </AccessibleButton>
            </div>
          </motion.div>

          <div className="container mx-auto mt-16 max-w-7xl px-6 lg:px-12">
            <AboutStudioWall />
          </div>
        </section>

        <section className="relative py-6 lg:py-12" aria-labelledby="experience-heading">
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

        <section className="relative py-6 lg:py-12" aria-labelledby="art-heading">
          <div className="container mx-auto max-w-6xl px-6 lg:px-12">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="mb-16 text-center"
            >
              <span className="text-accent-lime font-body mb-4 block text-sm tracking-widest uppercase">
                Off the clock
              </span>
              <h2
                id="art-heading"
                className="font-display text-secondary mb-4 text-3xl font-bold lg:text-4xl"
              >
                I paint to feel, not to function
              </h2>
              <p className="font-body text-secondary/70 mx-auto max-w-2xl text-lg">
                The same instinct that makes me care whether an interface feels right shows up on the
                canvas. &quot;Mindless Mirth&quot; was recognized for its exploration of human emotion
                through abstraction.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative mx-auto max-w-3xl"
            >
              <div className="border-accent-blue/20 aspect-[4/3] overflow-hidden rounded-2xl border">
                <ArtImage
                  src="/gallery/Mindless-Mirth-final.webp"
                  alt="Mindless Mirth - Award-winning artwork by Susan Chapas"
                  containerClassName="h-full w-full"
                />
              </div>
              <div className="mt-6 text-center">
                <h3 className="font-display text-secondary mb-2 text-xl font-bold">Mindless Mirth</h3>
                <p className="text-accent-clay font-body mb-6">Award-Winning Piece</p>
                <Link
                  href="/gallery"
                  className="text-accent-lime font-display inline-flex items-center gap-2 font-semibold transition-all hover:gap-4"
                >
                  View Full Gallery
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </div>
  );
}
