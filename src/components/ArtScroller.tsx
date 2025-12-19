"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import ArtImage from "./ArtImage";

const artPieces = [
  { src: "/gallery/Mindless-Mirth-final.svg", alt: "Mindless Mirth", type: "svg" },
  {
    src: "/gallery/eat, drink, & be merry.svg",
    alt: "Eat, Drink, & Be Merry",
    type: "svg",
  },
  {
    src: "/gallery/A bike for every rider.svg",
    alt: "A Bike for Every Rider",
    type: "svg",
  },
  { src: "/gallery/THE NTL photo.webp", alt: "The NTL", type: "image" },
  { src: "/gallery/Watercolor Painting.webp", alt: "Watercolor Painting", type: "image" },
  { src: "/gallery/Red Hook Launch Photo.webp", alt: "Red Hook Launch", type: "image" },
  { src: "/gallery/Binnoy Feature Photo.webp", alt: "Binnoy Feature", type: "image" },
];

export default function ArtScroller() {
  return (
    <section className="bg-primary content-visibility-auto overflow-hidden border-t border-white/5 py-24">
      <div className="container mx-auto mb-12 px-6 text-center lg:px-12">
        <span className="text-accent-lime font-body mb-4 block text-sm tracking-widest uppercase">
          Creative Side
        </span>
        <h2 className="font-display text-secondary mb-4 text-3xl font-bold lg:text-4xl">
          Beyond the Code
        </h2>
        <p className="font-body text-secondary/70 mx-auto max-w-2xl text-lg">
          Exploring the intersection of humanity and technology through visual art.
        </p>
      </div>

      <Link href="/gallery" className="group relative block">
        <div className="flex overflow-hidden">
          {/* CSS-based infinite scroll - much more performant than JS animation */}
          <div
            className="flex gap-8 px-4 animate-marquee hover:[animation-play-state:paused]"
            style={{
              width: "max-content",
              willChange: "transform",
            }}
          >
            {/* Double the items for seamless loop */}
            {[...artPieces, ...artPieces].map((art, index) => (
              <div
                key={`${art.alt}-${index}`}
                className="group-hover:border-accent-lime/50 relative h-64 w-96 flex-shrink-0 overflow-hidden rounded-xl border border-white/10 transition-transform duration-300 group-hover:scale-[1.02]"
              >
                <ArtImage
                  src={art.src}
                  alt={art.alt}
                  loading="lazy"
                  className={cn(
                    "transition-transform duration-500 group-hover:scale-110",
                    art.alt === "Mindless Mirth" && "scale-125 group-hover:scale-[1.35]"
                  )}
                  containerClassName="h-full w-full"
                />
                <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/20" />
              </div>
            ))}
          </div>
        </div>

        <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <span className="font-display rounded-full border border-white/20 bg-black/50 px-6 py-3 font-bold text-white backdrop-blur-md">
            View Gallery
          </span>
        </div>
      </Link>
    </section>
  );
}
