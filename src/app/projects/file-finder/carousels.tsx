"use client";

import { Carousel, CarouselSlide, CarouselFade } from "@/components/Carousel";

interface Strength {
  category: string;
  items: string[];
}

export function StrengthsCarousel({ items }: { items: Strength[] }) {
  return (
    <Carousel
      items={items}
      ariaLabel="strength"
      renderSlide={(s, { index, count, direction }) => (
        <>
          <div className="flex flex-col items-center gap-6 lg:hidden">
            <div className="flex min-h-[200px] w-full flex-col justify-center text-center">
              <CarouselSlide slideKey={index} direction={direction}>
                <span className="text-accent-lime font-body mb-2 block text-xs tracking-widest uppercase">
                  {index + 1} of {count}
                </span>
                <h3 className="font-display text-secondary mb-4 text-xl font-bold">{s.category}</h3>
                <ul className="mx-auto max-w-sm space-y-2 text-left">
                  {s.items.map((item) => (
                    <li key={item} className="font-body text-secondary/70 flex items-start text-sm leading-relaxed">
                      <span className="bg-accent-lime/20 mt-1.5 mr-3 h-1.5 w-1.5 shrink-0 rounded-full" />
                      {item}
                    </li>
                  ))}
                </ul>
              </CarouselSlide>
            </div>
          </div>

          <div className="border-accent-blue/10 hidden overflow-hidden rounded-2xl border lg:flex">
            <div className="bg-primary/60 border-accent-blue/10 flex w-2/5 items-center justify-center border-r px-8 py-8">
              <CarouselFade slideKey={index} className="text-center">
                <span className="text-accent-lime font-body mb-2 block text-xs tracking-widest uppercase">
                  {index + 1} of {count}
                </span>
                <h3 className="font-display text-secondary text-2xl font-bold">{s.category}</h3>
              </CarouselFade>
            </div>
            <div className="bg-accent-blue/5 flex flex-1 items-center px-10 py-8">
              <div className="flex min-h-[160px] flex-col justify-center">
                <CarouselFade slideKey={index}>
                  <ul className="space-y-3">
                    {s.items.map((item) => (
                      <li key={item} className="font-body text-secondary/70 flex items-start text-base leading-relaxed">
                        <span className="bg-accent-lime/20 mt-2 mr-3 h-1.5 w-1.5 shrink-0 rounded-full" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </CarouselFade>
              </div>
            </div>
          </div>
        </>
      )}
    />
  );
}
