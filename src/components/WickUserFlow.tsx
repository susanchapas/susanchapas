"use client";

import { useId, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";

type Kind = "start" | "decision" | "screen" | "page";
type Pt = [number, number];

interface FlowNode {
  id: string;
  label: string[];
  kind: Kind;
  x: number;
  y: number;
}

interface FlowEdge {
  from: string;
  to: string;
  points: Pt[];
  label?: string;
  at?: Pt;
  dashed?: boolean;
  red?: boolean;
}

const W = 108;
const H = 62;
const D = 49;

const nodes: FlowNode[] = [
  { id: "home", label: ["wick.courses"], kind: "start", x: 117, y: 508 },
  { id: "new", label: ["New", "visitor?"], kind: "decision", x: 272, y: 508 },
  { id: "welcome", label: ["Welcome"], kind: "page", x: 565, y: 469 },
  { id: "access", label: ["Access"], kind: "page", x: 789, y: 469 },
  { id: "awareness", label: ["Awareness"], kind: "page", x: 990, y: 469 },
  { id: "grove", label: ["Grove"], kind: "screen", x: 1234, y: 508 },
  { id: "guide", label: ["Field Guide"], kind: "screen", x: 1234, y: 616 },
  { id: "journey", label: ["Journey"], kind: "screen", x: 1234, y: 386 },
  { id: "coaching", label: ["Coaching"], kind: "screen", x: 1064, y: 338 },
  { id: "trails", label: ["Trails"], kind: "screen", x: 1620, y: 449 },
  { id: "studio", label: ["Scenario Studio"], kind: "page", x: 1883, y: 449 },
  { id: "settings", label: ["Settings"], kind: "page", x: 1883, y: 619 },
  { id: "note", label: ["Content note"], kind: "page", x: 1883, y: 184 },
  { id: "clearing", label: ["Clearing"], kind: "page", x: 1450, y: 127 },
  { id: "stepout", label: ["Step", "out?"], kind: "decision", x: 1626, y: 127 },
  { id: "begin", label: ["Start?"], kind: "decision", x: 1069, y: 212 },
  { id: "end", label: ["End", "session?"], kind: "decision", x: 730, y: 111 },
];

const edges: FlowEdge[] = [
  {
    from: "home",
    to: "new",
    points: [
      [171, 508],
      [220, 508],
    ],
  },
  {
    from: "new",
    to: "welcome",
    points: [
      [322, 508],
      [334, 508],
      [334, 469],
      [509, 469],
    ],
    label: "Via /welcome URL",
    at: [423, 469],
  },
  {
    from: "new",
    to: "grove",
    points: [
      [322, 508],
      [334, 508],
      [334, 546],
      [1141, 546],
      [1141, 508],
      [1178, 508],
    ],
    label: "Direct to /",
    at: [737, 546],
  },
  {
    from: "welcome",
    to: "access",
    points: [
      [619, 469],
      [733, 469],
    ],
    label: "Begin with Wick",
    at: [677, 469],
  },
  {
    from: "access",
    to: "awareness",
    points: [
      [843, 469],
      [934, 469],
    ],
    label: "Continue",
    at: [889, 469],
  },
  {
    from: "awareness",
    to: "grove",
    points: [
      [1044, 469],
      [1141, 469],
      [1141, 508],
      [1178, 508],
    ],
    label: "I understand",
    at: [1095, 469],
  },
  {
    from: "grove",
    to: "trails",
    points: [
      [1288, 508],
      [1374, 508],
      [1374, 542],
      [1543, 542],
      [1543, 449],
      [1564, 449],
    ],
    label: "Browse",
    at: [1457, 542],
  },
  {
    from: "grove",
    to: "note",
    points: [
      [1288, 508],
      [1326, 508],
      [1326, 302],
      [1806, 302],
      [1806, 206],
      [1827, 206],
    ],
    label: "Map pin",
    at: [1565, 302],
  },
  {
    from: "journey",
    to: "trails",
    points: [
      [1288, 386],
      [1357, 386],
      [1357, 410],
      [1527, 410],
      [1527, 449],
      [1564, 449],
    ],
    label: "Find a trail",
    at: [1442, 410],
  },
  {
    from: "trails",
    to: "guide",
    points: [
      [1566, 449],
      [1527, 449],
      [1527, 483],
      [1357, 483],
      [1357, 605],
      [1290, 605],
    ],
    label: "Deep links",
    at: [1442, 483],
  },
  {
    from: "trails",
    to: "note",
    points: [
      [1674, 430],
      [1698, 430],
      [1698, 285],
      [1790, 285],
      [1790, 195],
      [1827, 195],
    ],
    label: "Pick a trail",
    at: [1743, 285],
  },
  {
    from: "trails",
    to: "studio",
    points: [
      [1676, 449],
      [1698, 449],
      [1698, 438],
      [1827, 438],
    ],
    label: "Create scenario",
    at: [1761, 438],
  },
  {
    from: "studio",
    to: "trails",
    points: [
      [1829, 459],
      [1698, 459],
      [1698, 449],
      [1676, 449],
    ],
    label: "Cancel",
    at: [1761, 459],
  },
  {
    from: "coaching",
    to: "journey",
    points: [
      [1118, 338],
      [1141, 338],
      [1141, 386],
      [1178, 386],
    ],
  },
  {
    from: "coaching",
    to: "note",
    points: [
      [1118, 338],
      [1141, 338],
      [1141, 269],
      [1775, 269],
      [1775, 184],
      [1827, 184],
    ],
    label: "Try again",
    at: [1457, 269],
  },
  {
    from: "note",
    to: "begin",
    points: [
      [1829, 174],
      [1760, 174],
      [1760, 204],
      [1141, 204],
      [1141, 212],
      [1119, 212],
    ],
  },
  {
    from: "begin",
    to: "clearing",
    points: [
      [1109, 199],
      [1141, 199],
      [1141, 147],
      [1310, 147],
      [1310, 127],
      [1394, 127],
    ],
    label: "Start role-play",
    at: [1226, 147],
  },
  {
    from: "begin",
    to: "trails",
    points: [
      [1109, 225],
      [1157, 225],
      [1157, 302],
      [1310, 302],
      [1310, 341],
      [1543, 341],
      [1543, 449],
      [1564, 449],
    ],
    label: "Back",
    at: [1427, 341],
  },
  {
    from: "clearing",
    to: "stepout",
    points: [
      [1504, 127],
      [1576, 127],
    ],
  },
  {
    from: "stepout",
    to: "note",
    points: [
      [1676, 127],
      [1760, 127],
      [1760, 163],
      [1827, 163],
    ],
    label: "Yes - no eval",
    at: [1760, 146],
  },
  {
    from: "stepout",
    to: "end",
    points: [
      [1578, 118],
      [789, 118],
      [789, 98],
      [771, 98],
    ],
    label: "No",
    at: [1185, 118],
    red: true,
  },
  {
    from: "end",
    to: "clearing",
    points: [
      [780, 111],
      [800, 111],
      [800, 106],
      [1310, 106],
      [1310, 127],
      [1394, 127],
    ],
    label: "Keep practicing",
    at: [1056, 106],
  },
  {
    from: "end",
    to: "coaching",
    points: [
      [769, 124],
      [801, 124],
      [801, 338],
      [1008, 338],
    ],
    label: "End and get feedback",
    at: [801, 231],
  },
  {
    from: "grove",
    to: "settings",
    points: [
      [1288, 508],
      [1311, 508],
      [1311, 728],
      [1775, 728],
      [1775, 619],
      [1827, 619],
    ],
    label: "Sidebar",
    at: [1543, 728],
    dashed: true,
  },
  {
    from: "journey",
    to: "settings",
    points: [
      [1288, 386],
      [1342, 386],
      [1342, 594],
      [1759, 594],
      [1759, 619],
      [1827, 619],
    ],
    label: "Sidebar",
    at: [1550, 594],
    dashed: true,
  },
  {
    from: "guide",
    to: "settings",
    points: [
      [1288, 627],
      [1326, 627],
      [1326, 661],
      [1759, 661],
      [1759, 619],
      [1827, 619],
    ],
    label: "Sidebar",
    at: [1543, 661],
    dashed: true,
  },
  {
    from: "trails",
    to: "settings",
    points: [
      [1620, 479],
      [1620, 619],
      [1827, 619],
    ],
    label: "Sidebar",
    at: [1722, 619],
    dashed: true,
  },
];

const nodeById = Object.fromEntries(nodes.map((n) => [n.id, n]));

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

function describe(id: string) {
  const out = edges
    .filter((e) => e.from === id)
    .map((e) => `${e.label ? `${e.label} to ` : "to "}${nodeById[e.to].label.join(" ")}`);
  const into = edges
    .filter((e) => e.to === id)
    .map(
      (e) => `from ${nodeById[e.from].label.join(" ")}${e.label ? ` (${e.label})` : ""}`
    );
  return { out, into };
}

const fills: Record<Kind, { fill: string; stroke: string }> = {
  start: { fill: "#ffffff", stroke: "#757575" },
  page: { fill: "#ffffff", stroke: "#757575" },
  screen: { fill: "#cdf4d3", stroke: "#66d575" },
  decision: { fill: "#ffecbd", stroke: "#ffcd29" },
};

const HIGHLIGHT = "#0d99ff";
const BG = "#f4f4f4";
const VIEW = { x: 40, y: 40, w: 1920, h: 720 };
const FULL = `${VIEW.x} ${VIEW.y} ${VIEW.w} ${VIEW.h}`;
const ASPECT = 3 / 2;
const CONTROL =
  "bg-primary text-secondary hover:bg-accent-lime hover:text-primary absolute flex items-center justify-center rounded-full shadow-lg ring-2 ring-white transition disabled:pointer-events-none disabled:opacity-0";
const ARROW = `${CONTROL} top-1/2 h-11 w-11 -translate-y-1/2`;

const journeys = [
  {
    name: "First visit",
    steps: ["home", "new", "welcome", "access", "awareness", "grove"],
  },
  {
    name: "Role-play",
    steps: ["grove", "note", "begin", "clearing", "stepout", "end", "coaching", "note"],
  },
  { name: "Find a trail", steps: ["grove", "trails", "studio", "trails", "note"] },
];

function frame(id: string, w = 360) {
  const { x, y } = nodeById[id];
  const h = w / ASPECT;
  return `${x - w / 2} ${y - h / 2} ${w} ${h}`;
}

export default function WickUserFlow() {
  const [active, setActive] = useState<string | null>(null);
  const [pinned, setPinned] = useState<string | null>(null);
  const [journey, setJourney] = useState<number | null>(null);
  const [step, setStep] = useState(0);
  const reduce = useReducedMotion();
  const path = journey !== null ? journeys[journey].steps : null;
  const stepId = path?.[step];
  const prevId = path?.[step - 1];
  const stepLabel =
    prevId && edges.find((e) => e.from === prevId && e.to === stepId)?.label;
  const current = stepId ?? active ?? pinned;
  const viewBox = stepId ? frame(stepId) : FULL;
  const pick = (i: number | null) => {
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
  const info = current ? describe(current) : null;
  const patternId = useId();
  const togglePin = (id: string) => setPinned((p) => (p === id ? null : id));

  const linked = new Set<string>();
  if (current) {
    linked.add(current);
    edges.forEach((e) => {
      if (e.from === current) linked.add(e.to);
      if (e.to === current) linked.add(e.from);
    });
  }

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
          initial={false}
          animate={{ viewBox }}
          transition={{ duration: reduce ? 0 : 0.6, ease: [0.22, 1, 0.36, 1] }}
          viewBox={viewBox}
          className="block aspect-[3/2] w-full md:aspect-[8/3]"
          role="group"
          aria-label="Wick user flow diagram"
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

          {edges.map((e, i) => {
            const on = !!current && (e.from === current || e.to === current);
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
            return (
              <g
                key={n.id}
                opacity={dim ? 0.3 : 1}
                className="transition-opacity duration-200 outline-none"
                tabIndex={0}
                role="button"
                aria-pressed={pinned === n.id}
                aria-label={n.label.join(" ")}
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
                    stroke={on ? HIGHLIGHT : stroke}
                    strokeWidth="2"
                  />
                ) : (
                  <rect
                    x={n.x - W / 2}
                    y={n.y - H / 2}
                    width={W}
                    height={H}
                    rx={n.kind === "start" ? 30 : 2}
                    fill={fill}
                    stroke={on ? HIGHLIGHT : stroke}
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
            <span className="text-secondary font-bold">
              {nodeById[stepId].label.join(" ")}
            </span>
            {stepLabel && <span className="text-secondary/60"> · {stepLabel}</span>}
          </>
        ) : info && current ? (
          <>
            <span className="text-secondary font-bold">
              {nodeById[current].label.join(" ")}
            </span>
            {info.into.length > 0 && <>. Reached {info.into.join(", ")}</>}
            {info.out.length > 0 && <>. Leads {info.out.join(", ")}</>}.
          </>
        ) : (
          "Select a step to trace its paths, or pick a journey to walk through the flow one step at a time. Green steps are main app screens, yellow steps are decisions, and dashed lines are sidebar links."
        )}
      </figcaption>
    </figure>
  );
}
