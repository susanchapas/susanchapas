# Gallery Redesign — PM Integration Contract (CANONICAL)

This is the single source of truth. All 4 design agents + the implementer code against
this. If something here conflicts with your spec, this wins. Do not relitigate the
FIXED DECISIONS below.

Target: redesign `src/app/gallery/page.tsx` into an animated bento-collage gallery for
MFA admissions reviewers. Showstopping, interactive, intuitive, responsive.

## Stack (fixed)

- Next 16, React 19, **babel-plugin-react-compiler ENABLED** → do NOT add manual
  `useMemo`/`useCallback`/`React.memo`. The compiler handles memoization. Only reach for
  refs/`useMotionValue` where animation genuinely requires imperative values.
- framer-motion v12, Tailwind v4 (CSS-first, tokens in `globals.css`).
- All gallery files are `"use client"`.
- Reuse existing `cn()` from `@/lib/utils` and existing `ArtMedia`/`ArtImage` for media.
  Do NOT reimplement media rendering.

## Design tokens (already in globals.css — use Tailwind classes, do not redefine)

- bg `--primary` #102f5d (navy) → `bg-primary`
- text `--secondary` #f4f4f5 → `text-secondary`
- `--accent-lime` #ccff00 → `accent-lime`, `--accent-blue` #bbcdf3 → `accent-blue`,
  `--accent-clay` #e09f7d → `accent-clay`
- `font-display` (Space Grotesk), `font-body` (DM Sans)
- Eases: `--ease-smooth` cubic-bezier(0.22,1,0.36,1), `--ease-bounce` cubic-bezier(0.34,1.56,0.64,1).
  In framer-motion pass these as arrays: `[0.22,1,0.36,1]` / `[0.34,1.56,0.64,1]`.

---

## 1. Canonical data model (ONE shape — everyone imports this)

Lives in `src/app/gallery/artworks.ts`. Exported `as const satisfies readonly Artwork[]`.

```ts
export type ArtCategory =
  | "Painting"
  | "Illustration"
  | "Design"
  | "Motion"
  | "Photography";

export type MediaType = "image" | "video";

/** Bento footprint on the md+ grid (3-col base). Tile maps this to col/row spans. */
export type BentoSize = "sm" | "wide" | "tall" | "hero";

/** Optional richer content shown only in the lightbox for HERO pieces. */
export interface ArtworkProcess {
  /** Short framing line above the process blocks. [PLACEHOLDER] until content agent. */
  intro?: string;
  /** Ordered process/detail steps. Each renders as a labeled block. */
  steps?: { label: string; body: string }[];
  /** Optional secondary detail media (e.g. a still frame, a close-up crop). */
  detailSrc?: string;
  detailType?: MediaType;
}

export interface Artwork {
  id: number; // stable, matches existing ids; used as React key
  title: string;
  category: ArtCategory;
  year: string; // "2023" etc.
  description: string; // ALWAYS present, ALWAYS rendered
  src: string; // public path, spaces allowed (ArtImage encodeURI's it)
  type: MediaType;
  size: BentoSize; // bento weight; "hero" only for the 2 hero pieces
  hero?: boolean; // true ONLY for ids 5 and 1
  process?: ArtworkProcess; // present only when hero === true
  objectFit?: "cover" | "contain" | "fill" | "none" | "scale-down"; // default "cover"
  imageClassName?: string; // optional per-tile media transform override (e.g. scale/origin)
}
```

Rules:

- `size` replaces the old free-form `className` span strings. The **tile** owns the
  size→Tailwind-span mapping (see §3). Specs must use `size`, never raw `md:col-span-*`.
- `hero: true` ⇒ `size: "hero"` and `process` defined. Exactly 2 heroes (ids 5, 1).
- `objectFit` / `imageClassName` are passthrough to `ArtMedia` — same semantics as today.
- Captions/descriptions/process copy will be `[PLACEHOLDER]` strings the user fills.
  Content agent owns the literal copy; the shape above does not change.

---

## 2. Final ordered artwork list (14 pieces — 3 REMOVED)

