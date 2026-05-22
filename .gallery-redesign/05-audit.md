# Gallery Redesign Audit (read-only)

Auditor pass over: `gallery/page.tsx`, `artworks.ts`, `BentoTile.tsx`, `Lightbox.tsx`, `useMagneticTilt.ts`, `lib/motion.ts`, `ArtMedia.tsx`, `ArtImage.tsx`, `globals.css`.

Asset weights confirmed on disk (`public/gallery/`): `Mindless-Mirth-final.svg` ~37.9MB, `ATM home screen video.mp4` ~84.3MB, `EOP Explainer.mp4` ~25.8MB.

---

## Top fixes (prioritized)

### BLOCKERS

1. **84MB ATM video + 25MB EOP video autoplay in the grid, ungated.** `ArtMedia.tsx:34-43` renders `<video autoPlay loop muted>` with no `poster`, no intersection gating, no separate grid thumbnail. Both autoplaying videos plus the 37MB SVG render in the initial "All" viewport. Real-world first-load is ~150MB+ before interaction. (PERF-1, PERF-2)
2. **Focus is never moved INTO the Lightbox on open.** `Lightbox.tsx` has a Tab-wrap trap (44-58) but nothing focuses the close button (or panel) when the dialog opens. A keyboard/SR user opens the dialog and focus stays on the now-hidden tile behind the overlay; first Tab can land outside the trap logic's assumptions. (A11Y-1)

### SHOULD-FIX

3. **Hero SVG (37MB) loads eagerly.** `ArtImage.tsx` sets `loading="lazy"`, but the hero is the first/top-left tile so it is in the initial viewport and effectively loads immediately. Needs a rasterized/optimized derivative — a 37MB SVG is pathological regardless of lazy. (PERF-3)
4. **Lightbox focus restore is fragile.** `page.tsx:26-29` calls `triggerRef.current?.focus()` on close, but on a filter change `setActiveCategory` also sets `selectedIndex=null` (72-74) and the trigger tile may have unmounted — focus silently drops to `<body>`. (A11Y-2)
5. **Tab filter pattern incomplete:** no `aria-controls`, no roving `tabIndex`, no arrow-key navigation, and no `tabpanel` role on the grid. (A11Y-3)
6. **Reduced-motion not threaded into the grid stagger/tile entrance or the magnetic-tilt spring config** beyond gating enablement — see A11Y-4 for the specifics that are actually fine vs. the one gap.
7. **Caption contrast:** `text-secondary/70` and especially `text-secondary/60` body/process text on `--primary` navy is borderline/below WCAG AA for small text. (A11Y-5)

### NICE-TO-HAVE

8. Dense bento flow leaves a probable hole on the "All" view and on filtered views (RESP-1).
9. Videos have `aria-label` but no `<track>` captions and no controls — acceptable for muted decorative loops but flag (A11Y-6).
10. `[PLACEHOLDER: ...]` copy is live in 23 spots incl. the gallery intro `page.tsx:51-52` (CORRECT-4).

---

## 1. Accessibility

### A11Y-1 — Focus not moved into dialog on open — BLOCKER

`Lightbox.tsx:38-62`. The effect installs Escape/arrow/Tab handlers, but there is **no `focus()` call on mount** to move focus to the close button or panel. The brief asks specifically whether the close button is focused on open: it is **not**. Result: on open, `document.activeElement` is still the triggering tile (behind the `aria-modal` overlay). The Tab-trap math at 51-57 only fires when `activeElement` is already `first`/`last` inside the panel, so until the user tabs in, wrapping is unreliable and a screen reader is not announced into the dialog.
Recommended (do not implement): on open, `panelRef.current` first focusable (the close button) `.focus()`.

### A11Y-2 — Focus restore can drop to body — SHOULD-FIX

`page.tsx:21-29`. `triggerRef` is captured at open; `close()` refocuses it. Works for plain close. But changing the filter (`page.tsx:71-74`) nulls `selectedIndex` without going through `close()` and the trigger tile may unmount under `AnimatePresence`, so `triggerRef.current?.focus()` (if it ran) targets a detached node. Also there is no guard that the trigger still exists. Acceptable for the common path; flag for robustness.

### A11Y-3 — Filter tabs: partial ARIA tabs pattern — SHOULD-FIX

`page.tsx:61-98`. `role="tablist"` + `role="tab"` + `aria-selected` are present and correct. Missing vs. full APG tabs pattern: `aria-controls` linking each tab to the grid, an `id` + `role="tabpanel"` on the grid section (`page.tsx:102`), roving `tabIndex` (one tab in tab order, arrows move between), and arrow-key handling. Weighed against simplicity: the buttons are individually focusable and operable, so this is usable today; closing the gap is a should-fix, not a blocker. If not doing full APG, consider `role="group"` instead of `tablist` to avoid promising a pattern that isn't fully implemented (SRs will announce "tab, 1 of 6" and expect arrow nav).

