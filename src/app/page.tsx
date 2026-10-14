"use client";

import AccessibleButton from "@/components/AccessibleButton";
import SelectedWork from "@/components/SelectedWork";
import DeferredArtScroller from "@/components/DeferredArtScroller";
import HeroWater from "@/components/HeroWater";
import AsciiName from "@/components/AsciiName";

const heroButton =
  "landscape:px-[1.78em] landscape:py-[0.8em] landscape:text-[max(0.875rem,1.125em)]";

export default function Home() {
  return (
    <div className="bg-primary relative overflow-hidden">
      <div className="relative z-10">
        <section className="relative flex min-h-screen flex-col justify-center overflow-hidden pt-[calc(4rem+1em)] pb-[max(2.5em,2.5rem)] lg:pt-[7em] lg:pb-[max(4em,2.5rem)] landscape:min-h-svh landscape:text-[min(1rem,2svh)]">
          <HeroWater className="absolute inset-y-0 right-0 h-full w-full lg:w-[calc(100vw-80px)]" />
          <div className="animate-hero-enter relative z-10 container mx-auto max-w-7xl px-6 lg:px-12">
            <div className="@container relative">
              <div className="mb-[max(0.75rem,2.5em)] grid items-end gap-8 lg:mb-[3.5em] xl:grid-cols-[minmax(0,1fr)_auto]">
                <div className="@container min-w-0 select-none">
                  <AsciiName
                    lines={["Susan", "Chapas"]}
                    className="font-dm text-accent-blue text-[clamp(3em,min(19cqi,28svh-2.5rem),10.5em)] leading-[0.88] font-extrabold tracking-[-0.03em] uppercase"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-[2em] @min-[59em]:flex-row @min-[59em]:items-end @min-[59em]:justify-between @min-[59em]:gap-[4em]">
                <div className="flex flex-col gap-[1.5em] select-none">
                  <p className="font-display text-secondary text-[max(1rem,1.5em)] leading-[1.2] font-bold sm:text-[max(1rem,1.875em)] lg:text-[max(1rem,2.25em)]">
                    AI-native designer who enjoys going beyond the mockup.
                  </p>
                  <div className="font-body flex flex-wrap items-center gap-[0.5em] text-[max(0.75rem,0.875em)] lg:text-[max(0.75rem,1em)] portrait:hidden">
                    <span className="text-secondary/60">Previous experience:</span>
                    <span className="text-secondary/80 bg-accent-blue/10 rounded-full px-[0.75em] py-[0.25em] backdrop-blur-sm">
                      Financial Services
                    </span>
                    <span className="text-secondary/80 bg-accent-blue/10 rounded-full px-[0.75em] py-[0.25em] backdrop-blur-sm">
                      Nonprofit
                    </span>
                    <span className="text-secondary/80 bg-accent-blue/10 rounded-full px-[0.75em] py-[0.25em] backdrop-blur-sm">
                      Healthcare
                    </span>
                  </div>
                </div>
                <div className="flex w-fit shrink-0 flex-col gap-[max(0.5rem,1em)] sm:flex-row landscape:@max-[59em]:flex-row">
                  <AccessibleButton href="/projects" size="lg" className={heroButton}>
                    View My Work
                  </AccessibleButton>
                  <AccessibleButton
                    href="/contact"
                    variant="outline"
                    size="lg"
                    className={`bg-primary/65 backdrop-blur-sm ${heroButton}`}
                  >
                    Get in Touch
                  </AccessibleButton>
                </div>
              </div>
            </div>
          </div>
        </section>

        <SelectedWork />

        <DeferredArtScroller />
      </div>
    </div>
  );
}
