"use client";

import FadeIn from "./FadeIn";
import Tile from "@/components/Tile";

export default function ResearchStats({
  stats,
}: {
  stats: { value: string; label: string }[];
}) {
  return (
    <div className="grid gap-6 sm:grid-cols-3">
      {stats.map((stat, i) => (
        <Tile
          key={stat.label}
          delay={i * 0.08}
          className="bg-accent-blue/5 border-accent-blue/10 hover:border-accent-lime/40 h-full rounded-2xl border p-8 text-center transition-colors"
        >
          <FadeIn
            direction="scale"
            delay={i * 0.08 + 0.12}
            className="font-display text-accent-lime mb-3 text-4xl font-bold lg:text-5xl"
            style={{ "--ts": "0.5" } as React.CSSProperties}
          >
            {stat.value}
          </FadeIn>
          <p className="font-body text-secondary/70 text-sm leading-relaxed">
            {stat.label}
          </p>
        </Tile>
      ))}
    </div>
  );
}
