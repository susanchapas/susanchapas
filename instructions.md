# 🚀 **PROJECT OVERVIEW**

Build a **responsive, accessible personal portfolio site** for **Susan Chapas** using **Next.js (App Router), React, TypeScript**, **Tailwind CSS**, and **Framer Motion** with high-end, fluid motion design.

The brand identity:
**“The Strategic Architect — bridging design, marketing strategy, and technical implementation.”**

The site must communicate:

- UX Designer & Researcher (HCI @ NJIT)
- Marketing Strategist
- Technical hybrid (MIT xPRO Full Stack, CRM migrations, automation, systems thinker)

The entire experience should feel:

- modern
- clean
- animation-rich
- grid-driven
- high-contrast
- fast
- intuitive
- deeply intentional
- accessible
- responsive

---

# 🎨 **VISUAL + BRAND SYSTEM REQUIREMENTS**

## Typography

Use Google Fonts:

- **Space Grotesk** for display
- **DM Sans** for body text

## Color palette

```
Primary BG: #102f5d (Midnight Carbon)
Secondary Text: #F4F4F5 (Paper White)
Accent 1: #CCFF00 (Electric Lime) OR #bbcdf3
Accent 2: #E09F7D (Soft Clay)
```

## Global Design Style

- Neo-Modern / Swiss Style
- Strong grids
- Negative space
- Smooth gradients
- Subtle glassmorphism allowed
- High contrast for accessibility
- Respect prefers-reduced-motion

---

# 🎬 **ANIMATION SYSTEM (Framer Motion)**

Use **Framer Motion** across the site with a focus on fluid, cinematic motion:

### Required Motion Patterns

- **Hero text stagger reveal** (sliding upward opacity reveal)
- **Morphing transitions** as you scroll and new components and sections expand onto the screen
  - Clicking a project thumbnail should expand/morph into the project header

- **Cursor interactions**
  - Custom cursor that expands on hover over interactive elements

- **Parallax scrolling** for images, text, and section dividers
- **Soft page transitions**
- **Smooth scrolling** (Lenis or internal library)

Every animation must be:

- smooth
- performant
- GPU-accelerated
- interruption-free (scroll should not break animations)
- accessible (disable motion if user reduces motion)

---

# 🧱 **SITE ARCHITECTURE (Next.js App Router)**

```
/
  ├── app/
  │    ├── layout.tsx
  │    ├── page.tsx (Home)
  │    ├── about/
  │    │     └── page.tsx
  │    ├── projects/
  │    │     ├── spring-bank/
  │    │     │       └── page.tsx
  │    │     ├── nuclear-age-peace-foundation/
  │    │     │       └── page.tsx
  │    │     └── schematic-marketing/
  │    │     |        └── page.tsx
  |    |-- gallery/
  |    |     |-- page.tsx
  |    |-- contact/
  |    |     |-- page.tsx
  │    ├── globals.css
  │    └── components/
  │
  ├── public/
  │      └── assets/
  │
  ├── package.json
  └── README.md
```

---

# 🗂 **PAGES & REQUIREMENTS**

## 1. Home Page

### Sections:

- **Hero**
  - Big text: “I build strategies that drive engagement.”
  - Subtext: “UX Strategist & Marketing Professional, Jersey City.”
  - CTA scroll indicator
  - Background interactive mesh animation

- **Selected Work**
  - 3 case studies
  - Hover morph animations
  - Custom animated cursor

- **Skills Ticker**
  Marquee list:

  ```
  CRM Integration • UX Research • React Native • Accessibility • Branding • English/Spanish Bilingual • Figma • Miro • Marketing Campaigns • Sales Strategy • Event Planning & Coordination • Full-Stack Engineering • Lead Qualification • Adobe Creative Cloud •
  ```

- **Footer**
  - Email
  - LinkedIn
  - GitHub
  - Simple, clean, animated

## 2. About Page

- Timeline animation of roles:
  - Marketing Liaison at MaxWell Medical
  - Marketing Coordinator at Spring Bank
  - Founder & Director at Schematic Marketing
  - Marketing & Business Development Manager at All Executive Clean
  - Marketing & UX Strategist at Spring Bank

- Highlight NJIT (HCI) + MIT xPRO Full-Stack
- Include art section featuring:
  - Mindless Mirth (award-winning piece)
  - link to Gallery page for more art & photography

## 3. Project Pages

Each page must use:

- a morphing header animation (from homepage card → project hero)
- STAR-method case study writing structure
- image gallery
- tech + tools used
- results in clear metrics

Required Projects:

- **Spring Bank**
  Launching a new bank branch in Red Hook, Brooklyn (designed the new branch interior & exterior, including ATM videography & animations)
- **All Executive Clean**
  Redesigning the brand for professionalism & consistency --> website auditing, new marketing materials such as capability statement, business cards, portfolio
- **Schematic Marketing**
  Launched and scaled an accessibility-focused design agency for small businesses, nonprofits and entrepreneurs

---

# 🧩 **COMPONENTS REQUIRED**

Copilot must generate reusable components:

### Global Components

- **Navigation (sticky side nav)**
- **Animated Menu Overlay**
- **Custom Cursor**
- **Project Card**
- **Marquee Skills Ticker**
- **Section Divider (with parallax)**
- **MorphTransitionWrapper** (Framer Motion)
- **AccessibleButton** / **AccessibleLink**
- **Footer**

All must be:

- responsive
- mobile-first
- a11y-friendly
- keyboard-navigable

---

# 🛠️ **INFRASTRUCTURE & TOOLING REQUIREMENTS**

## Husky Hooks

- pre-commit: run ESLint, Prettier, and TypeScript check
- pre-push: run build + tests

## Quality Gates

Create GitHub Actions workflow:

- lint
- type-check
- unit tests
- build
- accessibility check (axe-core)

## ESLint & Prettier

- AirBnB or Next.js defaults
- Prettier for formatting
- Tailwind sorting plugin
- Strict TypeScript

---

# ♿ **ACCESSIBILITY REQUIREMENTS**

- High contrast
- Keyboard navigation
- Skip-to-content link
- Respect `prefers-reduced-motion`
- Alt text for all images
- Semantic HTML
- Validate with axe-core

---

# 📱 **RESPONSIVENESS REQUIREMENTS**

Mobile → Tablet → Desktop:

- stack → grid transitions
- hero text scales fluidly
- animations adjust based on viewport
- images responsive with Next/Image

---

# 🧪 **TESTING REQUIREMENTS**

Use:

- Jest + React Testing Library
- Include tests for:
  - navigation
  - animation components
  - accessibility
  - rendering of project pages
  - form elements

---

# 🚧 **WHAT COPILOT MUST NOW PRODUCE**

Using this brand guide and specification, generate:

### 1. A full Next.js project scaffold

with all dependencies installed.

### 2. All components listed above

with Framer Motion animations implemented.

### 3. Full page layouts

(Home, About, 3 Projects).

### 4. Complete styling with Tailwind

following the brand palette.

### 5. Husky + ESLint + Prettier setup.

### 6. GitHub Actions CI pipeline.

### 7. Example content (copy, case studies, timeline items, skills).

### 8. Responsive & accessible interactions.

### 9. Motion system variants

(stagger, parallax, morph, transitions).

### 10. README documenting usage + scripts.

---

# ✨ **END OF PROMPT — Begin Building**

Copilot, generate the full project according to this spec.
