"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

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

export default function CurrentExperience() {
  return (
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
  );
}
