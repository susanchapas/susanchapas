import type { Transition } from "framer-motion";

export const EASE_SMOOTH = [0.22, 1, 0.36, 1] as const;
export const EASE_BOUNCE = [0.34, 1.56, 0.64, 1] as const;

export const m = (reduce: boolean | null, full: Transition): Transition =>
  reduce ? { duration: 0 } : full;
