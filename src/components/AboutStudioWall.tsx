"use client";

import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import type { Body, Mouse as MatterMouse } from "matter-js";
import {
  ArrowRight,
  Brush,
  Code2,
  Coffee,
  Compass,
  Gamepad2,
  GraduationCap,
  HeartHandshake,
  Languages,
  Layers,
  MapPin,
  MousePointer2,
  Palette,
  PenTool,
  RotateCcw,
  Rocket,
  Utensils,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";

type PinColor = "lime" | "clay" | "blue";

interface Facet {
  id: string;
  kicker: string;
  title: string;
  detail: string;
  Icon: typeof Brush;
  pin: PinColor;
  tags?: string[];
  image?: string;
  href?: string;
  linkLabel?: string;
  rot: number;
  pos: { x: number; y: number };
}

const FACETS: Facet[] = [
  {
    id: "intro",
    kicker: "Based in Jersey City",
    title: "Hi, I'm Susan Chapas",
    detail:
      "I'm a UX strategist, front-end developer, and artist. I love the whole arc: learning what people need, designing it to work for everyone, then building it.",
    Icon: MousePointer2,
    pin: "lime",
    image: "/assets/misc/susan-umbrella.webp",
    rot: -7,
    pos: { x: 0.16, y: 0.28 },
  },
  {
    id: "art",
    kicker: "Award-winning art",
    title: "Mindless Mirth",
    detail:
      "Off the clock, I paint. My piece “Mindless Mirth” won recognition for exploring human emotion through abstraction. Art keeps me tuned to how work feels.",
    Icon: Brush,
    pin: "clay",
    image: "/gallery/Mindless-Mirth-final.webp",
    href: "/gallery",
    linkLabel: "See the gallery",
    rot: 6,
    pos: { x: 0.82, y: 0.26 },
  },
  {
    id: "design",
    kicker: "How I approach work",
    title: "Designed for everyone",
    detail:
      "Accessibility is my starting point. If it works for someone using a screen reader, a keyboard, or a second language, it's ready to ship.",
    Icon: PenTool,
    pin: "clay",
    tags: ["UX Research", "Figma", "Accessibility", "Branding"],
    rot: 9,
    pos: { x: 0.27, y: 0.17 },
  },
  {
    id: "founder",
    kicker: "Did the scary thing",
    title: "I built an agency",
    detail:
      "At Schematic Marketing I ran everything: pitching, branding, building, invoicing. Founding a company from scratch teaches you fast what matters.",
    Icon: Rocket,
    pin: "lime",
    tags: ["Schematic Marketing", "Branding", "Web"],
    rot: 7,
    pos: { x: 0.2, y: 0.72 },
  },
  {
    id: "code",
    kicker: "Designer who codes",
    title: "Then I ship it",
    detail:
      "I build the front end myself, so the design that ships is the design I drew. The handoff is just me handing it to me.",
    Icon: Code2,
    pin: "lime",
    tags: ["Next.js", "TypeScript", "React"],
    rot: -8,
    pos: { x: 0.72, y: 0.38 },
  },
  {
    id: "sectors",
    kicker: "Banks to nonprofits",
    title: "Sector-fluent",
    detail:
      "I've run marketing across banking, real estate, healthcare, and nonprofits. I learn the room first, then make work that fits it.",
    Icon: Compass,
    pin: "clay",
    tags: ["Banking", "Real Estate", "Healthcare", "Nonprofits"],
    rot: 10,
    pos: { x: 0.56, y: 0.71 },
  },
  {
    id: "voice",
    kicker: "Bilingual",
    title: "Hablo español",
    detail:
      "Fully fluent in English and Spanish. I move between audiences, teams, and communities while keeping the meaning intact.",
    Icon: Languages,
    pin: "blue",
    tags: ["English / Español", "Community Outreach"],
    rot: -9,
    pos: { x: 0.9, y: 0.56 },
  },
  {
    id: "learning",
    kicker: "Still a student",
    title: "Always learning",
    detail:
      "I'm finishing a BS in Human-Computer Interaction at NJIT, after a full-stack program at MIT xPRO. I like to keep learning.",
    Icon: GraduationCap,
    pin: "blue",
    tags: ["HCI @ NJIT", "MIT xPRO"],
    rot: -4,
    pos: { x: 0.3, y: 0.4 },
  },
  {
    id: "range",
    kicker: "Five hats, one head",
    title: "I don't pick a lane",
    detail:
      "Marketing, UX, front-end code, fine art, and two languages. I'm wired to connect all of them.",
    Icon: Layers,
    pin: "clay",
    rot: -6,
    pos: { x: 0.53, y: 0.84 },
  },
  {
    id: "community",
    kicker: "Plugged into my city",
    title: "Community-rooted",
    detail:
      "From bank outreach to event planning, I gravitate to work that touches its neighborhood.",
    Icon: HeartHandshake,
    pin: "blue",
    tags: ["Community Outreach", "Event Planning"],
    rot: 8,
    pos: { x: 0.74, y: 0.86 },
  },
  {
    id: "location",
    kicker: "Jersey City & NYC",
    title: "A metro-area local",
    detail:
      "Based in Jersey City, with most of my days spent across the river in NYC. The whole metro is home turf.",
    Icon: MapPin,
    pin: "blue",
    rot: 6,
    pos: { x: 0.45, y: 0.12 },
  },
  {
    id: "design-love",
    kicker: "All kinds of design",
    title: "Digital and print",
    detail:
      "I love design in every format. Digital work like graphics and illustration, plus print pieces like banners and brochures.",
    Icon: Palette,
    pin: "clay",
    tags: ["Graphics", "Illustration", "Print"],
    rot: 7,
    pos: { x: 0.11, y: 0.88 },
  },
  {
    id: "nintendo",
    kicker: "Off-hours obsession",
    title: "Chasing Korok seeds",
    detail:
      "Big Nintendo fan, especially The Legend of Zelda. When I'm not designing, you'll find me hunting down Korok seeds.",
    Icon: Gamepad2,
    pin: "lime",
    tags: ["Nintendo", "Zelda"],
    rot: -8,
    pos: { x: 0.12, y: 0.56 },
  },
  {
    id: "food",
    kicker: "Adventurous eater",
    title: "No picky eaters allowed",
    detail:
      "I love trying new food, so picky eaters don't last long in my circle. Current NYC guilty pleasure: Top Thai on 55 Carmine.",
    Icon: Utensils,
    pin: "clay",
    rot: -6,
    pos: { x: 0.9, y: 0.84 },
  },
  {
    id: "coffee",
    kicker: "Fueled by caffeine",
    title: "Certified coffee addict",
    detail:
      "My family grows coffee in Honduras, and it's pretty much all I drink. It counts as water, right?",
    Icon: Coffee,
    pin: "lime",
    rot: 8,
    pos: { x: 0.88, y: 0.13 },
  },
];

const PIN_BAR: Record<PinColor, string> = {
  lime: "bg-accent-lime",
  clay: "bg-accent-clay",
  blue: "bg-accent-blue",
};

function TileFace({ facet }: { facet: Facet }) {
  return (
    <>
      <span aria-hidden="true" className={cn("h-1 w-full rounded-full", PIN_BAR[facet.pin])} />
      {facet.image && (
        <span className="bg-primary/5 relative block aspect-[4/3] w-full overflow-hidden rounded-md">
          <Image
            src={encodeURI(facet.image)}
            alt={facet.id === "intro" ? "Susan Chapas" : facet.title}
            fill
            sizes="180px"
            className="object-cover"
            draggable={false}
          />
        </span>
      )}
      <span className="font-body text-primary/50 flex items-center gap-1.5 text-[0.65rem] font-semibold tracking-widest uppercase">
        <facet.Icon className="h-3.5 w-3.5" aria-hidden="true" />
        {facet.kicker}
      </span>
      <span className="font-display text-lg leading-tight font-bold">{facet.title}</span>
    </>
  );
}

function PhysicsBoard({
  onActivate,
  resetRef,
}: {
  onActivate: () => void;
  resetRef: React.RefObject<(() => void) | null>;
}) {
  const boardRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [ready, setReady] = useState(false);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia("(min-width: 1024px)");
    const update = () => setEnabled(mql.matches);
    update();
    mql.addEventListener("change", update);
    return () => mql.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const board = boardRef.current;
    if (!board) return;
    let raf = 0;
    let stop = false;
    const cleanups: (() => void)[] = [];

    (async () => {
      const Matter = await import("matter-js");
      const { Engine, Bodies, Body, Composite, Events, Mouse, MouseConstraint } = Matter;
      if (stop) return;

      let W = board.clientWidth;
      let H = board.clientHeight;
      const engine = Engine.create();
      engine.gravity.y = 0;
      engine.gravity.x = 0;
      engine.positionIterations = 12;
      engine.velocityIterations = 10;

      const sizes: { hw: number; hh: number }[] = [];
      const tiles: Body[] = FACETS.map((f, i) => {
        const node = nodeRefs.current[i]!;
        const w = node.offsetWidth;
        const h = node.offsetHeight;
        sizes[i] = { hw: w / 2, hh: h / 2 };
        const body = Bodies.rectangle(f.pos.x * W, f.pos.y * H, w, h, {
          restitution: 0.7,
          frictionAir: 0.06,
          friction: 0.05,
          chamfer: { radius: 10 },
        });
        Body.setAngle(body, (f.rot * Math.PI) / 180);
        return body;
      });

      const mouse = Mouse.create(board) as MatterMouse & {
        mousemove: (e: Event) => void;
        mouseup: (e: Event) => void;
      };
      board.removeEventListener("mousemove", mouse.mousemove);
      board.removeEventListener("mouseup", mouse.mouseup);
      window.addEventListener("mousemove", mouse.mousemove, { passive: true });
      window.addEventListener("mouseup", mouse.mouseup, { passive: true });
      const mouseConstraint = MouseConstraint.create(engine, {
        mouse,
        constraint: { stiffness: 0.2, render: { visible: false } },
      });

      Composite.add(engine.world, [...tiles, mouseConstraint]);

      const releaseMouse = () => {
        mouse.button = -1;
      };
      window.addEventListener("blur", releaseMouse);
      window.addEventListener("pointerup", releaseMouse);
      cleanups.push(() => {
        window.removeEventListener("mousemove", mouse.mousemove);
        window.removeEventListener("mouseup", mouse.mouseup);
        window.removeEventListener("blur", releaseMouse);
        window.removeEventListener("pointerup", releaseMouse);
      });

      let stretchX = 0;
      let stretchY = 0;
      Events.on(mouseConstraint, "startdrag", () => {
        stretchX = 0;
        stretchY = 0;
        onActivate();
      });
      Events.on(mouseConstraint, "enddrag", (event) => {
        const body = (event as unknown as { body?: Body }).body;
        if (!body || (stretchX === 0 && stretchY === 0)) return;
        const SLING = 0.12;
        Body.setVelocity(body, {
          x: body.velocity.x - stretchX * SLING,
          y: body.velocity.y - stretchY * SLING,
        });
      });

      resetRef.current = () => {
        tiles.forEach((b, i) => {
          Body.setPosition(b, { x: FACETS[i].pos.x * W, y: FACETS[i].pos.y * H });
          Body.setAngle(b, (FACETS[i].rot * Math.PI) / 180);
          Body.setVelocity(b, { x: 0, y: 0 });
          Body.setAngularVelocity(b, 0);
        });
      };

      const MAX_SPEED = 45;
      const BORDER_PULL = 0.012;
      let last = performance.now();
      const update = (now: number) => {
        const dt = Math.min(now - last, 1000 / 30);
        last = now;
        if (mouseConstraint.body) {
          stretchX =
            mouse.position.x > W
              ? mouse.position.x - W
              : mouse.position.x < 0
                ? mouse.position.x
                : 0;
          stretchY =
            mouse.position.y > H
              ? mouse.position.y - H
              : mouse.position.y < 0
                ? mouse.position.y
                : 0;
          mouse.position.x = Math.max(0, Math.min(W, mouse.position.x));
          mouse.position.y = Math.max(0, Math.min(H, mouse.position.y));
        }
        Engine.update(engine, dt);
        tiles.forEach((b, i) => {
          const speed = Math.hypot(b.velocity.x, b.velocity.y);
          if (speed > MAX_SPEED) {
            Body.setVelocity(b, {
              x: (b.velocity.x / speed) * MAX_SPEED,
              y: (b.velocity.y / speed) * MAX_SPEED,
            });
          }
          if (mouseConstraint.body !== b) {
            const { min, max } = b.bounds;
            const bw = max.x - min.x;
            const bh = max.y - min.y;
            let ax = 0;
            let ay = 0;
            if (max.x > W) ax -= BORDER_PULL * Math.sin(Math.PI * Math.min(1, (max.x - W) / bw));
            if (min.x < 0) ax += BORDER_PULL * Math.sin(Math.PI * Math.min(1, -min.x / bw));
            if (max.y > H) ay -= BORDER_PULL * Math.sin(Math.PI * Math.min(1, (max.y - H) / bh));
            if (min.y < 0) ay += BORDER_PULL * Math.sin(Math.PI * Math.min(1, -min.y / bh));
            if (ax || ay) {
              Body.setVelocity(b, {
                x: b.velocity.x + ax * dt,
                y: b.velocity.y + ay * dt,
              });
            }
            let tx = 0;
            let ty = 0;
            if (min.x > W) tx = -(W + bw);
            else if (max.x < 0) tx = W + bw;
            if (min.y > H) ty = -(H + bh);
            else if (max.y < 0) ty = H + bh;
            if (tx || ty) Body.translate(b, { x: tx, y: ty });
          }
          const node = nodeRefs.current[i];
          if (!node) return;
          node.style.transform = `translate(${b.position.x - sizes[i].hw}px, ${b.position.y - sizes[i].hh}px) rotate(${b.angle}rad)`;
          node.style.setProperty("--tile-angle", `${b.angle}rad`);
        });
        raf = requestAnimationFrame(update);
      };
      raf = requestAnimationFrame(update);
      setReady(true);

      const onResize = () => {
        W = board.clientWidth;
        H = board.clientHeight;
      };
      const ro = new ResizeObserver(onResize);
      ro.observe(board);

      cleanups.push(() => {
        resetRef.current = null;
        ro.disconnect();
        Composite.clear(engine.world, false);
        Engine.clear(engine);
      });
    })();

    return () => {
      stop = true;
      cancelAnimationFrame(raf);
      cleanups.forEach((fn) => fn());
    };
  }, [enabled, onActivate]);

  return (
    <div
      ref={boardRef}
      className="border-accent-clay/20 bg-accent-clay/[0.06] relative hidden h-[32rem] w-full touch-none overflow-hidden rounded-3xl border lg:absolute lg:inset-0 lg:block lg:h-full lg:rounded-none lg:border-0"
      style={{
        backgroundImage: "radial-gradient(rgba(224,159,125,0.18) 1.5px, transparent 1.5px)",
        backgroundSize: "22px 22px",
      }}
    >
      <div className="pointer-events-none absolute inset-0 z-0 flex flex-col items-center justify-center px-8 text-center">
        <h1 className="text-gradient font-display text-5xl font-bold sm:text-6xl">About Me</h1>
        <p className="font-body text-secondary/70 mt-6 max-w-xl text-lg lg:text-xl">
          Everything that shapes how I work, laid out on the board below. Grab a tile, toss it
          around, and check out whatever catches your eye.
        </p>
      </div>
      {FACETS.map((f, i) => (
        <button
          key={f.id}
          ref={(el) => {
            nodeRefs.current[i] = el;
          }}
          type="button"
          aria-describedby={`facet-tip-${f.id}`}
          style={{ transform: `translate(${f.pos.x * 1100}px, ${f.pos.y * 512}px)` }}
          className={cn(
            "group bg-secondary text-primary absolute top-0 left-0 z-10 flex w-44 cursor-grab touch-none flex-col gap-2 rounded-xl p-4 text-left shadow-xl outline-none select-none will-change-transform hover:z-20 focus-visible:z-20 active:cursor-grabbing",
            "ring-1 ring-black/5 hover:ring-accent-lime hover:shadow-accent-lime/30 hover:ring-2",
            "focus-visible:ring-accent-lime focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-primary",
            ready ? "opacity-100" : "opacity-0",
          )}
        >
          <TileFace facet={f} />
          <span
            role="tooltip"
            id={`facet-tip-${f.id}`}
            style={{
              transform: `rotate(calc(var(--tile-angle, 0rad) * -1)) translate(-50%, ${
                f.pos.y > 0.6 ? "calc(-100% - 0.6rem)" : "0.6rem"
              })`,
            }}
            className="ring-accent-lime/20 pointer-events-none absolute top-1/2 left-1/2 z-10 w-64 origin-top-left rounded-xl bg-[#091a35] p-4 text-left opacity-0 shadow-[0_20px_45px_-12px_rgba(0,0,0,0.75)] ring-1 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100"
          >
            <span
              aria-hidden="true"
              className={cn(
                "absolute left-1/2 h-3 w-3 -translate-x-1/2 rotate-45 bg-[#091a35]",
                f.pos.y > 0.6 ? "bottom-0 translate-y-1/2" : "top-0 -translate-y-1/2",
              )}
            />
            <span className="text-secondary/80 font-body block text-sm leading-relaxed">
              {f.detail}
            </span>
          </span>
        </button>
      ))}
    </div>
  );
}

