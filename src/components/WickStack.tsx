"use client";

import { useState } from "react";
import {
  ArrowRight,
  AudioLines,
  Cloud,
  Database,
  Laptop,
  type LucideIcon,
} from "lucide-react";
import { GitHubIcon } from "@/components/Icons";

type NodeId = "web" | "api" | "gemini" | "eleven" | "storage";
type LinkId = "request" | "response" | "api-gemini" | "api-eleven" | "api-storage";
type Target = NodeId | "request" | "response";

interface StackNode {
  title: string;
  sub: string;
  detail: string;
  icon: LucideIcon;
  tone: string;
}

function MicrosoftMark() {
  return (
    <span aria-hidden="true" className="grid h-5 w-5 grid-cols-2 gap-px">
      <i className="bg-[#f25022]" />
      <i className="bg-[#7fba00]" />
      <i className="bg-[#00a4ef]" />
      <i className="bg-[#ffb900]" />
    </span>
  );
}

function ElevenLabsMark() {
  return (
    <span aria-hidden="true" className="flex h-6 w-6 items-center justify-center gap-1.5">
      <i className="h-5 w-[3px] bg-current" />
      <i className="h-5 w-[3px] bg-current" />
    </span>
  );
}

function GeminiMark() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-6 w-6 shrink-0"
      fill="white"
    >
      <path d="M11.04 19.32Q12 21.51 12 24q0-2.49.93-4.68.96-2.19 2.58-3.81t3.81-2.55Q21.51 12 24 12q-2.49 0-4.68-.93a12.3 12.3 0 0 1-3.81-2.58 12.3 12.3 0 0 1-2.58-3.81Q12 2.49 12 0q0 2.49-.96 4.68-.93 2.19-2.55 3.81a12.3 12.3 0 0 1-3.81 2.58Q2.49 12 0 12q2.49 0 4.68.96 2.19.93 3.81 2.55t2.55 3.81" />
    </svg>
  );
}

function TechBadge({ name }: { name: string }) {
  const mark = {
    React: (
      <img
        className="h-3.5 w-3.5 opacity-90 mix-blend-screen saturate-[.7]"
        src="/assets/stack/react.ico"
        alt=""
      />
    ),
    TypeScript: (
      <img
        className="h-3.5 w-3.5 opacity-90 mix-blend-screen saturate-[.7]"
        src="/assets/stack/typescript.ico"
        alt=""
      />
    ),
    Vite: <span className="font-black text-[#646cff]">ϟ</span>,
    GitHub: <GitHubIcon className="h-3.5 w-3.5" />,
  }[name];

  return (
    <span className="border-secondary/10 bg-primary/70 text-secondary/75 inline-flex items-center gap-1.5 rounded-md border px-2 py-1 text-[11px] font-medium">
      {mark}
      {name}
    </span>
  );
}

const nodes: Record<NodeId, StackNode> = {
  web: {
    title: "Wick web app",
    sub: "User interface",
    detail: "React 19, TypeScript, and Vite, hosted on GitHub Pages.",
    icon: Laptop,
    tone: "bg-accent-blue/10 border-accent-blue/30 text-accent-blue",
  },
  api: {
    title: "Wick API",
    sub: "Microsoft Azure Functions",
    detail:
      "Node.js 22 on Azure Functions. It is the only part that talks to the AI services.",
    icon: Cloud,
    tone: "bg-secondary/5 border-secondary/25 text-secondary",
  },
  gemini: {
    title: "Google Gemini",
    sub: "Character replies, coaching, scenarios",
    detail: "Writes character replies, coaching debriefs, and custom scenarios.",
    icon: Cloud,
    tone: "bg-accent-lime/10 border-accent-lime/30 text-accent-lime",
  },
  eleven: {
    title: "ElevenLabs",
    sub: "Speech-to-text and character voices",
    detail:
      "Scribe v2 turns speech into text. Flash v2.5 gives each character its own voice.",
    icon: AudioLines,
    tone: "bg-accent-clay/10 border-accent-clay/30 text-accent-clay",
  },
  storage: {
    title: "Azure Table Storage",
    sub: "Sessions",
    detail: "Keeps session records. Voice audio is deleted after 24 hours.",
    icon: Database,
    tone: "bg-accent-blue/10 border-accent-blue/30 text-accent-blue",
  },
};