REMOVED (do not include anywhere): id 12 "Employee Blog", id 16 "Employee Blog 2",
id 14 "LinkedIn Cover".

The remaining 14 (this is the inventory + verified `src`/`type`; **final sequence and
`size` are owned by the content + critic agents** — the order below is the current
source order, not a mandate):

| id  | title                   | category     | type  | hero | src                                     |
| --- | ----------------------- | ------------ | ----- | ---- | --------------------------------------- |
| 1   | Mindless Mirth          | Painting     | image | ✅   | /gallery/Mindless-Mirth-final.svg       |
| 2   | ATM Home Screen         | Motion       | video |      | /gallery/ATM home screen video.mp4      |
| 3   | A Bike for Every Rider  | Illustration | image |      | /gallery/A bike for every rider.svg     |
| 4   | Eat, Drink, & Be Merry  | Illustration | image |      | /gallery/eat, drink, & be merry.svg     |
| 5   | EOP Explainer           | Motion       | video | ✅   | /gallery/EOP Explainer.mp4              |
| 6   | SB Bike Shop Info Sheet | Design       | image |      | /gallery/SB Bike Shop Info Sheet.svg    |
| 7   | The NTL                 | Photography  | image |      | /gallery/THE NTL photo.webp             |
| 8   | Watercolor Painting     | Painting     | image |      | /gallery/Watercolor Painting.webp       |
| 9   | Red Hook Launch         | Photography  | image |      | /gallery/Red Hook Launch Photo.webp     |
| 10  | Binnoy Feature          | Photography  | image |      | /gallery/Binnoy Feature Photo.webp      |
| 11  | Construction Site       | Photography  | image |      | /gallery/Construction Site Photo.webp   |
| 13  | Jason Feature           | Photography  | image |      | /gallery/Jason Feature Photo.webp       |
| 15  | Posing at Gallery       | Photography  | image |      | /gallery/Posing at a Gallery Photo.webp |

Wait — that's 13 rows. The 14th is the existing **"SB Bike Shop"** vs count check:
counting ids {1,2,3,4,5,6,7,8,9,10,11,13,15} = 13. The original file had 16 entries,
minus 3 removed = **13 remaining, not 14.**

> ⚠️ DISCREPANCY FLAG: The brief says "14 pieces remain" but the source file contains 16
> artworks; removing 3 leaves **13**. Categories present: Painting, Illustration, Design,
> Motion, Photography. The filter tab list must drop nothing it still has members for —
> note "Photography" is the dominant category. Implementer/critic: treat 13 as the true
> count unless the user supplies a 14th piece. Do not fabricate a tile.

Filter categories (derive from data, do not hardcode a stale list):
`["All", ...unique categories in source order]` → All, Painting, Motion, Illustration,
Design, Photography.

---

## 3. File / architecture plan (minimal — no over-engineering)

New / changed files:

```
src/app/gallery/
  artworks.ts          # NEW. Typed data (Artwork[]) + ArtCategory union. Owned by content agent for copy; PM owns shape.
  page.tsx             # REWRITE. Orchestrates: hero header, filter tabs, bento grid, lightbox state.
  BentoTile.tsx        # NEW "use client". Renders one tile: media + caption overlay + magnetic tilt. Owns size→span map.
  Lightbox.tsx         # NEW "use client". Modal: media + meta + (hero) process content.
src/hooks/
  useMagneticTilt.ts   # NEW. Pointer-driven 3D tilt + magnetic lift. Returns motion values + handlers. (hooks/ dir does not exist yet — create it.)
```

- Keep `ArtMedia`/`ArtImage` untouched. They already encode URIs and lazy-load images.
- `size` → span mapping lives ONLY in `BentoTile` (single DRY source):
  - `sm` → `md:col-span-1 md:row-span-1`
  - `wide` → `md:col-span-2 md:row-span-1`
  - `tall` → `md:col-span-1 md:row-span-2`
  - `hero` → `md:col-span-2 md:row-span-2`
  - mobile (base, 1 col): all full-width, natural row height.
- No new npm deps. No state library. `useState` in `page.tsx` for `activeCategory` +
  `selectedArtwork`.

