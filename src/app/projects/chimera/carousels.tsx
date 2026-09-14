"use client";

import Image from "next/image";
import { Carousel, CarouselSlide, CarouselFade } from "@/components/Carousel";
import Tile from "@/components/Tile";

interface Principle {
  name: string;
  body: string;
  src: string;
  alt: string;
}

function PhoneSlot({
  src,
  alt = "",
  label = "Mobile screen",
}: {
  src?: string;
  alt?: string;
  label?: string;
}) {
  return (
    <div className="group border-accent-blue/20 bg-accent-blue/5 relative aspect-[9/19.5] w-full overflow-hidden rounded-[2rem] border">
      {src ? (
        <Image
          src={encodeURI(src)}
          alt={alt}
          fill
          loading="lazy"
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-700 ease-[var(--ease-liquid)] group-hover:scale-[1.05]"
        />
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center">
          <span className="border-accent-blue/30 mb-3 flex h-10 w-10 items-center justify-center rounded-full border border-dashed">
            <svg
              className="text-accent-blue/60 h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M12 18h.01M8 21h8a1 1 0 001-1V4a1 1 0 00-1-1H8a1 1 0 00-1 1v16a1 1 0 001 1z"
              />
            </svg>
          </span>
          <p className="font-display text-secondary/80 text-xs font-semibold">{label}</p>
        </div>
      )}
    </div>
  );
}

export function PrinciplesCarousel({ items }: { items: Principle[] }) {
  return (
    <Carousel
      items={items}
      ariaLabel="principle"
      renderSlide={(p, { index, count, direction }) => (
        <>
          <div className="flex flex-col items-center gap-6 lg:hidden">
            <div className="shrink-0" style={{ height: "min(40vh, 380px)", aspectRatio: "9/19.5" }}>
              <CarouselSlide slideKey={index} direction={direction}>
                <PhoneSlot src={p.src} alt={p.alt} label={p.name} />
              </CarouselSlide>
            </div>
            <div className="flex min-h-[160px] flex-1 flex-col justify-center text-center">
              <CarouselFade slideKey={index}>
                <span className="text-accent-lime font-body mb-2 block text-xs tracking-widest uppercase">
                  Principle {index + 1} of {count}
                </span>
                <h3 className="font-display text-secondary mb-3 text-xl font-bold">{p.name}</h3>
                <p className="font-body text-secondary/70 max-w-lg text-base leading-relaxed">{p.body}</p>
              </CarouselFade>
            </div>
          </div>

          <div className="border-accent-blue/10 hidden overflow-hidden rounded-2xl border lg:flex">
            <div className="bg-primary/60 border-accent-blue/10 flex items-center justify-center border-r px-8 py-8">
              <div className="shrink-0" style={{ height: "min(50vh, 480px)", aspectRatio: "9/19.5" }}>
                <CarouselSlide slideKey={index} direction={direction}>
                  <PhoneSlot src={p.src} alt={p.alt} label={p.name} />
                </CarouselSlide>
              </div>
            </div>
            <div className="bg-accent-blue/5 flex flex-1 items-center px-10 py-8">
              <div className="flex min-h-[160px] flex-col justify-center">
                <CarouselFade slideKey={index}>
                  <span className="text-accent-lime font-body mb-2 block text-xs tracking-widest uppercase">
                    Principle {index + 1} of {count}
                  </span>
                  <h3 className="font-display text-secondary mb-3 text-2xl font-bold">{p.name}</h3>
                  <p className="font-body text-secondary/70 max-w-lg text-lg leading-relaxed">{p.body}</p>
                </CarouselFade>
              </div>
            </div>
          </div>
        </>
      )}
    />
  );
}

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
      controlsClassName="lg:hidden"
      renderSlide={(screen, { index, direction }) => (
        <>
          <div className="flex flex-col items-center gap-6 lg:hidden">
            <div className="shrink-0" style={{ height: "min(50vh, 480px)", aspectRatio: "9/19.5" }}>
              <CarouselSlide slideKey={index} direction={direction}>
                <PhoneSlot src={screen.src} alt={screen.alt} label={screen.caption.split(":")[0]} />
              </CarouselSlide>
            </div>
            <div className="flex min-h-[60px] flex-col justify-center text-center">
              <CarouselFade slideKey={index}>
                <p className="font-body text-secondary/60 max-w-sm text-sm">{screen.caption}</p>
              </CarouselFade>
            </div>
          </div>

          <div className="hidden gap-6 sm:grid-cols-2 lg:grid lg:grid-cols-4">
            {items.map((s, i) => (
              <Tile key={i} delay={(i % 4) * 0.08} className="group h-full">
                <figure className="h-full">
                  <PhoneSlot src={s.src} alt={s.alt} label={s.caption.split(":")[0]} />
                  <figcaption className="font-body text-secondary/60 mt-4 text-center text-sm">
                    {s.caption}
                  </figcaption>
                </figure>
              </Tile>
            ))}
          </div>
        </>
      )}
    />
  );
}
