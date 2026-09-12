"use client";

import { useRef, useState, useCallback, useEffect } from "react";

const B = "/assets/projects/archlog/ArchLog%20challenge%20pinboard";

const NODES = [
  { label: "To-Do", src: `${B}/To-Do-sticky-note.webp`, ix: 680, iy: 130, s: 195, rx: 8, bare: true, z: 2 },
  { label: "Render", src: `${B}/building-render.webp`, ix: 150, iy: 420, s: 265, rx: 8, bare: false, z: 0 },
  { label: "Sketch Paper", src: `${B}/building-sketch-paper.webp`, ix: 820, iy: 530, s: 195, rx: 8, bare: true, z: 0 },
  { label: "Building Sketch", src: `${B}/building-sketch.webp`, ix: 350, iy: 160, s: 265, rx: 8, bare: false, z: 0 },
  { label: "Site Photo", src: `${B}/building-with-graffiti.webp`, ix: 550, iy: 560, s: 265, rx: 8, bare: false, z: 0 },
  { label: "Cheesecloth", src: `${B}/cheesecloth-texture.webp`, ix: 870, iy: 190, s: 165, rx: 8, bare: true, z: 1 },
  { label: "Concrete", src: `${B}/concrete-texture.webp`, ix: 220, iy: 620, s: 165, rx: 8, bare: true, z: 1 },
  { label: "Crit Notes", src: `${B}/crit-sticky-note.webp`, ix: 490, iy: 310, s: 195, rx: 8, bare: true, z: 2 },
  { label: "Flood Zone", src: `${B}/flood-zone-sticky-note.webp`, ix: 130, iy: 170, s: 195, rx: 8, bare: true, z: 2 },
  { label: "Journal", src: `${B}/house-sketch-in-journal.webp`, ix: 770, iy: 350, s: 265, rx: 8, bare: false, z: 0 },
  { label: "Instagram", src: `${B}/instagram-icon.webp`, ix: 410, iy: 520, s: 180, rx: 48, bare: false, z: 3 },
  { label: "Moss", src: `${B}/moss-texture.webp`, ix: 680, iy: 440, s: 165, rx: 8, bare: true, z: 1 },
  { label: "Circulation", src: `${B}/new-circulation-sticky-note.webp`, ix: 900, iy: 620, s: 195, rx: 8, bare: true, z: 2 },
  { label: "Pinterest", src: `${B}/pinterest-logo.webp`, ix: 160, iy: 280, s: 180, rx: 90, bare: false, z: 3 },
  { label: "Sketchbook", src: `${B}/sketchbook-with-triangle.webp`, ix: 560, iy: 140, s: 265, rx: 8, bare: false, z: 0 },
  { label: "Window Detail", src: `${B}/window-sketch-sticky-note.webp`, ix: 340, iy: 440, s: 195, rx: 8, bare: true, z: 2 },
];

const RENDER_ORDER = NODES.map((_, i) => i).sort((a, b) => NODES[a].z - NODES[b].z);

const EDGES: [number, number][] = [
  [0, 3],
  [0, 9],
  [1, 5],
  [1, 13],
  [2, 8],
  [2, 11],
  [3, 7],
  [4, 12],
  [4, 6],
  [5, 14],
  [6, 15],
  [7, 10],
  [8, 1],
  [9, 12],
  [10, 14],
  [11, 3],
  [13, 15],
  [14, 0],
];

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

