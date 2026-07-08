"use client";

import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import AccessibleButton from "@/components/AccessibleButton";
import SelectedWork from "@/components/SelectedWork";
import CurrentExperience from "@/components/CurrentExperience";

const ArtScroller = dynamic(() => import("@/components/ArtScroller"), {
  ssr: false,
  loading: () => <div className="h-[40rem]" aria-hidden="true" />,
});

export default function Home() {
  const { scrollY } = useScroll();
  const [scrollHintDismissed, setScrollHintDismissed] = useState(false);
  useMotionValueEvent(scrollY, "change", (value) => {
    if (value > 160 && !scrollHintDismissed) {
      setScrollHintDismissed(true);
    }
  });

  return (
    <div className="bg-primary relative overflow-hidden">
      <div className="relative z-10 lg:pl-20">
        <section className="relative flex min-h-screen flex-col justify-center overflow-hidden pt-24 pb-12 lg:pt-40 lg:pb-28">
          <div className="gradient-mesh absolute inset-0">
            <div
              className="bg-accent-lime/5 animate-float-slow absolute top-1/4 left-1/4 h-96 w-96 rounded-full blur-3xl"
              style={{ transform: "translateZ(0)" }}
            />
            <div
              className="bg-accent-blue/10 animate-float-slow-reverse absolute right-1/4 bottom-1/4 h-80 w-80 rounded-full blur-3xl"
              style={{ transform: "translateZ(0)", animationDelay: "-5s" }}
            />
          </div>
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `linear-gradient(rgba(244, 244, 245, 0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(244, 244, 245, 0.5) 1px, transparent 1px)`,
              backgroundSize: "60px 60px",
            }}
            aria-hidden="true"
          />
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 container mx-auto max-w-7xl px-6 lg:px-12"
          >
            <div
              className="pointer-events-none absolute inset-0 flex items-center justify-center xl:hidden"
              aria-hidden="true"
            >
              <Image
                src="/assets/misc/susan-hero.png"
                alt=""
                width={1630}
                height={2005}
                priority
                sizes="90vw"
                className="h-auto w-[min(95vw,32rem)] opacity-[0.12] select-none"
                draggable={false}
              />
            </div>
            <div className="relative grid items-center gap-10 xl:grid-cols-[auto_minmax(0,1fr)] xl:gap-16">
              <div>
                <span className="text-accent-lime font-body mb-6 inline-flex items-center gap-2 text-sm tracking-widest uppercase lg:text-base">
                  UX Strategist &amp; Marketing Professional
                </span>
                <h1 className="font-display text-secondary mb-6 text-4xl leading-[1.1] font-bold sm:text-5xl md:text-6xl lg:text-7xl">
                  <span className="whitespace-nowrap">I&apos;m a designer</span>
                  <br />
                  <span className="whitespace-nowrap">who refuses to</span>
                  <br />
                  <span className="text-gradient whitespace-nowrap">stop at the</span>{" "}
                  <span className="text-gradient whitespace-nowrap">mockup.</span>
                </h1>
                <p className="font-body text-secondary/70 mb-8 max-w-2xl text-lg lg:text-xl">
                  Susan Chapas — UX strategist, front-end developer, and award-winning artist. I
                  figure out what people actually need, design it to work for everyone, then build
                  and ship it myself.
                </p>
                <div className="flex flex-wrap gap-4">
                  <AccessibleButton href="/projects" size="lg">
                    View My Work
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      />
                    </svg>
                  </AccessibleButton>
                  <AccessibleButton href="/contact" variant="outline" size="lg">
                    Get in Touch
                  </AccessibleButton>
                </div>
              </div>
              <div className="hidden justify-self-end self-end xl:block">
                <Image
                  src="/assets/misc/susan-hero.png"
                  alt=""
                  width={1630}
                  height={2005}
                  priority
                  sizes="22rem"
                  className="h-auto w-full max-w-[22rem] select-none"
                  draggable={false}
                />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: scrollHintDismissed ? 0 : 1 }}
            transition={{
              duration: scrollHintDismissed ? 0.4 : 0.8,
              delay: scrollHintDismissed ? 0 : 1.6,
              ease: [0.22, 1, 0.36, 1],
            }}
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-[calc(100vh-5.5rem)] hidden -translate-x-1/2 flex-col items-center gap-3 landscape:flex"
          >
            <span className="text-accent-lime font-display text-xs font-semibold tracking-[0.35em] uppercase">
              Scroll
            </span>
            <span className="border-accent-lime/60 bg-accent-lime/10 flex h-11 w-11 items-center justify-center rounded-full border-2 backdrop-blur-sm">
              <ChevronDown
                className="text-accent-lime animate-bounce-slow h-6 w-6"
                strokeWidth={2.5}
                aria-hidden="true"
              />
            </span>
          </motion.div>
        </section>

        <SelectedWork />

        <CurrentExperience />

        <ArtScroller />
      </div>
    </div>
  );
}
