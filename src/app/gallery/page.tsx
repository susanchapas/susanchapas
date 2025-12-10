"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { X } from "lucide-react";

const artworks = [
  {
    id: 1,
    title: "Mindless Mirth",
    category: "Painting",
    year: "2022",
    description:
      "Award-winning abstract piece exploring the intersection of joy and unconscious expression.",
    image: "/assets/art/mindless-mirth.jpg",
    featured: true,
  },
  {
    id: 2,
    title: "Urban Reflections",
    category: "Photography",
    year: "2023",
    description: "A study of light and shadow in the urban landscape of Jersey City.",
    image: "/assets/art/urban-reflections.jpg",
    featured: false,
  },
  {
    id: 3,
    title: "Digital Dreams",
    category: "Digital Art",
    year: "2023",
    description: "Exploring the boundary between organic forms and digital creation.",
    image: "/assets/art/digital-dreams.jpg",
    featured: false,
  },
  {
    id: 4,
    title: "Morning Light",
    category: "Photography",
    year: "2022",
    description: "Capturing the golden hour in the streets of Brooklyn.",
    image: "/assets/art/morning-light.jpg",
    featured: false,
  },
  {
    id: 5,
    title: "Abstract Flow",
    category: "Painting",
    year: "2021",
    description: "Fluid dynamics expressed through acrylic on canvas.",
    image: "/assets/art/abstract-flow.jpg",
    featured: false,
  },
  {
    id: 6,
    title: "City Nights",
    category: "Photography",
    year: "2023",
    description: "Long exposure photography capturing the energy of the city after dark.",
    image: "/assets/art/city-nights.jpg",
    featured: false,
  },
];

const categories = ["All", "Painting", "Photography", "Digital Art"];

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedArtwork, setSelectedArtwork] = useState<(typeof artworks)[0] | null>(
    null
  );

  const filteredArtworks =
    activeCategory === "All"
      ? artworks
      : artworks.filter((art) => art.category === activeCategory);

  return (
    <div className="lg:pl-20">
      {/* Hero Section */}
      <section className="gradient-mesh py-24 lg:py-32">
        <div className="container mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-3xl"
          >
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-accent-lime font-body mb-4 block text-sm tracking-widest uppercase"
            >
              Creative Work
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="font-display text-secondary mb-6 text-4xl font-bold lg:text-5xl xl:text-6xl"
            >
              Art &
              <br />
              <span className="text-gradient">Photography</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="font-body text-secondary/70 max-w-2xl text-lg"
            >
              Beyond design and development, I express creativity through various visual
              mediums. This gallery showcases a selection of personal art projects and
              photography work.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="bg-primary border-accent-blue/10 sticky top-0 z-30 border-b py-8 lg:top-0">
        <div className="container mx-auto px-6 lg:px-12">
          <div
            className="flex flex-wrap gap-3"
            role="tablist"
            aria-label="Filter artworks by category"
          >
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                role="tab"
                aria-selected={activeCategory === category}
                className={`font-body rounded-full px-4 py-2 text-sm transition-all ${
                  activeCategory === category
                    ? "bg-accent-lime text-primary"
                    : "bg-accent-blue/10 text-secondary hover:bg-accent-blue/20"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="bg-primary py-16 lg:py-24" aria-label="Artwork gallery">
        <div className="container mx-auto px-6 lg:px-12">
          <motion.div
            layout
            className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
          >
            <AnimatePresence mode="popLayout">
              {filteredArtworks.map((artwork, index) => (
                <motion.article
                  key={artwork.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className={`group cursor-pointer ${
                    artwork.featured ? "md:col-span-2 md:row-span-2" : ""
                  }`}
                  onClick={() => setSelectedArtwork(artwork)}
                >
                  <div
                    className={`border-accent-blue/10 hover:border-accent-lime/30 relative overflow-hidden rounded-xl border transition-colors ${
                      artwork.featured ? "aspect-square" : "aspect-[4/3]"
                    }`}
                  >
                    <Image
                      src={artwork.image}
                      alt={artwork.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="from-primary absolute inset-0 bg-gradient-to-t via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                    <div className="absolute right-0 bottom-0 left-0 translate-y-full p-6 transition-transform group-hover:translate-y-0">
                      <span className="text-accent-lime font-body text-xs tracking-wider uppercase">
                        {artwork.category}
                      </span>
                      <h3 className="font-display text-secondary mt-1 text-xl font-bold">
                        {artwork.title}
                      </h3>
                    </div>
                    {artwork.featured && (
                      <div className="absolute top-4 right-4">
                        <span className="bg-accent-clay text-primary rounded-full px-3 py-1 text-xs font-medium">
                          Featured
                        </span>
                      </div>
                    )}
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedArtwork && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 lg:p-8"
            onClick={() => setSelectedArtwork(null)}
            role="dialog"
            aria-modal="true"
            aria-labelledby="artwork-title"
          >
            <div className="bg-primary/95 absolute inset-0 backdrop-blur-sm" />

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="bg-primary border-accent-blue/20 relative z-10 w-full max-w-5xl overflow-hidden rounded-2xl border"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedArtwork(null)}
                className="bg-accent-blue/10 text-secondary hover:bg-accent-lime hover:text-primary absolute top-4 right-4 z-10 flex h-10 w-10 items-center justify-center rounded-full transition-colors"
                aria-label="Close modal"
              >
                <X size={20} />
              </button>

              <div className="grid md:grid-cols-2">
                <div className="relative aspect-square">
                  <Image
                    src={selectedArtwork.image}
                    alt={selectedArtwork.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-col justify-center p-8 lg:p-12">
                  <span className="text-accent-lime font-body mb-2 text-sm tracking-wider uppercase">
                    {selectedArtwork.category} • {selectedArtwork.year}
                  </span>
                  <h2
                    id="artwork-title"
                    className="font-display text-secondary mb-4 text-3xl font-bold lg:text-4xl"
                  >
                    {selectedArtwork.title}
                  </h2>
                  <p className="font-body text-secondary/70 leading-relaxed">
                    {selectedArtwork.description}
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
