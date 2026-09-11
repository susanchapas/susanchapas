"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { artworks, categories } from "./artworks";
import BentoGrid from "./BentoGrid";
import ArtworkModal from "./ArtworkModal";
import { m } from "@/lib/motion";

export default function GalleryPage() {
  const reduce = useReducedMotion();
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [activeId, setActiveId] = useState<number | null>(null);

  const filtered =
    activeCategory === "All"
      ? artworks
      : artworks.filter((art) => art.category === activeCategory);

  const activeArtwork = artworks.find((art) => art.id === activeId) ?? null;

  return (
    <div className="">
      <section className="bg-primary border-accent-blue/10 sticky top-16 z-30 border-b py-6 lg:top-0">
        <div className="container mx-auto px-6 lg:px-12">
          <div
            className="flex flex-wrap gap-3"
            role="group"
            aria-label="Filter artworks by category"
          >
            {categories.map((category) => {
              const active = activeCategory === category;
              return (
                <button
                  key={category}
                  onClick={() => {
                    setActiveCategory(category);
                    setActiveId(null);
                  }}
                  aria-pressed={active}
                  className={`font-body relative rounded-full px-4 py-2 text-sm transition-colors ${
                    active
                      ? "text-primary"
                      : "bg-accent-blue/10 text-secondary hover:bg-accent-blue/20"
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="filter-pill"
                      className="bg-accent-lime absolute inset-0 rounded-full"
                      transition={m(reduce, {
                        type: "spring",
                        stiffness: 400,
                        damping: 32,
                      })}
                    />
                  )}
                  <span className="relative z-10">{category}</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-primary py-12 lg:py-20" aria-label="Artwork gallery">
        <div className="container mx-auto px-6 lg:px-12">
          <BentoGrid
            artworks={filtered}
            activeKey={activeCategory}
            onOpen={setActiveId}
          />
        </div>
      </section>

      <ArtworkModal
        artwork={activeArtwork}
        items={filtered}
        onClose={() => setActiveId(null)}
        onNavigate={setActiveId}
      />
    </div>
  );
}