### A11Y-4 — Reduced-motion gating — mostly good, one gap

- Page entrance: gated `page.tsx:36` (`initial={reduce ? false}`).
- Filter pill spring: gated via `m(reduce, …)` `page.tsx:87`.
- Lightbox overlay/panel/slide transitions: gated `Lightbox.tsx:71,83,85,125,128,133`.
- Magnetic tilt: disabled when `reduce` via `enabled` `useMagneticTilt.ts:30,66-78`. Good.
- Tile caption transition: gated by `!reduce` `BentoTile.tsx:112`. Good.
- **GAP:** the grid container stagger (`page.tsx:106` `initial={reduce ? false : "hidden"}`) gates the container, but the **child `tileVariant` springs/durations in `BentoTile.tsx:17-48` are not reduced-aware**. When `reduce` is set, the container starts at `"show"` so children animate `show` immediately, but each child still runs its spring/`duration: 0.55` blur+scale+translate (`BentoTile.tsx:31-46`) on mount and on `layout`/`exit` (71-72). framer-motion does **not** auto-respect `prefers-reduced-motion` for these; only the global CSS rule (`globals.css:39-51`) caps CSS transitions, which does not touch JS-driven motion values. So tile entrance/exit/layout motion still plays for reduced-motion users. Should-fix: thread `reduce` into the variant transitions (or skip `variants`/`layout` animation when reduced).

### A11Y-5 — Caption / body contrast — SHOULD-FIX

Tokens: `--primary/--background = #102f5d` (navy), `--secondary = #f4f4f5` (near-white), `--accent-lime = #ccff00`.

- Lime on navy (`#ccff00` on `#102f5d`), used for category eyebrows (`BentoTile.tsx:116`, `Lightbox.tsx:154`, `page.tsx:41`): high contrast (~9:1+), **passes** — fine.
- `text-secondary/70` body text on navy (`page.tsx:49`, `Lightbox.tsx:170`): white at 70% over navy ≈ contrast ~5–6:1, passes AA for normal text but is the floor.
- **`text-secondary/60`** process intro/body (`Lightbox.tsx:181,195`) and `text-secondary/40` counter (`Lightbox.tsx:157`): 60% white on navy drops to roughly ~4:1 and the 40% counter is well below AA. The counter is non-essential, but the 60% process body is real reading content — flag as below comfortable AA.

### A11Y-6 — Video accessibility — NICE-TO-HAVE

`ArtMedia.tsx:34-43`: videos get `aria-label={alt}` (good), are `muted/loop/autoPlay`, but have no `<track kind="captions">` and no `controls`. For muted decorative motion loops this is defensible; flag because the EOP/ATM pieces are explainer/UI content where a caption track or a controls affordance in the Lightbox would be the correct treatment. The lightbox renders the same `ArtMedia` (`Lightbox.tsx:138-145`) so there is **no way to pause/scrub** the video even in the detail view — should-fix-adjacent.

### Lightbox positives (verified)

`role="dialog"`, `aria-modal="true"`, `aria-labelledby="artwork-title"`, `aria-describedby="artwork-desc"` all present and the referenced ids exist (`Lightbox.tsx:74-77,163,169`). Esc + Left/Right wired (`40-43`). Body scroll lock via `document.documentElement.style.overflow="hidden"` with cleanup (`30-36`) — works, though locking `documentElement` rather than `body` is slightly unusual but fine. Tiles are keyboard-operable: `role="button"`, `tabIndex={0}`, Enter/Space with `preventDefault` (`BentoTile.tsx:75-84`), accessible name `aria-label="View {title}"` (`77`). Good.

---

## 2. Performance

### PERF-1 — 84MB ATM video autoplays in grid, ungated — BLOCKER

`ArtMedia.tsx:34-43` + `artworks.ts:161-163` (`size: "sm"`, type video). `preload="metadata"` is set (good — limits initial bytes to headers), and `autoPlay/muted/playsInline`. But once playing, the browser streams the full 84MB. There is **no intersection-observer gating of playback** and no lighter grid thumbnail. The tile is a small `sm` cell, so an 84MB source for a ~tile-sized render is gross overkill.
Recommended (do not implement): (a) add a `poster` (static frame) so the grid shows an image until interaction; (b) gate `play()` on IntersectionObserver and pause off-screen; and/or (c) serve a small compressed grid-thumbnail loop and only load the full file in the Lightbox. The cheapest correct fix is poster + intersection-gated play.

### PERF-2 — Two autoplaying videos in one viewport — BLOCKER (compounds PERF-1)

