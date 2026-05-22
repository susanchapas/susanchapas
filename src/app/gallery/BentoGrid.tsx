"use client";

import { useEffect, useRef, useState } from "react";
import BentoTile from "./BentoTile";
import type { Artwork } from "./artworks";

const GAP = 12;
const MOBILE_BREAKPOINT = 640;

function targetHeight(width: number): number {
  if (width >= 1024) return 340;
  return 300;
}

interface PlacedTile {
  art: Artwork;
  width: number;
  height: number;
  index: number;
}

function buildRows(artworks: readonly Artwork[], containerWidth: number): PlacedTile[][] {
  if (containerWidth <= 0) return [];
  if (containerWidth < MOBILE_BREAKPOINT) {
    return artworks.map((art, index) => [
      {
        art,
        width: Math.round(containerWidth),
        height: Math.round(containerWidth / (art.width / art.height)),
        index,
      },
    ]);
  }
  const target = targetHeight(containerWidth);
  const rows: PlacedTile[][] = [];
  let row: Artwork[] = [];
  let aspectSum = 0;
  let placed = 0;

  const flush = (isLast: boolean) => {
    if (row.length === 0) return;
    const gaps = (row.length - 1) * GAP;
    let height = (containerWidth - gaps) / aspectSum;
    if (isLast && height > target) height = target;
    rows.push(
      row.map((art) => {
        const ratio = art.width / art.height;
        return {
          art,
          width: Math.round(height * ratio),
          height: Math.round(height),
          index: placed++,
        };
      })
    );
    row = [];
    aspectSum = 0;
  };

  for (const art of artworks) {
    row.push(art);
    aspectSum += art.width / art.height;
    const rowWidth = aspectSum * target + (row.length - 1) * GAP;
    if (rowWidth >= containerWidth) flush(false);
  }
  flush(true);
  return rows;
}

interface BentoGridProps {
  artworks: readonly Artwork[];
  activeKey: string;
  onOpen: (id: number) => void;
}

export default function BentoGrid({ artworks, activeKey, onOpen }: BentoGridProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const measure = () => setWidth(el.clientWidth);
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const rows = buildRows(artworks, width);

  return (
    <div ref={ref} className="group/grid">
      {width > 0 && (
        <div key={activeKey} className="flex flex-col gap-3">
          {rows.map((row, i) => (
            <div key={i} className="flex gap-3">
              {row.map(({ art, width: w, height: h, index }) => (
                <BentoTile
                  key={art.id}
                  artwork={art}
                  width={w}
                  height={h}
                  index={index}
                  onOpen={() => onOpen(art.id)}
                />
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
