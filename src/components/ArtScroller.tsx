"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import ArtImage from "./ArtImage";

const artPieces = [
    { src: "/gallery/Mindless-Mirth-final.svg", alt: "Mindless Mirth", type: "svg" },
    { src: "/gallery/eat, drink, & be merry.svg", alt: "Eat, Drink, & Be Merry", type: "svg" },
    { src: "/gallery/A bike for every rider.svg", alt: "A Bike for Every Rider", type: "svg" },
    { src: "/gallery/THE NTL photo.jpg", alt: "The NTL", type: "image" },
    { src: "/gallery/Watercolor Painting.jpg", alt: "Watercolor Painting", type: "image" },
    { src: "/gallery/Red Hook Launch Photo.jpg", alt: "Red Hook Launch", type: "image" },
    { src: "/gallery/Binnoy Feature Photo.jpg", alt: "Binnoy Feature", type: "image" },
];

export default function ArtScroller() {
    return (
        <section className="py-24 overflow-hidden bg-primary border-t border-white/5">
            <div className="container mx-auto px-6 lg:px-12 mb-12 text-center">
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

            <Link href="/gallery" className="block group relative">
                <div className="flex overflow-hidden">
                    <motion.div
                        className="flex gap-8 px-4 will-change-transform"
                        animate={{
                            x: ["0%", "-50%"],
                        }}
                        transition={{
                            x: {
                                repeat: Infinity,
                                repeatType: "loop",
                                duration: 40,
                                ease: "linear",
                            },
                        }}
                        style={{
                            width: "fit-content",
                            transform: "translateZ(0)", // Force GPU
                            backfaceVisibility: "hidden"
                        }}
                    >
                        {[...artPieces, ...artPieces].map((art, index) => (
                            <div
                                key={`${art.alt}-${index}`}
                                className="relative h-64 w-96 flex-shrink-0 overflow-hidden rounded-xl border border-white/10 transition-transform duration-300 group-hover:scale-[1.02] group-hover:border-accent-lime/50"
                            >
                                <ArtImage
                                    src={art.src}
                                    alt={art.alt}
                                    className={cn(
                                        "transition-transform duration-500 group-hover:scale-110",
                                        art.alt === "Mindless Mirth" && "scale-125 group-hover:scale-[1.35]"
                                    )}
                                    containerClassName="h-full w-full"
                                />
                                <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/20" />
                            </div>
                        ))}
                    </motion.div>
                </div>

                <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100 pointer-events-none">
                    <span className="bg-black/50 backdrop-blur-md text-white px-6 py-3 rounded-full font-display font-bold border border-white/20">
                        View Gallery
                    </span>
                </div>
            </Link>
        </section>
    );
}
