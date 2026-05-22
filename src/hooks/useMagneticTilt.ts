"use client";

import { useEffect, useRef, useState } from "react";
import {
  useMotionValue,
  useSpring,
  useTransform,
  useMotionTemplate,
  useReducedMotion,
  type MotionStyle,
} from "framer-motion";

const TILT_SPRING = { stiffness: 320, damping: 28, mass: 0.4 };
const LIFT_SPRING = { stiffness: 280, damping: 26, mass: 0.5 };

function useFinePointer() {
  const [fine, setFine] = useState(false);
  useEffect(() => {
    const isTouch =
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0 ||
      window.matchMedia("(pointer: coarse)").matches;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- detect pointer capability post-hydration (browser-only APIs, SSR-safe default)
    setFine(!isTouch);
  }, []);
  return fine;
}

export function useMagneticTilt({
  isHero = false,
  disabled = false,
}: { isHero?: boolean; disabled?: boolean } = {}) {
  const reduce = useReducedMotion();
  const finePointer = useFinePointer();
  const enabled = finePointer && !reduce && !disabled;

  const ref = useRef<HTMLElement>(null);

  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const hover = useMotionValue(0);

  const maxRot = isHero ? 10 : 7;
  const maxZ = isHero ? 44 : 28;
  const maxScale = isHero ? 1.035 : 1.025;
  const maxImg = isHero ? 16 : 11;

  const rotateX = useSpring(
    useTransform(py, [-0.5, 0.5], [maxRot, -maxRot]),
    TILT_SPRING
  );
  const rotateY = useSpring(
    useTransform(px, [-0.5, 0.5], [-maxRot, maxRot]),
    TILT_SPRING
  );
  const z = useSpring(useTransform(hover, [0, 1], [0, maxZ]), LIFT_SPRING);
  const scale = useSpring(useTransform(hover, [0, 1], [1, maxScale]), LIFT_SPRING);
  const imgX = useSpring(useTransform(px, [-0.5, 0.5], [maxImg, -maxImg]), TILT_SPRING);
  const imgY = useSpring(useTransform(py, [-0.5, 0.5], [maxImg, -maxImg]), TILT_SPRING);

  const shadowX = useTransform(rotateY, [-maxRot, maxRot], [26, -26]);
  const shadowY = useTransform(rotateX, [-maxRot, maxRot], [-26, 26]);
  const glow = useTransform(hover, [0, 1], [0, 0.32]);
  const boxShadow = useMotionTemplate`${shadowX}px ${shadowY}px 45px -12px rgba(0,0,0,0.6), 0 0 38px -6px rgba(204,255,0,${glow})`;

  function setGlare(e: React.PointerEvent) {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${((e.clientX - r.left) / r.width) * 100}%`);
    el.style.setProperty("--my", `${((e.clientY - r.top) / r.height) * 100}%`);
    px.set((e.clientX - r.left) / r.width - 0.5);
    py.set((e.clientY - r.top) / r.height - 0.5);
  }

  function onPointerMove(e: React.PointerEvent) {
    if (e.pointerType !== "mouse") return;
    setGlare(e);
    hover.set(1);
  }
  function onPointerEnter(e: React.PointerEvent) {
    if (e.pointerType === "mouse") hover.set(1);
  }
  function reset() {
    px.set(0);
    py.set(0);
    hover.set(0);
  }

  const tiltStyle: MotionStyle | undefined = enabled
    ? {
        rotateX,
        rotateY,
        z,
        scale,
        boxShadow,
        transformPerspective: isHero ? 1100 : 900,
        transformStyle: "preserve-3d",
      }
    : undefined;

  return {
    ref,
    enabled,
    reset,
    handlers: enabled ? { onPointerMove, onPointerEnter, onPointerLeave: reset } : {},
    tiltStyle,
    imgStyle: enabled ? { x: imgX, y: imgY } : undefined,
  };
}
