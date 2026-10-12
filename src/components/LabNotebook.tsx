"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Trophy } from "lucide-react";
import EmberReveal from "@/components/EmberReveal";
import FadeIn from "@/components/FadeIn";
import { LAB_STAGES, type Project } from "@/lib/projects";
import { EASE_SMOOTH } from "@/lib/motion";

const handles = [
  "-top-1 -left-1",
  "-top-1 -right-1",
  "-bottom-1 -left-1",
  "-bottom-1 -right-1",
];

function Selection({ label }: { label?: string }) {
  return (
    <span className="border-accent-lime pointer-events-none absolute inset-0 border-[1.5px]">
      {handles.map((h) => (
        <span
          key={h}
          className={`border-accent-lime bg-secondary absolute size-2 border ${h}`}
        />
      ))}
      {label && (
        <span className="bg-accent-lime text-primary absolute -bottom-7 left-1/2 -translate-x-1/2 rounded px-1.5 py-0.5 font-mono text-[10px] whitespace-nowrap">
          {label}
        </span>
      )}
    </span>
  );
}

function Noodle({ done }: { done: boolean }) {
  const reduce = useReducedMotion();
  return (
    <span
      className={`flex shrink-0 flex-col ${done ? "text-accent-lime" : "text-secondary/30"}`}
      aria-hidden="true"
    >
      <span className="invisible mb-1.5 font-mono text-[10px] sm:text-[11px]">
        &nbsp;
      </span>
      <span className="flex flex-1 items-center">
        <motion.svg
          viewBox="0 0 64 24"
          className="h-6 w-6 overflow-visible sm:w-10 lg:w-16"
          preserveAspectRatio="none"
          initial={reduce ? false : { clipPath: "inset(-50% 100% -50% -50%)" }}
          whileInView={{ clipPath: "inset(-50% -50% -50% -50%)" }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: EASE_SMOOTH }}
        >
          <circle cx="0" cy="12" r="2.5" fill="currentColor" />
          <path
            d="M 0 12 H 63"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeDasharray={done ? undefined : "3 3"}
            vectorEffect="non-scaling-stroke"
          />
          <path
            d="M 57 8 L 64 12 L 57 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            vectorEffect="non-scaling-stroke"
          />
        </motion.svg>
      </span>
    </span>
  );
}

function Cursor() {
  const reduce = useReducedMotion();
  return (
    <motion.span
      className="pointer-events-none absolute -right-3 -bottom-9 z-10 flex items-start"
      animate={reduce ? undefined : { x: [0, 6, 0], y: [0, -4, 0] }}
      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      aria-hidden="true"
    >
      <svg viewBox="0 0 16 16" className="text-accent-clay size-4">
        <path
          d="M1 1 L14 6 L8 8 L6 14 Z"
          fill="currentColor"
          stroke="#091a35"
          strokeWidth="1"
        />
      </svg>
      <span className="bg-accent-clay text-primary mt-3 rounded px-1.5 py-0.5 font-mono text-[10px] font-medium">
        Susan
      </span>
    </motion.span>
  );
}

function StageFrame({
  name,
  state,
}: {
  name: string;
  state: "done" | "current" | "next";
}) {
  return (
    <div className="min-w-0 flex-1">
      <span
        className={`mb-1.5 block truncate font-mono text-[10px] sm:text-[11px] ${state === "current" ? "text-accent-lime" : "text-secondary/50"}`}
      >
        {name}
      </span>
      <div
        className={`relative aspect-[4/3] ${
          state === "next"
            ? "border-secondary/25 border border-dashed"
            : "bg-secondary/[0.06]"
        }`}
      >
        <div className="flex h-full flex-col gap-1.5 p-2 sm:p-3">
          <span
            className={`h-1.5 w-2/3 rounded-full ${state === "next" ? "bg-secondary/10" : "bg-secondary/25"}`}
          />
          <span
            className={`h-1.5 w-1/2 rounded-full ${state === "next" ? "bg-secondary/10" : "bg-secondary/15"}`}
          />
          <span
            className={`mt-auto h-1/3 rounded-sm ${
              state === "done"
                ? "bg-accent-lime/30"
                : state === "current"
                  ? "bg-accent-lime/15"
                  : "bg-secondary/5"
            }`}
          />
        </div>
        {state === "current" && (
          <>
            <Selection />
            <Cursor />
          </>
        )}
      </div>
    </div>
  );
}