export default function NeuralMap() {
  const svgRef = useRef<SVGSVGElement>(null);
  const pos = useRef<Pt[]>(
    NODES.map(() => ({
      x: PAD + Math.random() * (VW - 2 * PAD),
      y: PAD + Math.random() * (VH - 2 * PAD),
      vx: 0,
      vy: 0,
    }))
  );
  const dragging = useRef<number | null>(null);
  const anchors = useRef<(null | { x: number; y: number })[]>(NODES.map(() => null));
  const raf = useRef(0);
  const alive = useRef(false);
  const [hovered, setHovered] = useState<number | null>(null);

  const edgeEls = useRef<(SVGLineElement | null)[]>([]);
  const nodeEls = useRef<(SVGGElement | null)[]>([]);

  const adj = useRef(
    NODES.map((_, i) => {
      const s = new Set<number>();
      for (const [a, b] of EDGES) {
        if (a === i) s.add(b);
        if (b === i) s.add(a);
      }
      return s;
    })
  ).current;

  const sync = useCallback(() => {
    const n = pos.current;
    EDGES.forEach(([a, b], idx) => {
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
  }, []);

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

    for (const [a, b] of EDGES) {
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
  }, [sync]);

  const wake = useCallback(() => {
    if (!alive.current) {
      alive.current = true;
      raf.current = requestAnimationFrame(step);
    }
  }, [step]);

  useEffect(() => {
    wake();
    return () => cancelAnimationFrame(raf.current);
  }, [wake]);

  const toSVG = useCallback((e: React.PointerEvent) => {
    const svg = svgRef.current;
    if (!svg) return { x: 0, y: 0 };
    const ctm = svg.getScreenCTM();
    if (!ctm) return { x: 0, y: 0 };
    return new DOMPoint(e.clientX, e.clientY).matrixTransform(ctm.inverse());
  }, []);

  const onDown = useCallback(
    (i: number, e: React.PointerEvent) => {
      e.preventDefault();
      dragging.current = i;
      anchors.current[i] = null;
      const el = nodeEls.current[i];
      if (el) el.style.cursor = "grabbing";
      setHovered(i);
      pos.current[i].vx = 0;
      pos.current[i].vy = 0;
      wake();
    },
    [wake]
  );

  const onMove = useCallback(
    (e: React.PointerEvent) => {
      if (dragging.current === null) return;
      const p = toSVG(e);
      const n = pos.current[dragging.current];
      n.x = p.x;
      n.y = p.y;
    },
    [toSVG]
  );

  const onUp = useCallback(() => {
    if (dragging.current !== null) {
      const i = dragging.current;
      anchors.current[i] = { x: pos.current[i].x, y: pos.current[i].y };
      pos.current[i].vx = 0;
      pos.current[i].vy = 0;
      const el = nodeEls.current[i];
      if (el) el.style.cursor = "grab";
      dragging.current = null;
    }
  }, []);

  const n = pos.current;

  return (
    <div
      className="relative w-full overflow-hidden rounded-2xl border border-accent-clay/20"
      style={{
        backgroundImage:
          "radial-gradient(rgba(224,159,125,0.18) 1.5px, transparent 1.5px)",
        backgroundSize: "22px 22px",
        backgroundColor: "rgba(224,159,125,0.04)",
      }}
    >
      <svg
        ref={svgRef}
        viewBox={`0 0 ${VW} ${VH}`}
        className="aspect-[4/3] w-full block select-none"
        style={{ touchAction: "none" }}
        onPointerMove={onMove}
        onPointerUp={onUp}
        onPointerLeave={onUp}
      >
        <defs>
          <filter id="nm-glow">
            <feGaussianBlur stdDeviation="4" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          {Array.from(
            new Map(NODES.map((n) => [`${n.s}-${n.rx}`, n])).values()
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

        {EDGES.map(([a, b], idx) => {
          const lit =
            hovered !== null && (hovered === a || hovered === b);
          const dim = hovered !== null && !lit;
          return (
            <line
              key={`${a}-${b}`}
              ref={(el) => { edgeEls.current[idx] = el; }}
              x1={n[a].x}
              y1={n[a].y}
              x2={n[b].x}
              y2={n[b].y}
              stroke={lit ? "#6fcd9d" : "#e09f7d"}
              strokeWidth={lit ? 1.5 : 0.8}
              opacity={lit ? 0.75 : dim ? 0.15 : 0.3}
              filter={lit ? "url(#nm-glow)" : undefined}
              style={{ transition: "stroke 0.2s, opacity 0.2s" }}
            />
          );
        })}

        {RENDER_ORDER.map((i) => {
          const def = NODES[i];
          const s = def.s;
          const hs = s / 2;
          const on = hovered === i;
          const near = hovered !== null && adj[hovered]?.has(i);
          const dim = hovered !== null && !on && !near;

          return (
            <g
              key={i}
              ref={(el) => { nodeEls.current[i] = el; }}
              transform={`translate(${n[i].x},${n[i].y})`}
              style={{ cursor: "grab" }}
              onPointerDown={(e) => onDown(i, e)}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => {
                if (dragging.current === null) setHovered(null);
              }}
            >
              <circle
                cx={0}
                cy={0}
                r={hs + 12}
                fill="transparent"
              />

              <g
                opacity={dim ? 0.7 : 1}
                style={{ transition: "opacity 0.2s" }}
              >
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
                      x={-hs}
                      y={-hs}
                      width={s}
                      height={s}
                      rx={def.rx}
                      fill="none"
                      stroke={
                        on
                          ? "#6fcd9d"
                          : near
                            ? "rgba(111,205,157,0.5)"
                            : "rgba(224,159,125,0.3)"
                      }
                      strokeWidth={on ? 2.5 : near ? 2 : 1}
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
