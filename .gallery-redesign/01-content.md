# Gallery Redesign — Content Manager Deliverable

Audience: MFA admissions reviewers. Core fix: captions currently describe the _file_, not the _thinking_. Every caption below is rewritten in a **concept → process/medium → outcome** structure. Where real intent, process, or recognition is needed, I use `[PLACEHOLDER: ...]` rather than fabricate. Drop your specifics in and the captions are committee-ready.

---

## 1. Photography Tab Fix + Final Category/Tab List

**The bug:** The filter array is `["All", "Painting", "Illustration", "Design", "Motion"]`. There is no "Photography" tab, yet Photography is the single largest category. After the planned removals, 6 photography pieces remain — all of them are **unreachable** by any filter except "All." A reviewer clicking through categories would never see the bulk of the photographic work.

**The fix:** Add `"Photography"` to the tab list so every category is reachable. No code logic change is needed — `filteredArtworks` already filters by `art.category`, so the category simply needs to appear in the tab array.

**Final tab list (page.tsx line 175):**

```ts
const categories = ["All", "Painting", "Illustration", "Design", "Motion", "Photography"];
```

**Final category inventory (14 pieces):**

| Category     | Count | Pieces                                                                        |
| ------------ | ----- | ----------------------------------------------------------------------------- |
| Painting     | 2     | Mindless Mirth (HERO), Watercolor study                                       |
| Motion       | 2     | ATM Home Screen, EOP Explainer (HERO)                                         |
| Illustration | 2     | A Bike for Every Rider, Eat, Drink & Be Merry                                 |
| Design       | 1     | SB Bike Shop Info Sheet                                                       |
| Photography  | 6     | The NTL, Red Hook Launch, Binnoy, Construction Site, Jason, Posing at Gallery |

**Removed (3):** id 12 Employee Blog, id 16 Employee Blog 2, id 14 LinkedIn Cover. After removal the "Design" category drops to a single piece (SB Bike Shop Info Sheet) — flag for the layout/curation agent: a one-item filter tab is allowed but feels thin; consider whether the Info Sheet reads as "Design" or could be re-tagged, or whether a future piece fills it out.

---

## 2. All 14 Pieces — Rewritten

Ordering preserved by id. Titles improved only where the original was generic/file-named.

### id 1 — Mindless Mirth _(HERO)_

- **Category:** Painting **Year:** 2022
- **Title:** keep — "Mindless Mirth" is strong and evocative.
- **Description:**
  > [PLACEHOLDER: the feeling or impulse you were chasing — e.g. capturing joy before the mind edits it]. An abstract painting built in [PLACEHOLDER: medium — acrylic / mixed media / digital], working [PLACEHOLDER: process — intuitively without preliminary sketches / in layered passes]. [PLACEHOLDER: outcome — what it taught you, or the recognition it received].
- **CREDIBILITY FLAG:** The original caption called this "Award-winning." A vague award claim _hurts_ credibility with a committee. Either substantiate it or drop it. Replace with: `[PLACEHOLDER: which award, awarded by whom, what year]`. If there is no specific, named award, remove the claim entirely — an unverified "award-winning" reads worse than no claim at all.

### id 2 — ATM Home Screen

- **Category:** Motion **Year:** 2023
- **Title:** keep, or sharpen to "ATM Home Screen — Interface Motion Study" if you want the medium legible at a glance.
- **Description:**
  > [PLACEHOLDER: the interaction problem — e.g. how do you make a transactional screen feel reassuring, not cold?]. A motion study for an ATM home screen, animated in [PLACEHOLDER: tool — After Effects / Figma / etc.], using [PLACEHOLDER: process — easing and timing choices to guide the eye through the transaction flow]. [PLACEHOLDER: outcome — what the motion revealed, or how it changed your sense of UI timing].

### id 3 — A Bike for Every Rider

- **Category:** Illustration **Year:** 2023
- **Title:** keep — clear thesis baked into the title.
- **Description:**
  > [PLACEHOLDER: the idea behind inclusive cycling — who you wanted to see represented and why]. An illustration built in [PLACEHOLDER: medium — vector / digital], where [PLACEHOLDER: process — composition / character / color choices that carry the "every rider" idea]. [PLACEHOLDER: outcome — where it was used or what reaction it got].

### id 4 — Eat, Drink, & Be Merry