---

## 4. Integration contract (prop interfaces + ownership boundaries)

### Prop interfaces (frozen — downstream specs may extend behavior, not signatures)

```ts
// page.tsx -> BentoTile
interface BentoTileProps {
  artwork: Artwork;
  index: number; // for animation stagger only
  onSelect: (artwork: Artwork) => void;
}

// page.tsx -> Lightbox
interface LightboxProps {
  artwork: Artwork | null; // null = closed
  onClose: () => void;
}

// hooks/useMagneticTilt.ts
interface MagneticTiltOptions {
  maxTiltDeg?: number; // default ~8
  liftPx?: number; // default ~12
  disabled?: boolean; // pass prefers-reduced-motion result here
}
// returns: { ref, style, onPointerMove, onPointerLeave } to spread onto the tile's motion element.
```

### Shared contracts everyone honors

- React key is always `artwork.id`. Filtering: `AnimatePresence mode="popLayout"` +
  `layout`, same approach as current file (keep working layout animation).
- Lightbox is the ONLY place full-res media loads with `objectFit="contain"`; the grid
  uses `cover`. Heroes show `process` content in the lightbox; non-heroes show
  category • year + title + description.
- Accessibility (non-negotiable, preserve from current impl): tiles are buttons/articles
  with accessible names; lightbox `role="dialog" aria-modal aria-labelledby`; close on
  backdrop click + Escape; respect `prefers-reduced-motion` (gate tilt + heavy motion).

### Ownership matrix — own vs MUST NOT touch

| Agent                  | OWNS (writes)                                                                                                                                        | MUST NOT TOUCH                                                                                          |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| **Content** (`01`)     | All `title`/`description`/`year`/`process` copy in `artworks.ts` as `[PLACEHOLDER]`; final tile `size` assignment + sequence; filter category labels | The `Artwork` type shape; prop interfaces; hook/component APIs                                          |
| **Interaction** (`02`) | `useMagneticTilt.ts` impl; tile hover/cursor behavior; filter-tab interaction; lightbox open/close + keyboard                                        | Data values; bento span map (lives in tile, set by content via `size`); animation entrance choreography |
| **Animation** (`03`)   | Entrance/stagger/layout transitions, scroll reveals, lightbox enter/exit motion; ease usage                                                          | Tilt math (interaction owns); data; prop signatures                                                     |
| **Critique** (`04`)    | Final sizing/sequence balance, visual hierarchy, hero treatment review, perf sign-off recommendations                                                | Writing component code; changing the type/contract                                                      |

Merge rule: each agent edits only its owned file regions. The `Artwork` type, the prop
interfaces, and the size→span map are the three contract surfaces — changing any of them
requires a PM contract update, not a unilateral edit.

---

## 5. Build / verify commands (Wave-3 audit agents)

From repo root `/Users/susanchapas/Desktop/code/susanchapas`:

```bash
npm run type-check     # tsc --noEmit — MUST pass; the Artwork type is the contract
npm run lint           # eslint . --ext .ts,.tsx
npm run format:check   # prettier check
npm run build          # next build — catches RSC/"use client" + Next 16 issues
npm run test           # jest (run if gallery tests are added)
npm run dev            # local dev server for visual/interaction QA
```

Order for CI-style gate: `type-check` → `lint` → `build`. Fix in that order.

---

## Performance directives (known risks — bake into implementation)

- **Mindless Mirth SVG = 37MB, ATM video = 84MB, EOP video = 25MB.** These dominate
  page weight.
- Grid: keep `ArtMedia` lazy `loading="lazy"` for images and `preload="metadata"` for
  videos (already the default). Do NOT autoplay all videos eagerly above the fold beyond
  what's visible; consider intersection-gated playback if critique flags jank — but do
  not add a heavy lib for it.
- Full-res media (esp. the 37MB SVG and videos) should load primarily in the **lightbox**,
  not at full fidelity in every tile. If feasible, generate/point grid thumbnails for the
  two heaviest assets — flag to user; do not block on it.
- Tilt uses transforms only (GPU-friendly). Gate behind `prefers-reduced-motion`.
