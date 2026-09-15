"use client";
"use no memo";

import { useRef, useCallback, useEffect, useState } from "react";

export interface NeuralMapNode {
  label: string;
  src: string;
  s: number;
  rx: number;
  bare: boolean;
  z: number;
}

export interface NeuralMapTheme {
  edge: string;
  highlight: string;
  dot: string;
  bg: string;
  border: string;
}

const DEFAULT_THEME: NeuralMapTheme = {
  edge: "#e09f7d",
  highlight: "#6fcd9d",
  dot: "rgba(224,159,125,0.18)",
  bg: "rgba(224,159,125,0.04)",
  border: "rgba(224,159,125,0.2)",
};

interface Props {
  nodes: NeuralMapNode[];
  edges: [number, number][];
  theme?: Partial<NeuralMapTheme>;
}

function mulberry32(seed: number) {
  return () => {
    seed |= 0; seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const VW = 1000;
const VH = 750;
const PAD = 55;
const REPEL = 40000;
const ATTRACT = 0.015;
const CTR = 0.004;
const DAMP = 0.86;
const STOP = 0.05;

interface Pt {
  x: number;
  y: number;
  vx: number;
  vy: number;
}

function computeInitPos(count: number) {
  const rand = mulberry32(7);
  const cols = 4;
  const rows = Math.ceil(count / cols);
  const colW = (VW - 2 * PAD) / cols;
  const rowH = (VH - 2 * PAD) / rows;
  return Array.from({ length: count }, (_, i) => ({
    x: PAD + (i % cols) * colW + rand() * colW,
    y: PAD + Math.floor(i / cols) * rowH + rand() * rowH,
  }));
}

export default function NeuralMap({ nodes, edges, theme: themeProp }: Props) {
  const t = { ...DEFAULT_THEME, ...themeProp };
  const RENDER_ORDER = nodes.map((_, i) => i).sort((a, b) => nodes[a].z - nodes[b].z);
  const initPos = computeInitPos(nodes.length);

  const svgRef = useRef<SVGSVGElement>(null);
  const pos = useRef<Pt[]>(
    initPos.map((p) => ({ ...p, vx: 0, vy: 0 }))
  );
  const dragging = useRef<number | null>(null);
  const anchors = useRef<(null | { x: number; y: number })[]>(nodes.map(() => null));
  const raf = useRef(0);
  const alive = useRef(false);
  const hovered = useRef<number | null>(null);

  const [resetKey, setResetKey] = useState(0);
  const edgeEls = useRef<(SVGLineElement | null)[]>([]);
  const nodeEls = useRef<(SVGGElement | null)[]>([]);
  const borderEls = useRef<(SVGRectElement | null)[]>([]);

  const adj = useRef(
    nodes.map((_, i) => {
      const s = new Set<number>();
      for (const [a, b] of edges) {
        if (a === i) s.add(b);
        if (b === i) s.add(a);
      }
      return s;
    })
  ).current;

  const sync = useCallback(() => {
    const n = pos.current;
    edges.forEach(([a, b], idx) => {
      const el = edgeEls.current[idx];
      if (!el) return;
      el.setAttribute("x1", String(n[a].x));
      el.setAttribute("y1", String(n[a].y));
      el.setAttribute("x2", String(n[b].x));
      el.setAttribute("y2", String(n[b].y));
    });
    for (let i = 0; i < n.length; i++) {
      const el = nodeEls.current[i];
      if (el) el.setAttribute("transform", `translate(${n[i].x},${n[i].y})`);
    }
  }, [edges]);

  const syncHover = useCallback(() => {
    const h = hovered.current;
    edges.forEach(([a, b], idx) => {
      const el = edgeEls.current[idx];
      if (!el) return;
      const lit = h !== null && (h === a || h === b);
      el.setAttribute("stroke", lit ? t.highlight : t.edge);
      el.setAttribute("stroke-width", lit ? "1.5" : "0.8");
      el.setAttribute("opacity", lit ? "0.75" : "0.3");
    });
    nodes.forEach((def, i) => {
      if (def.bare) return;
      const el = borderEls.current[i];
      if (!el) return;
      const on = h === i;
      const near = h !== null && adj[h]?.has(i);
      el.setAttribute("stroke", on ? t.highlight : near ? `${t.highlight}80` : `${t.edge}4D`);
      el.setAttribute("stroke-width", on ? "2.5" : near ? "2" : "1");
    });
  }, [adj, edges, nodes, t.edge, t.highlight]);

  const step = useCallback(() => {
    const n = pos.current;
    const f = n.map(() => ({ x: 0, y: 0 }));

    for (let i = 0; i < n.length; i++) {
      for (let j = i + 1; j < n.length; j++) {
        const dx = n[j].x - n[i].x;
        const dy = n[j].y - n[i].y;
        const d2 = dx * dx + dy * dy || 1;
        const d = Math.sqrt(d2);
        const isDragged = dragging.current === i || dragging.current === j;
        const fr = (isDragged ? REPEL * 6 : REPEL) / d2;
        f[i].x -= (dx / d) * fr;
        f[i].y -= (dy / d) * fr;
        f[j].x += (dx / d) * fr;
        f[j].y += (dy / d) * fr;
      }
    }

    for (const [a, b] of edges) {
      const dx = n[b].x - n[a].x;
      const dy = n[b].y - n[a].y;
      const d = Math.sqrt(dx * dx + dy * dy) || 1;
      const fa = ATTRACT * d;
      f[a].x += (dx / d) * fa;
      f[a].y += (dy / d) * fa;
      f[b].x -= (dx / d) * fa;
      f[b].y -= (dy / d) * fa;
    }

    let moving = false;
    for (let i = 0; i < n.length; i++) {
      f[i].x += (VW / 2 - n[i].x) * CTR;
      f[i].y += (VH / 2 - n[i].y) * CTR;
      if (n[i].x < PAD) f[i].x += (PAD - n[i].x) * 0.15;
      if (n[i].x > VW - PAD) f[i].x += (VW - PAD - n[i].x) * 0.15;
      if (n[i].y < PAD) f[i].y += (PAD - n[i].y) * 0.15;
      if (n[i].y > VH - PAD) f[i].y += (VH - PAD - n[i].y) * 0.15;
      const anchor = anchors.current[i];
      if (anchor) {
        f[i].x = (anchor.x - n[i].x) * 0.4;
        f[i].y = (anchor.y - n[i].y) * 0.4;
      }
      if (dragging.current === i) continue;
      n[i].vx = (n[i].vx + f[i].x) * DAMP;
      n[i].vy = (n[i].vy + f[i].y) * DAMP;
      if (Math.abs(n[i].vx) < STOP) n[i].vx = 0;
      if (Math.abs(n[i].vy) < STOP) n[i].vy = 0;
      n[i].x += n[i].vx;
      n[i].y += n[i].vy;
      if (n[i].vx || n[i].vy) moving = true;
    }

    sync();

    if (moving || dragging.current !== null) {
      raf.current = requestAnimationFrame(step);
    } else {
      alive.current = false;
    }
  }, [edges, sync]);

  const wake = useCallback(() => {
    if (!alive.current) {
      alive.current = true;
      raf.current = requestAnimationFrame(step);
    }
  }, [step]);

  useEffect(() => {
    wake();
    return () => {
      cancelAnimationFrame(raf.current);
      alive.current = false;
    };
  }, [wake]);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    const getNodeIdx = (target: EventTarget | null): number => {
      const el = (target as Element)?.closest?.("g[data-idx]");
      if (!el) return -1;
      return parseInt(el.getAttribute("data-idx")!, 10);
    };

    const toSVG = (e: PointerEvent) => {
      const r = svg.getBoundingClientRect();
      if (!r.width || !r.height) return { x: 0, y: 0 };
      return {
        x: ((e.clientX - r.left) / r.width) * VW,
        y: ((e.clientY - r.top) / r.height) * VH,
      };
    };

    const onDown = (e: PointerEvent) => {
      const i = getNodeIdx(e.target);
      if (i === -1) return;
      e.preventDefault();
      svg.setPointerCapture(e.pointerId);
      dragging.current = i;
      anchors.current[i] = null;
      const el = nodeEls.current[i];
      if (el) el.style.cursor = "grabbing";
      hovered.current = i;
      syncHover();
      pos.current[i].vx = 0;
      pos.current[i].vy = 0;
      wake();
    };

    const onMove = (e: PointerEvent) => {
      if (dragging.current === null) return;
      const p = toSVG(e);
      const n = pos.current[dragging.current];
      n.x = p.x;
      n.y = p.y;
    };

    const onUp = (e: PointerEvent) => {
      if (dragging.current !== null) {
        const i = dragging.current;
        svg.releasePointerCapture(e.pointerId);
        anchors.current[i] = { x: pos.current[i].x, y: pos.current[i].y };
        pos.current[i].vx = 0;
        pos.current[i].vy = 0;
        const el = nodeEls.current[i];
        if (el) el.style.cursor = "grab";
        dragging.current = null;
      }
    };

    const onOver = (e: MouseEvent) => {
      const i = getNodeIdx(e.target);
      if (i !== -1) {
        hovered.current = i;
        syncHover();
      }
    };

    const onOut = (e: MouseEvent) => {
      if (dragging.current !== null) return;
      const i = getNodeIdx(e.target);
      if (i !== -1) {
        const related = getNodeIdx(e.relatedTarget);
        if (related !== i) {
          hovered.current = null;
          syncHover();
        }
      }
    };

    svg.addEventListener("pointerdown", onDown);
    svg.addEventListener("pointermove", onMove);
    svg.addEventListener("pointerup", onUp);
    svg.addEventListener("pointerleave", onUp);
    svg.addEventListener("mouseover", onOver);
    svg.addEventListener("mouseout", onOut);

    return () => {
      svg.removeEventListener("pointerdown", onDown);
      svg.removeEventListener("pointermove", onMove);
      svg.removeEventListener("pointerup", onUp);
      svg.removeEventListener("pointerleave", onUp);
      svg.removeEventListener("mouseover", onOver);
      svg.removeEventListener("mouseout", onOut);
    };
  }, [wake, syncHover]);

  const reset = useCallback(() => {
    cancelAnimationFrame(raf.current);
    alive.current = false;
    const ip = computeInitPos(nodes.length);
    pos.current = ip.map((p) => ({ ...p, vx: 0, vy: 0 }));
    anchors.current = nodes.map(() => null);
    dragging.current = null;
    hovered.current = null;
    setResetKey((k) => k + 1);
  }, [nodes]);

  useEffect(() => {
    sync();
    wake();
  }, [resetKey, sync, wake]);

  const n = pos.current;

  return (
    <div
      className="relative w-full overflow-hidden rounded-2xl"
      style={{
        backgroundImage: `radial-gradient(${t.dot} 1.5px, transparent 1.5px)`,
        backgroundSize: "22px 22px",
        backgroundColor: t.bg,
        border: `1px solid ${t.border}`,
      }}
    >
      <button
        onClick={reset}
        aria-label="Reset neural map"
        className="absolute top-2 right-2 z-10 flex h-7 w-7 items-center justify-center rounded-md bg-primary/60 backdrop-blur-sm text-secondary/50 hover:text-secondary hover:bg-primary/80 transition-colors"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M1 4v6h6" />
          <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
        </svg>
      </button>
      <svg
        ref={svgRef}
        viewBox={`0 0 ${VW} ${VH}`}
        className="aspect-[4/3] w-full block select-none"
        style={{ touchAction: "none" }}
      >
        <defs>
          {Array.from(
            new Map(nodes.map((n) => [`${n.s}-${n.rx}`, n])).values()
          ).map((n) => (
            <clipPath key={`${n.s}-${n.rx}`} id={`nm-c${n.s}-${n.rx}`}>
              <rect
                x={-n.s / 2}
                y={-n.s / 2}
                width={n.s}
                height={n.s}
                rx={n.rx}
              />
            </clipPath>
          ))}
        </defs>

        {edges.map(([a, b], idx) => (
          <line
            key={`${a}-${b}`}
            ref={(el) => { edgeEls.current[idx] = el; }}
            x1={n[a].x}
            y1={n[a].y}
            x2={n[b].x}
            y2={n[b].y}
            stroke={t.edge}
            strokeWidth={0.8}
            opacity={0.3}
            style={{ transition: "stroke 0.2s, opacity 0.2s" }}
          />
        ))}

        {RENDER_ORDER.map((i) => {
          const def = nodes[i];
          const s = def.s;
          const hs = s / 2;
          return (
            <g
              key={i}
              ref={(el) => { nodeEls.current[i] = el; }}
              data-idx={i}
              transform={`translate(${n[i].x},${n[i].y})`}
              style={{ cursor: "grab" }}
            >
              <circle
                cx={0}
                cy={0}
                r={hs + 12}
                fill="transparent"
              />

              <g>
                {!def.bare && (
                  <rect
                    x={-hs + 3}
                    y={-hs + 3}
                    width={s}
                    height={s}
                    rx={def.rx}
                    fill="rgba(0,0,0,0.12)"
                  />
                )}
                {def.bare ? (
                  <image
                    href={def.src}
                    x={-hs}
                    y={-hs}
                    width={s}
                    height={s}
                    preserveAspectRatio="xMidYMid slice"
                  />
                ) : (
                  <>
                    <g clipPath={`url(#nm-c${s}-${def.rx})`}>
                      <image
                        href={def.src}
                        x={-hs}
                        y={-hs}
                        width={s}
                        height={s}
                        preserveAspectRatio="xMidYMid slice"
                      />
                    </g>
                    <rect
                      ref={(el) => { borderEls.current[i] = el; }}
                      x={-hs}
                      y={-hs}
                      width={s}
                      height={s}
                      rx={def.rx}
                      fill="none"
                      stroke={`${t.edge}4D`}
                      strokeWidth={1}
                      style={{
                        transition: "stroke 0.2s, stroke-width 0.2s",
                      }}
                    />
                  </>
                )}
              </g>
            </g>
          );
        })}

      </svg>
    </div>
  );
}
