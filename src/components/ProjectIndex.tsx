"use client";

import { useState, type ReactNode } from "react";
import Link from "next/link";
import {
  Cctv,
  ChartLine,
  ChefHat,
  DraftingCompass,
  Flame,
  FolderSearch,
  Glasses,
  SwatchBook,
  type LucideIcon,
} from "lucide-react";
import ProjectCard from "@/components/ProjectCard";
import { ConnectorArrow, useConnector } from "@/components/HoverConnector";
import type { Project, ProjectIcon } from "@/lib/projects";

const projectIcons: Record<ProjectIcon, LucideIcon> = {
  cctv: Cctv,
  "chart-line": ChartLine,
  "chef-hat": ChefHat,
  "drafting-compass": DraftingCompass,
  flame: Flame,
  "folder-search": FolderSearch,
  glasses: Glasses,
  "swatch-book": SwatchBook,
};

export default function ProjectIndex({
  projects,
  children,
}: {
  projects: Project[];
  children?: ReactNode;
}) {
  const [active, setActive] = useState(0);
  const { connector, rootRef, slotRef, targetRefs } = useConnector(active);
  const project = projects[active];

  return (
    <div
      ref={rootRef}
      className="relative isolate grid grid-cols-[1fr_minmax(0,24rem)] items-center gap-32"
    >
      <div className="relative z-10">
        {children}
        <ol className="flex flex-col gap-10">
          {projects.map((p, i) => {
            const Icon = projectIcons[p.icon];
            const className = `font-display text-secondary hover:text-accent-lime focus-visible:text-accent-lime inline-block text-2xl font-bold transition-colors duration-500 ease-[var(--ease-liquid)] xl:text-4xl ${
              p.inactive ? "cursor-default" : ""
            }`;
            const ref = (el: HTMLElement | null) => {
              targetRefs.current[i] = el;
            };
            return (
              <li key={p.title} className="flex items-baseline gap-5">
                <Icon
                  className="size-6 shrink-0 self-center text-[#7d9cd4]"
                  strokeWidth={2}
                  aria-hidden="true"
                />
                {p.inactive ? (
                  <span
                    ref={ref}
                    tabIndex={0}
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    className={className}
                  >
                    {p.title}
                  </span>
                ) : (
                  <Link
                    ref={ref}
                    href={p.href}
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    className={className}
                  >
                    {p.title}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </div>

      <div
        ref={slotRef}
        aria-live="polite"
        className="absolute top-1/2 right-0 z-10 grid w-96 -translate-y-1/2"
      >
        {projects.map((p) => (
          <div
            key={p.title}
            aria-hidden="true"
            className="invisible grid [grid-area:1/1]"
          >
            <ProjectCard {...p} index={0} />
          </div>
        ))}
        <div className="grid [grid-area:1/1]">
          <ProjectCard key={project.title} {...project} index={0} />
        </div>
      </div>

      <ConnectorArrow connector={connector} active={active} />
    </div>
  );
}
