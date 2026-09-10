"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
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
  MapPin,
  PenTool,
  Utensils,
} from "lucide-react";
import AccessibleButton from "@/components/AccessibleButton";
import AboutStudioWall from "@/components/AboutStudioWall";
import { EASE_SMOOTH } from "@/lib/motion";

const reveal = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.15 },
  transition: { duration: 0.7, ease: EASE_SMOOTH },
};

function stagger(d: number) {
  return { ...reveal, transition: { ...reveal.transition, delay: d } };
}

const capabilities = [
  {
    Icon: PenTool,
    title: "Designed for everyone",
    body: "Accessibility is my starting point. If it works for someone using a screen reader, a keyboard, or a second language, it’s ready to ship.",
    tags: ["UX Research", "Figma", "Accessibility", "Branding"],
    bar: "bg-clay-ink",
  },
  {
    Icon: Code2,
    title: "Then I ship it",
    body: "I build the front end myself, so the design that ships is the design I drew. The handoff is just me handing it to me.",
    tags: ["Next.js", "TypeScript", "React"],
    bar: "bg-mint-ink",
  },
  {
    Icon: Compass,
    title: "Sector-fluent",
    body: "I’ve worked in banking, healthcare, real estate, and nonprofits. Each sector has its own audience, its own language, its own constraints. I study those before I start.",
    tags: ["Banking", "Real Estate", "Healthcare", "Nonprofits"],
    bar: "bg-sky-ink",
  },
];

const schools = [
  {
    status: "In progress",
    degree: "BS, Human-Computer Interaction",
    school: "New Jersey Institute of Technology",
    body: "Studying the intersection of design, technology, and human cognition. Currently a research assistant investigating AI-assisted accessibility.",
  },
  {
    status: "Completed",
    degree: "Professional Certificate, Full-Stack Development",
    school: "MIT xPRO",
    body: "Intensive program covering modern web technologies, from databases and APIs to front-end frameworks.",
  },
];

const personal: {
  Icon: typeof Brush;
  title: string;
  body: string;
  accent: string;
  span?: string;
  href?: string;
  linkLabel?: string;
}[] = [
  {
    Icon: Languages,
    title: "Hablo español",
    body: "Fully fluent in English and Spanish. I work with audiences, teams, and communities in both languages.",
    accent: "text-accent-blue/60",
    span: "md:col-span-2",
  },
  {
    Icon: Brush,
    title: "Mindless Mirth",
    body: "Off the clock, I paint. My piece “Mindless Mirth” won recognition for exploring human emotion through abstraction.",
    accent: "text-accent-clay/60",
    href: "/gallery",
    linkLabel: "See the gallery",
  },
  {
    Icon: HeartHandshake,
    title: "Community-connected",
    body: "From bank outreach to event planning, I gravitate toward work that’s connected to its neighborhood.",
    accent: "text-accent-blue/60",
  },
  {
    Icon: MapPin,
    title: "Jersey City & NYC",
    body: "Based in Jersey City, with most of my days across the river in New York. The whole metro area is home.",
    accent: "text-accent-blue/60",
  },
  {
    Icon: Coffee,
    title: "Coffee addict",
    body: "My family grows coffee in Honduras, and it’s pretty much all I drink. It counts as water, right?",
    accent: "text-accent-lime/60",
  },
  {
    Icon: Gamepad2,
    title: "Korok seed hunter",
    body: "Big Nintendo fan, especially The Legend of Zelda. When I’m not designing, I’m hunting down Korok seeds.",
    accent: "text-accent-lime/60",
  },
  {
    Icon: Utensils,
    title: "Adventurous eater",
    body: "I love trying new food, so picky eaters don’t last long in my circle. Current NYC guilty pleasure: Top Thai on 55 Carmine.",
    accent: "text-accent-clay/60",
    span: "md:col-span-2",
  },
];

