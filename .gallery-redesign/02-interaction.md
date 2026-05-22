# 02 — Interaction Design Spec: Bento Collage Gallery

Audience: MFA admissions reviewers. Tech: framer-motion v12 + Tailwind v4 + React 19 + Next 16.

Files this spec governs:

- `src/app/gallery/page.tsx` — grid, filters, lightbox
- `src/components/ArtMedia.tsx` / `ArtImage.tsx` — media rendering (unchanged API)
- `src/app/globals.css` — tokens already provide `--ease-smooth`, `--ease-bounce`, brand colors

> Source-of-truth note: the current `artworks` array has **16 entries** (ids `1–14, 16, 15`). The brief specifies **14 pieces**. Before implementation, the data must be trimmed to 14. This spec defines the canonical 14-tile set below (the two weakest near-duplicate "Employee Blog" photos are the cut candidates — final cut is the content/curation agent's call, but the bento map assumes exactly 14 in the order listed). The two existing `CustomCursor` dots/ring stay; the magnetic tilt is a tile-level effect layered under that cursor.

---

## 1. Magnetic Cursor-Tilt Interaction

### 1.1 UX intent

On a fine pointer, each tile behaves like a physical card under glass: as the cursor moves across it, the card tilts in 3D **toward** the cursor, lifts off the page, and the media inside parallax-floats opposite the tilt for depth. A faint lime sheen tracks the cursor. On leave, everything springs back flat. The two heroes use the same params but feel heavier (lower max tilt, more lift) so they read as monumental rather than twitchy.

### 1.2 Exact parameters

| Param                | Standard tile                                                  | Hero tile                                    | Notes                                                                                  |
| -------------------- | -------------------------------------------------------------- | -------------------------------------------- | -------------------------------------------------------------------------------------- |
| `perspective`        | `900px`                                                        | `1100px`                                     | Set on the **grid container**, not per-tile, so sibling tilts share a vanishing point. |
| Max `rotateX`        | `8deg`                                                         | `5deg`                                       | Cursor at top edge → tile leans back (negative rotateX); bottom edge → forward.        |
| Max `rotateY`        | `8deg`                                                         | `5deg`                                       | Cursor at left → leans left; right → leans right.                                      |
| Lift (`translateZ`)  | `30px`                                                         | `48px`                                       | Gives the "pulled toward you" magnet feel.                                             |
| Hover scale          | `1.03`                                                         | `1.02`                                       | Layered on top of translateZ.                                                          |
| Media parallax       | `translate3d` up to `±10px` X/Y, **opposite** tilt direction   | `±14px`                                      | Inner `ArtMedia` only; creates depth.                                                  |
| Sheen                | radial lime glow `rgba(204,255,0,0.10)` 280px following cursor | same, `0.08`                                 | Pure overlay div, `mix-blend-screen`.                                                  |
| Spring (tilt)        | `{ type: "spring", stiffness: 250, damping: 22, mass: 0.6 }`   | `{ stiffness: 200, damping: 24, mass: 0.8 }` | Snappy but not springy-bouncy.                                                         |
| Reset spring (leave) | `{ stiffness: 170, damping: 26 }`                              | same                                         | Settles flat in ~350ms with no overshoot.                                              |

`transform-style: preserve-3d` on the tile; `transform-origin: center`. `will-change: transform` only while pointer is inside (toggle on enter/leave) to avoid permanent compositing cost across 14 tiles.

### 1.3 Pointer math (the approach, not a final impl)

Use framer-motion motion values so the spring runs off the main React render loop:

```ts
// useMagneticTilt.ts — returns ref + style + handlers
const x = useMotionValue(0); // -0.5..0.5 normalized
const y = useMotionValue(0);
const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [MAX, -MAX]), spring);
const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-MAX, MAX]), spring);
const scale = useSpring(useMotionValue(1), spring); // set to HOVER on enter, 1 on leave
const z = useSpring(useMotionValue(0), spring); // LIFT on enter, 0 on leave

function onPointerMove(e) {
  const r = el.getBoundingClientRect();
  x.set((e.clientX - r.left) / r.width - 0.5);
  y.set((e.clientY - r.top) / r.height - 0.5);
  // sheen position = clientX-r.left, clientY-r.top (set CSS vars --mx/--my)
}
function onPointerLeave() {
  x.set(0);
  y.set(0);
  scale.set(1);
  z.set(0);
}
function onPointerEnter() {
  scale.set(HOVER);
  z.set(LIFT);
  el.style.willChange = "transform";
}
```

- Read `getBoundingClientRect()` **on pointer enter** and cache it; recompute on `scroll`/`resize` (rAF-throttled) — calling it every `pointermove` is the common jank source with 14 tiles.
- Use `pointermove` / `pointerenter` / `pointerleave` (Pointer Events), and **gate to `e.pointerType === "mouse"`** so a stylus/touch never triggers tilt even on hybrid devices.
- Apply transforms via the motion `style` object (`{ rotateX, rotateY, scale, transformPerspective: <px>, z }`) so all four values share one composited transform.

### 1.4 Disable conditions (hard requirements)

A single guard hook `usePrefersTilt()` returns `false` (→ no listeners attached, flat static tile, normal hover only) when ANY of:

1. `window.matchMedia("(prefers-reduced-motion: reduce)").matches`
2. `window.matchMedia("(pointer: coarse)").matches` OR `"ontouchstart" in window` OR `navigator.maxTouchPoints > 0` (mirrors `CustomCursor`'s own check — reuse the same logic).
3. SSR / before mount (returns `false` until `useEffect` confirms — prevents hydration mismatch; tiles render flat first paint).

When tilt is disabled the tile still gets a **flat fallback hover** (CSS only): `scale(1.02)` + border color shift + caption reveal, `transition: transform .35s var(--ease-smooth)`. This satisfies `prefers-reduced-motion` because it's a sub-1.03 scale and respects the global `transition-duration: 0.01ms` reduced-motion override already in `globals.css` (the scale snaps instantly, no motion). Touch users get the flat hover on tap-and-hold / focus.

### 1.5 Hook/props contract

```ts
function useMagneticTilt(opts?: {
  maxTilt?: number; // default 8 (hero passes 5)
  lift?: number; // default 30 (hero 48)
  scale?: number; // default 1.03 (hero 1.02)
  perspective?: number; // default 900 (hero 1100)
}): {
  ref: RefObject<HTMLElement>;
  style: MotionStyle; // spread onto the motion.article
  bind: { onPointerEnter; onPointerMove; onPointerLeave }; // {} when disabled
  sheenStyle: CSSProperties; // for the overlay div, uses --mx/--my
  enabled: boolean;
};
```

The tile component is the only consumer. `framer-motion`'s `LayoutGroup`/`layout` (used for filter reflow) is compatible because tilt lives in `style.transform` while layout animates `x/y/width` — but **set `layout="position"`** on tilt tiles so framer doesn't fight the 3D transform during reflow. Apply tilt to a non-`layout` inner wrapper if visual glitches appear (recommended: outer `motion.li` does `layout`, inner `motion.div` does tilt).

---

## 2. Responsive Bento Span Map (14 tiles)

Grid definition:

| Breakpoint              | Columns | Row sizing                                                       | Gap     |
| ----------------------- | ------- | ---------------------------------------------------------------- | ------- |
| Mobile (`base`)         | **1**   | `auto-rows-[minmax(220px,auto)]`; heroes get taller via row-span | `gap-4` |
| Tablet (`md`, ≥768px)   | **4**   | `auto-rows-[180px]`                                              | `gap-5` |
| Desktop (`lg`, ≥1024px) | **6**   | `auto-rows-[150px]`                                              | `gap-6` |

Total cells filled: mobile = linear stack; **tablet 4-col** and **desktop 6-col** are designed hole-free (sum of spans tiles exactly into full rows). Heroes are tiles **#1 (EOP Explainer, video)** and **#3 (Mindless Mirth, painting)** — placed in the first frame so the page opens on motion + the award painting. First 3 tiles form the strongest "frame": a wide hero video, a tall accent, and the hero painting.

| #   | Tile (title)            | Category     | Hero?  | Mobile span        | Tablet (4-col) span     | Desktop (6-col) span    |
| --- | ----------------------- | ------------ | ------ | ------------------ | ----------------------- | ----------------------- |
| 1   | **EOP Explainer**       | Motion       | ★ HERO | col-1 / row-span-2 | col-span-2 / row-span-2 | col-span-3 / row-span-2 |
| 2   | A Bike for Every Rider  | Illustration |        | col-1              | col-span-2 / row-span-1 | col-span-2 / row-span-2 |
| 3   | **Mindless Mirth**      | Painting     | ★ HERO | col-1 / row-span-2 | col-span-2 / row-span-2 | col-span-1 / row-span-2 |
| 4   | ATM Home Screen         | Motion       |        | col-1              | col-span-2 / row-span-1 | col-span-2 / row-span-1 |
| 5   | Watercolor Painting     | Painting     |        | col-1              | col-span-1 / row-span-1 | col-span-2 / row-span-2 |
| 6   | SB Bike Shop Info Sheet | Design       |        | col-1              | col-span-1 / row-span-2 | col-span-2 / row-span-1 |
| 7   | The NTL                 | Photography  |        | col-1              | col-span-1 / row-span-1 | col-span-1 / row-span-1 |
| 8   | Red Hook Launch         | Photography  |        | col-1              | col-span-1 / row-span-1 | col-span-1 / row-span-1 |
| 9   | Eat, Drink & Be Merry   | Illustration |        | col-1              | col-span-2 / row-span-1 | col-span-2 / row-span-1 |
| 10  | Binnoy Feature          | Photography  |        | col-1              | col-span-1 / row-span-1 | col-span-1 / row-span-1 |
| 11  | Construction Site       | Photography  |        | col-1              | col-span-1 / row-span-1 | col-span-2 / row-span-1 |
| 12  | Jason Feature           | Photography  |        | col-1              | col-span-2 / row-span-1 | col-span-1 / row-span-1 |
| 13  | LinkedIn Cover          | Design       |        | col-1              | col-span-2 / row-span-1 | col-span-2 / row-span-1 |
| 14  | Posing at Gallery       | Photography  |        | col-1              | col-span-2 / row-span-1 | col-span-2 / row-span-1 |

Span-sum sanity check (no holes when all 14 shown):

- **Tablet (4-col):** spans per row group → 2+2 / 2+2 / 2+1+1 / 1+1+2 / 1+1+2 / 2+2 = every row sums to 4. Heroes' `row-span-2` overlaps are absorbed by neighbors' single rows (use `grid-auto-flow: dense` to backfill the column a hero leaves under it). Balanced.
- **Desktop (6-col):** 3(hero)+2+1 / [hero #1 row2 spans under]+2(#2 r2)+1(#3 r2)... resolves to full 6-wide rows: 3+2+1, 2+2+2, 2+1+1+2, 1+1+2+1+... — every visual row fills 6 with `grid-auto-flow: dense`. Heroes anchor the top-left frame.

Implementation: store spans as Tailwind class strings per tile, e.g.
`"row-span-2 md:col-span-2 md:row-span-2 lg:col-span-3 lg:row-span-2"`.
Grid container: `grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 [grid-auto-flow:dense] auto-rows-[minmax(220px,auto)] md:auto-rows-[180px] lg:auto-rows-[150px] gap-4 md:gap-5 lg:gap-6`.

`grid-auto-flow: dense` is the primary hole-filler — it lets later small tiles backfill gaps left by tall heroes and by filtering.

---

## 3. Filtering + Bento (incl. Photography fix)

### 3.1 The Photography bug

Current `categories = ["All", "Painting", "Illustration", "Design", "Motion"]` — **"Photography" is missing**, so the 7+ photography tiles are unreachable by filter. Fix:

```ts
const categories = ["All", "Painting", "Illustration", "Photography", "Design", "Motion"];
```

Order by curatorial weight (paint/illustration first, photography mid). Filtering matches `art.category` exactly (unchanged logic, just the missing tab added). Verify every tile's `category` value is one of these strings.

### 3.2 Filter behavior with the bento

- Filtered-out tiles **animate away** (the animation agent owns the exit motion — scale-to-0.85 + fade + `layout`); remaining tiles **reflow** via framer `layout`.
- Use `<motion.ul layout>` wrapping `<AnimatePresence mode="popLayout">` (popLayout so exiting tiles don't hold their grid slot during reflow).
- Keep one stable list keyed by `artwork.id`. Do not unmount the grid on filter change.

### 3.3 Hole avoidance under filtering (the hard part)

Bento spans + filtering = jagged rows (e.g. only Photography selected = all 1×1 tiles, fine; but Motion selected = 2 wide hero+tile leaves gaps).

Strategy — **collapse to a uniform sub-grid when a single category is active**:

- **"All"** → full bento map from §2 (heroes dominant).
- **Any single category** → tiles drop their custom spans and render at a **normalized span** so the filtered set tiles cleanly: each tile becomes `lg:col-span-2 md:col-span-2` (3 per desktop row, 2 per tablet row), `row-span-1`. The two heroes keep a modest emphasis (`lg:col-span-2 lg:row-span-2`) only when their own category is active so they still read as features.
- Combined with `grid-auto-flow: dense`, this guarantees no holes in either state.

Mechanism: store two class strings per tile — `bentoSpan` (used when `activeCategory === "All"`) and `filteredSpan` (used otherwise). Swap via the className. Because spans are CSS classes, the framer `layout` animation tweens the resulting size/position change smoothly. Empty filter result → show a centered "No pieces in this category" message (shouldn't happen given data, but defensive).

---

## 4. Lightbox Redesign

Single `<dialog>`-pattern modal, two layout variants driven by `artwork.isHero`.

### 4.1 Standard (non-hero) layout

- Two-pane on `md+`: media left (≈60–66%), meta right (≈34–40%); stacked on mobile (media top, meta below, scrollable).
- Meta pane: category • year (lime, uppercase, tracked), title (`font-display`, 3xl→4xl), **full description** (the on-tile caption only shows title; the complete description lives here — satisfies "all descriptions accessible").
- Media uses `object-contain` on a `bg-black/5` stage so nothing crops. Video autoplays muted/loop as today.

### 4.2 Hero layout (EOP Explainer, Mindless Mirth)

- Wider shell (`max-w-7xl`), media pane larger.
- Below/beside the description, an **"Process / Iteration beats"** section: a vertical ordered list of process steps (numbered lime markers, each with a short beat title + line of copy, optional thumbnail). This is the extended content reviewers want. Data shape:
  ```ts
  process?: { step: string; caption: string; thumb?: string }[]
  ```
  Render only when present (`artwork.isHero && artwork.process`). Scrollable within the meta pane on all sizes.
- Hero modal gets a subtle `gradient-mesh` backing on the meta pane to elevate it.

### 4.3 Keyboard & focus (full)

- **Esc** → close.
- **ArrowRight / ArrowLeft** → next / previous piece **within the currently filtered+ordered list** (wraps at ends). Updates `selectedIndex`; media + meta crossfade.
- **Focus trap**: on open, move focus to the close button; `Tab`/`Shift+Tab` cycle only among focusable elements inside the dialog (close, prev, next, any links, scroll region). Use a focus-trap util or manual first/last-element wrap. On close, **return focus to the tile that opened it** (store the triggering element ref).
- `role="dialog"` `aria-modal="true"` `aria-labelledby` (title id) `aria-describedby` (description id). Body scroll locked while open (`overflow:hidden` on `<html>`).
- Reduced-motion: open/close = instant opacity (no scale spring); prev/next = instant swap, no slide.

### 4.4 Affordances & nav controls

- Close: top-right circular button, `X` icon, `aria-label="Close"`, lime hover (keep existing styling). Clicking the backdrop also closes; clicking the panel does not (stopPropagation).
- Prev/Next: left & right edge chevron buttons (`lucide` `ChevronLeft/Right`), `aria-label="Previous piece" / "Next piece"`, 44×44px min target, hidden visually on hover-capable but always present for keyboard/touch (keep them visible — admissions reviewers may not know the arrow keys).
- A small "n / total" counter in the meta header for orientation.

### 4.5 Responsive

- `< md`: full-height sheet, single column, media caps at ~50vh, meta scrolls below. Prev/next become bottom-bar buttons (thumb-reachable). Swipe left/right also navigates (touch, optional — animation agent).
- `md`–`lg`: side-by-side, `max-h-[90vh]`.
- `lg+`: hero gets the wide `max-w-7xl` shell; standard stays `max-w-6xl`.

---

## 5. Hover / Focus / Cursor / Touch — full interaction matrix

| Surface                  | Mouse hover (fine ptr)                                                                                           | Keyboard focus                                                                               | Touch                                                                           | Reduced-motion                                        |
| ------------------------ | ---------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- | ----------------------------------------------------- |
| Tile                     | 3D magnetic tilt + lift + scale 1.03 + lime sheen + caption slides up + border→lime/30                           | `focus-visible` lime outline (global, already in CSS) + caption shown + scale 1.02 (no tilt) | tap = open lightbox; no tilt; caption always partially visible (gradient scrim) | flat scale 1.02 snap, caption shown, no tilt/parallax |
| Tile caption             | Title always rendered; on hover full title + category slide up over scrim                                        | Visible whenever focused                                                                     | Title persistently visible on a bottom scrim (touch can't hover)                | Title visible                                         |
| Filter tab               | bg shift `accent-blue/10→/20`; active = lime bg                                                                  | `focus-visible` outline; `role="tab"`/`aria-selected` (keep)                                 | tap toggles                                                                     | instant color, no transition                          |
| Lightbox close/prev/next | lime fill on hover                                                                                               | in focus trap, visible focus ring                                                            | always-visible buttons, 44px targets                                            | instant                                               |
| Cursor                   | existing `CustomCursor` lime dot+ring; ring expands to 64px over interactive (tiles qualify via `role="button"`) | n/a                                                                                          | `CustomCursor` returns null on touch                                            | dot/ring listeners skip when reduced-motion           |

Cursor affordance: each tile gets `role="button"`, `tabIndex={0}`, `aria-label="View {title}"`, and `onKeyDown` (Enter/Space → open). This makes the existing `CustomCursor`'s interactive-detection (which keys off `[role="button"]`) automatically grow the ring over tiles — reinforcing "this is clickable." Cursor stays `none` on fine pointers per the existing global style; the lime ring **is** the affordance.

### Accessibility checklist

- Tiles are real buttons (keyboard-openable), not bare divs with onClick.
- Grid wrapper `role="list"`, tiles `role="listitem"` wrapping the button (or `<ul><li>`).
- Filter tablist semantics preserved + Photography tab added.
- Lightbox: dialog semantics, focus trap, focus restore, Esc, arrow nav, body scroll lock.
- All titles on-tile; all descriptions + hero process in lightbox.
- Every motion path has a reduced-motion + touch fallback; tilt fully disabled in both.
- Contrast: lime (#ccff00) text only on dark `--primary`; never lime-on-lime.

---

## Build summary for downstream agents

- **New hook**: `useMagneticTilt` (+ shared `usePrefersTilt` guard reusing CustomCursor's touch/reduced-motion check).
- **Data changes**: trim to 14 tiles; add `isHero`, `bentoSpan`, `filteredSpan`, optional `process[]` per tile; add `"Photography"` to `categories`.
- **Component split**: extract `GalleryTile` (tilt + caption + a11y) and `Lightbox` (hero/standard variants + keyboard) out of `page.tsx`.
- Animation agent owns: filter exit/reflow motion, lightbox open/close + prev/next transitions, optional swipe. This spec defines layout + interaction intent; it sets `layout`/`AnimatePresence mode="popLayout"` as the structural contract.
