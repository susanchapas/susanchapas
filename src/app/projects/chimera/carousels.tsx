"use client";

import Image from "next/image";
import { Carousel, CarouselSlide, CarouselFade } from "@/components/Carousel";
import { ChevronLeftIcon, ChevronRightIcon } from "@/components/Icons";

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
  title: string;
  description: string;
}

export function ProductTourCarousel({ items }: { items: ProductScreen[] }) {
  const arrowCls =
    "border-accent-blue/20 bg-accent-blue/5 text-secondary hover:border-accent-lime hover:text-accent-lime flex h-10 w-10 shrink-0 items-center justify-center rounded-full border transition-colors";

  return (
    <Carousel
      items={items}
      ariaLabel="screen"
      controlsLayout="none"
      renderSlide={(screen, { index, count, direction, prev, next, dots }) => (
        <>
          <div className="flex flex-col items-center gap-4 lg:hidden">
            <div className="flex w-full items-center justify-center gap-3">
              <button type="button" onClick={prev} aria-label="Previous screen" className={arrowCls}>
                <ChevronLeftIcon className="h-4 w-4" />
              </button>
              <div className="relative aspect-square w-full max-w-[400px] overflow-hidden rounded-2xl">
                <CarouselSlide slideKey={index} direction={direction} className="h-full">
                  <div className="flex h-full items-center justify-center">
                    <div className="relative h-[93%] w-[93%]">
                      <Image
                        src={encodeURI(screen.src)}
                        alt={screen.alt}
                        fill
                        loading="lazy"
                        sizes="(min-width: 640px) 372px, 93vw"
                        className="object-contain"
                      />
                    </div>
                  </div>
                </CarouselSlide>
              </div>
              <button type="button" onClick={next} aria-label="Next screen" className={arrowCls}>
                <ChevronRightIcon className="h-4 w-4" />
              </button>
            </div>
            {dots}
            <div className="flex min-h-[100px] flex-col justify-center text-center">
              <CarouselFade slideKey={index}>
                <span className="text-accent-lime font-body mb-2 block text-xs tracking-widest uppercase">
                  {index + 1} of {count}
                </span>
                <h3 className="font-display text-secondary mb-2 text-xl font-bold">{screen.title}</h3>
                <p className="font-body text-secondary/70 max-w-sm text-base leading-relaxed">{screen.description}</p>
              </CarouselFade>
            </div>
          </div>

          <div className="hidden items-center gap-4 lg:flex">
            <button type="button" onClick={prev} aria-label="Previous screen" className={arrowCls}>
              <ChevronLeftIcon className="h-4 w-4" />
            </button>
            <div className="border-accent-blue/10 flex flex-1 overflow-hidden rounded-2xl border">
              <div className="relative aspect-square w-[480px] shrink-0 overflow-hidden">
                <CarouselSlide slideKey={index} direction={direction} className="h-full">
                  <div className="flex h-full items-center justify-center">
                    <div className="relative h-[93%] w-[93%]">
                      <Image
                        src={encodeURI(screen.src)}
                        alt={screen.alt}
                        fill
                        loading="lazy"
                        sizes="446px"
                        className="object-contain"
                      />
                    </div>
                  </div>
                </CarouselSlide>
              </div>
              <div className="bg-accent-blue/5 flex flex-1 flex-col px-10 py-8">
                <div className="flex min-h-[160px] flex-1 flex-col justify-center">
                  <CarouselFade slideKey={index}>
                    <span className="text-accent-lime font-body mb-2 block text-xs tracking-widest uppercase">
                      {index + 1} of {count}
                    </span>
                    <h3 className="font-display text-secondary mb-3 text-2xl font-bold">{screen.title}</h3>
                    <p className="font-body text-secondary/70 max-w-lg text-lg leading-relaxed">{screen.description}</p>
                  </CarouselFade>
                </div>
                <div className="flex justify-center pt-4">{dots}</div>
              </div>
            </div>
            <button type="button" onClick={next} aria-label="Next screen" className={arrowCls}>
              <ChevronRightIcon className="h-4 w-4" />
            </button>
          </div>
        </>
      )}
    />
  );
}