ATM (`artworks.ts:155-164`) and EOP (`77-109`) are both in the unfiltered "All" grid and both autoplay simultaneously. EOP is a `wide` hero near the top; ATM is below. Combined ~110MB of video decoding/streaming concurrently on first paint, plus the 37MB SVG. Flag: at minimum only the in-view, on-screen video should be playing.

### PERF-3 — 37MB hero SVG loads on initial viewport — SHOULD-FIX

`artworks.ts:49` hero `Mindless-Mirth-final.svg`, rendered first/top-left (`hero` = `md:col-span-2 md:row-span-2`, `BentoTile`/`SPAN`). `ArtImage.tsx:33` sets `loading="lazy"` and `sizes="…400px"`, but **`next/image` does not optimize SVGs** (they pass through unoptimized), and being above the fold it loads right away. 37MB for a single decorative tile is a blocker-adjacent perf problem. Recommend exporting a rasterized/optimized derivative (PNG/WebP at display resolution) for the grid and only linking the SVG if needed in detail.

### PERF-4 — getBoundingClientRect on every pointermove — acceptable

`useMagneticTilt.ts:50-56`. `getBoundingClientRect` runs per `pointermove`, but: it is gated to `pointerType === "mouse"` and `enabled` (fine pointer, no reduced-motion) (`51`, `30`), it writes to framer `useMotionValue`s (which update outside React render), and it only runs while hovering a single tile. A single `getBoundingClientRect` per move is a forced reflow but on one element during active hover this is the standard tilt implementation and is acceptable — matches the animation spec's claim. No layout thrash across many elements. No change needed; one optional micro-opt is caching the rect on `pointerenter`, but it would break if the page scrolls during hover.

---

## 3. Responsive / Bento layout

Grid: `auto-rows-[260px] grid-cols-1 [grid-auto-flow:dense] md:grid-cols-3` (`page.tsx:112`). Spans (`BentoTile.tsx:10-15`): hero `2x2`, wide `2x1` (col-span-2), tall `1x2` (row-span-2), sm `1x1`.

### RESP-1 — Dense flow likely leaves a hole on "All" — NICE-TO-HAVE

Tile order (All, 13 items): Mindless Mirth(hero 2x2), EOP(wide 2x1), Watercolor(sm), Posing(tall 1x2), A Bike(sm), NTL(wide 2x1), ATM(sm), Eat Drink(sm), Red Hook(sm), Binnoy(sm), SB(sm), Jason(sm), Construction(sm).

Reasoning on a 3-col grid with `dense`:

- Rows 1-2, cols 1-2: hero. Col 3 rows 1-2 = 2 free cells.
- EOP is `wide` (2 wide) — cannot fit the single col-3 column, so dense back-fills col 3 with the next fitting 1-wide items: Watercolor(sm) at (r1,c3), then Posing is `tall` (needs 2 rows) fits (r2-r3,c3)? r2c3 is free, r3 starts fresh — Posing can take c3 r2 and r3.
- EOP(wide) then lands at row 3 cols 1-2. A Bike(sm) — dense will try to fill any earlier gap; with hero+col3 filled there's no 1x1 hole left in rows 1-2, so layout stays mostly tight at the top.
- The realistic gap risk is at the **bottom / on the wide+tall interplay**: `[grid-auto-flow:dense]` keeps backfilling, but a trailing `wide` (NTL, 2-wide) appearing when only 1 column remains in a row forces it to the next row, leaving a 1-cell hole that no later item is narrow-enough-and-ordered to fill (all remaining are sm and dense WILL backfill them — so dense actually mitigates this for sm). Net: with this many `sm` tiles, dense fill is effective and large holes are unlikely on "All". Minor single-cell gaps possible around the NTL wide tile mid-grid. Low severity.

### RESP-2 — Filtered "Photography" view — NICE-TO-HAVE

Photography = Posing(tall), NTL(wide), Red Hook(sm), Binnoy(sm), Jason(sm), Construction(sm) = 6 tiles. Order: Posing(tall 1x2) at c1 r1-2; NTL(wide 2x1) needs 2 cols → c2-c3 r1; then Red Hook/Binnoy fill c2,c3 r2; Jason c1 r3 (after tall ends)… With `dense`, the tall + wide combo can leave a **1-cell hole** (e.g. c2 or c3 in the row where the wide pushed down, or a trailing single empty cell on the last row given 6 tiles of mixed spans summing to 8 cell-units across a 3-wide grid → 8 is not a multiple of 3, so the final row will have an empty cell). Expect one visible gap on this filter. Simplest mitigation: drop `tall`/`wide` spans on filtered category views (or only honor spans on "All"), or add a small set of `md:` span overrides. Low severity / cosmetic.

