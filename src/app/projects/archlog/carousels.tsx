"use client";

import Image from "next/image";
import { Carousel, CarouselSlide, CarouselFade } from "@/components/Carousel";

interface ProductScreen {
  src: string;
  alt: string;
  caption: string;
}

export function ProductTourCarousel({ items }: { items: ProductScreen[] }) {
  return (
    <Carousel
      items={items}
      ariaLabel="screen"
      swipeable
      renderSlide={(screen, { index, count, direction }) => {
        const [title, ...rest] = screen.caption.split(":");
        const description = rest.join(":").trim();

        return (
          <div className="flex flex-col gap-6">
            <CarouselSlide slideKey={index} direction={direction}>
              <div className="bg-accent-blue/5 overflow-hidden rounded-2xl ring-2 ring-accent-blue/0 transition-[ring-color] duration-700 ease-[var(--ease-liquid)]">
                <Image
                  src={encodeURI(screen.src)}
                  alt={screen.alt}
                  width={2560}
                  height={1600}
                  className="h-auto w-full"
                  sizes="(min-width: 1024px) 80vw, 100vw"
                />
              </div>
            </CarouselSlide>
            <div className="flex min-h-[60px] flex-col items-center justify-center text-center">
              <CarouselFade slideKey={index}>
                <span className="text-accent-lime font-body mb-1 block text-xs tracking-widest uppercase">
                  {index + 1} of {count}
                </span>
                <h3 className="font-display text-secondary mb-1 text-lg font-bold">
                  {title}
                </h3>
                <p className="font-body text-secondary/60 max-w-lg text-sm">
                  {description}
                </p>
              </CarouselFade>
            </div>
          </div>
        );
      }}
    />
  );
}
