"use client";

import Tile from "@/components/Tile";

export default function FeatureGrid({
  features,
  columns = 3,
}: {
  features: { name: string; body: string }[];
  columns?: 2 | 3;
}) {
  const colClass = columns === 2 ? "md:grid-cols-2" : "md:grid-cols-2 lg:grid-cols-3";

  return (
    <div className={`grid gap-6 ${colClass}`}>
      {features.map((feature, i) => (
        <Tile
          key={feature.name}
          delay={(i % columns) * 0.08}
          className="group bg-accent-blue/5 border-accent-blue/10 hover:border-accent-lime/40 h-full rounded-2xl border p-7 transition-colors"
        >
          <h3 className="font-display text-accent-blue group-hover:text-accent-lime mb-3 text-lg font-bold transition-colors">
            {feature.name}
          </h3>
          <p className="font-body text-secondary/70 text-sm leading-relaxed">
            {feature.body}
          </p>
        </Tile>
      ))}
    </div>
  );
}
