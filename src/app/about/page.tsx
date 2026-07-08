"use client";

import { motion } from "framer-motion";
import AboutStudioWall from "@/components/AboutStudioWall";

export default function AboutPage() {
  return (
    <div className="bg-primary relative overflow-hidden lg:pl-20">
      <section className="gradient-mesh relative overflow-hidden pt-28 pb-16 motion-safe:lg:py-0">
        <div className="container mx-auto max-w-7xl px-6 lg:px-12 motion-safe:lg:hidden">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="mb-10 max-w-3xl lg:mb-14"
          >
            <span className="text-accent-lime font-body mb-4 inline-block text-sm tracking-widest uppercase lg:text-base">
              About Me
            </span>
            <h1 className="font-display text-secondary mb-6 text-4xl leading-[1.1] font-bold sm:text-5xl lg:text-6xl">
              Designer, developer, artist —{" "}
              <span className="text-gradient">and a few more hats.</span>
            </h1>
            <p className="font-body text-secondary/70 max-w-2xl text-lg lg:text-xl">
              Everything that shapes how I work, laid out on the board below. Grab a tile, toss it
              around, and pull up whatever catches your eye.
            </p>
          </motion.div>
        </div>

        <AboutStudioWall />
      </section>
    </div>
  );
}
