"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const artPieces = [
    { src: "/assets/art/mindless-mirth.jpg", alt: "Mindless Mirth" },
    { src: "/assets/art/abstract-flow.jpg", alt: "Abstract Flow" },
    { src: "/assets/art/city-nights.jpg", alt: "City Nights" },
    { src: "/assets/art/digital-dreams.jpg", alt: "Digital Dreams" },
    { src: "/assets/art/morning-light.jpg", alt: "Morning Light" },
    { src: "/assets/art/urban-reflections.jpg", alt: "Urban Reflections" },
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
                        className="flex gap-8 px-4"
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
                        style={{ width: "fit-content" }}
                    >
                        {[...artPieces, ...artPieces].map((art, index) => (
                            <div
                                key={`${art.alt}-${index}`}
                                className="relative h-64 w-96 flex-shrink-0 overflow-hidden rounded-xl border border-white/10 transition-transform duration-300 group-hover:scale-[1.02] group-hover:border-accent-lime/50"
                            >
                                <Image
                                    src={art.src}
                                    alt={art.alt}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-110"
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
