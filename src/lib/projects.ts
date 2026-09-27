// Centralized project data to avoid duplication across pages
export type ProjectIcon =
  | "cctv"
  | "chart-line"
  | "chef-hat"
  | "drafting-compass"
  | "folder-search"
  | "glasses"
  | "swatch-book";

export interface Project {
  title: string;
  description: string;
  href: string;
  image: string;
  tags: string[];
  icon: ProjectIcon;
  badge?: string;
  inactive?: boolean;
}

export const projects: Project[] = [
  {
    title: "ArchLog",
    description:
      "A research-led product concept that helps architecture students capture design decisions as they happen so the reasoning is available at critique.",
    href: "/projects/archlog",
    icon: "drafting-compass",
    image: "/gallery/ArchLog Overview page.webp",
    tags: ["UX Research", "Product Design", "Prototyping"],
  },
  {
    title: "Sous Sense",
    description:
      "A full product concept and brand for a modular IoT sensor kit that helps households and restaurants reduce food waste. Includes brand identity, package design, advertising, and a complete business plan.",
    href: "/projects/sous-sense",
    icon: "chef-hat",
    image: "/assets/projects/sous-sense/sous-sense-cover.webp",
    tags: ["Brand Identity", "Package Design", "Business Strategy"],
  },
  {
    title: "Chimera 2.0",
    description:
      "A mobile-first redesign of a self-built home security camera app, grounded in a thorough heuristic analysis that rebuilds every core flow around the timeline.",
    href: "/projects/chimera",
    icon: "cctv",
    image: "/assets/projects/chimera/chimera security camera app.webp",
    tags: ["UX Research", "Heuristic Evaluation", "Mobile Design"],
  },
  /*
  {
    title: "File Finder",
    description:
      "A research-led product concept that helps a professor find teaching materials by topic and context without interrupting live lectures.",
    href: "/projects/file-finder",
    icon: "folder-search",
    image: "/assets/projects/file-finder/file finder cover photo.webp",
    tags: ["UX Research", "Product Design", "Prototyping"],
  },
  {
    title: "BrandComms",
    description:
      "A product concept for an AI-powered brand management platform that simplifies design approval for students, universities, and partners through automated compliance feedback and built-in brand education.",
    href: "/projects/brandcomms",
    icon: "swatch-book",
    image: "/assets/projects/brandcomms/brandcomms-cover-photov4.webp",
    tags: ["UX Research", "Product Design", "AI/ML Concept"],
  },
  */
  {
    title: "BLV Accessibility Research",
    description:
      "A research publication exploring how blind and low-vision people use Meta Glasses as an AI-powered, hands-free accessibility tool, examining benefits, challenges, workarounds, and verification strategies.",
    href: "#",
    icon: "glasses",
    image: "/assets/projects/BLV/meta-coming-soon.webp",
    tags: ["Accessibility", "UX Research", "Publication"],
    badge: "In Progress",
    inactive: true,
  },
  {
    title: "Internship Data Scraper",
    description:
      "A personal tool that aggregates internship listings across hiring platforms into one place, cutting through fragmented alerts and tracking applications and progress per role.",
    href: "#",
    icon: "chart-line",
    image: "/assets/projects/internship-scraper/intern-coming-soon.webp",
    tags: ["Python", "Web Scraping", "Productivity Tool"],
    badge: "In Progress",
    inactive: true,
  },
];

export const featuredProjects = projects.slice(0, 3);
