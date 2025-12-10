"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import AccessibleButton from "./AccessibleButton";

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const textVariants = {
    hidden: { opacity: 0, y: 60 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.15,
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
      },
    }),
  };

  return (
    <section
      ref={ref}
      className="relative flex min-h-screen items-center justify-center overflow-hidden lg:pl-20"
      aria-label="Hero section"
    >
      {/* Animated mesh background */}
      <div className="gradient-mesh absolute inset-0">
        {/* Floating orbs */}
        <motion.div
          className="bg-accent-lime/5 absolute top-1/4 left-1/4 h-96 w-96 rounded-full blur-3xl"
          animate={{
            x: mousePosition.x * 2,
            y: mousePosition.y * 2,
          }}
          transition={{ type: "spring", stiffness: 50, damping: 30 }}
        />
        <motion.div
          className="bg-accent-blue/10 absolute right-1/4 bottom-1/4 h-80 w-80 rounded-full blur-3xl"
          animate={{
            x: mousePosition.x * -1.5,
            y: mousePosition.y * -1.5,
          }}
          transition={{ type: "spring", stiffness: 50, damping: 30 }}
        />
        <motion.div
          className="bg-accent-clay/10 absolute top-1/2 right-1/3 h-64 w-64 rounded-full blur-3xl"
          animate={{
            x: mousePosition.x * 1,
            y: mousePosition.y * 1,
          }}
          transition={{ type: "spring", stiffness: 50, damping: 30 }}
        />
      </div>

      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(244, 244, 245, 0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(244, 244, 245, 0.5) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
        aria-hidden="true"
      />

      <motion.div
        style={{ y, opacity }}
        className="relative z-10 container mx-auto px-6 text-center lg:px-12"
      >
        {/* Eyebrow */}
        <motion.p
          custom={0}
          variants={textVariants}
          initial="hidden"
          animate="visible"
          className="text-accent-lime font-body mb-6 text-sm tracking-widest uppercase lg:text-base"
        >
          UX Strategist & Marketing Professional
        </motion.p>

        {/* Main Heading */}
        <motion.h1
          custom={1}
          variants={textVariants}
          initial="hidden"
          animate="visible"
          className="font-display text-secondary mb-8 text-4xl leading-[1.1] font-bold sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl"
        >
          I build strategies
          <br />
          <span className="text-gradient">that drive engagement.</span>
        </motion.h1>

        {/* Subtext */}
        <motion.p
          custom={2}
          variants={textVariants}
          initial="hidden"
          animate="visible"
          className="font-body text-secondary/70 mx-auto mb-12 max-w-2xl text-lg lg:text-xl"
        >
          The Strategic Architect — bridging design, marketing strategy, and technical
          implementation. Based in Jersey City, NJ.
        </motion.p>

        {/* CTAs */}
        <motion.div
          custom={3}
          variants={textVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <AccessibleButton href="/projects" size="lg">
            View My Work
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
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
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2"
      >
        <span className="text-secondary/50 font-body text-sm">Scroll</span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="border-secondary/30 flex h-10 w-6 justify-center rounded-full border-2 pt-2"
        >
          <motion.div className="bg-accent-lime h-1.5 w-1.5 rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
}
