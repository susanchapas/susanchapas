# Project Intake Template

> **What this is:** a drop-in questionnaire for any repo. Copy this file into a repo's root,
> then tell your AI: _"Read `proj-template.md` and fill it out for this repo. Follow the rules
> in Part A."_ The filled-out result gives you everything you need to add the project to
> susanchapas.com — the card, the case-study page, the metadata, and the asset list — without
> going back to dig through the code a second time.

**Repo:** `<!-- owner/repo -->`
**Filled out by:** `<!-- AI / human -->`
**Date filled:** `<!-- YYYY-MM-DD -->`
**Last verified against commit:** `<!-- short SHA -->`

---

## Part A — Instructions for the AI filling this out

Read this section before answering anything.

### Ground rules

1. **Never invent.** If the repo doesn't say it, write `UNKNOWN — ask Susan` and move on.
   A blank is more useful than a plausible guess I have to fact-check later.
2. **Cite where you found it.** Every answer gets a source in the `Source:` line —
   a file path, a file path + line, a commit SHA, a PR number, or an issue number.
   Format: `src/lib/auth.ts:42`, `commit a1b2c3d`, `PR #17`, `README.md § Setup`.
3. **Mark your confidence** on any answer that required inference:
   `[HIGH]` stated outright in the repo · `[MED]` inferred from strong evidence
   (e.g. dependency list, config file) · `[LOW]` a guess from weak signals — treat as a question.
4. **Distinguish shipped from planned.** If something exists only in a TODO, a stubbed
   function, a commented-out block, or an open issue, label it `PLANNED`, not built.
5. **Quote sparingly, don't paraphrase away specifics.** Numbers, dates, names, and metrics
   should be copied exactly. Prose can be summarized.
6. **Don't puff.** No "revolutionary," "cutting-edge," "seamless." Plain description.
   The case study earns interest from specifics, not adjectives.
7. **Flag anything sensitive** you come across — API keys, `.env` contents, client names under
   NDA, private emails, internal URLs. List them in § 14 and do **not** copy the values here.
8. **If the repo is empty, a fork, or abandoned,** say so in § 1 and stop after § 3 —
   don't fill 15 sections of `UNKNOWN`.

### Where to look, in order

| Priority | Source | What it gives you |
| --- | --- | --- |
| 1 | `README.md`, `docs/`, `CONTRIBUTING.md` | Purpose, setup, stated goals |
| 2 | `package.json` / `requirements.txt` / `Gemfile` / `go.mod` / `pyproject.toml` | Stack, scripts, versions |
| 3 | Source tree structure (`src/`, `app/`, `lib/`) | Architecture, features, routes |
| 4 | `git log --oneline`, first + last commit dates | Timeline, cadence, who worked on it |
| 5 | Merged PRs and closed issues | Decisions, tradeoffs, problems solved |
| 6 | Open issues, `TODO`/`FIXME` comments | Known limitations, what's next |
| 7 | Tests (`__tests__/`, `*.test.*`, `*.spec.*`) | What's actually guaranteed to work |
| 8 | CI config (`.github/workflows/`), `vercel.json`, `netlify.toml`, `Dockerfile` | Deploy target, quality gates |
| 9 | `public/`, `assets/`, `screenshots/`, `.gallery-*/` | Existing imagery |
| 10 | `LICENSE`, `CHANGELOG.md`, release tags | Licensing, version history, milestones |

### How to answer

- Prose answers: **2–4 sentences max** unless the question says otherwise.
- Lists: bullets, most important first, cap at the number the question specifies.
- If a question genuinely doesn't apply to this repo (e.g. "user research" on a CLI tool),
  write `N/A — <one-line reason>` rather than deleting the question.

---

## Part B — The questionnaire

### § 1 · Identity & one-liner

| # | Question | Answer |
| --- | --- | --- |
| 1.1 | **Project name** as it should appear publicly (not the repo slug) | |
| 1.2 | **Repo slug** (`owner/repo`) | |
| 1.3 | **One-liner** — what it is, in one sentence, no jargon. A stranger should get it. | |
| 1.4 | **Card description** — 2 sentences, ~30–45 words, for the projects grid | |
| 1.5 | **Subtitle** — the longer framing line for the case-study hero (~15–25 words) | |
| 1.6 | **Category** — pick: UX Case Study / Product Design / Web Build / Brand & Marketing / Experiment / Tool | |
| 1.7 | **Status** — Shipped / Live / In progress / Paused / Archived / Concept | |
| 1.8 | **Is this portfolio-worthy?** Yes / No / Maybe — plus one line of reasoning | |

