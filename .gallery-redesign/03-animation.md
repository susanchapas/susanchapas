# 03 — Animation Design Spec: Bento Gallery

Motion physics + choreography for the gallery redesign. Stack: framer-motion v12, React 19 + react-compiler, Tailwind v4, lenis (smooth scroll, already wired globally and desktop-only).

## Design intent

The gallery should feel like a curated room that _assembles itself_ as you arrive, then responds to your hand. Two hero pieces (EOP Explainer video, Mindless Mirth painting) carry weight: they enter later, settle slower, and have depth the rest of the grid does not. Everything else is crisp, fast, and gets out of the way.

Guiding numbers, used everywhere for consistency:

```ts
// add to a shared module, e.g. src/lib/motion.ts
export const EASE_SMOOTH = [0.22, 1, 0.36, 1] as const; // mirrors --ease-smooth
export const EASE_BOUNCE = [0.34, 1.56, 0.64, 1] as const; // mirrors --ease-bounce

export const HERO_IDS = [5, 1] as const; // EOP Explainer (id 5), Mindless Mirth (id 1)
```

`HERO_IDS` lets every effect below ask `isHero = HERO_IDS.includes(artwork.id)` without scattering magic numbers.

---

## 0. Lenis integration note

Lenis is initialized in `src/components/SmoothScrollCore.tsx` via a raw `requestAnimationFrame` loop on `window`. It does **not** transform a wrapper element — it scrolls the real document. Therefore framer-motion's `whileInView` (IntersectionObserver) and `useScroll` (scroll events) both observe the genuine scroll position and work with zero extra wiring. **No `ScrollTrigger.update()`-style bridge is needed.**

Lenis already self-disables on touch devices and under `prefers-reduced-motion` (lines 11–23 of SmoothScrollCore). So on reduced-motion the page falls back to native scroll, and our JS fallbacks (Section 7) handle the framer side.

---

## 1. ENTRANCE — the grid assembles

Goal: the first 3 tiles + the 2 heroes feel deliberately sequenced; the long photography tail flows in fast so it never drags.

Use a parent `staggerChildren` container on the grid, plus a per-tile delay multiplier so heroes lag slightly. Replace the current `animate` (which always runs) with `whileInView` so it survives client navigation/refresh mid-page — but for the gallery grid, which sits below a tall hero section, `whileInView` is correct anyway.

### Container variant

```ts
const gridContainer = {
  hidden: { opacity: 1 }, // container itself stays; children animate
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06, // 60ms cascade — brisk, not laggy
      delayChildren: 0.1, // small beat after grid mounts
    },
  },
};
```

### Tile variant (custom = index, isHero)

Direction: tiles rise + fade + scale-settle. Heroes use a softer spring (more mass) so they "land" with authority; standard tiles use a snappier tween.

```ts
const tileVariant = {
  hidden: (c: { index: number; isHero: boolean }) => ({
    opacity: 0,
    y: c.isHero ? 56 : 32,
    scale: c.isHero ? 0.94 : 0.96,
    filter: "blur(6px)",
  }),
  show: (c: { index: number; isHero: boolean }) =>
    c.isHero
      ? {
          opacity: 1,
          y: 0,
          scale: 1,
          filter: "blur(0px)",
          transition: {
            type: "spring",
            stiffness: 120,
            damping: 20,
            mass: 1.1, // heavier = slower settle, commands attention
            delay: 0.18, // heroes arrive after their neighbors
            opacity: { duration: 0.5, ease: EASE_SMOOTH },
            filter: { duration: 0.6, ease: EASE_SMOOTH },
          },
        }
      : {
          opacity: 1,
          y: 0,
          scale: 1,
          filter: "blur(0px)",
          transition: {
            duration: 0.55,
            ease: EASE_SMOOTH,
            // index-based delay is handled by staggerChildren on the parent;
            // do NOT also add delay: index * x here or it double-staggers.
          },
        },
};
```

### Wiring

```tsx
<motion.div
  layout
  variants={gridContainer}
  initial="hidden"
  whileInView="show"
  viewport={{ once: true, amount: 0.15 }}
  className="grid auto-rows-[300px] grid-cols-1 gap-6 md:grid-cols-3"
>
  {filteredArtworks.map((artwork, index) => {
    const isHero = HERO_IDS.includes(artwork.id);
    return (
      <motion.article
        key={artwork.id}
        layout
        custom={{ index, isHero }}
        variants={tileVariant}
        /* no initial/animate here — inherited from parent variants */
        className={cn(/* … */)}
      >
        {/* … */}
      </motion.article>
    );
  })}
</motion.div>
```