- **Category:** Illustration **Year:** 2023
- **Title:** keep.
- **Description:**
  > [PLACEHOLDER: the occasion or mood you were illustrating and the feeling you wanted to evoke]. A festive illustration made in [PLACEHOLDER: medium], drawing on [PLACEHOLDER: process — type/illustration integration, palette, hand-lettering decisions]. [PLACEHOLDER: outcome — context it was created for / response].

### id 5 — EOP Explainer _(HERO)_

- **Category:** Motion **Year:** 2023
- **Title:** spell out the acronym for an outside committee: "EOP Explainer" → keep title but ensure caption decodes EOP. Suggested: keep as title, define inline.
- **Description:**
  > [PLACEHOLDER: define EOP and the communication problem — what did this program need people to understand?]. An animated explainer built in [PLACEHOLDER: tool], pairing [PLACEHOLDER: process — script, storyboard, visual metaphor choices] to make the idea land in under [PLACEHOLDER: runtime]. [PLACEHOLDER: outcome — audience, reach, or what you learned about explaining complex ideas visually].

### id 6 — SB Bike Shop Info Sheet

- **Category:** Design **Year:** 2023
- **Title:** spell out "SB" (Santa Barbara?) for clarity: "[PLACEHOLDER: full shop name] Info Sheet."
- **Description:**
  > [PLACEHOLDER: the information problem — what did customers need to grasp quickly?]. An information-design piece built in [PLACEHOLDER: tool — InDesign / Illustrator], using [PLACEHOLDER: process — hierarchy, grid, and iconography decisions to make dense info scannable]. [PLACEHOLDER: outcome — was it printed / used in-store / client response].

### id 7 — The NTL

- **Category:** Photography **Year:** 2023
- **Title:** decode the acronym — "The NTL" is opaque. Suggested: "The NTL — [PLACEHOLDER: what NTL is]."
- **Description:**
  > [PLACEHOLDER: what you saw / wanted to capture in this moment]. A photograph shot [PLACEHOLDER: context — on location, available light, etc.], composed for [PLACEHOLDER: process — framing, timing, or the relationship you were after]. [PLACEHOLDER: outcome — where it ran or what it documents].

### id 8 — Watercolor Painting → retitle

- **Category:** Painting **Year:** 2023
- **Title:** "Watercolor Painting" is a file label, not a title. Rename to `[PLACEHOLDER: an actual title for the piece]` — even a one-word evocative title beats describing the medium.
- **Description:**
  > [PLACEHOLDER: the subject or feeling you painted toward]. A watercolor study exploring [PLACEHOLDER: process — wet-on-wet / layering / how you handled the medium's unpredictability]. [PLACEHOLDER: outcome — what the medium let you do that others couldn't, or what you learned].

### id 9 — Red Hook Launch

- **Category:** Photography **Year:** 2024
- **Title:** keep — specific and grounded.
- **Description:**
  > [PLACEHOLDER: what the launch was and the moment you were there to capture]. Event photography shot [PLACEHOLDER: process — how you anticipated key moments / handled the lighting and crowd]. [PLACEHOLDER: outcome — how the images were used / what they conveyed about the event].

### id 10 — Binnoy Feature

- **Category:** Photography **Year:** 2023
- **Title:** keep, or "Binnoy — Portrait Feature" to signal it is a portrait.
- **Description:**
  > [PLACEHOLDER: who Binnoy is and what you wanted the portrait to say about them]. A feature portrait shot [PLACEHOLDER: process — direction, light, rapport-building], framed to [PLACEHOLDER: intent]. [PLACEHOLDER: outcome — where it was published / the response].
- **NOTE:** Original caption "Feature photography." was identical to Jason's (id 13) — a copy-paste. Now differentiated.

### id 11 — Construction Site

- **Category:** Photography **Year:** 2023
- **Title:** keep, or sharpen to convey intent: "Construction Site — [PLACEHOLDER: angle, e.g. labor, structure, progress]."
- **Description:**
  > [PLACEHOLDER: what drew you to document this site — structure, labor, scale, change over time?]. Documentary photography shot [PLACEHOLDER: process — vantage point, light, sequencing], looking for [PLACEHOLDER: the visual idea]. [PLACEHOLDER: outcome — what the series documents or where it lives].

### id 13 — Jason Feature

- **Category:** Photography **Year:** 2023
- **Title:** keep, or "Jason — Portrait Feature."
- **Description:**
  > [PLACEHOLDER: who Jason is and the story the portrait tells]. A feature portrait made [PLACEHOLDER: process — setting, light, and the moment you were waiting for], directed toward [PLACEHOLDER: intent]. [PLACEHOLDER: outcome — publication / reception].