`Source:`
`Confidence:`

---

### § 2 · The problem

| # | Question | Answer |
| --- | --- | --- |
| 2.1 | **What problem does this solve?** State the problem, not the solution. | |
| 2.2 | **Who has this problem?** Be specific — "architecture students mid-critique," not "users." | |
| 2.3 | **How was it being solved before?** The status quo this replaces or improves. | |
| 2.4 | **Why did it need solving?** What breaks, costs time, or gets lost without it. | |
| 2.5 | **Whose idea was it?** Self-initiated / client brief / coursework / hackathon / contract | |
| 2.6 | **Constraints going in** — budget, timeline, tech, accessibility, client mandate, platform | |

`Source:`
`Confidence:`

---

### § 3 · Role, team & timeline

| # | Question | Answer |
| --- | --- | --- |
| 3.1 | **My role** — the title that goes in "At a glance" (e.g. "UX Researcher & Product Designer") | |
| 3.2 | **What I personally did** — 3–5 bullets, concrete verbs. This is the part recruiters read. | |
| 3.3 | **What I did *not* do** — so the case study doesn't overclaim | |
| 3.4 | **Team size & composition** — roles, not names, unless names are already public | |
| 3.5 | **Stakeholder / client** — who it was for. Flag if under NDA or should be anonymized. | |
| 3.6 | **Start date** — from first commit or README | |
| 3.7 | **End / last-active date** — from last commit | |
| 3.8 | **Duration** — human-readable ("6 weeks", "ongoing since 2024") | |
| 3.9 | **Year** — the single year to display on the card | |
| 3.10 | **Commit count & contributor count** | |
| 3.11 | **Was this for a class, program, or credential?** (NJIT HCI, MIT xPRO, etc.) | |

`Source:`
`Confidence:`

---

### § 4 · Research & discovery
_Skip with `N/A` if this was a pure build with no research phase._

| # | Question | Answer |
| --- | --- | --- |
| 4.1 | **What research was done?** Interviews, surveys, heuristic eval, competitive analysis, usability testing, analytics review, field study | |
| 4.2 | **How many participants / sessions / artifacts?** Exact numbers. | |
| 4.3 | **Method details** — how participants were recruited, what was asked, how long | |
| 4.4 | **Top 3 findings** — what you learned that you didn't already believe | |
| 4.5 | **The surprising one** — the finding that changed direction | |
| 4.6 | **Competitors / prior art benchmarked** — name, what they do well, where they fail | |
| 4.7 | **Research artifacts that exist** — affinity map, personas, journey map, matrix, survey charts. Give file paths if in-repo. | |
| 4.8 | **3 stat-tile numbers** for the case study (format: big number + one-line label) | |

`Source:`
`Confidence:`

---

### § 5 · Design & decisions
_Skip with `N/A` for non-design repos._

| # | Question | Answer |
| --- | --- | --- |
| 5.1 | **The core design idea** — the organizing principle in one sentence | |
| 5.2 | **Key decisions** — 3–5, each as: *decision → why → what it traded off* | |
| 5.3 | **What got cut, and why** | |
| 5.4 | **Concepts explored before landing here** — how many, what they were | |
| 5.5 | **Iterations** — what changed between v1 and final, and what triggered each change | |
| 5.6 | **Design system / visual language** — colors (hex), type, spacing, component library | |
| 5.7 | **Accessibility work** — WCAG level targeted, contrast, keyboard nav, screen readers, `prefers-reduced-motion`, alt text. Cite the code that proves it. | |
| 5.8 | **Responsive / platform behavior** — breakpoints, mobile-first?, native vs. web | |
| 5.9 | **Prototype link** — Figma URL, deployed preview, or video walkthrough | |

`Source:`
`Confidence:`

---

### § 6 · Build & technical