**First-3-tiles feel:** Mindless Mirth (id 1) is hero #2 and tile index 0 — it gets the heavy hero spring + the `delay: 0.18`, so it visibly settles last among the opening cluster while ATM (index 1) and A Bike (index 2) snap in at 0.06/0.12s. That contrast reads as intentional curation.

> Note: `staggerChildren` + `whileInView` on the same element fires the stagger once when the container enters view. Good. Keep `delayChildren` small so the first tile isn't perceptibly late.

---

## 2. SCROLL — reveals + hero parallax

The opening grid uses entrance variants above. For tiles **below the fold**, the same `whileInView` cascade applies because each `motion.article` re-evaluates when scrolled into view — but since they share one parent container that already triggered, add a lightweight per-tile in-view reveal for anything not in the first viewport.

Simplest robust approach (recommended): keep the single container stagger for the opening, and let CSS `content-visibility` (already in globals) handle far-below tiles. If you want each row to reveal on scroll instead of all-at-once, drop the parent `variants` and make each tile self-trigger:

```tsx
<motion.article
  custom={{ index, isHero }}
  variants={tileVariant}
  initial="hidden"
  whileInView="show"
  viewport={{ once: true, amount: 0.25, margin: "0px 0px -10% 0px" }}
>
```

`viewport` config rationale:

- `once: true` — never re-animate on scroll-up; gallery reviewers scroll both ways, retriggers look cheap.
- `amount: 0.25` — fire when 25% of the tile is visible (tall tiles trigger sensibly).
- `margin: "0px 0px -10% 0px"` — start the reveal slightly before the tile reaches the bottom edge, so it's already settling by the time it's comfortably on screen.

### Hero parallax (depth, desktop only)

Give the two hero tiles a subtle inner-image parallax tied to scroll. The image translates on Y opposite to scroll within the tile's overflow-hidden frame. Keep it small — 24px total travel — or it reads as a bug.

```tsx
function HeroParallaxMedia({ artwork }: { artwork: Artwork }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"], // 0 when entering bottom, 1 when leaving top
  });
  // -12px → +12px as the tile passes through the viewport
  const yRaw = useTransform(scrollYProgress, [0, 1], [-12, 12]);
  const y = useSpring(yRaw, { stiffness: 90, damping: 25, mass: 0.6 });

  if (reduce) {
    return <ArtMedia /* … static, no motion wrapper */ />;
  }
  return (
    <motion.div ref={ref} style={{ y, scale: 1.06 }} className="h-full w-full">
      {/* scale 1.06 gives parallax headroom so edges never reveal gaps */}
      <ArtMedia /* … */ />
    </motion.div>
  );
}
```

Only the 2 heroes get this. Standard tiles stay flat — depth is what makes the heroes special.

---

## 3. MAGNETIC CURSOR-TILT — the signature interaction

This is the showstopper. On pointer move over a tile, the tile tilts toward the cursor in 3D (rotateX/rotateY), lifts toward the viewer (translateZ), and the inner image counter-shifts for a glass-panel feel. On pointer leave, springs reset to rest.

### Physics philosophy

Two distinct spring feels:

- **Tilt rotation** — moderately stiff, well-damped. Must track the cursor responsively but never oscillate (jitter kills the premium feel). `stiffness: 150, damping: 18, mass: 0.6`.
- **Lift (translateZ + scale)** — softer, slightly heavier so the rise feels like the tile gaining presence. `stiffness: 200, damping: 22, mass: 0.8`.

Heroes get a touch more travel (bigger rotation range, more lift) because their tiles are larger and can carry it.

### Transform ranges

| Property    | Standard tile   | Hero tile       |
| ----------- | --------------- | --------------- |
| rotateX     | +8° → −8°       | +11° → −11°     |
| rotateY     | −8° → +8°       | −11° → +11°     |
| translateZ  | 0 → 30px        | 0 → 48px        |
| scale       | 1 → 1.03        | 1 → 1.04        |
| image shift | ±10px (counter) | ±14px (counter) |

