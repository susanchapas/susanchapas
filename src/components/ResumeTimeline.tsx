"use client";

import { useEffect, useId, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  BadgeCheck,
  ChevronDown,
  Code2,
  Download,
  ExternalLink,
  Palette,
  Search,
  Trophy,
  type LucideIcon,
} from "lucide-react";
import Image from "next/image";
import FadeIn from "@/components/FadeIn";
import Eyebrow from "@/components/Eyebrow";

interface TimelineEntry {
  id: string;
  type: "experience" | "education" | "award";
  date: string;
  startYear: number;
  title: string;
  org: string;
  logo?: string;
  location?: string;
  bullets: string[];
  badges?: string[];
  link?: {
    href: string;
    label: string;
  };
}

interface Certification {
  name: string;
  credentialUrl: string;
}

const experience: TimelineEntry[] = [
  {
    id: "njit-ux",
    type: "experience",
    date: "Feb 2026 – Present",
    startYear: 2026,
    title: "User Experience Researcher",
    org: "New Jersey Institute of Technology",
    logo: "/assets/resume/2education-experience-logos/2njit-logo.png",
    location: "Newark, NJ",
    bullets: [
      "Ongoing research: Efficacy of AI-assistance for visually impaired people (Meta Glasses)",
      "Investigation via user interviews, observation studies, and heuristic evaluations with qualitative analysis",
    ],
  },
  {
    id: "spring-strategist",
    type: "experience",
    date: "Oct 2025 – Aug 2026",
    startYear: 2025,
    title: "Marketing & UX Strategist",
    org: "Spring Bank",
    logo: "/assets/resume/2education-experience-logos/2spring-bank-logo.png",
    location: "Bronx, NY",
    bullets: [
      "Led website redesign using user-flow analysis and customer feedback",
      "Managed content, copywriting, translations, and accessibility requirements across teams",
      "Designed webpages, presentations, and signage with attention to accessibility and brand consistency",
      "Managed CRM and marketing operations, supporting workflow improvements and event pipelines",
      "Organized workshops and community programs for nonprofits, community leaders, and students",
    ],
  },
  {
    id: "spring-coordinator",
    type: "experience",
    date: "Mar 2022 – Dec 2024",
    startYear: 2022,
    title: "Marketing Coordinator",
    org: "Spring Bank",
    logo: "/assets/resume/2education-experience-logos/2spring-bank-logo.png",
    location: "Bronx, NY",
    bullets: [
      "Designed and implemented CRM system with workflow automation, migrating 40,000+ contacts with zero data loss",
      "Analyzed business and user needs to improve CRM workflows and communications",
      "Developed social media compliance platform as sole system administrator",
      "Reduced cost per lead by 75% compared with industry standards",
      "Revised brand guidelines based on target-market research",
    ],
  },
];

const education: TimelineEntry[] = [
  {
    id: "njit-edu",
    type: "education",
    date: "Sep 2025 – May 2028",
    startYear: 2025,
    title: "Bachelor of Science, Human Computer Interaction",
    org: "New Jersey Institute of Technology",
    logo: "/assets/resume/2education-experience-logos/2njit-logo.png",
    badges: ["GPA: 3.9", "Dean's List"],
    bullets: [
      "Focused on accessibility, AI-assisted interfaces, and inclusive technology",
      "Research assistant studying AI-powered assistive devices for visually impaired users",
    ],
  },
  {
    id: "mit-xpro",
    type: "education",
    date: "Jan 2023 – Nov 2023",
    startYear: 2023,
    title: "Full-Stack Software Engineering (MERN)",
    org: "MIT xPRO",
    logo: "/assets/resume/2education-experience-logos/2mit-xpro-logo.png",
    bullets: [
      "Intensive program covering MongoDB, Express, React, and Node.js",
      "Built full-stack applications with modern JavaScript frameworks",
    ],
  },
];

const awards: TimelineEntry[] = [
  {
    id: "hccc-award",
    type: "award",
    date: "May 2025",
    startYear: 2025,
    title: "HCCC Foundation Art Award",
    org: "Hudson County Community College",
    link: {
      href: "/gallery#mindless-mirth",
      label: "See my work",
    },
    bullets: [],
  },
];

