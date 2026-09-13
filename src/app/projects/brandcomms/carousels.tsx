"use client";

import Image from "next/image";
import { Carousel, CarouselSlide } from "@/components/Carousel";

interface Screenshot {
  src: string;
  alt: string;
  title: string;
  description: string;
}

export function ScreenshotCarousel({ items }: { items: Screenshot[] }) {
  return (
    <Carousel
      items={items}
      ariaLabel="screenshot"
      swipeable
      controlsLayout="flanking"
      dotVariant="secondary"
      renderSlide={(slide, { index, count, direction }) => (
        <div className="bg-accent-blue/5 border-accent-blue/10 min-w-0 flex-1 overflow-hidden rounded-2xl border">
          <div className="relative aspect-[16/10] w-full overflow-hidden">
            <CarouselSlide slideKey={slide.src} direction={direction} offset={60} className="absolute inset-0">
              <Image
                src={slide.src}
                alt={slide.alt}
                fill
                loading="lazy"
                sizes="(min-width: 1024px) 60vw, 100vw"
                className="object-cover object-top"
              />
            </CarouselSlide>
          </div>
          <div className="flex items-start justify-between gap-4 p-5">
            <div className="min-w-0">
              <h3 className="font-display text-secondary mb-1 text-lg font-bold">
                {slide.title}
              </h3>
              <p className="font-body text-secondary/70 text-sm leading-relaxed">
                {slide.description}
              </p>
            </div>
            <span className="text-secondary/40 font-body shrink-0 text-sm">
              {index + 1}/{count}
            </span>
          </div>
        </div>
      )}
    />
  );
}

interface Persona {
  name: string;
  archetype: string;
  description: string;
  image: string;
}

export function PersonaCarousel({ items }: { items: Persona[] }) {
  return (
    <Carousel
      items={items}
      ariaLabel="persona"
      swipeable
      controlsLayout="flanking"
      dotVariant="secondary"
      renderSlide={(persona, { index, count, direction }) => (
        <div className="bg-accent-blue/5 border-accent-blue/10 min-w-0 flex-1 overflow-hidden rounded-2xl border">
          <div className="relative aspect-[16/10] w-full overflow-hidden">
            <CarouselSlide slideKey={persona.image} direction={direction} offset={60} className="absolute inset-0">
              <Image
                src={persona.image}
                alt={`Persona sheet for ${persona.name}, ${persona.archetype}`}
                fill
                loading="lazy"
                sizes="(min-width: 1024px) 60vw, 100vw"
                className="object-cover object-top"
              />
            </CarouselSlide>
          </div>
          <div className="flex items-start justify-between gap-4 p-5">
            <div className="min-w-0">
              <span className="text-accent-blue font-body mb-1 block text-xs font-semibold tracking-widest uppercase">
                {persona.archetype}
              </span>
              <h3 className="font-display text-secondary text-lg font-bold">
                {persona.name}
              </h3>
            </div>
            <span className="text-secondary/40 font-body shrink-0 text-sm">
              {index + 1}/{count}
            </span>
          </div>
        </div>
      )}
    />
  );
}
