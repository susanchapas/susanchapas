"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { X } from "lucide-react";
import ArtMedia from "@/components/ArtMedia";
import { cn } from "@/lib/utils";

const artworks = [
  {
    id: 1,
    title: "Mindless Mirth",
    category: "Painting",
    year: "2022",
    description:
      "Award-winning abstract piece exploring the intersection of joy and unconscious expression.",
    src: "/gallery/Mindless-Mirth-final.svg",
    type: "image",
    className: "md:col-span-1 md:row-span-2",
    objectFit: "cover",
    imageClassName: "scale-[1.03] origin-top",
  },
  {
    id: 2,
    title: "ATM Home Screen",
    category: "Motion",
    year: "2023",
    description: "Motion graphics for an ATM interface concept.",
    src: "/gallery/ATM home screen video.mp4",
    type: "video",
    className: "md:col-span-2 md:row-span-1",
  },
  {
    id: 3,
    title: "A Bike for Every Rider",
    category: "Illustration",
    year: "2023",
    description: "Inclusive illustration celebrating cycling diversity.",
    src: "/gallery/A bike for every rider.svg",
    type: "image",
    className: "md:col-span-2 md:row-span-1",
  },
  {
    id: 4,
    title: "Eat, Drink, & Be Merry",
    category: "Illustration",
    year: "2023",
    description: "Festive illustration design.",
    src: "/gallery/eat, drink, & be merry.svg",
    type: "image",
    className: "md:col-span-1 md:row-span-1",
  },
  {
    id: 5,
    title: "EOP Explainer",
    category: "Motion",
    year: "2023",
    description: "Animated explainer video for EOP.",
    src: "/gallery/EOP Explainer.mp4",
    type: "video",
    className: "md:col-span-2 md:row-span-1",
  },
  {
    id: 6,
    title: "SB Bike Shop Info Sheet",
    category: "Design",
    year: "2023",
    description: "Information design for a local bike shop.",
    src: "/gallery/SB Bike Shop Info Sheet.svg",
    type: "image",
    className: "md:col-span-1 md:row-span-2",
  },
  {
    id: 7,
    title: "The NTL",
    category: "Photography",
    year: "2023",
    description: "Photography feature.",
    src: "/gallery/THE NTL photo.webp",
    type: "image",
    className: "md:col-span-1 md:row-span-1",
  },
  {
    id: 8,
    title: "Watercolor Painting",
    category: "Painting",
    year: "2023",
    description: "Watercolor artwork.",
    src: "/gallery/Watercolor Painting.webp",
    type: "image",
    className: "md:col-span-1 md:row-span-1",
  },
  {
    id: 9,
    title: "Red Hook Launch",
    category: "Photography",
    year: "2024",
    description: "Launch event photography.",
    src: "/gallery/Red Hook Launch Photo.webp",
    type: "image",
    className: "md:col-span-1 md:row-span-1",
  },
  {
    id: 10,
    title: "Binnoy Feature",
    category: "Photography",
    year: "2023",
    description: "Feature photography.",
    src: "/gallery/Binnoy Feature Photo.webp",
    type: "image",
    className: "md:col-span-1 md:row-span-1",
  },
  {
    id: 11,
    title: "Construction Site",
    category: "Photography",
    year: "2023",
    description: "Site documentation.",
    src: "/gallery/Construction Site Photo.webp",
    type: "image",
    className: "md:col-span-1 md:row-span-1",
  },
  {
    id: 12,
    title: "Employee Blog",
    category: "Photography",
    year: "2023",
    description: "Blog feature photography.",
    src: "/gallery/Employee Blog photo.webp",
    type: "image",
    className: "md:col-span-1 md:row-span-1",
  },
  {
    id: 16,
    title: "Employee Blog 2",
    category: "Photography",
    year: "2023",
    description: "Blog feature photography.",
    src: "/gallery/Employee Blog Photo 2.webp",
    type: "image",
    className: "md:col-span-1 md:row-span-1",
  },
  {
    id: 13,
    title: "Jason Feature",
    category: "Photography",
    year: "2023",
    description: "Feature photography.",
    src: "/gallery/Jason Feature Photo.webp",
    type: "image",
    className: "md:col-span-1 md:row-span-1",
  },
  {
    id: 14,
    title: "LinkedIn Cover",
    category: "Design",
    year: "2023",
    description: "Social media branding.",
    src: "/gallery/LinkedIn Cover Photo.webp",
    type: "image",
    className: "md:col-span-2 md:row-span-1",
  },
  {
    id: 15,
    title: "Posing at Gallery",
    category: "Photography",
    year: "2023",
    description: "Gallery event photography.",
    src: "/gallery/Posing at a Gallery Photo.webp",
    type: "image",
    className: "md:col-span-1 md:row-span-1",
  },
] as const;

const categories = ["All", "Painting", "Illustration", "Design", "Motion"];

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedArtwork, setSelectedArtwork] = useState<
    (typeof artworks)[number] | null
  >(null);

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
              <span className="text-gradient">Motion</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="font-body text-secondary/70 max-w-2xl text-lg"
            >
              Beyond design and development, I express creativity through various visual
              mediums. This gallery showcases a selection of personal art projects,
              illustrations, and motion work.
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
            className="grid auto-rows-[300px] grid-cols-1 gap-6 md:grid-cols-3"
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
                  className={cn(
                    "group border-accent-blue/10 hover:border-accent-lime/30 relative cursor-pointer overflow-hidden rounded-xl border transition-colors",
                    artwork.className
                  )}
                  onClick={() => setSelectedArtwork(artwork)}
                >
                  <ArtMedia
                    src={artwork.src}
                    alt={artwork.title}
                    type={artwork.type}
                    className={cn(
                      "transition-transform duration-500 group-hover:scale-105",
                      (artwork as any).imageClassName
                    )}
                    containerClassName="h-full w-full"
                    objectFit={(artwork as any).objectFit}
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
              className="bg-primary border-accent-blue/20 relative z-10 flex max-h-[90vh] w-full max-w-6xl flex-col overflow-hidden rounded-2xl border md:flex-row"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedArtwork(null)}
                className="bg-accent-blue/10 text-secondary hover:bg-accent-lime hover:text-primary absolute top-4 right-4 z-10 flex h-10 w-10 items-center justify-center rounded-full transition-colors"
                aria-label="Close modal"
              >
                <X size={20} />
              </button>

              <div className="relative flex w-full items-center justify-center bg-black/5 p-4 md:w-2/3 md:p-0">
                <div className="relative h-full min-h-[300px] w-full md:min-h-[500px]">
                  <ArtMedia
                    src={selectedArtwork.src}
                    alt={selectedArtwork.title}
                    type={selectedArtwork.type}
                    containerClassName="h-full w-full"
                    className="object-contain"
                    objectFit={(selectedArtwork as any).objectFit || "contain"}
                  />
                </div>
              </div>
              <div className="flex flex-col justify-center overflow-y-auto p-6 md:w-1/3 lg:p-12">
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
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
