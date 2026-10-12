"use client";

import { useEffect, useId, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  BadgeCheck,
  ChevronDown,
  Code2,
  Download,
  Hash,
  ExternalLink,
  Palette,
  Search,
  Trophy,
  type LucideIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import EmberReveal from "@/components/EmberReveal";
import FadeIn from "@/components/FadeIn";
import Eyebrow from "@/components/Eyebrow";
import { ConnectorArrow, useConnector } from "@/components/HoverConnector";
import { projects } from "@/lib/projects";
import { artworks } from "@/app/gallery/artworks";
import { SPRING_GENTLE, SPRING_HOVER } from "@/lib/motion";

interface TimelineEntry {
  id: string;
  type: "experience" | "education" | "award";
  date: string;
  startYear: number;
  title: string;
  org: string;
  logo?: string;
  image?: string;
  overlay?: string;
  location?: string;
  bullets: string[];
  badges?: string[];
  project?: string;
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

const linkProps = (href: string) =>
  href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {};

const awards: TimelineEntry[] = [
  {
    id: "girlhacks",
    type: "award",
    date: "Oct 2026",
    startYear: 2026,
    title: "Best Use of ElevenLabs\nBest Beginner Hack",
    org: "NJIT GirlHacks",
    project: "/projects/wick",
    image: "/assets/projects/wick/wick-cover-card/wick-voice-sc.webp",
    overlay: "/assets/projects/wick/wick-cover-card/wick-logo.webp",
    link: {
      href: "https://www.wick.courses/welcome",
      label: "See the project",
    },
    bullets: [],
  },
  {
    id: "hccc-award",
    type: "award",
    date: "May 2025",
    startYear: 2025,
    title: "HCCC Foundation Art Award",
    org: "Hudson County Community College",
    image: "/gallery/Mindless-Mirth-final.webp",
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
      <h2 className="font-display text-secondary mb-8 text-3xl font-bold lg:text-4xl">
        {label}
      </h2>
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
      <h2 className="font-display text-secondary mb-8 text-3xl font-bold lg:text-4xl">
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

const FRAME_HANDLES = [
  "-top-1 -left-1",
  "-top-1 -right-1",
  "-bottom-1 -left-1",
  "-bottom-1 -right-1",
];

function FigmaFrame({
  name,
  size,
  className = "",
  children,
}: {
  name: string;
  size: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={className}>
      <p className="text-secondary/50 mb-1.5 flex items-center gap-1 font-mono text-xs">
        <Hash className="h-3 w-3" aria-hidden="true" />
        {name}
      </p>
      <div className="outline-figma relative outline-1">
        {children}
        {FRAME_HANDLES.map((pos) => (
          <span
            key={pos}
            className={`border-figma pointer-events-none absolute h-2 w-2 border bg-white ${pos}`}
            aria-hidden="true"
          />
        ))}
      </div>
      <p className="mt-2.5 text-center" aria-hidden="true">
        <span className="bg-figma rounded px-1.5 py-0.5 font-mono text-[11px] text-white">
          {size}
        </span>
      </p>
    </div>
  );
}

function AwardPreview({ award }: { award: TimelineEntry }) {
  const reduce = useReducedMotion();
  const project = projects.find((p) => p.href === award.project);

  if (project && award.image && award.link)
    return (
      <FadeIn as="article">
        <FigmaFrame name={project.title} size="1400 × 900">
          <Link
            href={award.link.href}
            {...linkProps(award.link.href)}
            className="group group/pane relative block aspect-[14/9] overflow-hidden"
            aria-label={`View ${project.title}`}
          >
            <EmberReveal
              src={award.image}
              overlay={award.overlay}
              veil="bg-black/80"
              sizes="384px"
            />
          </Link>
        </FigmaFrame>
      </FadeIn>
    );
  const artwork = artworks.find((a) => a.src === award.image);
  if (!artwork || !award.link) return null;

  return (
    <FadeIn as="article">
      <FigmaFrame name={artwork.title} size="1080 × 1350" className="max-w-[16.2rem]">
        <motion.div
          initial="rest"
          whileHover={reduce ? undefined : "hover"}
          animate="rest"
        >
          <Link
            href={award.link.href}
            className="relative block aspect-[4/5] overflow-hidden"
            aria-label={`View ${artwork.title} in the gallery`}
          >
            <motion.div
              className="absolute inset-0"
              variants={{ rest: { scale: 1 }, hover: { scale: 1.06 } }}
              transition={SPRING_GENTLE}
            >
              <Image
                src={artwork.src}
                alt=""
                fill
                sizes="288px"
                className="object-cover"
              />
            </motion.div>
            <div className="from-primary/90 via-primary/20 absolute inset-0 bg-gradient-to-t to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-6">
              <motion.span
                className="text-accent-lime mt-2 flex items-center gap-2 font-medium"
                variants={{ rest: { x: 0 }, hover: { x: 8 } }}
                transition={SPRING_HOVER}
              >
                View in Gallery
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </motion.span>
            </div>
          </Link>
        </motion.div>
      </FigmaFrame>
    </FadeIn>
  );
}

function AwardsSection() {
  const [active, setActive] = useState(0);
  const { connector, rootRef, slotRef, targetRefs } = useConnector(active);

  return (
    <FadeIn direction="up" className="mt-20 lg:mt-28">
      <div
        ref={rootRef}
        className="relative isolate lg:grid lg:grid-cols-[1fr_24rem] lg:items-start lg:gap-32"
      >
        <div className="relative z-10">
          <h2 className="font-display text-secondary mb-8 text-3xl font-bold lg:text-4xl">
            Awards
          </h2>
          <ul className="space-y-7">
            {awards.map((award, i) => (
              <li
                key={award.id}
                ref={(el) => {
                  targetRefs.current[i] = el;
                }}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                className="flex w-fit items-start gap-4"
              >
                <span
                  className="bg-accent-blue/10 text-accent-blue inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full"
                  aria-label="Award"
                >
                  <Trophy className="h-5 w-5" strokeWidth={1.8} aria-hidden="true" />
                </span>
                <div>
                  <h3
                    className={`font-display text-lg font-bold whitespace-pre-line transition-colors duration-500 ease-[var(--ease-liquid)] lg:text-xl ${
                      active === i
                        ? "lg:text-accent-lime text-secondary"
                        : "text-secondary"
                    }`}
                  >
                    {award.title}
                  </h3>
                  <p className="font-body text-secondary/60 mt-0.5 text-base">
                    {award.org} · {award.date}
                  </p>
                  {award.link && (
                    <Link
                      href={award.link.href}
                      {...linkProps(award.link.href)}
                      className="border-accent-lime/30 font-body text-accent-lime hover:bg-accent-lime/10 mt-3 inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-sm font-medium transition-colors"
                    >
                      {award.link.label}
                      <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                    </Link>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div
          ref={slotRef}
          aria-live="polite"
          className="relative z-10 hidden min-h-[25rem] items-start lg:flex"
        >
          <div className="w-full">
            <AwardPreview key={awards[active].id} award={awards[active]} />
          </div>
        </div>

        <ConnectorArrow connector={connector} active={active} />
      </div>
    </FadeIn>
  );
}

function CertificationsSection() {
  return (
    <FadeIn direction="up" className="mt-16 lg:mt-20">
      <h2 className="font-display text-secondary mb-8 text-3xl font-bold lg:text-4xl">
        Certifications
      </h2>
      <ul className="space-y-5">
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
              <span className="sr-only"> (opens in new tab)</span>
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

        <AwardsSection />
        <CertificationsSection />
        <SkillsSection />
      </div>
    </div>
  );
}
