// Centralized project data to avoid duplication across pages
export interface Project {
  title: string;
  description: string;
  href: string;
  image: string;
  tags: string[];
  badge?: string;
}

export const projects: Project[] = [
  {
    title: "Chimera 2.0",
    description:
      "A mobile-first redesign of a self-built home security camera app, grounded in a deep heuristic analysis that rebuilds every core flow around the timeline.",
    href: "/projects/chimera",
    image: "/assets/projects/chimera/chimera security camera app.webp",
    tags: ["UX Research", "Heuristic Evaluation", "Mobile Design"],
  },
  {
    title: "Sous Sense",
    description:
      "A full product concept and brand for a modular IoT sensor kit that helps households and restaurants reduce food waste. Built from the ground up with brand identity, package design, advertising, and a complete business plan.",
    href: "/projects/sous-sense",
    image: "/gallery/sous sense cover photo.svg",
    tags: ["Brand Identity", "Package Design", "Business Strategy"],
  },
  {
    title: "ArchLog",
    description:
      "A research-driven product concept that helps architecture students capture design decisions as they make them — turning a fragmented process into a critique-ready narrative.",
    href: "/projects/archlog",
    image: "/gallery/ArchLog Overview page.webp",
    tags: ["UX Research", "Product Design", "Prototyping"],
  },
  {
    title: "File Finder",
    description:
      "A research-led product concept that helps a professor find teaching materials by topic and context instead of by folder, preserving momentum during live lectures.",
    href: "/projects/file-finder",
    image: "/assets/projects/file-finder/file finder cover photo.webp",
    tags: ["UX Research", "Product Design", "Prototyping"],
  },
  {
    title: "BrandComms",
    description:
      "A product concept for an AI-powered brand management platform that simplifies design approval for students, universities, and partners through automated compliance feedback and built-in brand education.",
    href: "/projects/brandcomms",
    image: "/assets/projects/brandcomms/brand comms cover photo.webp",
    tags: ["UX Research", "Product Design", "AI/ML Concept"],
  },
  {
    title: "Schematic Marketing",
    description:
      "Launched and scaled an accessibility-focused design agency for small businesses, nonprofits and entrepreneurs.",
    href: "/projects/schematic-marketing",
    image: "/gallery/schematic marketing project cover.webp",
    tags: ["Entrepreneurship", "Accessibility", "UX Design"],
    badge: "< >",
  },
  {
    title: "Spring Bank",
    description:
      "Launching a new bank branch in Red Hook, Brooklyn — designed the new branch interior & exterior, including ATM videography & animations.",
    href: "/projects/spring-bank",
    image: "/gallery/Red Hook Launch Photo.webp",
    tags: ["Brand Strategy", "Interior Design", "Motion Graphics"],
  },
];

export const featuredProjects = projects
  .filter((p) => p.href !== "/projects/schematic-marketing")
  .slice(0, 3);
