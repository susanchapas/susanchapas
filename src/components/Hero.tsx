"use client";

import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { useRef, useEffect } from "react";
import Image from "next/image";
import AccessibleButton from "./AccessibleButton";

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);

  // Use MotionValues instead of state to avoid re-renders
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth out the mouse movement
  const springConfig = { damping: 30, stiffness: 50 };
  const mouseXSpring = useSpring(mouseX, springConfig);
  const mouseYSpring = useSpring(mouseY, springConfig);

  // Create transform values for the orbs
  const orb1X = useTransform(mouseXSpring, (value: number) => value * 2);
  const orb1Y = useTransform(mouseYSpring, (value: number) => value * 2);
  const orb2X = useTransform(mouseXSpring, (value: number) => value * -1.5);
  const orb2Y = useTransform(mouseYSpring, (value: number) => value * -1.5);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Calculate normalized position (-10 to 10)
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;

      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
      },
    },
  };

  return (
    <section
      ref={ref}
      className="relative flex min-h-screen items-center overflow-hidden pt-32 lg:pt-0 lg:pl-20"
      aria-label="Hero section"
    >
      {/* Animated mesh background */}
      <div className="gradient-mesh absolute inset-0">
        {/* Floating orbs */}
        <motion.div
          className="bg-accent-lime/5 absolute top-1/4 left-1/4 h-96 w-96 rounded-full blur-3xl will-change-transform"
          style={{
            x: orb1X,
            y: orb1Y,
            transform: "translateZ(0)", // Force GPU
          }}
        />
        <motion.div
          className="bg-accent-blue/10 absolute right-1/4 bottom-1/4 h-80 w-80 rounded-full blur-3xl will-change-transform"
          style={{
            x: orb2X,
            y: orb2Y,
            transform: "translateZ(0)", // Force GPU
          }}
        />
      </div>

      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
linear - gradient(rgba(244, 244, 245, 0.5) 1px, transparent 1px),
  linear - gradient(90deg, rgba(244, 244, 245, 0.5) 1px, transparent 1px)
    `,
          backgroundSize: "60px 60px",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 container mx-auto max-w-7xl px-6 lg:px-12">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
          {/* Left Column: Text (2/3 width) */}
          <motion.div
            style={{ y, opacity }}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-center lg:col-span-8 lg:text-left"
          >
            <motion.p
              variants={itemVariants}
              className="text-accent-lime font-body mb-6 text-sm tracking-widest uppercase lg:text-base"
            >
              UX Strategist & Marketing Professional
            </motion.p>

            <motion.h1
              variants={itemVariants}
              className="font-display text-secondary mb-6 text-4xl leading-[1.1] font-bold sm:text-5xl md:text-6xl lg:text-7xl"
            >
              Hi, I&apos;m Susan.
              <br />
              <span className="text-gradient">
                I build strategies that drive engagement.
              </span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="font-body text-secondary/70 mb-8 max-w-2xl text-lg lg:mx-0 lg:text-xl"
            >
              The Strategic Architect — bridging design, marketing strategy, and technical
              implementation. Based in Jersey City, NJ.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-col items-center gap-4 sm:flex-row lg:justify-start"
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

          {/* Right Column: Image (1/3 width) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative mx-auto lg:col-span-4 lg:mx-0 lg:ml-auto"
          >
            <div className="relative h-64 w-64 lg:h-[400px] lg:w-[320px]">
              <div className="from-accent-lime/20 to-accent-blue/20 absolute inset-0 rotate-12 transform rounded-full bg-gradient-to-tr blur-3xl" />
              <div className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm">
                <div className="p-6 text-center">
                  <div className="from-accent-lime/20 to-accent-blue/20 mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-tr">
                    <span className="text-2xl">✨</span>
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
          </motion.div>
        </div>
      </div>

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