const certifications: Certification[] = [
  {
    name: "Citi Program - RCR Basic Course",
    credentialUrl: "/assets/resume/Susan%20Chapas%20Citi%20RCR%20Basic%20Certificate.pdf",
  },
  {
    name: "Citi Program - Social and Behavioral Research - Basic/Refresher",
    credentialUrl:
      "/assets/resume/Susan%20Chapas%20Citi%20SBR%20Basic%20Refresher%20Certificate.pdf",
  },
];

const skillGroups = [
  {
    label: "Research & Strategy",
    icon: Search,
    labelClass: "text-accent-clay",
    tagClass: "border-accent-clay/30 text-accent-clay hover:bg-accent-clay/15",
    toggleClass: "bg-accent-clay shadow-[0_4px_14px_-2px_rgba(224,159,125,0.4)]",
    skills: [
      "UX Research",
      "User Interviews",
      "Observation Studies",
      "Usability Testing",
      "Heuristic Evaluation",
      "Qualitative Coding & Thematic Analysis",
      "Survey Design",
      "Competitive & Market Research",
      "A/B Testing",
      "Experiment Design",
      "CRM Systems",
      "Brand Strategy",
      "Marketing Campaigns",
      "Content Strategy",
    ],
  },
  {
    label: "Design, Data & Collaboration",
    icon: Palette,
    labelClass: "text-accent-blue",
    tagClass: "border-accent-blue/30 text-accent-blue hover:bg-accent-blue/15",
    toggleClass: "bg-accent-blue shadow-[0_4px_14px_-2px_rgba(187,205,243,0.4)]",
    skills: [
      "UX Design",
      "Accessibility",
      "Figma",
      "Miro",
      "Jira",
      "Trello",
      "Microsoft PowerPoint",
      "Microsoft Word",
      "Adobe Creative Suite",
      "Canva",
      "Excel",
      "SQL",
      "Microsoft Forms",
      "Statistical Analysis & Reporting",
      "Data Visualization",
    ],
  },
  {
    label: "Technical / Code",
    icon: Code2,
    labelClass: "text-accent-lime",
    tagClass: "border-accent-lime/30 text-accent-lime hover:bg-accent-lime/15",
    toggleClass: "bg-accent-lime shadow-[0_4px_14px_-2px_rgba(111,205,157,0.45)]",
    skills: [
      "Python",
      "JavaScript",
      "React",
      "MongoDB",
      "Docker",
      "GitHub",
      "Unity",
      "Firebase",
      "Postgres",
      "WordPress",
      "Next.js",
      "TypeScript",
      "Node.js",
      "Full-Stack (MERN)",
    ],
  },
];

type Tab = "all" | "experience" | "education";
type SkillFilter = number;

type ToggleOption<T extends string | number> = {
  value: T;
  label: string;
  icon?: LucideIcon;
  activeClass?: string;
};

function TogglePills<T extends string | number>({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: ToggleOption<T>[];
  value: T;
  onChange: (value: T) => void;
}) {
  const layoutId = useId();

  return (
    <div
      className="border-accent-blue/15 bg-accent-blue/10 inline-flex max-w-full gap-1 overflow-x-auto rounded-full border p-1.5 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      role="group"
      aria-label={label}
    >
      {options.map((option) => {
        const selected = value === option.value;

        return (
          <button
            key={String(option.value)}
            onClick={() => onChange(option.value)}
            className={`font-body relative shrink-0 rounded-full text-sm font-semibold tracking-wide transition-colors duration-200 ${
              option.icon ? "p-2.5" : "px-5 py-2.5 whitespace-nowrap"
            } ${
              selected
                ? "text-primary"
                : "text-secondary/60 hover:bg-secondary/5 hover:text-secondary"
            }`}
            aria-pressed={selected}
            aria-label={option.label}
          >
            {selected && (
              <motion.span
                layoutId={layoutId}
                className={`absolute inset-0 rounded-full ${
                  option.activeClass ??
                  "bg-accent-lime shadow-[0_4px_14px_-2px_rgba(111,205,157,0.45)]"
                }`}
                transition={{ type: "spring", stiffness: 420, damping: 34 }}
              />
            )}
            {option.icon ? (
              <option.icon className="relative z-10 h-4 w-4" aria-hidden="true" />
            ) : (
              <span className="relative z-10">{option.label}</span>
            )}
          </button>
        );
      })}
    </div>
  );
}