### RESP-3 — Mobile 1-col collapse — OK

`grid-cols-1` with no `md:` spans active (spans are all `md:`), so hero/tall/wide all become single 260px-tall cells on mobile. Hero/tall art at 260px on a full-width column may crop heavily (`objectFit: cover`), but no layout breakage. The hero `imageClassName: "scale-[1.03] origin-top"` (`artworks.ts:54`) will crop slightly more. Acceptable; flag only that hero/tall lose their visual emphasis on mobile.

---

## 4. Correctness vs. brief

### CORRECT-1 — Exactly 3 pieces removed — PASS

`artworks.ts` ids present: 1,2,3,4,5,6,7,8,9,10,11,13,15 (13 items). ids **12 (Employee Blog), 14 (LinkedIn Cover), 16 (Employee Blog 2) are absent**. Matches the brief exactly. (Note: `LinkedIn`, `Employee` files still sit in `public/gallery/` as orphaned assets — harmless, not referenced.)

### CORRECT-2 — "Photography" tab present — PASS

`artworks.ts:32-39` `categories` includes `"Photography"` (and the `ArtCategory` union `1-6` includes it). Rendered in the tablist `page.tsx:66`.

### CORRECT-3 — No duplicate/copy-paste captions — PASS (with caveat)

Every `description` is distinct and bespoke per piece (each is a unique `[PLACEHOLDER]` scaffold). No two captions are identical. **Caveat:** see CORRECT-4 — they are placeholders, not final copy.

### CORRECT-4 — Live PLACEHOLDER copy — NICE-TO-HAVE (content blocker for launch)

23 `[PLACEHOLDER: …]` strings remain in `artworks.ts` (all descriptions + both hero `process` blocks), plus the gallery intro paragraph `page.tsx:51-52`. These render verbatim to users. Not a code defect, but a launch blocker for content. Flagging since the brief asked about caption correctness.

### CORRECT-5 — Both heroes have process + hero sizing/flag — PASS

- Mindless Mirth (`artworks.ts:42-76`): `size:"hero"`, `hero:true`, `process` with intro + 4 steps. ✓
- EOP Explainer (`artworks.ts:77-109`): `size:"wide"`, `hero:true`, `process` with intro + 4 steps. ✓
- `lib/motion.ts:6` `HERO_IDS = [1,5]` matches both. ✓
- Lightbox renders the process block only when `artwork.hero && artwork.process` (`Lightbox.tsx:175`). ✓
- Note: EOP is `hero:true` but `size:"wide"` (2x1) not `hero` (2x2). This is intentional per the tile list in the brief (EOP=wide), and `hero` flag drives process content + tilt strength + lightbox `max-w-7xl`, independent of grid span. Consistent, not a bug.

---

## Summary of findings by severity

| ID              | Severity   | Area        | One-liner                                                                         |
| --------------- | ---------- | ----------- | --------------------------------------------------------------------------------- |
| PERF-1          | blocker    | perf        | 84MB ATM video autoplays in grid, ungated; needs poster + intersection-gated play |
| PERF-2          | blocker    | perf        | ATM + EOP both autoplay in "All" viewport (~110MB video concurrent)               |
| A11Y-1          | blocker    | a11y        | Focus never moved into Lightbox on open (close button not focused)                |
| PERF-3          | should-fix | perf        | 37MB hero SVG loads above the fold; next/image won't optimize SVG                 |
| A11Y-2          | should-fix | a11y        | Focus restore drops to body if trigger unmounts (filter change)                   |
| A11Y-3          | should-fix | a11y        | Tabs missing aria-controls/tabpanel/roving-tabindex/arrow keys                    |
| A11Y-4          | should-fix | a11y        | Tile entrance/exit/layout springs not reduced-motion gated                        |
| A11Y-5          | should-fix | a11y        | secondary/60 process body text below comfortable AA on navy                       |
| A11Y-6          | nice       | a11y        | Videos have aria-label but no captions track and no controls in lightbox          |
| RESP-1          | nice       | layout      | Minor single-cell gap possible around NTL wide tile on "All"                      |
| RESP-2          | nice       | layout      | Photography filter (6 mixed-span tiles) leaves a trailing/inner gap               |
| RESP-3          | nice       | layout      | Hero/tall lose emphasis at 260px on mobile (no breakage)                          |
| CORRECT-4       | nice       | content     | 23 live [PLACEHOLDER] strings + intro; launch content blocker                     |
| PERF-4          | none       | perf        | getBoundingClientRect per pointermove is acceptable as implemented                |
| CORRECT-1/2/3/5 | pass       | correctness | Removals, Photography tab, unique captions, hero+process all verified             |