const links: Record<LinkId, [NodeId, NodeId]> = {
  request: ["web", "api"],
  response: ["api", "web"],
  "api-gemini": ["api", "gemini"],
  "api-eleven": ["api", "eleven"],
  "api-storage": ["api", "storage"],
};

const contract: Record<
  "request" | "response",
  { title: string; sub: string; detail: string }
> = {
  request: {
    title: "API request",
    sub: "User input, session info",
    detail: "The agreed request format: what the user said or typed, plus session info.",
  },
  response: {
    title: "API response",
    sub: "Character reply, audio, and more",
    detail:
      "The agreed response format: the character's reply, its audio, and session state.",
  },
};

const services: NodeId[] = ["gemini", "eleven", "storage"];

function neighbors(id: Target) {
  if (id in contract) return [id, ...links[id as LinkId]];
  const out: string[] = [id];
  (Object.keys(links) as LinkId[]).forEach((l) => {
    if (links[l].includes(id as NodeId)) out.push(l, ...links[l]);
  });
  return out;
}

export default function WickStack() {
  const [selected, setSelected] = useState<Target | null>(null);
  const active = new Set<string>(selected ? neighbors(selected) : []);
  const dim = (id: string) => active.size > 0 && !active.has(id);
  const on = (id: string) => active.has(id);

  const select = (id: Target) => setSelected((s) => (s === id ? null : id));

  const picked =
    selected &&
    (selected in nodes
      ? nodes[selected as NodeId]
      : contract[selected as keyof typeof contract]);

  const lineTone = "bg-[#718096]";
  const arrowTone = "text-[#718096]";

  const node = (id: NodeId, className = "") => {
    const { title, sub, icon: Icon, tone } = nodes[id];
    return (
      <button
        type="button"
        aria-pressed={selected === id}
        onClick={() => select(id)}
        className={`flex w-full items-center gap-3 rounded-xl border p-3 text-left transition duration-300 lg:p-4 ${tone} ${
          on(id)
            ? "ring-accent-lime ring-2 ring-offset-2 ring-offset-[var(--primary)]"
            : ""
        } ${dim(id) ? "opacity-35" : ""} ${className}`}
      >
        {id === "api" || id === "storage" ? (
          <MicrosoftMark />
        ) : id === "gemini" ? (
          <GeminiMark />
        ) : id === "eleven" ? (
          <ElevenLabsMark />
        ) : (
          <Icon aria-hidden="true" className="h-6 w-6 shrink-0" strokeWidth={1.75} />
        )}
        <span className="min-w-0">
          <span className="font-display text-secondary block leading-tight font-bold">
            {title}
          </span>
          <span className="font-body text-secondary/60 block text-sm leading-snug">
            {sub}
          </span>
        </span>
      </button>
    );
  };

  const link = (id: keyof typeof contract) => (
    <button
      type="button"
      aria-pressed={selected === id}
      onClick={() => select(id)}
      className={`flex flex-1 flex-col items-center gap-2 rounded-lg p-2 text-center transition duration-300 lg:flex-none ${
        dim(id) ? "opacity-35" : ""
      } ${id === "response" ? "lg:flex-col-reverse" : ""}`}
    >
      <span>
        <span
          className={`font-display block text-sm font-bold ${on(id) ? "text-accent-lime" : "text-secondary"}`}
        >
          {contract[id].title}
        </span>
        <span className="font-body text-secondary/60 block text-xs">
          {contract[id].sub}
        </span>
      </span>
      <span
        aria-hidden="true"
        className={`flex items-center lg:w-full ${id === "response" ? "flex-col-reverse lg:flex-row-reverse" : "flex-col lg:flex-row"}`}
      >
        <span className={`h-8 w-0.5 lg:h-0.5 lg:w-full lg:flex-1 ${lineTone}`} />
        <ArrowRight
          className={`-my-1.5 h-4 w-4 ${arrowTone} lg:mx-[-6px] lg:my-0 ${id === "response" ? "-rotate-90 lg:rotate-180" : "rotate-90 lg:rotate-0"}`}
          strokeWidth={2.5}
        />
      </span>
    </button>
  );

  return (
    <figure className="m-0">
      <div className="grid gap-0 lg:grid-cols-[minmax(14rem,1fr)_minmax(10rem,0.72fr)_minmax(24rem,2.25fr)] lg:items-stretch lg:gap-5">
        <div className="bg-accent-blue/5 border-accent-blue/15 flex flex-col rounded-2xl border p-5 lg:p-6">
          <h3 className="font-display text-secondary text-xl font-bold">Frontend</h3>
          <p className="font-body text-secondary/60 mb-5 text-sm">
            React 19 + TypeScript + Vite (GitHub Pages)
          </p>
          <div className="flex flex-1 items-center">
            <div className="w-full rounded-xl border border-[#61dafb]/30 bg-[#0d1826] p-4 shadow-[0_18px_30px_-22px_rgba(0,0,0,.8)] lg:p-5">
              <div className="mx-auto flex aspect-[16/10] max-w-[16rem] flex-col overflow-hidden rounded-t-lg border-[5px] border-[#273443] bg-[#132237] shadow-lg">
                <div className="flex h-5 items-center gap-1 border-b border-white/10 bg-[#1b2e45] px-2">
                  <i className="h-1.5 w-1.5 rounded-full bg-[#ff7465]" />
                  <i className="h-1.5 w-1.5 rounded-full bg-[#f5c451]" />
                  <i className="h-1.5 w-1.5 rounded-full bg-[#62d6a1]" />
                </div>
                <div className="flex flex-1 items-center justify-center bg-[radial-gradient(circle_at_center,_rgba(97,218,251,.28),_transparent_56%)]">
                  <span className="font-display text-3xl font-bold tracking-tight text-white">
                    Wick
                  </span>
                </div>
              </div>
              <div
                aria-hidden="true"
                className="mx-auto h-2 w-[88%] rounded-b-full bg-[#425468]"
              />
              <div className="mt-4 flex flex-wrap justify-center gap-1.5">
                {["React", "TypeScript", "Vite", "GitHub"].map((name) => (
                  <TechBadge key={name} name={name} />
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center gap-4 px-2 py-3 lg:flex-col lg:gap-6 lg:px-3 lg:py-0">
          {link("request")}
          {link("response")}
        </div>

        <div className="bg-accent-lime/5 border-accent-lime/15 rounded-2xl border p-5 lg:p-6">
          <h3 className="font-display text-secondary text-xl font-bold">Backend</h3>
          <p className="font-body text-secondary/60 mb-5 text-sm">
            Node.js 22 on Azure Functions
          </p>
          <div className="grid min-w-0 grid-cols-[2.5rem_minmax(0,1fr)] lg:grid-cols-[minmax(0,1fr)_3rem_minmax(0,1.4fr)] lg:grid-rows-3">
            <div className="col-span-2 pb-3 lg:col-span-1 lg:row-span-3 lg:flex lg:items-center lg:pr-4 lg:pb-0">
              {node("api", "lg:flex-col lg:py-6 lg:text-center")}
            </div>
            {services.map((id, i) => {
              const wire = `api-${id}`;
              const first = i === 0;
              const last = i === services.length - 1;
              const middle = !first && !last;
              return (
                <div key={id} className="contents">
                  <div
                    aria-hidden="true"
                    className={`relative transition-opacity duration-300 lg:col-start-2 ${dim(wire) ? "opacity-35" : ""}`}
                  >
                    <span
                      className={`absolute left-5 w-0.5 lg:left-0 ${lineTone} ${
                        first ? "-top-3 lg:top-1/2" : "top-0"
                      } ${last ? "bottom-1/2" : "bottom-0"}`}
                    />
                    <span
                      className={`absolute top-1/2 right-1 left-5 h-0.5 -translate-y-1/2 ${middle ? "lg:-left-4" : "lg:left-0"} ${lineTone}`}
                    />
                    <ArrowRight
                      className={`${arrowTone} absolute top-1/2 -right-1 h-4 w-4 -translate-y-1/2`}
                      strokeWidth={2.5}
                    />
                  </div>
                  <div className="py-1.5 pl-2 lg:col-start-3">{node(id)}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <figcaption
        aria-live="polite"
        className="font-body text-secondary/70 mt-4 min-h-12 text-sm leading-relaxed"
      >
        {picked ? (
          <>
            <span className="text-secondary font-bold">{picked.title}. </span>
            {picked.detail}
          </>
        ) : (
          "Select any part of the stack to see what it does and how it connects."
        )}
      </figcaption>
    </figure>
  );
}
