"use client";

import { useEffect, useRef } from "react";

type RGB = [number, number, number];

const FONT =
  'ui-monospace, SFMono-Regular, Menlo, Consolas, "Liberation Mono", monospace';
const RAMP = " .'`^\",:;Il!i><~+_-?][}{1)(|\\/tfjrxnuvczXYUJCLQ0OZmwqpdbkhao*#MW&8%B@$";
const LOW = [".", ":", ";", "-", "~", "'", ","];
const MID = ["+", "=", "x", "z", "c", "v", "u", "n", "o", "i", "*"];
const HIGH = ["#", "%", "&", "$", "@", "8", "B", "W", "M", "Q", "0", "O"];
const BLADE_LO = [",", "'", ":", ";", "."];
const BLADE_MID = [";", "i", "!", "|", "'", "j"];
const BLADE_HI = ["|", "l", "1", "!", "/", "\\", "I", "|"];
const SWAY = ["\\", "(", "|", ")", "/"];
const SPECK = [".", "*", "o", "'", "+"];
const SPARK: [number, number, string][] = [
  [1, 0, "-"],
  [-1, 0, "-"],
  [0, 1, "|"],
  [0, -1, "|"],
  [1, 1, "\\"],
  [-1, -1, "\\"],
  [1, -1, "/"],
  [-1, 1, "/"],
];
const HALO = ["`", "·", ".", "'", ",", ":", ";", "~", "+", "=", "*"];
const WATER_R = [" ", "·", "-", "~", "=", "≈", "*"];
const CRATERS = [
  [-0.3, -0.25, 0.2],
  [0.35, 0.18, 0.15],
  [0.05, 0.45, 0.13],
  [-0.45, 0.3, 0.1],
  [0.4, -0.4, 0.09],
];
const A = 10;
const DAMP = 0.992;
const EASE = 0.07;
const RIP_EASE = 0.18;
const CHUNK = 3;
const TAU = Math.PI * 2;
const PAD_FILL = [":", ";", "=", "+", "*", "%", "#"];
const WATER_BG = "rgb(8,17,32)";
const PADS = [
  { dx: 0, dy: 0, s: 1, aspect: 0.62, notch: 2.1, flower: true },
  { dx: 0.11, dy: 0.09, s: 0.7, aspect: 0.7, notch: Math.PI / 2 + 0.4, flower: false },
  {
    dx: -0.08,
    dy: 0.12,
    s: 0.63,
    aspect: 0.7,
    notch: -Math.PI / 2 + 0.35,
    flower: false,
  },
  { dx: 0.13, dy: -0.04, s: 0.6, aspect: 0.7, notch: Math.PI / 2 - 0.45, flower: false },
];
const CUT = 0.36;
const VEINS = [0.8, 1.55, 2.3, Math.PI, -2.3, -1.55, -0.8];
const LOTUS = String.raw`
          /\
      /\ /::\ /\
  /\ /::\|::|/::\ /\
  \:\\:::\::/:::/:/
   '.:\\:(**)://:.'
     '-.______.-'`
  .slice(1)
  .split("\n");
const FLY = [":", "."].map((v) => {
  const wing = `          (${v}) (${v})`;
  return [
    "           .   .",
    wing,
    wing,
    "           `\\ /'",
    "-=:=:=:=:=:={##}@",
    "           ./ \\.",
    wing,
    wing,
    "           '   '",
  ];
});

const clamp = (v: number, lo: number, hi: number) => (v < lo ? lo : v > hi ? hi : v);
const mix = (a: RGB, b: RGB, t: number): RGB => {
  t = clamp(t, 0, 1);
  return [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t];
};
const hash = (x: number, y: number) => {
  let h = Math.imul(x, 374761393) + Math.imul(y, 668265263);
  h = Math.imul(h ^ (h >>> 13), 1274126177);
  return ((h ^ (h >>> 16)) >>> 0) / 4294967296;
};
const pick = <T,>(arr: T[], c: number, r: number) =>
  arr[Math.floor(hash(c + 31, r + 17) * arr.length)];
const vnoise = (x: number, y: number) => {
  const xi = Math.floor(x),
    yi = Math.floor(y);
  const xf = x - xi,
    yf = y - yi;
  const u = xf * xf * (3 - 2 * xf),
    v = yf * yf * (3 - 2 * yf);
  const a = hash(xi, yi),
    b = hash(xi + 1, yi),
    c = hash(xi, yi + 1),
    d = hash(xi + 1, yi + 1);
  return a + (b - a) * u + (c - a) * v + (a - b - c + d) * u * v;
};
const fbm = (x: number, y: number) =>
  vnoise(x, y) * 0.57 + vnoise(x * 2.1, y * 2.1) * 0.29 + vnoise(x * 4.3, y * 4.3) * 0.14;
const mulberry = (seed: number) => () => {
  seed = (seed + 0x6d2b79f5) | 0;
  let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};
const wrap = (v: number, p: number) => ((v % p) + p) % p;
const dirChar = (a: number) => {
  const d = (wrap(a, Math.PI) * 180) / Math.PI;
  return d < 31 || d >= 149 ? "-" : d < 77 ? "\\" : d < 103 ? "|" : "/";
};
const band = (lum: number, c: number, r: number) =>
  pick(lum < 0.2 ? LOW : lum < 0.42 ? MID : HIGH, c, r);