| # | Question | Answer |
| --- | --- | --- |
| 6.1 | **Language(s)** + version | |
| 6.2 | **Framework(s)** + version (e.g. Next.js 16, App Router) | |
| 6.3 | **Styling approach** | |
| 6.4 | **Key libraries** — top 5–8 that shaped the build, with what each does here | |
| 6.5 | **Data layer** — DB, API, CMS, static files, none | |
| 6.6 | **Auth / permissions**, if any | |
| 6.7 | **Third-party services** — analytics, email, payments, AI APIs, maps | |
| 6.8 | **Architecture in 3 sentences** — how the pieces fit together | |
| 6.9 | **The hardest technical problem** and how it was solved | |
| 6.10 | **Something clever in here** — the bit worth pointing at. File path. | |
| 6.11 | **Performance work** — lazy loading, image optimization, bundle size, caching, Lighthouse scores if recorded | |
| 6.12 | **Testing** — framework, what's covered, coverage % if reported | |
| 6.13 | **CI/CD** — what runs on push, what gates a merge | |
| 6.14 | **Hosting / deploy target** | |
| 6.15 | **Live URL** — and is it currently up? | |
| 6.16 | **Repo visibility** — public / private. Can it be linked from the portfolio? | |
| 6.17 | **License** | |

`Source:`
`Confidence:`

---

### § 7 · Outcome & impact

| # | Question | Answer |
| --- | --- | --- |
| 7.1 | **What shipped** — the concrete deliverable | |
| 7.2 | **Measurable results** — metrics, %, counts, time saved, revenue, users. Exact numbers with the date measured. If none exist, say `no metrics captured`. | |
| 7.3 | **Qualitative results** — feedback, quotes, adoption, a client reaction | |
| 7.4 | **Who uses it now**, if anyone | |
| 7.5 | **Recognition** — grade, award, feature, press, launch post | |
| 7.6 | **What I'd do differently** — one honest paragraph. This is the section people believe. | |
| 7.7 | **What's next** — from open issues and the roadmap. Label clearly as not-yet-built. | |
| 7.8 | **Transferable takeaway** — the thing this taught you that applies elsewhere | |

`Source:`
`Confidence:`

---

### § 8 · Story & narrative hooks

| # | Question | Answer |
| --- | --- | --- |
| 8.1 | **The hook** — the first line of the case study. A tension, not a summary. | |
| 8.2 | **The turning point** — the moment the project changed direction | |
| 8.3 | **The tension** — what was genuinely hard or uncertain | |
| 8.4 | **Best pull-quote** — from a user, stakeholder, commit message, or your own notes | |
| 8.5 | **Origin story** — where this came from, in 2 sentences | |

`Source:`
`Confidence:`

---

### § 9 · Assets

| # | Question | Answer |
| --- | --- | --- |
| 9.1 | **Hero image** — path or `NEEDED`. Wants ≥ 2000px wide, landscape, works under a blue overlay with text over the bottom third. | |
| 9.2 | **Card image** — path or `NEEDED`. Landscape, readable as a thumbnail. | |
| 9.3 | **Existing images in repo** — full list of paths with a one-line description each | |
| 9.4 | **Screens / UI shots needed** — which flows to capture | |
| 9.5 | **Process shots** — sketches, whiteboards, working sessions, design wall | |
| 9.6 | **Diagrams needed** — flow map, architecture, sitemap, journey | |
| 9.7 | **Video / motion** — demo walkthrough, animation, prototype recording | |
| 9.8 | **Alt text** for every image listed above — written out, not "TODO" | |
| 9.9 | **Rights & permissions** — can these be shown publicly? Client logos, faces, real data? | |
| 9.10 | **Redaction needed** — any screenshot showing real names, emails, or data | |

`Source:`
`Confidence:`

---

### § 10 · Tags & cross-links

| # | Question | Answer |
| --- | --- | --- |
| 10.1 | **3 card tags** — pick from the existing vocabulary so the grid stays consistent: `UX Research`, `UX Design`, `Product Design`, `Heuristic Evaluation`, `Prototyping`, `Mobile Design`, `Brand Strategy`, `Marketing Strategy`, `Accessibility`, `Entrepreneurship`, `Interior Design`, `Motion Graphics`, `Web Development`, `Data Viz`, `Automation`. Propose a new tag only if none fit — and say so. | |
| 10.2 | **Skills demonstrated** — for the skills ticker / about page | |
| 10.3 | **Tools used** — Figma, Illustrator, VS Code, Notion, etc. | |
| 10.4 | **Related projects** — other repos or case studies this connects to | |
| 10.5 | **Suggested URL slug** — lowercase, hyphenated | |
| 10.6 | **Featured?** — should this show on the homepage's Selected Work? Yes/No + why | |
| 10.7 | **Sort priority** — where in the grid (1 = first) | |

