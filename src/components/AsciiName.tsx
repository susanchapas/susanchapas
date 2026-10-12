"use client";

import { Fragment, useEffect, useRef } from "react";

const FONT =
  'ui-monospace, SFMono-Regular, Menlo, Consolas, "Liberation Mono", monospace';
const EDGE = [":", "+", "*", "x", "%", "#"];
const FILL = ["#", "%", "&", "$", "@", "8", "B", "W", "M", "0"];
const SCRAMBLE = ["!", "<", ">", "/", "\\", "[", "]", "{", "}", "?", "^", "~"];
const HOLD = 0.012;
const RISE = 0.35;

const hash = (x: number, y: number) => {
  let h = Math.imul(x, 374761393) + Math.imul(y, 668265263);
  h = Math.imul(h ^ (h >>> 13), 1274126177);
  return ((h ^ (h >>> 16)) >>> 0) / 4294967296;
};

export default function AsciiName({
  lines,
  className,
}: {
  lines: string[];
  className?: string;
}) {
  const h1Ref = useRef<HTMLHeadingElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const h1 = h1Ref.current;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!h1 || !canvas || !ctx) return;

    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const solid = document.createElement("canvas");
    const sx = solid.getContext("2d", { willReadFrequently: true })!;

    let cols = 0,
      rows = 0,
      cw = 0,
      chh = 0,
      pad = 0,
      dpr = 1,
      brush = 0,
      f = 0;
    let glyph: string[] = [];
    let edge = new Uint8Array(0);
    let reveal = new Float32Array(0);
    let color = "";
    let ptr: { x: number; y: number } | null = null;
    let raf = 0;

    const build = () => {
      const rect = h1.getBoundingClientRect();
      if (!rect.width) return;
      const style = getComputedStyle(h1);
      const size = parseFloat(style.fontSize);
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      pad = Math.round(size * 0.15);
      const W = rect.width + pad * 2,
        H = rect.height + pad * 2;
      for (const el of [canvas, solid]) {
        el.width = Math.round(W * dpr);
        el.height = Math.round(H * dpr);
      }
      Object.assign(canvas.style, {
        left: `${-pad}px`,
        top: `${-pad}px`,
        width: `${W}px`,
        height: `${H}px`,
      });
      color = style.color;
      brush = size * 0.32;

      sx.setTransform(dpr, 0, 0, dpr, 0, 0);
      sx.clearRect(0, 0, W, H);
      sx.font = `${style.fontWeight} ${style.fontSize} ${style.fontFamily}`;
      sx.fillStyle = color;
      sx.textAlign = "center";
      sx.textBaseline = "alphabetic";
      const ascent = sx.measureText("H").fontBoundingBoxAscent;
      const upper = style.textTransform === "uppercase";
      const range = document.createRange();
      const walker = document.createTreeWalker(h1, NodeFilter.SHOW_TEXT);
      for (let node = walker.nextNode(); node; node = walker.nextNode()) {
        const text = node.textContent ?? "";
        for (let k = 0; k < text.length; k++) {
          if (!text[k].trim()) continue;
          range.setStart(node, k);
          range.setEnd(node, k + 1);
          const r = range.getBoundingClientRect();
          if (!r.width) continue;
          const ch = upper ? text[k].toUpperCase() : text[k];
          sx.fillText(
            ch,
            r.left - rect.left + pad + r.width / 2,
            r.top - rect.top + pad + ascent
          );
        }
      }

      f = Math.max(5, Math.round(size / 22));
      ctx.font = `${f}px ${FONT}`;
      cw = ctx.measureText("M").width;
      chh = Math.round(f * 1.15);
      cols = Math.ceil(W / cw);
      rows = Math.ceil(H / chh);
      glyph = new Array(cols * rows).fill("");
      edge = new Uint8Array(cols * rows);
      reveal = new Float32Array(cols * rows);
      const data = sx.getImageData(0, 0, solid.width, solid.height).data;
      const cover = (c: number, r: number) => {
        const x0 = Math.floor(c * cw * dpr),
          y0 = Math.floor(r * chh * dpr);
        const x1 = Math.min(solid.width, Math.floor((c + 1) * cw * dpr));
        const y1 = Math.min(solid.height, Math.floor((r + 1) * chh * dpr));
        let sum = 0,
          cnt = 0;
        for (let y = y0; y < y1; y += 2)
          for (let x = x0; x < x1; x += 2) {
            sum += data[(y * solid.width + x) * 4 + 3];
            cnt++;
          }
        return cnt ? sum / cnt / 255 : 0;
      };
      for (let r = 0; r < rows; r++)
        for (let c = 0; c < cols; c++) {
          const v = cover(c, r);
          if (v < 0.08) continue;
          const i = r * cols + c;
          const isEdge = v < 0.85;
          edge[i] = isEdge ? 1 : 0;
          glyph[i] = isEdge
            ? EDGE[Math.min(EDGE.length - 1, Math.floor(v * EDGE.length))]
            : FILL[Math.floor(hash(c, r) * FILL.length)];
        }
      h1.style.webkitTextFillColor = "transparent";
      draw(performance.now());
    };

    const draw = (t: number) => {
      const W = canvas.width,
        H = canvas.height;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, W, H);
      ctx.globalAlpha = 1;
      ctx.drawImage(solid, 0, 0);
      ctx.globalCompositeOperation = "destination-out";
      const sw = Math.ceil(cw * dpr),
        sh = Math.ceil(chh * dpr);
      for (let i = 0; i < reveal.length; i++) {
        if (reveal[i] < 0.01) continue;
        ctx.globalAlpha = Math.min(1, reveal[i] * 1.6);
        ctx.fillRect(
          Math.floor((i % cols) * cw * dpr),
          Math.floor(((i / cols) | 0) * chh * dpr),
          sw,
          sh
        );
      }
      ctx.globalCompositeOperation = "source-over";
      ctx.fillStyle = "#06101f";
      for (let i = 0; i < reveal.length; i++) {
        if (reveal[i] < 0.01 || !glyph[i]) continue;
        ctx.globalAlpha = Math.min(0.9, reveal[i] * 1.6);
        ctx.fillRect(
          Math.floor((i % cols) * cw * dpr),
          Math.floor(((i / cols) | 0) * chh * dpr),
          sw,
          sh
        );
      }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.font = `${f}px ${FONT}`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillStyle = color;
      const tick = Math.floor(t / 70);
      for (let i = 0; i < reveal.length; i++) {
        const v = reveal[i];
        if (v < 0.01 || !glyph[i]) continue;
        const c = i % cols,
          r = (i / cols) | 0;
        const ch =
          v < 0.55 && !motion.matches
            ? SCRAMBLE[Math.floor(hash(i, tick) * SCRAMBLE.length)]
            : glyph[i];
        ctx.globalAlpha = Math.min(1, v * 1.4) * (edge[i] ? 0.85 : 1);
        ctx.fillText(ch, (c + 0.5) * cw, (r + 0.5) * chh);
      }
      ctx.globalAlpha = 1;
    };

    const loop = (t: number) => {
      let active = false;
      for (let r = 0; r < rows; r++)
        for (let c = 0; c < cols; c++) {
          const i = r * cols + c;
          let target = 0;
          if (ptr) {
            const d = Math.hypot((c + 0.5) * cw - ptr.x, (r + 0.5) * chh - ptr.y);
            if (d < brush) target = 1 - (d / brush) ** 3;
          }
          reveal[i] =
            target > reveal[i]
              ? reveal[i] + (target - reveal[i]) * RISE
              : Math.max(0, reveal[i] - HOLD);
          if (reveal[i] > 0) active = true;
        }
      draw(t);
      raf = active || ptr ? requestAnimationFrame(loop) : 0;
    };
    const wake = () => {
      if (!raf) raf = requestAnimationFrame(loop);
    };

    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      ptr = { x: e.clientX - rect.left, y: e.clientY - rect.top };
      wake();
    };
    const onLeave = () => {
      ptr = null;
      wake();
    };

    const ro = new ResizeObserver(build);
    ro.observe(h1);
    const st = getComputedStyle(h1);
    document.fonts.load(`${st.fontWeight} ${st.fontSize} ${st.fontFamily}`).then(build);
    document.fonts.addEventListener("loadingdone", build);
    h1.addEventListener("pointermove", onMove, { passive: true });
    h1.addEventListener("pointerleave", onLeave);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      document.fonts.removeEventListener("loadingdone", build);
      h1.removeEventListener("pointermove", onMove);
      h1.removeEventListener("pointerleave", onLeave);
      h1.style.webkitTextFillColor = "";
    };
  }, []);

  return (
    <h1 ref={h1Ref} className={`relative ${className ?? ""}`}>
      {lines.map((line, i) => (
        <Fragment key={line}>
          {i > 0 && <br />}
          {line}
        </Fragment>
      ))}
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="pointer-events-none absolute tracking-normal"
      />
    </h1>
  );
}
