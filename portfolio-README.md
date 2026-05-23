# Susan Chapas Portfolio

A beautiful, responsive portfolio website built with **Next.js 16**, **React**, **TypeScript**, **Tailwind CSS**, and **Framer Motion**.

- Website: [susanchapas.com](https://susanchapas.com)

## ✨ Features

- **Modern Design**: Neo-modern Swiss style with strong grids and negative space
- **Fluid Animations**: Cinematic motion design with Framer Motion
- **Responsive**: Mobile-first design that works beautifully on all devices
- **Accessible**: WCAG compliant with keyboard navigation and screen reader support
- **Performance**: GPU-accelerated animations with smooth 60fps scrolling
- **Custom Cursor**: Interactive cursor that responds to hover states

## 🚀 Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Animations**: Framer Motion
- **Smooth Scroll**: Lenis
- **Testing**: Jest + React Testing Library
- **CI/CD**: GitHub Actions

## 📁 Project Structure

```
src/
├── app/
│   ├── about/
│   ├── contact/
│   ├── gallery/
│   ├── projects/
│   │   ├── spring-bank/
│   │   ├── all-executive-clean/
│   │   └── schematic-marketing/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── AccessibleButton.tsx
│   ├── CustomCursor.tsx
│   ├── Footer.tsx
│   ├── Hero.tsx
│   ├── MorphTransitionWrapper.tsx
│   ├── Navigation.tsx
│   ├── ProjectCard.tsx
│   ├── SectionDivider.tsx
│   ├── SelectedWork.tsx
│   ├── SkillsTicker.tsx
│   └── SmoothScrollProvider.tsx
└── __tests__/
```

## 🛠️ Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/susanchapas/portfolio.git
cd portfolio

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## 📜 Available Scripts

| Command                | Description                  |
| ---------------------- | ---------------------------- |
| `npm run dev`          | Start development server     |
| `npm run build`        | Build for production         |
| `npm run start`        | Start production server      |
| `npm run lint`         | Run ESLint                   |
| `npm run lint:fix`     | Fix ESLint issues            |
| `npm run format`       | Format code with Prettier    |
| `npm run format:check` | Check code formatting        |
| `npm run type-check`   | Run TypeScript type checking |
| `npm run test`         | Run tests                    |
| `npm run test:watch`   | Run tests in watch mode      |
| `npm run test:ci`      | Run tests with coverage      |

## 🎨 Brand System

### Colors

| Color          | Hex       | Usage                             |
| -------------- | --------- | --------------------------------- |
| Primary BG     | `#102f5d` | Main background (Midnight Carbon) |
| Secondary Text | `#F4F4F5` | Body text (Paper White)           |
| Accent Lime    | `#CCFF00` | Primary accent (Electric Lime)    |
| Accent Blue    | `#bbcdf3` | Secondary accent                  |
| Accent Clay    | `#E09F7D` | Tertiary accent (Soft Clay)       |

### Typography

- **Display**: Syne (headings)
- **Body**: DM Sans (paragraphs)

## ♿ Accessibility

This portfolio follows WCAG 2.1 AA guidelines:

- High contrast color scheme
- Keyboard navigation support
- Skip-to-content link
- ARIA labels and semantic HTML
- Respects `prefers-reduced-motion`
- Screen reader friendly

## 🧪 Testing

```bash
# Run all tests
npm test

# Run tests with coverage
npm run test:ci

# Run tests in watch mode
npm run test:watch
```

## 🔄 Git Hooks

Pre-commit and pre-push hooks are configured with Husky:

- **Pre-commit**: Runs ESLint and Prettier on staged files
- **Pre-push**: Runs type-check and build

## 📦 Deployment

The site can be deployed to:

- **Vercel** (recommended for Next.js)
- **Netlify**
- **GitHub Pages** (static export)

```bash
# Build for production
npm run build

# Preview production build
npm run start
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👤 Author

**Susan Chapas**

- Website: [susanchapas.com](https://susanchapas.com)
- LinkedIn: [@susan-chapas](https://linkedin.com/in/susan-chapas)
- GitHub: [@susanchapas](https://github.com/susanchapas)

---

Built with ❤️ in Jersey City