export default function AboutPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const photoY = useTransform(scrollYProgress, [0, 1], [0, 50]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, -20]);

  return (
    <div className="bg-primary relative overflow-hidden">
      {/* Desktop: full-screen pinboard */}
      <section className="gradient-mesh relative hidden overflow-hidden lg:block lg:py-0">
        <AboutStudioWall />
      </section>

      {/* Mobile / tablet: traditional scrolling about page */}
      <div className="lg:hidden">
        <section
          ref={heroRef}
          className="gradient-mesh relative flex min-h-[85vh] items-center overflow-hidden pt-28 pb-20"
        >
          <div
            className="bg-accent-lime/5 animate-float-slow absolute top-1/4 left-[15%] h-80 w-80 rounded-full blur-3xl"
            aria-hidden="true"
          />
          <div
            className="bg-accent-blue/10 animate-float-slow-reverse absolute right-[10%] bottom-1/4 h-96 w-96 rounded-full blur-3xl"
            style={{ animationDelay: "-7s" }}
            aria-hidden="true"
          />
          <div
            className="absolute inset-0 opacity-[0.02]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(244,244,245,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(244,244,245,0.5) 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
            aria-hidden="true"
          />

          <div className="relative z-10 container mx-auto max-w-6xl px-6">
            <div className="grid items-center gap-12 sm:grid-cols-[1.2fr_1fr] sm:gap-16">
              <motion.div style={{ y: textY }}>
                <motion.span
                  {...reveal}
                  className="text-accent-lime font-body mb-4 inline-block text-sm tracking-widest uppercase"
                >
                  About Me
                </motion.span>
                <motion.h1
                  {...stagger(0.08)}
                  className="font-display text-secondary mb-6 text-4xl leading-[1.1] font-bold sm:text-5xl"
                >
                  Designer, developer, artist,{" "}
                  <span className="text-gradient">and a few more hats.</span>
                </motion.h1>
                <motion.p
                  {...stagger(0.16)}
                  className="font-body text-secondary/70 mb-8 max-w-xl text-lg"
                >
                  I&apos;m a UX strategist, front-end developer, and artist
                  based in Jersey City. I enjoy every stage of a project:
                  understanding what people need, designing something that works
                  for everyone, then building and shipping it myself.
                </motion.p>
                <motion.div
                  {...stagger(0.24)}
                  className="flex flex-wrap gap-4"
                >
                  <AccessibleButton href="/projects" size="md">
                    View my work
                  </AccessibleButton>
                  <AccessibleButton
                    href="/contact"
                    variant="outline"
                    size="md"
                  >
                    Get in touch
                  </AccessibleButton>
                </motion.div>
              </motion.div>

              <motion.div
                style={{ y: photoY }}
                className="relative mx-auto w-full max-w-md"
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    duration: 0.8,
                    ease: EASE_SMOOTH,
                    delay: 0.15,
                  }}
                  className="border-accent-blue/15 relative overflow-hidden rounded-3xl border bg-white/5 p-2.5"
                >
                  <div className="relative aspect-[3/2] overflow-hidden rounded-2xl">
                    <Image
                      src="/assets/misc/lake-erie.jpg"
                      alt="Susan Chapas"
                      fill
                      sizes="(max-width: 640px) 100vw, 400px"
                      className="object-cover"
                      priority
                    />
                    <div className="from-primary/30 absolute inset-0 bg-gradient-to-t to-transparent" />
                  </div>
                </motion.div>
                <div
                  className="bg-accent-lime absolute -top-4 -right-4 h-8 w-8 rounded-full opacity-40 blur-sm"
                  aria-hidden="true"
                />
                <div
                  className="bg-accent-clay absolute -bottom-3 -left-3 h-6 w-6 rounded-full opacity-30 blur-sm"
                  aria-hidden="true"
                />
              </motion.div>
            </div>
          </div>
        </section>

        <section
          className="relative py-20"
          aria-labelledby="what-heading"
        >
          <div className="container mx-auto max-w-6xl px-6">
            <motion.div {...reveal} className="mb-14">
              <span className="text-accent-clay font-body mb-4 block text-sm tracking-widest uppercase">
                What I Do
              </span>
              <h2
                id="what-heading"
                className="font-display text-secondary text-3xl font-bold"
              >
                Three things, one person
              </h2>
            </motion.div>
            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
              {capabilities.map((c, i) => (
                <motion.article
                  key={c.title}
                  {...stagger(i * 0.1)}
                  className="border-accent-blue/10 hover:border-accent-blue/25 flex flex-col rounded-2xl border bg-white/[0.03] p-6 transition-colors"
                >
                  <span
                    aria-hidden="true"
                    className={`mb-5 h-1 w-12 rounded-full ${c.bar}`}
                  />
                  <c.Icon
                    className="text-secondary/30 mb-4 h-6 w-6"
                    aria-hidden="true"
                  />
                  <h3 className="font-display text-secondary mb-3 text-xl font-bold">
                    {c.title}
                  </h3>
                  <p className="text-secondary/70 font-body mb-6 flex-1">
                    {c.body}
                  </p>
                  <ul className="flex flex-wrap gap-2">
                    {c.tags.map((t) => (
                      <li
                        key={t}
                        className="border-accent-blue/15 text-secondary/60 font-body rounded-full border bg-white/5 px-3 py-1 text-sm"
                      >
                        {t}
                      </li>
                    ))}
                  </ul>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <section
          className="bg-accent-blue/5 relative py-20"
          aria-labelledby="edu-heading"
        >
          <div className="container mx-auto max-w-6xl px-6">
            <motion.div {...reveal} className="mb-14">
              <span className="text-accent-blue font-body mb-4 block text-sm tracking-widest uppercase">
                Education
              </span>
              <h2
                id="edu-heading"
                className="font-display text-secondary text-3xl font-bold"
              >
                Always learning
              </h2>
            </motion.div>
            <div className="grid gap-6 sm:grid-cols-2">
              {schools.map((s, i) => (
                <motion.article
                  key={s.school}
                  {...stagger(i * 0.1)}
                  className="border-accent-blue/10 rounded-2xl border bg-white/[0.03] p-6"
                >
                  <GraduationCap
                    className="text-accent-blue/40 mb-4 h-6 w-6"
                    aria-hidden="true"
                  />
                  <span className="text-accent-lime font-display mb-1 block text-sm font-semibold tracking-widest">
                    {s.status}
                  </span>
                  <h3 className="font-display text-secondary mb-1 text-xl font-bold">
                    {s.degree}
                  </h3>
                  <p className="text-accent-blue font-body mb-4 font-medium">
                    {s.school}
                  </p>
                  <p className="text-secondary/70 font-body">{s.body}</p>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <section
          className="relative py-20"
          aria-labelledby="personal-heading"
        >
          <div className="container mx-auto max-w-6xl px-6">
            <motion.div {...reveal} className="mb-14">
              <span className="text-accent-clay font-body mb-4 block text-sm tracking-widest uppercase">
                Off the Clock
              </span>
              <h2
                id="personal-heading"
                className="font-display text-secondary text-3xl font-bold"
              >
                A few more things about me
              </h2>
            </motion.div>
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
              {personal.map((p, i) => (
                <motion.article
                  key={p.title}
                  {...stagger(i * 0.06)}
                  className={`border-accent-blue/10 hover:border-accent-blue/20 rounded-2xl border bg-white/[0.02] p-6 transition-colors ${p.span || ""}`}
                >
                  <p.Icon
                    className={`mb-3 h-5 w-5 ${p.accent}`}
                    aria-hidden="true"
                  />
                  <h3 className="font-display text-secondary mb-2 text-lg font-bold">
                    {p.title}
                  </h3>
                  <p className="text-secondary/60 font-body text-sm leading-relaxed">
                    {p.body}
                  </p>
                  {p.href && (
                    <Link
                      href={p.href}
                      className="text-accent-lime font-display mt-3 inline-flex items-center gap-2 text-sm font-semibold transition-all hover:gap-3"
                    >
                      {p.linkLabel}
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  )}
                </motion.article>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
