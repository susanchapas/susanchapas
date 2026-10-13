"use client";

import AccessibleButton from "@/components/AccessibleButton";
import SelectedWork from "@/components/SelectedWork";
import DeferredArtScroller from "@/components/DeferredArtScroller";
import HeroWater from "@/components/HeroWater";
import AsciiName from "@/components/AsciiName";

export default function Home() {
  return (
    <div className="bg-primary relative overflow-hidden">
      <div className="relative z-10">
        <section className="relative flex min-h-screen flex-col justify-center overflow-hidden pt-[5rem] pb-[2.5rem] lg:pt-40 lg:pb-28">
          <HeroWater className="absolute inset-y-0 right-0 h-full w-full lg:w-[calc(100vw-80px)]" />
          <div className="animate-hero-enter relative z-10 container mx-auto max-w-7xl px-6 lg:px-12">
            <div className="relative">
              <div className="mb-10 grid items-end gap-8 lg:mb-14 xl:grid-cols-[minmax(0,1fr)_auto]">
                <div className="@container min-w-0 select-none">
                  <AsciiName
                    lines={["Susan", "Chapas"]}
                    className="font-dm text-accent-blue text-[clamp(3rem,19cqi,10.5rem)] leading-[0.88] font-black tracking-[-0.03em] uppercase"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
                <div className="flex flex-col gap-6 select-none">
                  <p className="font-display text-secondary text-2xl leading-[1.2] font-bold sm:text-3xl lg:text-4xl">
                    AI-native designer who enjoys going beyond the mockup.
                  </p>
                  <div className="font-body flex flex-wrap items-center gap-2 text-sm lg:text-base portrait:hidden">
                    <span className="text-secondary/60">Previous experience:</span>
                    <span className="text-secondary/80 bg-accent-blue/10 rounded-full px-3 py-1 backdrop-blur-sm">
                      Financial Services
                    </span>
                    <span className="text-secondary/80 bg-accent-blue/10 rounded-full px-3 py-1 backdrop-blur-sm">
                      Nonprofit
                    </span>
                    <span className="text-secondary/80 bg-accent-blue/10 rounded-full px-3 py-1 backdrop-blur-sm">
                      Healthcare
                    </span>
                  </div>
                </div>
                <div className="flex w-fit shrink-0 flex-col gap-4 sm:flex-row">
                  <AccessibleButton href="/projects" size="lg">
                    View My Work
                  </AccessibleButton>
                  <AccessibleButton
                    href="/contact"
                    variant="outline"
                    size="lg"
                    className="bg-primary/65 backdrop-blur-sm"
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