`Source:`
`Confidence:`

---

### § 11 · SEO & metadata

| # | Question | Answer |
| --- | --- | --- |
| 11.1 | **Page title** — ≤ 60 chars, format: `<Project> — Susan Chapas` | |
| 11.2 | **Meta description** — 150–160 chars | |
| 11.3 | **OG image** — path or `NEEDED` (1200×630) | |
| 11.4 | **Keywords** — 5–8 terms someone would actually search | |

`Source:`
`Confidence:`

---

### § 12 · Ready-to-paste output

Fill this in from the answers above. This is what actually gets copied into the site.

**Card entry** — for `src/lib/projects.ts`:

```ts
{
  title: "",
  description: "",
  href: "/projects/",
  image: "",
  tags: ["", "", ""],
  // badge: "",
},
```

**Case-study header data** — for `src/app/projects/<slug>/page.tsx`:

```ts
const projectData = {
  title: "",
  subtitle: "",
  description: "",
  heroImage: "",
  tags: ["", "", ""],
  year: "",
  role: "",
  team: "",
  platform: "",
};

const atAGlance = [
  { label: "My role", value: "" },
  { label: "Team", value: "" },
  { label: "Stakeholder", value: "" },
  { label: "Platform", value: "" },
];

const researchStats = [
  { value: "", label: "" },
  { value: "", label: "" },
  { value: "", label: "" },
];
```

**Section outline** — the case-study page in order, with a one-line summary of each:

| Section | Heading | Content summary | Assets |
| --- | --- | --- | --- |
| Hero | | | |
| Overview + At a glance | | | |
| The problem | | | |
| Research | | | |
| Competitive analysis | | | |
| Key decisions | | | |
| The design / the build | | | |
| Prototype / demo | | | |
| Outcome | | | |
| What I'd do differently | | | |
| Process snapshot | | | |

---

### § 13 · Gaps — questions only Susan can answer

List every `UNKNOWN` and every `[LOW]` confidence answer here, as direct questions,
ordered by how much they block publishing.

| # | Question | Blocks what | Priority |
| --- | --- | --- | --- |
| 1 | | | High / Med / Low |
| 2 | | | |
| 3 | | | |

---

### § 14 · Flags & risks

| Type | Found? | Detail (do **not** paste secret values) |
| --- | --- | --- |
| Secrets / keys / `.env` committed | | |
| Client or NDA-sensitive material | | |
| Personal data in screenshots or fixtures | | |
| Licensed assets (fonts, stock, icons) needing attribution | | |
| Claims in the README that the code doesn't back up | | |
| Broken live URL or dead deploy | | |

---

### § 15 · Repo health snapshot
_Quick facts. One line each — no prose._

| Metric | Value |
| --- | --- |
| First commit date | |
| Last commit date | |
| Total commits | |
| Contributors | |
| Open issues / PRs | |
| Has README | |
| Has tests | |
| Has CI | |
| Has license | |
| Primary language | |
| Repo size | |
| Default branch | |

---

## Part C — Quality checklist before this goes on the site

Run through this after filling out Part B. Every box needs a yes or a written reason.

- [ ] §1.3 one-liner is understandable by someone outside design/tech
- [ ] Every number in the doc has a source and a date
- [ ] Nothing is claimed as shipped that's only planned
- [ ] §3.2 (what I did) and §3.3 (what I didn't) don't contradict each other
- [ ] §7.6 (what I'd do differently) is filled in and honest, not a humblebrag
- [ ] Hero and card images exist, or are listed in §13 as blockers
- [ ] Every image has real alt text (§9.8)
- [ ] Tags come from the existing vocabulary (§10.1)
- [ ] No secrets, no NDA material, no unredacted personal data (§14)
- [ ] Live URL loads, or status says otherwise
- [ ] Reads in Susan's voice — direct, specific, no marketing filler
- [ ] Passes the "so what?" test: a reader finishes knowing why this mattered
