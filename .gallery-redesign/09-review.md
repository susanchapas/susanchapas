# Gallery Redesign — Code Review (09)

Scope: page.tsx, BentoTile.tsx, useMagneticTilt.ts, artworks.ts, ArtMedia.tsx
Status: `npm run lint` 0 errors (1 unrelated warning in Hero.tsx), `npx tsc --noEmit` green.

## P1 — Should fix

- **Dead exports in `src/lib/motion.ts` (out of review scope, flagging).**
  `HERO_IDS` (line 6) and `isHeroId` (line 8) have zero external references — grep finds them only in motion.ts itself, where `isHeroId` is the sole consumer of `HERO_IDS`. The refactor switched to the per-artwork `hero` boolean (`artwork.hero` in BentoTile, `artwork.id === 5` for the feature flag in page.tsx), so both are now dead. Remove both lines. Left untouched because the file was outside the read/edit allowlist.

## P2 — Verified correct (no action)

- **EOP feature tile aspect ratio.** `aspectRatio: "16 / 7"` + `max-h-[62vh]` is sane. The video is 3840x2160 (16:9) shown `object-cover`, so 16:7 letterbox-crops the top/bottom — intentional for a wide hero band. `max-h-[62vh]` caps height on tall/narrow viewports where the column-spanning tile would otherwise dominate. No overflow concern (`overflow-hidden` on the article).
- **Named-group wiring is consistent end to end.**
  - `group/grid` on the grid container — page.tsx:100.
  - `group/tile` on each tile — BentoTile.tsx:75.
  - Sibling-dim overlay uses `group-hover/grid:opacity-55 group-hover/tile:!opacity-0` — BentoTile.tsx:116. Correct: any tile hover dims the grid; the hovered tile self-cancels via `!opacity-0`.
  - Glare `group-hover/tile:opacity-100` (122) and image scale `group-hover/tile:scale-[1.04]` (104) both use `group/tile`. Consistent.
    No mismatch found; the effect is wired correctly.
- **Magnetic tilt — no conditional-hook violation.** All hooks (`useMotionValue`, `useSpring`, `useTransform`, `useMotionTemplate`) are called unconditionally at the top of `useMagneticTilt`; `enabled` only gates the returned style/handler objects, not the hook calls. `useMotionTemplate` (line 58) is used correctly as a tagged template interpolating motion values into a `boxShadow` string. The `set-state-in-effect` in `useFinePointer` is the legitimate post-hydration capability check and is already explicitly suppressed with a justified comment.
- **React Compiler compliance.** No manual `useMemo` / `useCallback` / `React.memo` in any reviewed file. Compliant.
- **No `any` casts.** The only cast is `ref as React.Ref<HTMLElement>` (BentoTile.tsx:65), a legitimate variance bridge between the hook's `RefObject<HTMLElement>` and motion.article's ref type — not `any`.
- **Keys.** List keys present and stable: `key={category}` (page), `key={artwork.id}` (page), `key={i}` for process steps (BentoTile:189). The process-step index key is acceptable (static, never reordered).
- **No exhaustive-deps issues.** ArtVideo effect deps `[autoPlay]` are correct (only `autoPlay` is referenced from props/scope inside).

## P3 — Minor / optional

- **Comment hygiene.** Only one comment exists across the five files (the eslint-disable justification in useMagneticTilt.ts:23), which is warranted. No noisy/redundant comments. Clean.
- **`useFinePointer` SSR default** is `false`, so tilt is off on first paint and enables post-hydration — correct, avoids hydration mismatch. Noted, no change.

## Fixes applied this pass

None. All in-scope files passed; the only actionable item (dead `HERO_IDS`/`isHeroId`) lives in `src/lib/motion.ts`, outside the edit allowlist, so it is reported rather than removed.