Pointer offset is normalized to [-0.5, 0.5] relative to tile center, so tilt magnitude is independent of tile size.

### Hook pseudo-code

```ts
// src/lib/useMagneticTilt.ts
import { useRef } from "react";
import {
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
  type MotionValue,
} from "framer-motion";

const TILT_SPRING = { stiffness: 150, damping: 18, mass: 0.6 };
const LIFT_SPRING = { stiffness: 200, damping: 22, mass: 0.8 };

export function useMagneticTilt(isHero = false) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);

  // normalized pointer offset from center, range [-0.5, 0.5]
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  // lift driver: 0 at rest, 1 while hovered
  const hover = useMotionValue(0);

  const maxRot = isHero ? 11 : 8;
  const maxZ = isHero ? 48 : 30;
  const maxScale = isHero ? 1.04 : 1.03;
  const maxImg = isHero ? 14 : 10;

  // map offset → rotation (note the sign: top of tile tilts back)
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
  // image counter-parallax (moves opposite the tilt for parallax depth)
  const imgX = useSpring(useTransform(px, [-0.5, 0.5], [maxImg, -maxImg]), TILT_SPRING);
  const imgY = useSpring(useTransform(py, [-0.5, 0.5], [maxImg, -maxImg]), TILT_SPRING);

  function onPointerMove(e: React.PointerEvent) {
    if (reduce || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width - 0.5);
    py.set((e.clientY - r.top) / r.height - 0.5);
    hover.set(1);
  }
  function onPointerEnter() {
    if (!reduce) hover.set(1);
  }
  function onPointerLeave() {
    // idle reset — springs glide everything back to rest, no jump
    px.set(0);
    py.set(0);
    hover.set(0);
  }

  // when reduced motion: return inert handlers + flat style
  const tiltStyle = reduce
    ? undefined
    : { rotateX, rotateY, translateZ: z, scale, transformPerspective: 900 };

  return {
    ref,
    handlers: reduce ? {} : { onPointerMove, onPointerEnter, onPointerLeave },
    tiltStyle, // spread into the article's motion style
    imgStyle: reduce ? undefined : { x: imgX, y: imgY }, // inner media wrapper
    reduce,
  };
}
```

### Usage in the tile

```tsx
const { ref, handlers, tiltStyle, imgStyle } = useMagneticTilt(isHero);

<motion.article
  ref={ref}
  {...handlers}
  variants={tileVariant}
  custom={{ index, isHero }}
  style={{ transformStyle: "preserve-3d", ...tiltStyle }}
  className={cn("group rounded-xl border …", artwork.className)}
  onClick={() => setSelectedArtwork(artwork)}
>
  <motion.div style={imgStyle} className="h-full w-full">
    <ArtMedia /* … */ />
  </motion.div>
  {/* gradient + caption overlays */}
</motion.article>;
```

Key physics notes:

- **`transformPerspective: 900`** on the tile (not a parent) keeps each tile's 3D self-contained, so the grid doesn't need a shared perspective root. ~900px reads as gentle depth; lower (600) is dramatic-but-cheap, higher (1400) is nearly flat.
- **Idle reset** happens purely by setting motion values back to 0 — the springs handle the glide-back. `damping: 18` is high enough that there is **no overshoot wobble** on reset, which is the difference between premium and jittery.
- **`useTransform` is read-only mapping; `useSpring` wraps it** so the displayed value lags the target smoothly. Order matters: transform first (instant linear map), spring second (smooths it).
- The lift uses a separate `hover` motion value (0/1) rather than deriving from pointer offset, so the tile lifts uniformly regardless of where the cursor is.

---

## 4. HOVER / microinteractions

These layer **on top of** the tilt (which owns transform). To avoid fighting the tilt's `scale`/`translateZ`, the hover microinteractions touch only non-transform properties (the existing `group-hover` CSS) plus the inner image scale, the caption, and a lime accent. Keep them CSS-driven where possible (cheaper, and globals already nukes them under reduced-motion).

