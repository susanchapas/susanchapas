"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import AccessibleButton from "./AccessibleButton";

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative flex min-h-screen items-center overflow-hidden pt-32 lg:pt-0 lg:pl-20"
      aria-label="Hero section"
    >
      {/* Animated mesh background - CSS only for performance */}
      <div className="gradient-mesh absolute inset-0">
        {/* Static gradient orbs - no JS animation needed */}
        <div
          className="bg-accent-lime/5 animate-float-slow absolute top-1/4 left-1/4 h-96 w-96 rounded-full blur-3xl"
          style={{ transform: "translateZ(0)" }}
        />
        <div
          className="bg-accent-blue/10 animate-float-slow-reverse absolute right-1/4 bottom-1/4 h-80 w-80 rounded-full blur-3xl"
          style={{ transform: "translateZ(0)", animationDelay: "-5s" }}
        />
      </div>

      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(244, 244, 245, 0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(244, 244, 245, 0.5) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 container mx-auto max-w-7xl px-6 lg:px-12">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
          {/* Left Column: Text (2/3 width) - CSS animations for initial load */}
          <motion.div
            style={{ y, opacity }}
            className="animate-fade-in-up text-center lg:col-span-8 lg:text-left"
          >
            <p
              className="text-accent-lime font-body animate-fade-in mb-6 text-sm tracking-widest uppercase opacity-0 lg:text-base"
              style={{ animationDelay: "0.1s", animationFillMode: "forwards" }}
            >
              UX Strategist & Marketing Professional
            </p>

            <h1
              className="font-display text-secondary animate-fade-in mb-6 text-4xl leading-[1.1] font-bold opacity-0 sm:text-5xl md:text-6xl lg:text-7xl"
              style={{ animationDelay: "0.2s", animationFillMode: "forwards" }}
            >
              Hi, I&apos;m Susan.
              <br />
              <span className="text-gradient">
                I build strategies that drive engagement.
              </span>
            </h1>

            <p
              className="font-body text-secondary/70 animate-fade-in mb-8 max-w-2xl text-lg opacity-0 lg:mx-0 lg:text-xl"
              style={{ animationDelay: "0.3s", animationFillMode: "forwards" }}
            >
              The Strategic Architect — bridging design, marketing strategy, and technical
              implementation. Based in Jersey City, NJ.
            </p>

            <div
              className="animate-fade-in flex flex-col items-center gap-4 opacity-0 sm:flex-row lg:justify-start"
              style={{ animationDelay: "0.4s", animationFillMode: "forwards" }}
            >
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
          </motion.div>

          {/* Right Column: Placeholder - simplified for performance */}
          <div
            className="animate-fade-in-scale relative mx-auto opacity-0 lg:col-span-4 lg:mx-0 lg:ml-auto"
            style={{ animationDelay: "0.3s", animationFillMode: "forwards" }}
          >
            <div className="relative h-64 w-64 lg:h-[400px] lg:w-[320px]">
              <div className="from-accent-lime/20 to-accent-blue/20 absolute inset-0 rotate-12 transform rounded-full bg-gradient-to-tr blur-3xl" />
              <div className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm">
                <div className="p-6 text-center">
                  <div className="from-accent-lime/20 to-accent-blue/20 mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-tr">
                    <span className="text-2xl" aria-hidden="true">
                      ✨
                    </span>
                  </div>
                  <p className="text-secondary/50 font-body text-sm">
                    Profile photo coming soon
                  </p>
                </div>
              </div>
              {/* Decorative elements */}
              <div className="border-accent-lime/30 absolute -top-4 -right-4 h-24 w-24 rounded-tr-3xl border-t-2 border-r-2" />
              <div className="border-accent-blue/30 absolute -bottom-4 -left-4 h-24 w-24 rounded-bl-3xl border-b-2 border-l-2" />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator - CSS animation instead of Framer Motion */}
      <div
        className="animate-fade-in absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 opacity-0"
        style={{ animationDelay: "1.5s", animationFillMode: "forwards" }}
      >
        <span className="text-secondary/50 font-body text-sm">Scroll</span>
        <div className="border-secondary/30 flex h-10 w-6 justify-center rounded-full border-2 pt-2">
          <div className="bg-accent-lime animate-bounce-slow h-1.5 w-1.5 rounded-full" />
        </div>
      </div>
    </section>
  );
}