export default function HeroWater({ className }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const host = canvas?.parentElement;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !host || !ctx) return;

    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const layer = () => {
      const el = document.createElement("canvas");
      return [el, el.getContext("2d")!] as const;
    };
    const [base, bsx] = layer();
    const [land, lx] = layer();
    const [shade, shx] = layer();
    const [tex, tx] = layer();
    const [glow, gx2] = layer();
    const [atlas, atx] = layer();
    const [swayAtlas, sax] = layer();

    let cols = 0,
      rows = 0,
      cw = 0,
      chh = 0,
      dpr = 1,
      sw = 0,
      sh = 0,
      sRows = 0;
    let gl0 = 0,
      gl1 = 0;
    let shore = new Int16Array(0),
      sTop = new Int16Array(0),
      srOf = new Int16Array(0);
    let cx = new Int32Array(0),
      cy = new Int32Array(0);
    let cur = new Float32Array(0),
      nxt = new Float32Array(0);
    let smH = new Float32Array(0),
      disp = new Float32Array(0);
    let grassIdx = new Int32Array(0),
      grassPal = new Uint16Array(0),
      bend = new Float32Array(0),
      bendV = new Float32Array(0);
    let ptrX = 0,
      ptrY = 0,
      ptrOn = false;
    let mx = 0,
      my = 0,
      R = 0,
      moonGlow = 0,
      lastT = 0,
      nextSpark = 0;
    type Pad = {
      x: number;
      y: number;
      vx: number;
      vy: number;
      bob: number;
      tilt: number;
      rx: number;
      ry: number;
      notch: number;
      flower: boolean;
    };
    let pads: Pad[] = [];
    const fly = { x: 0, y: 0, dir: 1, wait: 0, t: 0 };
    let queue: number[] = [];
    let stars: { i: number; ch: string; a: number; ph: number; sp: number; b: number }[] =
      [];

    const setup = () => {
      const { width: W, height: H } = canvas.getBoundingClientRect();
      if (!W || !H) return;
      const rng = mulberry(7);
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      const f = clamp(Math.round(W / 170), 7, 10);
      const font = `${f}px ${FONT}`;
      lx.font = font;
      cw = lx.measureText("M").width;
      chh = Math.round(f * 1.2);
      cols = Math.ceil(W / cw);
      rows = Math.ceil(H / chh);
      const n = cols * rows;
      for (const el of [canvas, base, land, shade, tex, glow]) {
        el.width = Math.round(W * dpr);
        el.height = Math.round(H * dpr);
      }
      for (const x of [ctx, bsx, lx, shx, tx, gx2]) {
        x.setTransform(dpr, 0, 0, dpr, 0, 0);
        x.font = font;
        x.textAlign = "center";
        x.textBaseline = "middle";
      }

      shore = new Int16Array(cols);
      cx = Int32Array.from({ length: cols }, (_, c) => Math.round(c * cw * dpr));
      cy = Int32Array.from({ length: rows }, (_, r) => Math.round(r * chh * dpr));
      smH = new Float32Array(n);
      disp = new Float32Array(n);
      const chA: string[] = new Array(n).fill("");
      const colA = new Float32Array(n * 3);
      const alA = new Float32Array(n);
      const isGrass = new Uint8Array(n);
      const put = (c: number, r: number, ch: string, rgb: RGB, a: number) => {
        if (c < 0 || c >= cols || r < 0 || r >= rows) return;
        const i = r * cols + c;
        isGrass[i] = 0;
        chA[i] = ch;
        colA.set(rgb, i * 3);
        alA[i] = clamp(a, 0, 1);
      };
      const xc = (c: number) => (c + 0.5) * cw;
      const yr = (r: number) => (r + 0.5) * chh;
      const hzAt = (x: number) => H * 0.2 + (fbm(x * 0.004, 3.1) - 0.5) * H * 0.03;
      const syAt = (x: number) =>
        H * 0.36 +
        (fbm(x * 0.006, 9.7) - 0.5) * H * 0.05 +
        Math.sin(x * 0.011) * H * 0.006;
      const farH = (x: number) =>
        H * (0.03 + 0.035 * fbm(x * 0.01, 1.7)) +
        Math.abs(Math.sin(x * 0.045)) * H * 0.012;

      R = clamp(H * 0.065, 30, 72);
      mx = W * 0.8;
      my = R + H * 0.03;

      for (let c = 0; c < cols; c++) {
        const x = xc(c),
          hz = hzAt(x),
          sy = syAt(x),
          farTop = hz - farH(x);
        shore[c] = Math.max(Math.floor(hz / chh) + 4, Math.round(sy / chh));
        for (let r = 0; r < shore[c]; r++) {
          const y = yr(r);
          if (y >= hz) {
            const dt = clamp((y - hz) / (sy - hz), 0, 1);
            if (hash(c + 11, r + 5) < 0.014) {
              put(c, r, pick(SPECK, c, r), [226, 236, 214], 0.75 + hash(c, r) * 0.25);
              continue;
            }
            const blade = vnoise(c * 1.3, r * 0.3);
            const patch = fbm(x * 0.006, y * 0.012);
            const lum =
              (0.2 + 0.55 * blade * (0.7 + 0.5 * patch)) *
              (0.6 + 0.4 * Math.min(1, dt * 3));
            const ch = pick(
              lum < 0.16 ? BLADE_LO : lum < 0.3 ? BLADE_MID : BLADE_HI,
              c,
              r
            );
            const green = mix([16, 40, 26], [100, 168, 84], lum * 1.6);
            put(c, r, ch, mix(green, [150, 168, 78], (patch - 0.55) * 1.5), 0.95);
            isGrass[r * cols + c] = 1;
          } else if (y >= farTop) {
            const lum =
              0.1 + 0.14 * fbm(x * 0.05, y * 0.05) + (y - chh < farTop ? 0.08 : 0);
            put(c, r, band(lum, c, r), mix([20, 32, 42], [72, 102, 112], lum * 2.4), 0.9);
          } else {
            const d = Math.hypot(x - mx, y - my);
            if (d < R) {
              const nx = (x - mx) / R,
                ny = (y - my) / R;
              const z = Math.sqrt(Math.max(0, 1 - nx * nx - ny * ny));
              let lum =
                0.6 +
                0.4 * Math.pow(z, 0.35) -
                Math.max(0, fbm(nx * 1.8 + 4, ny * 1.8 + 2) - 0.42) * 1.1;
              for (const [kx, ky, kr] of CRATERS) {
                const dd = Math.hypot(nx - kx, ny - ky) / kr;
                lum += dd < 1 ? -0.22 * (1 - dd) : dd < 1.3 ? 0.08 : 0;
              }
              lum = clamp(lum, 0.15, 1);
              put(
                c,
                r,
                RAMP[Math.floor(lum * (RAMP.length - 1))],
                mix([120, 104, 78], [255, 247, 224], lum),
                1
              );
            } else {
              const h = Math.exp(-(d - R) / (R * 1.6));
              const lum = 0.02 + 0.05 * (y / hz) ** 2 + h * 0.4;
              const g = clamp(h + (hash(c + 3, r + 1) - 0.5) * 0.12, 0, 0.999);
              if (hash(c, r) < 0.05 + h * 0.85)
                put(
                  c,
                  r,
                  HALO[Math.floor(g * HALO.length)],
                  mix([60, 72, 104], [236, 210, 156], h),
                  0.2 + lum * 1.4
                );
            }
          }
        }
        put(c, shore[c], pick(["~", "=", "-", "~"], c, 0), [100, 122, 158], 0.85);
      }

      stars = [];
      for (let s = 0; s < 90; s++) {
        const x = rng() * W,
          y = rng() * H * 0.17,
          b = rng();
        if (Math.hypot(x - mx, y - my) < R * 2.6 || y > hzAt(x) - farH(x) - chh) continue;
        const c = Math.floor(x / cw),
          r = Math.floor(y / chh),
          ch = b > 0.85 ? "*" : b > 0.6 ? "+" : b > 0.35 ? "." : "·",
          a = 0.35 + 0.65 * b;
        put(c, r, ch, [214, 224, 246], a);
        if (c < cols && r < rows)
          stars.push({
            i: r * cols + c,
            ch,
            a,
            ph: rng() * Math.PI * 2,
            sp: 0.001 + rng() * 0.002,
            b: -Infinity,
          });
      }

      for (let x = -cw * 6; x < W + cw * 6; ) {
        x += cw * (4 + rng() * 9);
        const hr = rng();
        if (fbm(x * 0.003, 11) < 0.34) continue;
        const h =
          H *
          (0.06 + 0.08 * hr) *
          (0.6 + 0.6 * fbm(x * 0.004, 4)) *
          (Math.abs(x - mx) < R * 1.5 ? 0.4 : 1);
        const w = h * 0.34;
        const baseY = hzAt(x) + chh;
        const tiers = Math.max(2, h / (chh * 2.2));
        for (let r = Math.floor((baseY - h) / chh); r <= Math.floor(baseY / chh); r++) {
          const t = (baseY - yr(r)) / h;
          if (t < 0 || t > 1) continue;
          const hw = w * (1 - t) * (0.62 + 0.38 * (1 - ((t * tiers) % 1))) + cw * 0.5;
          for (let c = Math.floor((x - hw) / cw); c <= Math.ceil((x + hw) / cw); c++) {
            const dx = xc(c) - x;
            if (Math.abs(dx) > hw || c < 0 || c >= cols || r >= shore[c]) continue;
            const edge = Math.abs(dx) > hw - cw * 1.2;
            const lum =
              0.22 +
              0.16 * fbm(xc(c) * 0.12, yr(r) * 0.12) +
              (dx > 0 ? 0.16 * (dx / hw) : -0.06) +
              (edge ? 0.06 : 0);
            const ch = t > 0.96 ? "^" : edge ? (dx < 0 ? "/" : "\\") : band(lum, c, r);
            put(c, r, ch, mix([20, 40, 42], [112, 156, 140], lum * 1.8), 0.95);
          }
        }
      }

      const L = [0.55, -0.55, 0.63];
      for (let k = Math.round(cols / 30) + 4; k > 0; k--) {
        const x0 = rng() * W,
          hz = hzAt(x0),
          sy = syAt(x0);
        const onShore = rng() < 0.6;
        const y0 = onShore
          ? sy - chh * rng()
          : hz + chh * 2 + rng() * Math.max(0, sy - hz - chh * 4);
        const rx = cw * (4 + rng() * (onShore ? 9 : 5));
        const ry = Math.max(chh * 1.3, rx * (0.55 + rng() * 0.2));
        for (let r = Math.floor((y0 - ry) / chh); r <= Math.ceil((y0 + ry) / chh); r++)
          for (let c = Math.floor((x0 - rx) / cw); c <= Math.ceil((x0 + rx) / cw); c++) {
            if (c < 0 || c >= cols || r > shore[c]) continue;
            const nx = (xc(c) - x0) / rx,
              ny = (yr(r) - y0) / ry;
            const e = nx * nx + ny * ny;
            if (e > 1) continue;
            const nz = Math.sqrt(1 - e);
            const lum =
              0.1 +
              0.62 * Math.max(0, nx * L[0] + ny * L[1] + nz * L[2]) +
              (fbm(xc(c) * 0.1, yr(r) * 0.1) - 0.5) * 0.15;
            put(c, r, band(lum, c, r), mix([34, 38, 48], [192, 198, 210], lum), 1);
          }
      }

      stars = stars.filter((s) => chA[s.i] === s.ch);
      queue = [];

      const avgShore = (shore.reduce((a, b) => a + b, 0) / cols + 1) * chh;
      const prx = clamp(W * 0.046, 38, 76);
      pads = PADS.map(({ dx, dy, s, aspect, notch, flower }) => ({
        x: W * (0.77 + dx),
        y: H * (0.6 + dy),
        vx: 0,
        vy: 0,
        bob: 0,
        tilt: 0,
        rx: prx * s,
        ry: prx * s * aspect,
        notch,
        flower,
      }));

      const grad = bsx.createLinearGradient(0, 0, 0, H);
      grad.addColorStop(0, "#020409");
      grad.addColorStop(avgShore / H, "#07101f");
      grad.addColorStop(1, "#091a35");
      bsx.fillStyle = grad;
      bsx.fillRect(0, 0, W, H);

      lx.clearRect(0, 0, W, H);
      for (let i = 0; i < n; i++) {
        if (!chA[i]) continue;
        lx.fillStyle = `rgba(${colA[i * 3] | 0},${colA[i * 3 + 1] | 0},${colA[i * 3 + 2] | 0},${alA[i].toFixed(2)})`;
        lx.fillText(chA[i], xc(i % cols), yr((i / cols) | 0));
      }

      const sg = shx.createLinearGradient(0, avgShore, 0, H);
      sg.addColorStop(0, "rgba(5,11,23,0.42)");
      sg.addColorStop(1, "rgba(9,26,53,0.97)");
      shx.clearRect(0, 0, W, H);
      shx.fillStyle = sg;
      for (let c = 0; c < cols; c++)
        shx.fillRect(c * cw, (shore[c] + 1) * chh, cw + 1, H);

      tx.clearRect(0, 0, W, H);
      gx2.clearRect(0, 0, W, H);
      gl0 = cols;
      gl1 = 0;
      for (let c = 0; c < cols; c++)
        for (let r = shore[c] + 1; r < rows; r++) {
          const x = xc(c),
            y = yr(r),
            depth = r - shore[c];
          const streak = vnoise(c * 0.05, r * 0.8);
          const lum = Math.max(0, streak - 0.45) * 0.5 + 0.03;
          if (hash(c + 5, r + 9) < lum * 4) {
            tx.fillStyle = `rgba(72,98,138,${(0.22 + lum).toFixed(2)})`;
            tx.fillText(pick(["-", "~", "=", "-", "."], c, r), x, y);
          }
          const wid = R * 0.8 + depth * cw * 0.25;
          const g = Math.exp(-(((x - mx) / wid) ** 2)) * vnoise(c * 0.3, r * 1.1);
          if (g > 0.22 + hash(c, r + 3) * 0.3) {
            const col = mix([150, 140, 120], [252, 238, 200], g);
            gx2.fillStyle = `rgba(${col[0] | 0},${col[1] | 0},${col[2] | 0},${(0.3 + 0.6 * g).toFixed(2)})`;
            gx2.fillText(g > 0.5 ? "=" : g > 0.35 ? "-" : "~", x, y);
            gl0 = Math.min(gl0, c);
            gl1 = Math.max(gl1, c);
          }
        }
      gl0 = Math.floor(gl0 / CHUNK) - 1;
      gl1 = Math.ceil(gl1 / CHUNK) + 1;

      sw = Math.ceil(cw * dpr);
      sh = Math.ceil(chh * dpr);
      atlas.width = WATER_R.length * sw;
      atlas.height = A * sh;
      atx.font = `${f * dpr}px ${FONT}`;
      atx.textAlign = "center";
      atx.textBaseline = "middle";
      for (let a = 0; a < A; a++) {
        atx.fillStyle = `rgba(200,220,246,${0.08 + a * 0.085})`;
        WATER_R.forEach((g, gi) => atx.fillText(g, (gi + 0.5) * sw, (a + 0.5) * sh));
      }

      const pal = new Map<string, number>();
      const list: number[] = [];
      const pals: number[] = [];
      for (let i = 0; i < n; i++) {
        if (!isGrass[i]) continue;
        const q = (k: number) => Math.round(colA[i * 3 + k] / 10) * 10;
        const key = `${q(0)},${q(1)},${q(2)}`;
        if (!pal.has(key)) pal.set(key, pal.size);
        list.push(i);
        pals.push(pal.get(key)!);
      }
      grassIdx = Int32Array.from(list);
      grassPal = Uint16Array.from(pals);
      bend = new Float32Array(list.length);
      bendV = new Float32Array(list.length);
      swayAtlas.width = SWAY.length * sw;
      swayAtlas.height = Math.max(1, pal.size) * sh;
      sax.font = `${f * dpr}px ${FONT}`;
      sax.textAlign = "center";
      sax.textBaseline = "middle";
      for (const [key, pi] of pal) {
        sax.fillStyle = `rgba(${key},0.95)`;
        SWAY.forEach((g, gi) => sax.fillText(g, (gi + 0.5) * sw, (pi + 0.5) * sh));
      }

      sRows = Math.ceil(H / cw) + 1;
      cur = new Float32Array(cols * sRows);
      nxt = new Float32Array(cols * sRows);
      sTop = Int16Array.from(shore, (s) => Math.ceil(((s + 1) * chh) / cw));
      srOf = Int16Array.from({ length: rows }, (_, r) =>
        clamp(Math.floor(((r + 0.5) * chh) / cw), 1, sRows - 2)
      );
      spawnFly(performance.now(), 1500);
    };

    const spawnFly = (t: number, delay: number) => {
      fly.dir = -1;
      fly.x = cols * cw + cw * 12;
      fly.y = rows * chh * (0.4 + Math.random() * 0.15);
      fly.wait = t + delay;
    };

    const drawFly = (t: number) => {
      const dt = Math.min(50, t - fly.t);
      fly.t = t;
      if (t < fly.wait) return;
      fly.x +=
        fly.dir * ((cols * cw) / 36000) * (0.55 + 0.45 * Math.sin(t * 0.0005)) * dt;
      if (fly.x < -cw * 12 || fly.x > cols * cw + cw * 12)
        return spawnFly(t, 5000 + Math.random() * 8000);
      const y = fly.y + Math.sin(t * 0.0009) * chh * 1.2;
      ctx.setTransform(
        dpr * fly.dir,
        0,
        0,
        dpr,
        Math.round(fly.x) * dpr,
        Math.round(y) * dpr
      );
      FLY[Math.floor(t / 160) % 2].forEach((row, j) => {
        ctx.fillStyle = j === 4 ? "rgba(120,212,196,0.95)" : "rgba(196,222,240,0.95)";
        for (let k = 0; k < row.length; k++)
          if (row[k] !== " ") ctx.fillText(row[k], (k - 11) * cw, (j - 4) * chh);
      });
      ctx.setTransform(1, 0, 0, 1, 0, 0);
    };

    const disturb = (c: number, sr: number, s: number, rad = 0) => {
      for (let dy = -rad; dy <= rad; dy++)
        for (let dx = -rad; dx <= rad; dx++) {
          const x = c + dx,
            y = sr + dy,
            d = Math.hypot(dx, dy);
          if (x > 0 && x < cols - 1 && y < sRows - 1 && y >= sTop[x] && d <= rad)
            cur[y * cols + x] += s * (1 - d / (rad + 1));
        }
    };

    const step = () => {
      for (let r = 1; r < sRows - 1; r++)
        for (let c = 1; c < cols - 1; c++) {
          const i = r * cols + c;
          nxt[i] =
            r >= sTop[c]
              ? ((cur[i - 1] + cur[i + 1] + cur[i - cols] + cur[i + cols]) / 2 - nxt[i]) *
                DAMP
              : 0;
        }
      [cur, nxt] = [nxt, cur];
    };

    const offsets = (c: number, r: number) => {
      const i = r * cols + c;
      return [
        Math.round(clamp((smH[i + 1] - smH[i - 1]) * 0.5, -2, 2)),
        Math.round(clamp((smH[i + cols] - smH[i - cols]) * 0.25, -1, 1)),
      ];
    };

    const simAt = (x: number, y: number) =>
      clamp(Math.round(y / cw), 1, sRows - 2) * cols +
      clamp(Math.round(x / cw), 1, cols - 2);

    const inPad = (p: Pad, k: number, m: number) => {
      const nx = (k * cw) / p.rx,
        ny = (m * chh) / p.ry;
      if (!p.flower) {
        const r = Math.hypot(nx, ny) * p.rx;
        if (r > p.rx * 0.95) return false;
        return (
          r < cw * 0.8 ||
          Math.abs(wrap(Math.atan2(ny, nx) - p.notch + Math.PI, TAU) - Math.PI) > CUT
        );
      }
      if (nx * nx + ny * ny > 1) return false;
      const ux = Math.cos(p.notch) * p.rx,
        uy = Math.sin(p.notch) * p.ry,
        ul = Math.hypot(ux, uy);
      const along = (k * cw * ux + m * chh * uy) / ul,
        perp = Math.abs(k * cw * uy - m * chh * ux) / ul;
      return along <= cw || perp > cw * 0.4 + along * 0.4;
    };

    const movePad = (p: Pad, t: number) => {
      let fx = 0,
        fy = 0;
      for (let k = 0; k < 8; k++) {
        const j = simAt(
          p.x + Math.cos((k * Math.PI) / 4) * p.rx * 0.8,
          p.y + Math.sin((k * Math.PI) / 4) * p.ry * 0.8
        );
        fx += cur[j - 1] - cur[j + 1];
        fy += cur[j - cols] - cur[j + cols];
      }
      for (const q of pads) {
        if (q === p) continue;
        const dx = p.x - q.x,
          dy = ((p.y - q.y) * (p.rx + q.rx)) / (p.ry + q.ry),
          d = Math.hypot(dx, dy),
          gap = (p.rx + q.rx) * 1.05 - d;
        if (gap > 0 && d) {
          p.vx += (dx / d) * gap * 0.01;
          p.vy += (dy / d) * gap * 0.01;
        }
      }
      const W = cols * cw;
      p.vx = clamp(
        p.vx + fx * 0.006 + (Math.cos(t * 0.00007) * 0.08 - p.vx) * 0.02,
        -2.5,
        2.5
      );
      p.vy = clamp(
        p.vy + fy * 0.004 + (Math.sin(t * 0.00011) * 0.03 - p.vy) * 0.02,
        -2.5,
        2.5
      );
      p.x += p.vx;
      p.y += p.vy;
      const left = p.rx + cw,
        right = W - p.rx - cw;
      if (p.x < left || p.x > right) {
        p.x = clamp(p.x, left, right);
        p.vx *= -0.5;
      }
      const c0 = clamp(Math.floor((p.x - p.rx) / cw), 0, cols - 1);
      const top =
          (Math.max(...shore.subarray(c0, Math.ceil((p.x + p.rx) / cw))) + 8) * chh +
          p.ry,
        bottom = (rows - 1) * chh - p.ry;
      if (p.y < top || p.y > bottom) {
        p.y = clamp(p.y, top, bottom);
        p.vy *= -0.5;
      }
      p.bob += (cur[simAt(p.x, p.y)] - p.bob) * EASE;
      p.tilt += (clamp(fx * 0.004, -0.2, 0.2) - p.tilt) * 0.1;
    };

    const drawPad = (p: Pad) => {
      const ox = Math.round(p.x),
        oy = Math.round(p.y - clamp(p.bob * 0.6, -3, 3));
      const lift = clamp(Math.abs(p.bob) * 0.04, 0, 0.25);
      ctx.setTransform(dpr, 0, dpr * p.tilt, dpr, -dpr * p.tilt * oy, 0);
      const cell = (k: number, m: number, ch: string, rgb: RGB) => {
        const x = ox + k * cw,
          y = oy + m * chh;
        ctx.fillStyle = WATER_BG;
        ctx.fillRect(x - cw / 2, y - chh / 2, cw + 0.5, chh + 0.5);
        if (ch === " ") return;
        ctx.fillStyle = `rgb(${rgb[0] | 0},${rgb[1] | 0},${rgb[2] | 0})`;
        ctx.fillText(ch, x, y);
      };

      const kc = Math.ceil(p.rx / cw),
        kr = Math.ceil(p.ry / chh);
      for (let m = -kr; m <= kr; m++)
        for (let k = -kc; k <= kc; k++) {
          if (!inPad(p, k, m)) continue;
          const nx = (k * cw) / p.rx,
            ny = (m * chh) / p.ry,
            a = Math.atan2(ny, nx),
            r = p.flower ? Math.hypot(k * cw, m * chh) : Math.hypot(nx, ny) * p.rx;
          const up = !inPad(p, k, m - 1),
            dn = !inPad(p, k, m + 1),
            lf = !inPad(p, k - 1, m),
            rt = !inPad(p, k + 1, m);
          const mott = fbm(k * 0.3 + p.notch * 7, m * 0.55 + 9);
          let ch: string, lum: number;
          if (!p.flower && (up || dn || lf || rt)) {
            const d = wrap(a - p.notch + Math.PI, TAU) - Math.PI,
              side = Math.abs(d) - CUT;
            if (side < Math.PI / 2 && r * Math.sin(side) < p.rx * 0.95 - r) {
              const e = p.notch + Math.sign(d) * CUT;
              ch = dirChar(Math.atan2(Math.sin(e) * p.ry, Math.cos(e) * p.rx));
            } else {
              ch = dirChar(Math.atan2(Math.cos(a) * p.ry, -Math.sin(a) * p.rx));
              if (ch === "|") ch = k > 0 ? ")" : "(";
            }
            lum = 0.85 + lift;
          } else if (up || dn || lf || rt) {
            ch =
              (up && lf) || (dn && rt)
                ? "/"
                : (up && rt) || (dn && lf)
                  ? "\\"
                  : up
                    ? "-"
                    : dn
                      ? "_"
                      : lf
                        ? "("
                        : ")";
            lum = 0.85 + lift;
          } else if (!p.flower) {
            ch =
              PAD_FILL[
                clamp(Math.floor((mott - 0.2) * 14 + hash(k + 40, m + 40) * 1.5), 0, 6)
              ];
            lum = 0.25 + 0.6 * mott + 0.12 * (nx - ny) + lift;
          } else if (!k && !m) {
            ch = "*";
            lum = 0.1;
          } else if (
            VEINS.some(
              (v) =>
                Math.abs(wrap(a - p.notch - v + Math.PI, TAU) - Math.PI) * r < cw * 0.55
            )
          ) {
            ch = dirChar(Math.atan2(m * chh, k * cw));
            lum = 0.12;
          } else {
            ch =
              PAD_FILL[
                clamp(Math.floor((mott - 0.25) * 14 + hash(k + 40, m + 40) * 1.5), 0, 6)
              ];
            lum = 0.3 + 0.6 * mott + 0.12 * (nx - ny) + lift;
          }
          cell(k, m, ch, mix([30, 70, 34], [168, 206, 96], lum));
        }

      if (p.flower) {
        const lk = Math.round((p.rx * 0.2) / cw) - 11,
          lm = 1 - LOTUS.length - Math.round(kr * 0.45);
        LOTUS.forEach((row, j) => {
          const k0 = row.search(/\S/),
            k1 = row.trimEnd().length;
          for (let k = k0; k < k1; k++) {
            const ch = row[k];
            cell(
              lk + k,
              lm + j,
              ch,
              ch === "*"
                ? [255, 206, 84]
                : mix([240, 140, 180], [255, 220, 232], lift * 3)
            );
          }
        });
      }
      ctx.setTransform(1, 0, 0, 1, 0, 0);
    };

    const draw = (t: number) => {
      for (let c = 1; c < cols - 1; c++)
        for (let r = shore[c] + 1; r < rows - 1; r++) {
          const i = r * cols + c;
          const j = srOf[r] * cols + c;
          const h = cur[j];
          const gx = cur[j + 1] - cur[j - 1];
          const gy = cur[j + cols] - cur[j - cols];
          const rip = Math.min(
            0.9,
            Math.max(0, -(gx * 0.6 + gy * 0.8)) * 0.3 + Math.abs(h) * 0.04
          );
          smH[i] += (h - smH[i]) * EASE;
          disp[i] += (rip - disp[i]) * RIP_EASE;
        }

      const cw6 = CHUNK * sw;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.drawImage(base, 0, 0);
      ctx.setTransform(1, 0, 0, -1, 0, 0);
      for (let k = 0; k * CHUNK < cols; k++) {
        const c0 = k * CHUNK,
          cm = clamp(c0 + (CHUNK >> 1), 1, cols - 2);
        const top = Math.max(...shore.subarray(c0, c0 + CHUNK));
        for (let r = top + 1; r < rows - 1; r++) {
          const [oc, orow] = offsets(cm, r);
          const src = Math.min(shore[cm], 2 * shore[cm] - r + orow);
          if (src < 0) break;
          ctx.drawImage(
            land,
            cx[clamp(c0 + oc, 0, cols - 1)],
            cy[src],
            cw6,
            sh,
            cx[c0],
            -cy[r] - sh,
            cw6,
            sh
          );
        }
      }
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.drawImage(shade, 0, 0);
      ctx.drawImage(tex, 0, 0);
      for (let k = Math.max(0, gl0); k <= gl1 && k * CHUNK < cols; k++) {
        const c0 = k * CHUNK,
          cm = clamp(c0 + (CHUNK >> 1), 1, cols - 2);
        for (let r = shore[cm] + 1; r < rows - 1; r++) {
          const [oc] = offsets(cm, r);
          ctx.drawImage(
            glow,
            cx[clamp(c0 + oc, 0, cols - 1)],
            cy[r],
            cw6,
            sh,
            cx[c0],
            cy[r],
            cw6,
            sh
          );
        }
      }
      for (let c = 1; c < cols - 1; c++)
        for (let r = shore[c] + 1; r < rows - 1; r++) {
          const v = disp[r * cols + c];
          if (v < 0.05) continue;
          const g = clamp(Math.floor(v * 7), 1, WATER_R.length - 2);
          ctx.drawImage(
            atlas,
            g * sw,
            Math.min(A - 1, Math.floor(v * A * 1.3)) * sh,
            sw,
            sh,
            cx[c],
            cy[r],
            sw,
            sh
          );
        }
      if (!motion.matches) for (const p of pads) movePad(p, t);
      for (let k = pads.length - 1; k >= 0; k--) drawPad(pads[k]);
      ctx.drawImage(land, 0, 0);

      const over = ptrOn && Math.hypot(ptrX - mx, ptrY - my) < R * 1.3;
      moonGlow += ((over ? 1 : 0) - moonGlow) * 0.08;

      if (!motion.matches) {
        const dt = Math.min(50, t - lastT);
        lastT = t;
        if (t > nextSpark && stars.length) {
          nextSpark = t + 1800 + Math.random() * 2200;
          if (!queue.length) {
            queue = stars.map((_, k) => k);
            for (let k = queue.length - 1; k > 0; k--) {
              const j = Math.floor(Math.random() * (k + 1));
              [queue[k], queue[j]] = [queue[j], queue[k]];
            }
          }
          stars[queue.pop()!].b = t;
        }
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        ctx.fillStyle = "rgb(214,224,246)";
        for (const s of stars) {
          const c = s.i % cols,
            r = (s.i / cols) | 0;
          ctx.drawImage(base, cx[c], cy[r], sw, sh, c * cw, r * chh, sw / dpr, sh / dpr);
          s.ph += dt * s.sp;
          const q = (t - s.b) / 3200;
          const twinkle = s.a * (0.85 + 0.15 * (0.5 + 0.5 * Math.sin(s.ph)) ** 3);
          ctx.globalAlpha = q < 1 ? Math.max(twinkle, 1 - q) : twinkle;
          ctx.fillText(s.ch, (c + 0.5) * cw, (r + 0.5) * chh);
          if (q >= 1) continue;
          const d = 1 + q * (2 + s.a * 3);
          const step = Math.floor(q * 6);
          SPARK.forEach(([dx, dy, g], k) => {
            if (hash(s.i + k, step) < q * 0.45) return;
            ctx.globalAlpha = (0.55 + 0.45 * s.a) * (1 - q) ** 0.7;
            ctx.fillText(
              q < 0.35 ? g : q < 0.65 ? "+" : ".",
              (c + Math.round(dx * d) + 0.5) * cw,
              (r + Math.round((dy * d * cw) / chh) + 0.5) * chh
            );
          });
        }
        ctx.globalAlpha = 1;
        ctx.setTransform(1, 0, 0, 1, 0, 0);
      }

      if (moonGlow > 0.01) {
        const p = moonGlow * (0.7 + 0.3 * Math.sin(t * 0.004));
        const x0 = Math.round((mx - R * 1.1) * dpr),
          y0 = Math.max(0, Math.round((my - R * 1.1) * dpr)),
          s = Math.round(R * 2.2 * dpr);
        ctx.globalCompositeOperation = "lighter";
        ctx.globalAlpha = p * 0.5;
        ctx.drawImage(land, x0, y0, s, s, x0, y0, s, s);
        ctx.globalAlpha = 1;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        ctx.fillStyle = "rgb(240,215,165)";
        const reachR = R * 3.2;
        for (
          let r = Math.max(0, Math.floor((my - reachR) / chh));
          r * chh < my + reachR && r < rows;
          r++
        )
          for (
            let c = Math.max(0, Math.floor((mx - reachR) / cw));
            c * cw < mx + reachR && c < cols;
            c++
          ) {
            const x = (c + 0.5) * cw,
              y = (r + 0.5) * chh,
              d = Math.hypot(x - mx, y - my);
            if (d < R * 1.05 || d > reachR) continue;
            const fall = 1 - (d - R) / (reachR - R);
            if (hash(c, r) > fall * 0.45) continue;
            const h = hash(c + 7, r + 3);
            const tw =
              d > R * 1.6
                ? 0.2 +
                  0.8 * (0.5 + 0.5 * Math.sin(t * (0.002 + h * 0.003) + h * 20)) ** 2
                : 1;
            ctx.globalAlpha = fall * moonGlow * tw * 0.85;
            ctx.fillText(
              fall > 0.7 ? "*" : fall > 0.45 ? "+" : fall > 0.25 ? ":" : ".",
              x,
              y
            );
          }
        ctx.globalAlpha = 1;
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.globalCompositeOperation = "source-over";
      }

      const reach = cw * 16;
      for (let k = 0; k < grassIdx.length; k++) {
        const i = grassIdx[k];
        const c = i % cols;
        let target = 0;
        if (ptrOn) {
          const dx = (c + 0.5) * cw - ptrX;
          const dy = (((i / cols) | 0) + 0.5) * chh - ptrY;
          const d = Math.hypot(dx, dy * 1.4);
          if (d < reach)
            target = clamp(
              (dx / (Math.abs(dx) + cw * 1.5)) * (1 - d / reach) ** 1.5 * 1.8,
              -1.2,
              1.2
            );
        }
        bendV[k] = bendV[k] * 0.88 + (target - bend[k]) * 0.05;
        bend[k] += bendV[k];
        const b = bend[k];
        if (Math.abs(b) < 0.22) continue;
        const x = cx[c],
          y = cy[(i / cols) | 0];
        ctx.drawImage(base, x, y, sw, sh, x, y, sw, sh);
        ctx.drawImage(
          swayAtlas,
          clamp(Math.round((b + 1) * 2), 0, 4) * sw,
          grassPal[k] * sh,
          sw,
          sh,
          x + Math.round(b * sw * 0.35),
          y,
          sw,
          sh
        );
      }
      if (!motion.matches) drawFly(t);
    };

    let raf = 0,
      frame = 0,
      visible = true,
      lastLap = 0,
      lastDrop = 0,
      lastHover = 0;
    const loop = (t: number) => {
      raf = requestAnimationFrame(loop);
      if (!visible || !cols) return;
      if (!motion.matches) {
        if (t - lastLap > 4000) {
          lastLap = t;
          for (let k = 0; k < 2; k++) {
            const c = 3 + Math.floor(Math.random() * (cols - 6));
            disturb(c, sTop[c] + 2, 4, 2);
          }
        }
        if (t - lastDrop > 6000) {
          lastDrop = t;
          const c = 3 + Math.floor(Math.random() * (cols - 6));
          disturb(
            c,
            sTop[c] + 4 + Math.floor(Math.random() * (sRows - sTop[c] - 6)),
            6,
            1
          );
        }
      }
      if (++frame % 2 === 0) step();
      draw(t);
    };

    const toCell = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      const c = Math.floor((e.clientX - rect.left) / cw);
      const sr = Math.floor((e.clientY - rect.top) / cw);
      return c > 0 && c < cols - 1 && sr < sRows - 1 && sr >= sTop[c] ? [c, sr] : null;
    };
    const onMove = (e: PointerEvent) => {
      if (motion.matches) return;
      const rect = canvas.getBoundingClientRect();
      ptrX = e.clientX - rect.left;
      ptrY = e.clientY - rect.top;
      ptrOn = true;
      if (e.timeStamp - lastHover < 50) return;
      const p = toCell(e);
      if (!p) return;
      lastHover = e.timeStamp;
      disturb(p[0], p[1], 4, 2);
    };
    const onLeave = () => (ptrOn = false);
    const onDown = (e: PointerEvent) => {
      if ((e.target as Element).closest("a,button")) return;
      const p = toCell(e);
      if (p) disturb(p[0], p[1], motion.matches ? 8 : 20, motion.matches ? 2 : 4);
    };

    setup();
    const ro = new ResizeObserver(setup);
    ro.observe(canvas);
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
    io.observe(canvas);
    host.addEventListener("pointermove", onMove, { passive: true });
    host.addEventListener("pointerdown", onDown, { passive: true });
    host.addEventListener("pointerleave", onLeave);
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      host.removeEventListener("pointermove", onMove);
      host.removeEventListener("pointerdown", onDown);
      host.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      role="img"
      aria-label="ASCII night scene: a moon over a pine treeline, a grassy bank with stones, and a lake with drifting lily pads, one with a lotus, and a passing dragonfly, that mirrors it and ripples when touched"
      className={className}
    />
  );
}