function MobileTile({
  facet,
  selected,
  animate,
  onSelect,
}: {
  facet: Facet;
  selected: boolean;
  animate: boolean;
  onSelect: (id: string) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const scale = useTransform(scrollYProgress, [0.18, 0.5, 0.82], [0.82, 1, 0.82]);
  const dim = useTransform(scrollYProgress, [0.28, 0.5, 0.72], [0.6, 0, 0.6]);

  return (
    <motion.div ref={ref} style={animate ? { scale } : undefined} className="relative">
      <button
        type="button"
        onClick={() => onSelect(facet.id)}
        onFocus={() => onSelect(facet.id)}
        className={cn(
          "bg-secondary text-primary flex w-full flex-col gap-2 rounded-xl p-4 text-left shadow-xl outline-none transition-shadow",
          "focus-visible:ring-accent-lime focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-primary",
          selected
            ? "ring-accent-lime shadow-accent-lime/30 ring-2"
            : "ring-1 ring-black/5 hover:shadow-2xl",
        )}
      >
        <TileFace facet={facet} />
      </button>
      {animate && (
        <motion.span
          aria-hidden="true"
          style={{ opacity: dim }}
          className="bg-primary pointer-events-none absolute inset-0 rounded-xl"
        />
      )}
    </motion.div>
  );
}

function DrawerContent({
  node,
  onClose,
  className,
}: {
  node: Facet;
  onClose: () => void;
  className?: string;
}) {
  return (
    <div
      aria-live="polite"
      className={cn(
        "ring-accent-lime/20 relative overflow-hidden bg-[#091a35] px-8 pt-11 pb-8 ring-1",
        className,
      )}
    >
      <motion.span
        key={`bar-${node.id}`}
        aria-hidden="true"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "absolute inset-x-0 top-0 h-1.5 origin-left rounded-t-none",
          PIN_BAR[node.pin],
        )}
      />
      <span
        aria-hidden="true"
        className="bg-secondary/20 absolute top-3.5 left-1/2 h-1 w-10 -translate-x-1/2 rounded-full"
      />
      <button
        type="button"
        onClick={onClose}
        aria-label="Close"
        className="text-secondary/50 hover:text-accent-lime hover:border-accent-lime/50 border-accent-blue/20 absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-full border bg-white/5 transition-colors"
      >
        <X className="h-4 w-4" />
      </button>
      <span className="text-secondary/35 font-display absolute top-4 left-8 text-[0.6rem] tracking-[0.2em] uppercase">
        Pulled from the board
      </span>
      <motion.div
        key={node.id}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="grid gap-6 lg:grid-cols-[1fr_1.4fr] lg:items-center"
      >
        <div>
          <span className="text-accent-lime font-display mb-3 flex items-center gap-2 text-xs tracking-widest uppercase">
            <node.Icon className="h-4 w-4" aria-hidden="true" /> {node.kicker}
          </span>
          <h3 className="font-display text-secondary text-2xl font-bold lg:text-3xl">
            {node.title}
          </h3>
        </div>
        <div>
          <p className="text-secondary/70 font-body mb-5">{node.detail}</p>
          {node.tags && (
            <ul className="flex flex-wrap gap-2">
              {node.tags.map((tag) => (
                <li
                  key={tag}
                  className="border-accent-blue/20 text-secondary/80 font-body rounded-full border bg-white/5 px-3 py-1 text-sm"
                >
                  {tag}
                </li>
              ))}
            </ul>
          )}
          {node.href && (
            <Link
              href={node.href}
              className="text-accent-lime font-display mt-5 inline-flex items-center gap-2 font-semibold transition-all hover:gap-3"
            >
              {node.linkLabel}
              <ArrowRight className="h-4 w-4" />
            </Link>
          )}
        </div>
      </motion.div>
    </div>
  );
}

