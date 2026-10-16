"use client";

import { useId, useState } from "react";
import { motion, useAnimate, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";

export type Pt = [number, number];

export interface FlowNode {
  id: string;
  label: string[];
  kind: string;
  x: number;
  y: number;
  /** For `issue` nodes: the step this friction note belongs to. */
  of?: string;
}

export interface FlowEdge {
  from: string;
  to: string;
  points: Pt[];
  label?: string;
  at?: Pt;
  dashed?: boolean;
  red?: boolean;
}

export interface FlowGroup {
  label: string;
  x: number;
  y: number;
  w: number;
  h: number;
  color: string;
}

export interface FlowNote {
  text: string[];
  x: number;
  y: number;
  color: string;
  size?: number;
}

export interface Journey {
  name: string;
  steps: string[];
}

interface UserFlowProps {
  nodes: FlowNode[];
  edges: FlowEdge[];
  journeys: Journey[];
  fills: Record<string, { fill: string; stroke: string }>;
  view: { x: number; y: number; w: number; h: number };
  size: { w: number; h: number };
  label: string;
  legend: string;
  className: string;
  groups?: FlowGroup[];
  notes?: FlowNote[];
  zoom?: number;
}

const D = 49;
const ISSUE = { rx: 64, ry: 47 };
const HIGHLIGHT = "#0d99ff";
const BG = "#f4f4f4";
const ASPECT = 3 / 2;
const CONTROL =
  "bg-primary text-secondary hover:bg-accent-lime hover:text-primary absolute flex items-center justify-center rounded-full shadow-lg ring-2 ring-white transition disabled:pointer-events-none disabled:opacity-0";
const ARROW = `${CONTROL} top-1/2 h-11 w-11 -translate-y-1/2`;

function roundedPath(points: Pt[], r = 8) {
  let d = `M${points[0][0]},${points[0][1]}`;
  for (let i = 1; i < points.length - 1; i++) {
    const [px, py] = points[i - 1];
    const [x, y] = points[i];
    const [nx, ny] = points[i + 1];
    const r1 = Math.min(
      r,
      Math.hypot(x - px, y - py) / 2,
      Math.hypot(nx - x, ny - y) / 2
    );
    const ax = x - Math.sign(x - px) * r1;
    const ay = y - Math.sign(y - py) * r1;
    const bx = x + Math.sign(nx - x) * r1;
    const by = y + Math.sign(ny - y) * r1;
    d += ` L${ax},${ay} Q${x},${y} ${bx},${by}`;
  }
  const [lx, ly] = points[points.length - 1];
  return `${d} L${lx},${ly}`;
}

function arrowHead(points: Pt[], s = 6) {
  const [px, py] = points[points.length - 2];
  const [x, y] = points[points.length - 1];
  const dx = Math.sign(x - px);
  const dy = Math.sign(y - py);
  return `M${x - dx * s - dy * s},${y - dy * s - dx * s} L${x},${y} L${x - dx * s + dy * s},${y - dy * s + dx * s}`;
}

export default function UserFlow({
  nodes,
  edges,
  journeys,
  fills,
  view,
  size,
  label,
  legend,
  className,
  groups = [],
  notes = [],
  zoom = 360,
}: UserFlowProps) {
  const [active, setActive] = useState<string | null>(null);
  const [pinned, setPinned] = useState<string | null>(null);
  const [journey, setJourney] = useState<number | null>(null);
  const [step, setStep] = useState(0);
  const reduce = useReducedMotion();
  const [scope, animate] = useAnimate<SVGSVGElement>();
  const patternId = useId();

  const nodeById = Object.fromEntries(nodes.map((n) => [n.id, n]));
  const name = (id: string) => nodeById[id].label.join(" ");
  const issuesOf = (id: string) =>
    nodes.filter((n) => n.of === id).map((n) => name(n.id));
  const frame = (id: string) => {
    const { x, y } = nodeById[id];
    const h = zoom / ASPECT;
    return `${x - zoom / 2} ${y - h / 2} ${zoom} ${h}`;
  };

  const path = journey !== null ? journeys[journey].steps : null;
  const stepId = path?.[step];
  const prevId = path?.[step - 1];
  const stepLabel =
    prevId && edges.find((e) => e.from === prevId && e.to === stepId)?.label;
  const current = stepId ?? active ?? pinned;
  const currentNode = current ? nodeById[current] : null;
  const viewBox = stepId ? frame(stepId) : `${view.x} ${view.y} ${view.w} ${view.h}`;
  const pick = (i: number | null) => {
    if (!reduce && i !== null && i !== journey && journeys[i].steps[0] === stepId)
      animate(
        journeys[i].steps.map((id) => `[data-node="${id}"]`).join(","),
        { scale: [1, 1.08, 1] },
        { duration: 0.35, ease: "easeInOut" }
      );
    setJourney(i);
    setStep(0);
  };
  const go = (d: 1 | -1) => {
    if (journey === null) return;
    const next = step + d;
    if (next >= 0 && next < journeys[journey].steps.length) return setStep(next);
    const j = journey + d;
    setJourney(j);
    setStep(d > 0 ? 0 : journeys[j].steps.length - 1);
  };
  const togglePin = (id: string) => setPinned((p) => (p === id ? null : id));
  const touches = (e: FlowEdge) =>
    !!current &&
    (e.from === current || e.to === current) &&
    (!path || path.some((id, k) => k > 0 && path[k - 1] === e.from && id === e.to));

  const linked = new Set<string>();
  if (currentNode) {
    linked.add(currentNode.id);
    if (currentNode.of) linked.add(currentNode.of);
    nodes.forEach((n) => n.of === currentNode.id && linked.add(n.id));
    edges.filter(touches).forEach((e) => {
      linked.add(e.from);
      linked.add(e.to);
    });
  }

  const out = current
    ? edges
        .filter((e) => e.from === current)
        .map((e) => `${e.label ? `${e.label} to ` : "to "}${name(e.to)}`)
    : [];
  const into = current
    ? edges
        .filter((e) => e.to === current)
        .map((e) => `from ${name(e.from)}${e.label ? ` (${e.label})` : ""}`)
    : [];
  const issues = current ? issuesOf(current) : [];
  const friction = issues.length > 0 && (
    <span className="text-[#f24822]">. Friction: {issues.join("; ")}</span>
  );

  return (
    <figure className="m-0">
      <div className="mb-4 flex flex-wrap gap-2">
        {journeys.map((j, i) => (
          <button
            key={j.name}
            type="button"
            aria-pressed={journey === i}
            onClick={() => pick(i)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              journey === i
                ? "bg-accent-lime text-primary"
                : "bg-accent-blue/10 text-accent-blue hover:bg-accent-blue/20"
            }`}
          >
            {j.name}
          </button>
        ))}
      </div>
      <div className="border-accent-blue/10 relative overflow-hidden rounded-2xl border">
        <motion.svg
          ref={scope}
          initial={false}
          animate={{ viewBox }}
          transition={{ duration: reduce ? 0 : 0.6, ease: [0.22, 1, 0.36, 1] }}
          viewBox={viewBox}
          className={`block w-full ${className}`}
          role="group"
          aria-label={label}
          onMouseLeave={() => setActive(null)}
          style={{ fontFamily: "Inter, var(--font-dm), system-ui, sans-serif" }}
        >
          <defs>
            <pattern id={patternId} width="16" height="16" patternUnits="userSpaceOnUse">
              <circle cx="1" cy="1" r="0.9" fill="#d4d4d4" />
            </pattern>
          </defs>
          <rect x="-2000" y="-2000" width="6000" height="5000" fill={BG} />
          <rect
            x="-2000"
            y="-2000"
            width="6000"
            height="5000"
            fill={`url(#${patternId})`}
          />

          {groups.map((g) => (
            <g key={g.label} aria-hidden="true">
              <rect
                x={g.x}
                y={g.y}
                width={g.w}
                height={g.h}
                rx="4"
                fill={g.color}
                fillOpacity="0.05"
                stroke={g.color}
                strokeOpacity="0.3"
              />
              <rect
                x={g.x}
                y={g.y - 42}
                width={g.label.length * 11 + 24}
                height="32"
                rx="6"
                fill={g.color}
                fillOpacity="0.2"
                stroke={g.color}
                strokeOpacity="0.6"
              />
              <text
                x={g.x + 12}
                y={g.y - 26}
                dy="0.35em"
                fontSize="20"
                fontWeight="600"
                fill="#1e1e1e"
              >
                {g.label}
              </text>
            </g>
          ))}

          {notes.map((n) => (
            <text
              key={n.text.join(" ")}
              x={n.x}
              y={n.y}
              fontSize={n.size ?? 13}
              fill={n.color}
              opacity={current ? 0.3 : 1}
              className="transition-opacity duration-200"
              aria-hidden="true"
            >
              {n.text.map((line, i) => (
                <tspan key={line} x={n.x} dy={i === 0 ? 0 : "1.5em"}>
                  {line}
                </tspan>
              ))}
            </text>
          ))}

          {edges.map((e, i) => {
            const on = touches(e);
            const dim = !!current && !on;
            const color = on ? HIGHLIGHT : e.red ? "#f24822" : "#757575";
            return (
              <g
                key={i}
                opacity={dim ? 0.15 : 1}
                className="transition-opacity duration-200"
                aria-hidden="true"
              >
                <path
                  d={roundedPath(e.points)}
                  fill="none"
                  stroke={color}
                  strokeWidth={on ? 2.5 : 2}
                  strokeDasharray={e.dashed ? "8 5" : undefined}
                />
                <path
                  d={arrowHead(e.points)}
                  fill="none"
                  stroke={color}
                  strokeWidth={on ? 2.5 : 2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                {e.label && e.at && (
                  <text
                    x={e.at[0]}
                    y={e.at[1]}
                    dy="0.35em"
                    textAnchor="middle"
                    fontSize="12"
                    fill={on ? HIGHLIGHT : "#1e1e1e"}
                    stroke={BG}
                    strokeWidth="10"
                    strokeLinejoin="round"
                    paintOrder="stroke"
                  >
                    {e.label}
                  </text>
                )}
              </g>
            );
          })}

          {nodes.map((n) => {
            const { fill, stroke } = fills[n.kind];
            const on = current === n.id;
            const dim = !!current && !linked.has(n.id);
            const strokeColor = on ? HIGHLIGHT : stroke;
            return (
              <g
                key={n.id}
                data-node={n.id}
                opacity={dim ? 0.3 : 1}
                className="origin-center transition-opacity duration-200 outline-none [transform-box:fill-box]"
                tabIndex={0}
                role="button"
                aria-pressed={pinned === n.id}
                aria-label={name(n.id)}
                onMouseEnter={() => setActive(n.id)}
                onFocus={() => setActive(n.id)}
                onBlur={() => setActive(null)}
                onClick={() => togglePin(n.id)}
                onKeyDown={(ev) => {
                  if (ev.key === "Enter" || ev.key === " ") {
                    ev.preventDefault();
                    togglePin(n.id);
                  }
                  if (ev.key === "Escape") setPinned(null);
                }}
              >
                {n.kind === "decision" ? (
                  <rect
                    x={n.x - D / Math.SQRT2}
                    y={n.y - D / Math.SQRT2}
                    width={D * Math.SQRT2}
                    height={D * Math.SQRT2}
                    rx="3"
                    transform={`rotate(45 ${n.x} ${n.y})`}
                    fill={fill}
                    stroke={strokeColor}
                    strokeWidth="2"
                  />
                ) : n.kind === "issue" ? (
                  <ellipse
                    cx={n.x}
                    cy={n.y}
                    rx={ISSUE.rx}
                    ry={ISSUE.ry}
                    fill={fill}
                    stroke={strokeColor}
                    strokeWidth={on ? 3 : 2}
                  />
                ) : (
                  <rect
                    x={n.x - size.w / 2}
                    y={n.y - size.h / 2}
                    width={size.w}
                    height={size.h}
                    rx={n.kind === "start" ? 30 : 2}
                    fill={fill}
                    stroke={strokeColor}
                    strokeWidth={on ? 3 : 2}
                  />
                )}
                <text x={n.x} y={n.y} textAnchor="middle" fontSize="12" fill="#1e1e1e">
                  {n.label.map((line, i) => (
                    <tspan
                      key={line}
                      x={n.x}
                      dy={i === 0 ? `${0.35 - (n.label.length - 1) * 0.6}em` : "1.2em"}
                    >
                      {line}
                    </tspan>
                  ))}
                </text>
              </g>
            );
          })}
        </motion.svg>
        {path && (
          <>
            <button
              type="button"
              aria-label="Show whole map"
              onClick={() => pick(null)}
              className="bg-primary/75 text-secondary hover:bg-accent-lime hover:text-primary absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-full shadow-md ring-1 ring-white transition"
            >
              <Maximize2 className="h-3.5 w-3.5" />
            </button>
            <button
              type="button"
              aria-label="Previous step"
              disabled={journey === 0 && step === 0}
              onClick={() => go(-1)}
              className={`${ARROW} left-3`}
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              aria-label="Next step"
              disabled={journey === journeys.length - 1 && step === path.length - 1}
              onClick={() => go(1)}
              className={`${ARROW} right-3`}
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </>
        )}
      </div>
      <figcaption
        aria-live="polite"
        className="font-body text-secondary/70 mt-4 min-h-12 text-sm leading-relaxed"
      >
        {path && stepId ? (
          <>
            <span className="text-secondary/50 block text-xs tracking-widest uppercase">
              Step {step + 1} of {path.length}
            </span>
            <span className="text-secondary font-bold">{name(stepId)}</span>
            {stepLabel && <span className="text-secondary/60"> · {stepLabel}</span>}
            {friction}
          </>
        ) : currentNode?.of ? (
          <>
            <span className="font-bold text-[#f24822]">{name(currentNode.id)}</span>.
            Friction at {name(currentNode.of)}.
          </>
        ) : current ? (
          <>
            <span className="text-secondary font-bold">{name(current)}</span>
            {into.length > 0 && <>. Reached {into.join(", ")}</>}
            {out.length > 0 && <>. Leads {out.join(", ")}</>}
            {friction}.
          </>
        ) : (
          legend
        )}
      </figcaption>
    </figure>
  );
}