| Element        | Effect                            | Value                                                                                                                            |
| -------------- | --------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| Inner image    | scale on hover (subtle zoom)      | `group-hover:scale-105`, `duration-500 ease-smooth` — already present, keep                                                      |
| Gradient scrim | fade in from bottom               | opacity 0→1, `duration-300 ease-smooth`                                                                                          |
| Caption block  | slide up + fade                   | `translate-y-full → translate-y-0`, `duration-400 ease-bounce` (the bounce ease gives the caption a tiny playful settle)         |
| Category label | lime, fades in 80ms after caption | `delay-[80ms] opacity 0→1`                                                                                                       |
| Border accent  | `border-accent-lime/30` glow      | add `group-hover:shadow-[0_0_0_1px_var(--accent-lime),0_12px_40px_-12px_rgba(204,255,0,0.35)]`, `transition-shadow duration-300` |

CSS specifics for the border/glow (Tailwind v4 arbitrary value, lime = `#ccff00`):

```tsx
className={cn(
  "group relative cursor-pointer overflow-hidden rounded-xl border",
  "border-accent-blue/10 transition-[box-shadow,border-color] duration-300",
  "hover:border-accent-lime/40",
  "hover:shadow-[0_0_0_1px_rgba(204,255,0,0.35),0_18px_50px_-16px_rgba(204,255,0,0.28)]",
  artwork.className
)}
```

- Image zoom (`scale-105`) and tile tilt-scale (`1.03`) compose multiplicatively; that's fine and looks intentional (image pushes slightly past the frame as the tile rises). If it ever clips badly, drop the image to `scale-[1.04]`.
- Caption uses **bounce ease** deliberately — it's the one place a little overshoot adds character without risking the "jitter" problem (it's a one-shot, not a tracking spring).
- Glow uses lime at low alpha so it's an accent, not a neon sign — tasteful for an admissions reviewer.

---

## 5. FILTER transitions — reflow on category change

Current code already has `AnimatePresence mode="popLayout"` + `layout` — that's the right foundation. Refinements:

```tsx
<motion.div layout className="grid …">
  <AnimatePresence mode="popLayout">
    {filteredArtworks.map((artwork, index) => (
      <motion.article
        key={artwork.id}
        layout
        custom={{ index, isHero: HERO_IDS.includes(artwork.id) }}
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.92, transition: { duration: 0.2 } }}
        transition={{
          layout: { type: "spring", stiffness: 260, damping: 30 },
          opacity: { duration: 0.3, ease: EASE_SMOOTH },
          scale: { duration: 0.3, ease: EASE_SMOOTH },
          delay: index * 0.03, // gentle re-stagger on enter
        }}
      >
```

Rationale:

- `mode="popLayout"` removes exiting tiles from layout flow immediately so survivors reflow smoothly into gaps (no "wait for fade then jump").
- **Layout spring `stiffness: 260, damping: 30`** — the reflow is the visual star here; this gives a quick, settled glide with no oscillation. Faster/snappier than the entrance spring because reflow should feel responsive to the click, not ceremonial.
- `exit` is faster (0.2s) than `enter` — exits should clear quickly so the new set takes the stage.
- Re-stagger on enter (`index * 0.03`) is half the entrance stagger — present but subtle, since the user already saw the grid assemble once.
- **Important with react-compiler:** the tile's tilt hook holds motion values per-instance keyed by `artwork.id`; `mode="popLayout"` + stable keys means hooks aren't reused across different artworks. Keep `key={artwork.id}` (already correct).

When switching filters, the active filter pill should also animate. Use a shared `layoutId` underline/pill background:

```tsx
{
  activeCategory === category && (
    <motion.span
      layoutId="filter-pill"
      className="bg-accent-lime absolute inset-0 rounded-full"
      transition={{ type: "spring", stiffness: 400, damping: 32 }}
    />
  );
}
```

Render the pill background as an absolutely-positioned `motion.span` behind the label text so the lime "slides" between tabs — a small touch that signals polish.

---

## 6. LIGHTBOX — shared-layout open/close

Replace the current scale/opacity modal with a **shared-element transition** via `layoutId`: the clicked tile's media morphs into the lightbox media. This is the single most impressive lightbox pattern and framer-motion does it natively.

### Setup

Give each tile's media wrapper a `layoutId` keyed to the artwork, and the lightbox media the _same_ id. framer-motion interpolates position/size between them.