export default function AboutStudioWall() {
  const reduce = useReducedMotion();
  const heroMode = !reduce;
  const [selected, setSelected] = useState<string>(FACETS[0].id);
  const [open, setOpen] = useState(false);
  const [activated, setActivated] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const openRef = useRef(false);
  const resetRef = useRef<(() => void) | null>(null);
  const node = FACETS.find((f) => f.id === selected)!;

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- portal needs document, mount flag is the standard SSR-safe gate
    setMounted(true);
  }, []);

  const handleActivate = useCallback(() => setActivated(true), []);

  const isDesktop = () =>
    typeof window !== "undefined" && window.matchMedia("(min-width: 1024px)").matches;

  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["start start", "end start"],
  });
  const sheetOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const handleSelect = useCallback((id: string) => {
    setSelected(id);
    openRef.current = true;
    setOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    openRef.current = false;
    setOpen(false);
  }, []);

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    if (value >= 0.55 && openRef.current && !isDesktop()) handleClose();
  });

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, handleClose]);

  return (
    <div
      className={cn(
        "mx-auto max-w-7xl px-6",
        heroMode && "lg:mx-0 lg:h-[100dvh] lg:max-w-none lg:px-0",
      )}
    >
      <div
        ref={wrapperRef}
        className={cn("relative scroll-mt-20 lg:scroll-mt-12", heroMode && "lg:h-full")}
      >
        <div
          className={cn(
            "mb-4 flex items-center justify-between gap-3",
            heroMode &&
              "lg:pointer-events-none lg:absolute lg:inset-x-0 lg:top-0 lg:z-20 lg:mb-0 lg:px-8 lg:pt-6",
          )}
        >
          <p
            className={cn(
              "text-secondary/40 font-body flex items-center gap-2 text-sm",
              heroMode && "lg:hidden",
            )}
          >
            <MousePointer2 className="h-4 w-4" aria-hidden="true" />
            <span className="hidden lg:inline">Click a tile to read more.</span>
            <span className="lg:hidden">Tap a tile to read more.</span>
          </p>
          <motion.button
            type="button"
            onClick={() => resetRef.current?.()}
            initial={{ opacity: 0 }}
            animate={{ opacity: activated ? 1 : 0 }}
            transition={{ duration: 3, ease: "easeOut" }}
            aria-hidden={!activated}
            tabIndex={activated ? 0 : -1}
            style={{ pointerEvents: activated ? "auto" : "none" }}
            className="bg-accent-blue text-primary hover:bg-accent-blue/90 focus-visible:ring-accent-blue focus-visible:ring-offset-primary ml-auto hidden shrink-0 items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold shadow-md transition-all hover:shadow-lg focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none lg:inline-flex"
          >
            <RotateCcw className="h-4 w-4" aria-hidden="true" />
            Reset board
          </motion.button>
        </div>

        {!reduce && <PhysicsBoard onActivate={handleActivate} resetRef={resetRef} />}

        <div
          style={{
            backgroundImage: "radial-gradient(rgba(224,159,125,0.18) 1.5px, transparent 1.5px)",
            backgroundSize: "22px 22px",
          }}
          className={cn(
            "border-accent-clay/20 bg-accent-clay/[0.06] grid grid-cols-2 items-start gap-2 rounded-3xl border p-3 sm:grid-cols-3 sm:gap-3 lg:grid-cols-5",
            reduce ? "grid" : "lg:hidden",
          )}
        >
          {FACETS.map((f) => (
            <MobileTile
              key={f.id}
              facet={f}
              selected={selected === f.id}
              animate={!reduce}
              onSelect={handleSelect}
            />
          ))}
        </div>

        <AnimatePresence initial={false}>
          {!heroMode && open && (
            <motion.div
              key="desktop-drawer"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="relative mt-3 hidden overflow-hidden lg:block"
            >
              <DrawerContent
                node={node}
                onClose={handleClose}
                className="rounded-2xl shadow-[0_28px_55px_-12px_rgba(0,0,0,0.7)]"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {mounted &&
        createPortal(
          <AnimatePresence>
            {open && (
              <motion.div
                key="mobile-sheet"
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "100%" }}
                transition={{ type: "spring", damping: 32, stiffness: 320 }}
                style={{ opacity: sheetOpacity }}
                role="dialog"
                aria-modal="false"
                className="fixed right-0 bottom-0 left-0 z-50 max-h-[70vh] overflow-y-auto lg:hidden"
              >
                <DrawerContent
                  node={node}
                  onClose={handleClose}
                  className="rounded-t-2xl shadow-[0_-20px_45px_-12px_rgba(0,0,0,0.7)]"
                />
              </motion.div>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </div>
  );
}
