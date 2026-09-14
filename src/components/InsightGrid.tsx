"use client";

import { ReactNode } from "react";
import Tile from "@/components/Tile";

export default function InsightGrid({
  items,
  thesis,
}: {
  items: { title: string; body: string }[];
  thesis: ReactNode;
}) {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {items.map((item, i) => (
        <Tile
          key={item.title}
          delay={(i % 3) * 0.08}
          className="group bg-primary border-accent-blue/10 hover:border-accent-lime/40 h-full rounded-2xl border p-7 transition-colors"
        >
          <div className="bg-accent-lime/10 text-accent-lime font-display group-hover:bg-accent-lime group-hover:text-primary mb-5 flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold transition-all duration-500 ease-[var(--ease-liquid)] group-hover:scale-105">
            {String(i + 1).padStart(2, "0")}
          </div>
          <h3 className="font-display text-secondary mb-3 text-lg font-bold">
            {item.title}
          </h3>
          <p className="font-body text-secondary/70 text-sm leading-relaxed">
            {item.body}
          </p>
        </Tile>
      ))}

      <Tile
        delay={0.16}
        className="bg-primary border-accent-lime/50 flex h-full flex-col justify-center rounded-2xl border-2 p-7"
      >
        <span className="text-accent-lime font-body text-xs tracking-widest uppercase">
          The thesis
        </span>
        <p className="font-display text-secondary mt-3 text-xl leading-snug font-bold">
          {thesis}
        </p>
      </Tile>
    </div>
  );
}
