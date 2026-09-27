"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import {
  Cctv,
  ChartLine,
  ChefHat,
  DraftingCompass,
  FolderSearch,
  Glasses,
  SwatchBook,
  type LucideIcon,
} from "lucide-react";
import ProjectCard from "@/components/ProjectCard";
import type { Project, ProjectIcon } from "@/lib/projects";

const projectIcons: Record<ProjectIcon, LucideIcon> = {
  cctv: Cctv,
  "chart-line": ChartLine,
  "chef-hat": ChefHat,
  "drafting-compass": DraftingCompass,
  "folder-search": FolderSearch,
  glasses: Glasses,
  "swatch-book": SwatchBook,
};

interface Connector {
  sx: number;
  sy: number;
  ex: number;
  ey: number;
}

export default function ProjectIndex({
  projects,
  children,
}: {
  projects: Project[];
  children?: ReactNode;
}) {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const [connector, setConnector] = useState<Connector | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const slotRef = useRef<HTMLDivElement>(null);
  const titleRefs = useRef<(HTMLElement | null)[]>([]);

  const measure = useCallback(() => {
    const root = rootRef.current?.getBoundingClientRect();
    const slot = slotRef.current?.getBoundingClientRect();
    const title = titleRefs.current[active]?.getBoundingClientRect();
    if (!root || !slot || !title) return;
    setConnector({
      sx: title.right - root.left + 20,
      sy: title.top + title.height / 2 - root.top,
      ex: slot.left - root.left - 14,
      ey: slot.top + slot.height * 0.5 - root.top,
    });
  }, [active]);

  useEffect(() => {
    const frame = requestAnimationFrame(measure);
    const observer = new ResizeObserver(measure);
    if (rootRef.current) observer.observe(rootRef.current);
    if (slotRef.current) observer.observe(slotRef.current);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, [measure]);

  const project = projects[active];
  const bow = (() => {
    if (!connector) return { cx: 0, cy: 0 };
    const vx = connector.ex - connector.sx;
    const vy = connector.ey - connector.sy;
    const len = Math.hypot(vx, vy) || 1;
    const amount = len * 0.16;
    return {
      cx: (connector.sx + connector.ex) / 2 - (vy / len) * amount,
      cy: (connector.sy + connector.ey) / 2 + (vx / len) * amount,
    };
  })();
  const path = connector
    ? `M ${connector.sx} ${connector.sy} Q ${bow.cx} ${bow.cy}, ${connector.ex} ${connector.ey}`
    : "";
  const headAngle = connector
    ? (Math.atan2(connector.ey - bow.cy, connector.ex - bow.cx) * 180) / Math.PI
    : 0;

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
              titleRefs.current[i] = el;
            };
            return (
              <li key={p.title} className="flex items-baseline gap-5">
                <Icon
                  className="text-[#7d9cd4] size-6 shrink-0 self-center"
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
        className="absolute top-1/2 right-0 z-10 w-96 -translate-y-1/2"
      >
        <ProjectCard key={project.title} {...project} index={0} />
      </div>

      {connector && (
        <svg
          className="text-accent-lime pointer-events-none absolute inset-0 z-0 h-full w-full overflow-visible"
          aria-hidden="true"
        >
          <motion.circle
            key={`dot-${active}`}
            cx={connector.sx}
            cy={connector.sy}
            r={4}
            fill="currentColor"
            initial={reduce ? false : { scale: 0 }}
            animate={{ scale: 1 }}
          />
          <motion.path
            key={`path-${active}`}
            d={path}
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            initial={reduce ? false : { pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          />
          <motion.path
            key={`head-${active}`}
            d={`M ${connector.ex - 9} ${connector.ey - 6} L ${connector.ex + 1} ${connector.ey} L ${connector.ex - 9} ${connector.ey + 6}`}
            transform={`rotate(${headAngle} ${connector.ex} ${connector.ey})`}
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35, duration: 0.15 }}
          />
        </svg>
      )}
    </div>
  );
}