function OrgLogo({ entry }: { entry: TimelineEntry }) {
  const isEdu = entry.type !== "experience";

  if (entry.type === "award") {
    return (
      <div className="border-accent-blue bg-accent-blue/10 relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-lg border">
        <Trophy
          className="text-accent-blue h-9 w-9"
          strokeWidth={1.5}
          aria-hidden="true"
        />
      </div>
    );
  }

  if (entry.logo) {
    return (
      <div
        className={`bg-primary relative z-10 h-14 w-14 shrink-0 overflow-hidden rounded-lg ${
          isEdu ? "border-accent-blue border" : "border-accent-lime border"
        }`}
      >
        <Image
          src={entry.logo}
          alt={entry.org}
          fill
          sizes="56px"
          className="object-cover"
        />
      </div>
    );
  }

  return (
    <div
      className={`relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-lg ${
        isEdu
          ? "border-accent-blue bg-accent-blue/10 border"
          : "border-accent-lime bg-accent-lime/10 border"
      }`}
    >
      <span
        className={`font-display text-sm font-bold ${
          isEdu ? "text-accent-blue" : "text-accent-lime"
        }`}
      >
        {entry.org.charAt(0)}
      </span>
    </div>
  );
}

function DateMarker({ label }: { label: string }) {
  return (
    <FadeIn direction="none" className="flex items-center gap-4 pt-2 pb-4">
      <span className="text-secondary/40 font-mono text-lg font-semibold">{label}</span>
      <div className="h-px flex-1 bg-white/[0.08]" />
    </FadeIn>
  );
}

