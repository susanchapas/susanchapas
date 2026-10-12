"use client";

import { Fragment, useEffect, useRef, useState, type ReactNode } from "react";

const GAP = 12;
const MOBILE_BREAKPOINT = 640;

function targetHeight(width: number): number {
  if (width >= 1024) return 340;
  return 300;
}

export interface Sized {
  id: number | string;
  width: number;
  height: number;
}

interface PlacedTile<T> {
  art: T;
  width: number;
  height: number;
  index: number;
}

function buildRows<T extends Sized>(artworks: readonly T[], containerWidth: number): PlacedTile<T>[][] {
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
  const rows: PlacedTile<T>[][] = [];
  let row: T[] = [];
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

interface BentoGridProps<T extends Sized> {
  items: readonly T[];
  activeKey?: string;
  renderTile: (item: T, width: number, height: number, index: number) => ReactNode;
}

export default function BentoGrid<T extends Sized>({
  items,
  activeKey,
  renderTile,
}: BentoGridProps<T>) {
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

  const rows = buildRows(items, width);

  return (
    <div ref={ref} className="group/grid">
      {width > 0 && (
        <div key={activeKey} className="flex flex-col gap-3">
          {rows.map((row, i) => (
            <div key={i} className="flex gap-3">
              {row.map(({ art, width: w, height: h, index }) => (
                <Fragment key={art.id}>{renderTile(art, w, h, index)}</Fragment>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