export default function LabNotebook({ projects }: { projects: Project[] }) {
  return (
    <ol className="flex flex-col gap-28 lg:gap-40">
      {projects.map((p) => {
        const { stage, question, reveal, cta } = p.lab!;
        return (
          <FadeIn as="li" key={p.title} className="group">
            <article aria-labelledby={`lab-${p.href}`}>
              <div className="grid items-start gap-12 lg:grid-cols-12 lg:gap-16">
                <div className="relative lg:col-span-7">
                  <span className="text-secondary/50 mb-2 flex items-center gap-2 font-mono text-xs">
                    <svg viewBox="0 0 12 12" className="size-3" aria-hidden="true">
                      <path
                        d="M3 0v12M9 0v12M0 3h12M0 9h12"
                        stroke="currentColor"
                        strokeWidth="1.2"
                      />
                    </svg>
                    {p.title}
                  </span>
                  <Link
                    href={p.href}
                    tabIndex={-1}
                    aria-hidden="true"
                    className="group/pane relative block"
                  >
                    <div className="relative aspect-[16/10] overflow-hidden">
                      {reveal ? (
                        <EmberReveal src={reveal} />
                      ) : (
                        <Image
                          src={encodeURI(p.image)}
                          alt=""
                          fill
                          className="object-cover transition-transform duration-700 ease-[var(--ease-liquid)] group-hover:scale-[1.03]"
                          sizes="(max-width: 1024px) 100vw, 60vw"
                        />
                      )}
                    </div>
                    <span className="opacity-0 transition-opacity duration-300 group-focus-within:opacity-100 group-hover:opacity-100">
                      <Selection label={`${p.width} × ${p.height}`} />
                    </span>
                  </Link>

                  <figure className="absolute -top-5 -right-3 flex max-w-[16rem] items-start gap-2 sm:-right-6 lg:-right-10">
                    <span className="bg-accent-blue text-primary flex size-8 shrink-0 items-center justify-center rounded-full rounded-bl-none font-mono text-[11px] font-bold">
                      SC
                    </span>
                    <figcaption className="bg-secondary text-primary rounded-lg rounded-tl-none px-3 py-2 shadow-lg">
                      <span className="text-primary/50 block font-mono text-[10px]">
                        Research question
                      </span>
                      <span className="font-body text-sm leading-snug">{question}</span>
                    </figcaption>
                  </figure>
                </div>

                <div className="lg:col-span-5 lg:pt-8">
                  <h3
                    id={`lab-${p.href}`}
                    className="font-display text-secondary mb-5 text-3xl font-bold lg:text-5xl"
                  >
                    <Link
                      href={p.href}
                      className="hover:text-accent-lime focus-visible:text-accent-lime transition-colors duration-500"
                    >
                      {p.title}
                    </Link>
                  </h3>
                  <p className="font-body text-secondary/70 mb-6 text-lg">
                    {p.description}
                  </p>
                  {p.awards && (
                    <ul className="mb-6 flex flex-col gap-2">
                      {p.awards.map((a) => (
                        <li
                          key={a}
                          className="font-body text-secondary flex items-center gap-2 text-base"
                        >
                          <Trophy className="text-accent-lime size-4 shrink-0" aria-hidden="true" />
                          {a}
                        </li>
                      ))}
                    </ul>
                  )}
                  <ul className="mb-8 flex flex-wrap gap-2">
                    {p.tags.map((t) => (
                      <li
                        key={t}
                        className="border-secondary/15 text-secondary/70 rounded border px-2 py-1 font-mono text-[11px]"
                      >
                        {t}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={cta?.href ?? p.href}
                    {...(cta && { target: "_blank", rel: "noopener noreferrer" })}
                    className="bg-accent-lime text-primary font-display hover:bg-accent-lime/90 inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm font-semibold transition-colors"
                  >
                    <svg viewBox="0 0 12 12" className="size-3" aria-hidden="true">
                      <path d="M2 1 L11 6 L2 11 Z" fill="currentColor" />
                    </svg>
                    {cta?.label ?? "Present"}
                  </Link>
                </div>
              </div>

              <ol
                className="mt-16 flex items-stretch"
                aria-label={`Progress: ${LAB_STAGES[stage]}`}
              >
                {LAB_STAGES.map((s, i) => (
                  <li
                    key={s}
                    className="contents"
                    aria-current={i === stage ? "step" : undefined}
                  >
                    {i > 0 && <Noodle done={i <= stage} />}
                    <StageFrame
                      name={s}
                      state={i < stage ? "done" : i === stage ? "current" : "next"}
                    />
                  </li>
                ))}
              </ol>
            </article>
          </FadeIn>
        );
      })}
    </ol>
  );
}
