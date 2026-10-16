"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

interface Connector {
  sx: number;
  sy: number;
  ex: number;
  ey: number;
}

export function useConnector(active: number) {
  const [connector, setConnector] = useState<Connector | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const slotRef = useRef<HTMLDivElement>(null);
  const targetRefs = useRef<(HTMLElement | null)[]>([]);

  const measure = useCallback(() => {
    const root = rootRef.current?.getBoundingClientRect();
    const slot = (
      slotRef.current?.firstElementChild ?? slotRef.current
    )?.getBoundingClientRect();
    const target = targetRefs.current[active]?.getBoundingClientRect();
    if (!root || !slot || !target || !slot.width) return setConnector(null);
    setConnector({
      sx: target.right - root.left + 20,
      sy: target.top + target.height / 2 - root.top,
      ex: slot.left - root.left - 14,
      ey: slot.top + slot.height * 0.5 - root.top,
    });
  }, [active]);

  useEffect(() => {
    const frame = requestAnimationFrame(measure);
    const observer = new ResizeObserver(measure);
    if (rootRef.current) observer.observe(rootRef.current);
    const card = slotRef.current?.firstElementChild;
    if (card) observer.observe(card);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, [measure]);

  return { connector, rootRef, slotRef, targetRefs };
}

export function ConnectorArrow({
  connector,
  active,
}: {
  connector: Connector | null;
  active: number;
}) {
  const reduce = useReducedMotion();
  if (!connector) return null;

  const vx = connector.ex - connector.sx;
  const vy = connector.ey - connector.sy;
  const len = Math.hypot(vx, vy) || 1;
  const amount = len * 0.16;
  const cx = (connector.sx + connector.ex) / 2 - (vy / len) * amount;
  const cy = (connector.sy + connector.ey) / 2 + (vx / len) * amount;
  const path = `M ${connector.sx} ${connector.sy} Q ${cx} ${cy}, ${connector.ex} ${connector.ey}`;
  const headAngle = (Math.atan2(connector.ey - cy, connector.ex - cx) * 180) / Math.PI;

  return (
    <svg
      className="text-accent-lime pointer-events-none absolute inset-0 z-0 h-full w-full overflow-visible"
      aria-hidden="true"
    >
      <motion.circle
        key={`dot-${active}`}
        cx={connector.sx}
        cy={connector.sy}
        r={4}
        fill="currentColor"
        initial={reduce ? false : { scale: 0 }}
        animate={{ scale: 1 }}
      />
      <motion.path
        key={`path-${active}`}
        d={path}
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        initial={reduce ? false : { pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      />
      <motion.path
        key={`head-${active}`}
        d={`M ${connector.ex - 9} ${connector.ey - 6} L ${connector.ex + 1} ${connector.ey} L ${connector.ex - 9} ${connector.ey + 6}`}
        transform={`rotate(${headAngle} ${connector.ex} ${connector.ey})`}
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.35, duration: 0.15 }}
      />
    </svg>
  );
}