- **NOTE:** Shared the identical "Feature photography." caption with Binnoy. Now differentiated.

### id 15 — Posing at Gallery

- **Category:** Photography **Year:** 2023
- **Title:** "Posing at Gallery" reads slightly awkward. Suggested: "At the Gallery" or `[PLACEHOLDER: subject + gallery name]`.
- **Description:**
  > [PLACEHOLDER: the scene and what you wanted to capture about the gallery moment]. Event photography shot [PLACEHOLDER: process — candid vs. directed, how you read the room], composed for [PLACEHOLDER: intent]. [PLACEHOLDER: outcome — context / how it was used].

---

## 3. Hero Pieces — Extended Process Blurbs (Lightbox)

For the two HERO pieces, add a multi-beat "process" section in the lightbox showing iteration and reasoning — exactly what a committee wants to see. Each beat is one short sentence.

### EOP Explainer — process scaffold

1. **Brief / problem:** [PLACEHOLDER: what EOP needed the audience to understand, and the constraint you started with].
2. **Exploration:** [PLACEHOLDER: the visual metaphors or directions you sketched first — and which you rejected and why].
3. **Iteration:** [PLACEHOLDER: a specific change between drafts — pacing, a scene that wasn't reading, a script edit].
4. **Resolution:** [PLACEHOLDER: the decision that made it click, and what you'd do differently next time].

### Mindless Mirth — process scaffold

1. **Starting point:** [PLACEHOLDER: the impulse or constraint you began with — e.g. painting without a plan].
2. **Process:** [PLACEHOLDER: how the layers / marks built up; what you were responding to as you worked].
3. **A failed/abandoned direction:** [PLACEHOLDER: a passage you painted over or a choice that didn't work, and why].
4. **Why it's finished:** [PLACEHOLDER: how you knew to stop, and what the piece ended up being about].

> Implementation note for the build agent: the lightbox currently renders only `selectedArtwork.description` (page.tsx line 360-362). To show these, add an optional `process?: string[]` field to the hero artworks and render it as a list below the description, conditionally.

---

## 4. Hero-Section Intro Copy + SEO Metadata

**Current page hero (page.tsx lines 199-226):** eyebrow "Creative Work", headline "Art & Motion", body about expressing creativity through "various visual mediums." This undersells the work in two ways: (1) "Art & Motion" omits Photography entirely, which is the largest category; (2) "personal art projects" frames the work as a hobby, which is the wrong register for an admissions committee.

**Suggested eyebrow:** keep "Creative Work" (fine) or "Selected Work."

**Suggested headline:** broaden beyond "Art & Motion" so it covers painting, photography, illustration, design, and motion. Options:

- "Art, Motion & Image" (keeps the gradient-on-second-line structure)
- "Image &<br/>Idea"

**Suggested body copy:**

> A selection of work across painting, illustration, motion, design, and photography. [PLACEHOLDER: one sentence on the through-line — the question or sensibility that connects these mediums for you]. Each piece is a place where I worked something out, not just made something pretty.

(The last line is optional but signals to a committee that you treat the work as inquiry. Adjust to your voice.)

**SEO metadata (layout.tsx)** — current `description` already lists "illustrations, motion graphics, photography, and visual design," which is accurate and good. The phrase "intersection of humanity and technology" appears in both the meta description and OG. Minor tightening only:

- `description`: fine as-is. Optionally add "painting" to the medium list for completeness (currently omits it).
- Suggested: `"Explore Susan Chapas's creative work — painting, illustration, motion graphics, photography, and visual design. Visual art at the intersection of humanity and technology."`
- OG title/description: fine. No change required.

---

## 5. Duplicate / Copy-Paste Captions Eliminated

The original array showed clear copy-paste caption reuse — exactly the pattern the reviewer flagged:

- **"Feature photography."** — used verbatim on both **Binnoy (id 10)** and **Jason (id 13)**. Two different people, identical caption. Now each has a distinct concept→process→outcome scaffold.
- **"Blog feature photography."** — used verbatim on **Employee Blog (id 12)** and **Employee Blog 2 (id 16)**. Both pieces are removed, so this is resolved by deletion.
- Nearly every remaining caption was a single fragment naming the file/medium ("Watercolor artwork.", "Site documentation.", "Festive illustration design.", "Photography feature."). None described intent, process, or outcome. All 14 are now rewritten to the required structure.

**Net:** zero duplicate captions remain; every caption now has a slot for genuine thinking rather than a file label.