```tsx
// In the tile:
<motion.div layoutId={`art-${artwork.id}`} className="h-full w-full">
  <ArtMedia /* … */ />
</motion.div>

// In the lightbox (the media pane):
<motion.div layoutId={`art-${selectedArtwork.id}`} className="relative h-full w-full">
  <ArtMedia /* … object-contain … */ />
</motion.div>
```

### Backdrop + panel

```tsx
<AnimatePresence>
  {selectedArtwork && (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 lg:p-8"
      onClick={() => setSelectedArtwork(null)}
      role="dialog"
      aria-modal="true"
      aria-labelledby="artwork-title"
    >
      {/* backdrop fades independently */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3, ease: EASE_SMOOTH }}
        className="bg-primary/95 absolute inset-0 backdrop-blur-sm"
      />
      {/* panel: media morphs via layoutId; text pane fades+slides in */}
      <motion.div
        layout
        className="relative z-10 flex rounded-2xl border …"
        onClick={(e) => e.stopPropagation()}
        transition={{ type: "spring", stiffness: 280, damping: 30 }}
      >
        <motion.div layoutId={`art-${selectedArtwork.id}`} className="md:w-2/3 …">
          <ArtMedia /* contain */ />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 24 }}
          animate={{
            opacity: 1,
            x: 0,
            transition: { delay: 0.15, duration: 0.4, ease: EASE_SMOOTH },
          }}
          exit={{ opacity: 0, x: 24, transition: { duration: 0.15 } }}
          className="md:w-1/3 …"
        >
          {/* category • year, title, description */}
        </motion.div>
      </motion.div>
    </motion.div>
  )}
</AnimatePresence>
```

- **Open:** tile media flies from grid position into the lightbox slot (spring `280/30`), backdrop fades over it, text pane slides in from the right after a 0.15s beat. The lift/tilt on the source tile should reset to flat before the morph begins — call the tile's `onPointerLeave` reset on click, or simply set `hover.set(0)` in the click handler so the morph starts from a clean transform.
- **Close:** reverse — text pane fades out fast (0.15s), media morphs back to the (now possibly re-laid-out) tile. Because `layout` tracks the live tile position, this works even if the user changed filters while the lightbox was open (media morphs to wherever the tile now is, or cross-fades out if the tile no longer exists in the filtered set).

### Prev / Next content transition

Add prev/next navigation across `filteredArtworks`. Keep the `layoutId` morph only for open/close; for prev/next, swap content with a directional slide+fade keyed on artwork id so each new piece reads as a distinct card, not a morph:

```tsx
const [dir, setDir] = useState(0); // -1 prev, +1 next

<AnimatePresence mode="wait" custom={dir}>
  <motion.div
    key={selectedArtwork.id}
    custom={dir}
    initial={(d) => ({ opacity: 0, x: d > 0 ? 40 : -40 })}
    animate={{ opacity: 1, x: 0 }}
    exit={(d) => ({ opacity: 0, x: d > 0 ? -40 : 40 })}
    transition={{ duration: 0.3, ease: EASE_SMOOTH }}
  >
    {/* media + text for selectedArtwork */}
  </motion.div>
</AnimatePresence>;
```

`mode="wait"` ensures the outgoing piece fully clears before the incoming slides in — clean, no overlap. 40px slide in the navigation direction gives spatial logic ("next" comes from the right). Wire arrow keys (←/→) and on-screen chevrons; both set `dir` then advance the index within `filteredArtworks`.

---

## 7. REDUCED-MOTION — explicit JS fallback per effect

CSS globals already zero out `transition-duration`/`animation-duration` under `prefers-reduced-motion`. But framer-motion drives transforms via JS `style`, which **CSS cannot override** — so every JS effect needs an explicit `useReducedMotion()` branch. Strategy: detect once at the top of `GalleryPage`, thread it down, and **render the destination state with no animation** rather than disabling the component (never leave tiles stuck at `opacity: 0`).

```tsx
import { useReducedMotion } from "framer-motion";
const reduce = useReducedMotion();
```