function TimelineCard({ entry, index }: { entry: TimelineEntry; index: number }) {
  const [expanded, setExpanded] = useState(false);
  const hasBullets = entry.bullets.length > 0;
  const isEdu = entry.type !== "experience";

  return (
    <FadeIn direction="up" delay={index * 0.05} className="pb-8">
      <div
        className={`group rounded-xl border border-white/[0.06] bg-white/[0.03] backdrop-blur-sm transition-colors hover:bg-white/[0.05] ${
          hasBullets ? "cursor-pointer" : ""
        }`}
        onClick={hasBullets ? () => setExpanded((v) => !v) : undefined}
        role={hasBullets ? "button" : undefined}
        tabIndex={hasBullets ? 0 : undefined}
        onKeyDown={
          hasBullets
            ? (e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setExpanded((v) => !v);
                }
              }
            : undefined
        }
        aria-expanded={hasBullets ? expanded : undefined}
      >
        <div className="p-6 lg:p-8">
          <div className="flex items-start gap-4">
            <OrgLogo entry={entry} />
            <div className="min-w-0 flex-1">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <h3 className="font-display text-secondary text-xl font-bold lg:text-2xl">
                    {entry.title}
                  </h3>
                  <p
                    className={`font-body mt-1 text-base font-medium ${
                      isEdu ? "text-accent-blue/70" : "text-accent-lime/70"
                    }`}
                  >
                    {entry.org}
                    {entry.location && (
                      <span className="text-secondary/40"> · {entry.location}</span>
                    )}
                  </p>
                </div>
                {hasBullets && (
                  <ChevronDown
                    className={`text-secondary/30 group-hover:text-secondary/50 mt-2 h-5 w-5 shrink-0 transition-transform ${
                      expanded ? "rotate-180" : ""
                    }`}
                    aria-hidden="true"
                  />
                )}
              </div>

              {entry.badges && entry.badges.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {entry.badges.map((badge) => (
                    <span
                      key={badge}
                      className={`font-body rounded-full px-3 py-0.5 text-sm font-medium ${
                        isEdu
                          ? "border-accent-blue/30 bg-accent-blue/10 text-accent-blue border"
                          : "border-accent-lime/30 bg-accent-lime/10 text-accent-lime border"
                      }`}
                    >
                      {badge}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          <AnimatePresence initial={false}>
            {expanded && hasBullets && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="overflow-hidden"
              >
                <ul className="mt-5 space-y-3 border-t border-white/[0.06] pt-5 pl-14">
                  {entry.bullets.map((bullet, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className="font-body text-secondary/70 flex gap-3 text-base"
                    >
                      <span
                        className={`mt-2 h-1.5 w-1.5 shrink-0 rounded-full ${
                          isEdu ? "bg-accent-blue/50" : "bg-accent-lime/50"
                        }`}
                        aria-hidden="true"
                      />
                      {bullet}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>

          {entry.link && (
            <a
              href={entry.link.href}
              className="bg-accent-lime font-body text-primary hover:bg-accent-lime/90 mt-5 ml-14 inline-flex min-h-11 items-center gap-2 rounded-full px-4 text-sm font-semibold transition-colors"
            >
              {entry.link.label}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
          )}
        </div>
      </div>
    </FadeIn>
  );
}

function TimelineColumn({ entries, label }: { entries: TimelineEntry[]; label: string }) {
  return (
    <div>
      <h3 className="font-display text-secondary mb-8 text-xl font-semibold lg:text-2xl">
        {label}
      </h3>
      {entries.map((entry, i) => (
        <div key={entry.id}>
          <DateMarker label={entry.date} />
          <TimelineCard entry={entry} index={i} />
        </div>
      ))}
    </div>
  );
}

function SingleColumnTimeline({ entries }: { entries: TimelineEntry[] }) {
  return (
    <div className="mx-auto max-w-3xl">
      {entries.map((entry, i) => (
        <div key={entry.id}>
          <DateMarker label={entry.date} />
          <TimelineCard entry={entry} index={i} />
        </div>
      ))}
    </div>
  );
}

function SkillsSection() {
  const [filter, setFilter] = useState<SkillFilter>(0);

  const activeGroup = skillGroups[filter];

  return (
    <FadeIn direction="up" className="mt-16 lg:mt-20">
      <h2 className="font-display text-secondary mb-8 text-xl font-semibold lg:text-2xl">
        Skills &amp; Tools
      </h2>
      <div className="mb-8">
        <TogglePills
          label="Filter skills by category"
          value={filter}
          onChange={setFilter}
          options={skillGroups.map((group, i) => ({
            value: i,
            label: group.label,
            icon: group.icon,
            activeClass: group.toggleClass,
          }))}
        />
      </div>
      {activeGroup && (
        <Eyebrow className={activeGroup.labelClass}>{activeGroup.label}</Eyebrow>
      )}
      <AnimatePresence mode="wait">
        <motion.div
          key={String(filter)}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.2 }}
          className="flex flex-wrap gap-2"
        >
          {activeGroup.skills.map((skill) => (
            <span
              key={skill}
              className={`font-body rounded-full border px-4 py-1.5 text-base font-medium transition-colors ${activeGroup.tagClass}`}
            >
              {skill}
            </span>
          ))}
        </motion.div>
      </AnimatePresence>
    </FadeIn>
  );
}

function CertificationsSection() {
  return (
    <FadeIn direction="up" className="mt-20 lg:mt-28">
      <h2 className="font-display text-secondary mb-8 text-xl font-semibold lg:text-2xl">
        Awards &amp; Certifications
      </h2>
      <ul className="space-y-5">
        {awards.map((award) => (
          <li key={award.id} className="flex flex-wrap items-center gap-3">
            <span
              className="bg-accent-blue/10 text-accent-blue inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full"
              aria-label="Award"
            >
              <Trophy className="h-3.5 w-3.5" strokeWidth={1.8} aria-hidden="true" />
            </span>
            <span className="font-body text-secondary text-lg">
              {award.title} · {award.org}
            </span>
            {award.link && (
              <a
                href={award.link.href}
                className="border-accent-lime/30 font-body text-accent-lime hover:bg-accent-lime/10 inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-sm font-medium transition-colors"
              >
                {award.link.label}
                <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
              </a>
            )}
          </li>
        ))}
        {certifications.map((cert) => (
          <li key={cert.name} className="flex flex-wrap items-center gap-3">
            <span
              className="bg-accent-lime/10 text-accent-lime inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full"
              aria-label="Certification"
            >
              <BadgeCheck className="h-4 w-4" strokeWidth={1.8} aria-hidden="true" />
            </span>
            <span className="font-body text-secondary text-lg">{cert.name}</span>
            <a
              href={cert.credentialUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="border-accent-blue/30 font-body text-accent-blue hover:bg-accent-blue/10 inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-sm font-medium transition-colors"
            >
              View Credential
              <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
            </a>
          </li>
        ))}
      </ul>
    </FadeIn>
  );
}

export default function ResumeTimeline() {
  const [tab, setTab] = useState<Tab>("all");
  const [canShowCombinedTimeline, setCanShowCombinedTimeline] = useState(true);

  useEffect(() => {
    const mediaQuery = window.matchMedia(
      "(min-width: 1024px) and (orientation: landscape)"
    );
    const updateAvailability = () => setCanShowCombinedTimeline(mediaQuery.matches);

    updateAvailability();
    mediaQuery.addEventListener("change", updateAvailability);
    return () => mediaQuery.removeEventListener("change", updateAvailability);
  }, []);

  const tabs: { value: Tab; label: string }[] = [
    { value: "all", label: "All" },
    { value: "education", label: "Education" },
    { value: "experience", label: "Experience" },
  ];
  const visibleTabs = canShowCombinedTimeline
    ? tabs
    : tabs.filter((option) => option.value !== "all");
  const activeTab = canShowCombinedTimeline ? "all" : tab === "all" ? "experience" : tab;

  return (
    <div className="gradient-mesh relative py-20 lg:py-28">
      <div className="container mx-auto max-w-6xl px-6 lg:px-12">
        <FadeIn direction="up">
          <Eyebrow>Resume</Eyebrow>
          <h1 className="font-display text-secondary mb-4 text-4xl font-bold lg:text-5xl">
            Experience & Education
          </h1>
          <p className="font-body text-secondary/60 mb-8 max-w-2xl text-lg">
            Seeking a UX internship focused on accessibility and human-centered design.
            Experienced in user interviews, heuristic evaluation, qualitative analysis,
            usability testing, and prototyping, with a background in marketing strategy,
            CRM systems, and full-stack development.
          </p>
          <a
            href="https://docs.google.com/document/d/1vcGft9GaBFNg0xPyx0BG4aCIRMvCR5fIeQ2SVkIgT3A/edit?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-accent-lime font-display text-primary hover:shadow-accent-lime/20 inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-all hover:scale-105 hover:shadow-lg active:scale-100"
          >
            <Download className="h-4 w-4" aria-hidden="true" />
            Download Resume
          </a>
        </FadeIn>

        {!canShowCombinedTimeline && (
          <FadeIn direction="up" delay={0.1} className="mt-14 mb-12">
            <TogglePills
              label="Filter resume by section"
              options={visibleTabs}
              value={activeTab}
              onChange={setTab}
            />
          </FadeIn>
        )}

        <div className={canShowCombinedTimeline ? "mt-14" : undefined}>
          <AnimatePresence mode="wait">
            {activeTab === "all" && (
              <motion.div
                key="all"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3 }}
              >
                <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
                  <TimelineColumn entries={education} label="Education" />
                  <TimelineColumn entries={experience} label="Experience" />
                </div>
              </motion.div>
            )}

            {activeTab === "experience" && (
              <motion.div
                key="experience"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3 }}
              >
                <SingleColumnTimeline entries={experience} />
              </motion.div>
            )}

            {activeTab === "education" && (
              <motion.div
                key="education"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3 }}
              >
                <SingleColumnTimeline entries={education} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <CertificationsSection />
        <SkillsSection />
      </div>
    </div>
  );
}