| Effect               | Reduced-motion fallback                                                                                                                                                                                                                                                                                                                                                                                                                             |
| -------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **1. Entrance**      | Pass `initial={reduce ? false : "hidden"}`. With `initial={false}`, tiles render directly in their `show` state — visible, no fade/blur/stagger. Container `staggerChildren` is harmless when children don't animate.                                                                                                                                                                                                                               |
| **2. Scroll reveal** | Same `initial={reduce ? false : "hidden"}`. **Hero parallax:** `useMagneticTilt`/`HeroParallaxMedia` already early-returns the static `ArtMedia` (no `useScroll`/`useSpring` driving `y`).                                                                                                                                                                                                                                                          |
| **3. Magnetic tilt** | Hook returns `handlers: {}`, `tiltStyle: undefined`, `imgStyle: undefined` when `reduce`. No pointer listeners attach, no 3D transform — tile is a plain card.                                                                                                                                                                                                                                                                                      |
| **4. Hover micro**   | These are CSS `group-hover` / `transition-*` — globals already collapse durations to ~0, so they snap instantly (acceptable; state still changes, just not animated). The caption still reveals on hover, just without the slide.                                                                                                                                                                                                                   |
| **5. Filter**        | `AnimatePresence` + `layout`: framer-motion v12 **automatically disables layout animations** when `useReducedMotion()` is true _if_ you guard transitions. Set tile `transition` and the filter-pill transition to `reduce ? { duration: 0 } : {…spring}`. Tiles still swap, just instantly. Keep `initial`/`animate`/`exit` but they resolve immediately with duration 0.                                                                          |
| **6. Lightbox**      | Wrap the panel spring: `transition={reduce ? { duration: 0 } : { type: "spring", … }}`. The `layoutId` morph collapses to an instant cut — lightbox just appears. Text-pane `initial`/`animate` → guard the `x`/delay so it's `reduce ? { opacity: 1 } : {…}`. Prev/next: `transition={reduce ? { duration: 0 } : {…}}` — instant content swap. Backdrop opacity can stay (a fade is generally tolerated, but to be strict, zero its duration too). |

Centralize the guard so it's DRY:

```ts
// src/lib/motion.ts
export const m = (reduce: boolean, full: Transition): Transition =>
  reduce ? { duration: 0 } : full;
```

Then everywhere: `transition={m(reduce, { type: "spring", stiffness: 280, damping: 30 })}`.

**Golden rule:** reduced-motion users must see the _same final layout and information_ (captions, lightbox, filtered set) — they just don't get the choreography. No effect above should ever be the sole way to reveal content.

---

## Performance notes

- All animated properties are **transform + opacity + filter(blur)** — GPU-compositable, no layout thrash. The only `layout` animations (filter reflow, lightbox morph) are framer-motion's optimized FLIP, which it batches.
- The tilt hook runs `getBoundingClientRect()` only on `pointermove`; with react-compiler memoizing the component, the per-frame cost is just motion-value writes (off the React render path). Fine for 17 tiles.
- Heroes' `useScroll` parallax: 2 instances, spring-smoothed — negligible.
- `blur(6px)` in the entrance is the heaviest paint; it's a one-shot on enter and only on-screen tiles, so acceptable. If profiling shows jank on low-end devices, drop blur from non-hero tiles and keep it only on the 2 heroes.
- Keep `will-change` off by default; framer-motion adds it during active animations and removes it after.

## Summary of exact spring/timing values

- Entrance stagger: `staggerChildren: 0.06`, `delayChildren: 0.1`
- Standard tile enter: tween `duration: 0.55`, `ease: [0.22,1,0.36,1]`, `y:32→0`, `scale:0.96→1`, `blur:6→0`
- Hero tile enter: spring `stiffness:120, damping:20, mass:1.1`, `delay:0.18`, `y:56→0`, `scale:0.94→1`
- Scroll reveal viewport: `once:true, amount:0.25, margin:"0px 0px -10% 0px"`
- Hero parallax: `y: -12→12px`, spring `90/25/0.6`, image `scale:1.06`
- Tilt rotation spring: `stiffness:150, damping:18, mass:0.6`; lift spring: `stiffness:200, damping:22, mass:0.8`
- Tilt range std/hero: rot ±8°/±11°, Z 30/48px, scale 1.03/1.04, img counter ±10/±14px, `perspective:900`
- Filter reflow: layout spring `260/30`, enter `0.3s`, exit `0.2s`, re-stagger `0.03`
- Filter pill: spring `400/32`
- Lightbox panel: spring `280/30`; text pane `delay:0.15, 0.4s`; prev/next slide `40px`, `0.3s`, `mode:"wait"`
