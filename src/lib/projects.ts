// Centralized project data to avoid duplication across pages
export type ProjectIcon =
  | "cctv"
  | "chart-line"
  | "chef-hat"
  | "drafting-compass"
  | "flame"
  | "folder-search"
  | "glasses"
  | "swatch-book";

export interface Project {
  title: string;
  description: string;
  href: string;
  image: string;
  width: number;
  height: number;
  tags: string[];
  icon: ProjectIcon;
  badge?: string;
  inactive?: boolean;
  awards?: string[];
  lab?: {
    stage: number;
    question: string;
    reveal?: string;
    cta?: { label: string; href: string };
  };
}

export const LAB_STAGES = ["Explore", "Prototype", "Test", "Write up"] as const;

export const projects: Project[] = [
  {
    title: "ArchLog",
    description:
      "A research-led product concept that helps architecture students capture design decisions as they happen so the reasoning is available at critique.",
    href: "/projects/archlog",
    icon: "drafting-compass",
    image: "/gallery/ArchLog Overview page.webp",
    width: 2926,
    height: 1748,
    tags: ["UX Research", "Product Design", "Prototyping"],
  },
  {
    title: "Sous Sense",
    description:
      "A full product concept and brand for a modular IoT sensor kit that helps households and restaurants reduce food waste. Includes brand identity, package design, advertising, and a complete business plan.",
    href: "/projects/sous-sense",
    icon: "chef-hat",
    image: "/assets/projects/sous-sense/sous-sense-cover.webp",
    width: 1280,
    height: 720,
    tags: ["Brand Identity", "Package Design", "Business Strategy"],
  },
  {
    title: "Chimera 2.0",
    description:
      "A mobile-first redesign of a self-built home security camera app, grounded in a thorough heuristic analysis that rebuilds every core flow around the timeline.",
    href: "/projects/chimera",
    icon: "cctv",
    image: "/assets/projects/chimera/chimera security camera app.webp",
    width: 1280,
    height: 720,
    tags: ["UX Research", "Heuristic Evaluation", "Mobile Design"],
  },
  {
    title: "Wick",
    description:
      "An AI bystander-intervention coach built in 24 hours at GirlHacks. Users rehearse stepping in through voice or text role-play, then get coaching on what they said.",
    href: "/projects/wick",
    icon: "flame",
    image: "/assets/projects/wick/wick-hero-placeholder.svg",
    width: 1600,
    height: 900,
    tags: ["AI Interaction Design", "Frontend Development"],
    awards: ["Best Use of ElevenLabs", "Best Beginner Hack"],
    lab: {
      stage: 2,
      question: "Can practicing out loud make it easier to step in when something goes wrong?",
      reveal: "/assets/projects/wick/wick-grove.webp",
      cta: { label: "Try Wick", href: "https://www.wick.courses" },
    },
  },
  /*
  {
    title: "File Finder",
    description:
      "A research-led product concept that helps a professor find teaching materials by topic and context without interrupting live lectures.",
    href: "/projects/file-finder",
    icon: "folder-search",
    image: "/assets/projects/file-finder/file finder cover photo.webp",
    width: 1280,
    height: 720,
    tags: ["UX Research", "Product Design", "Prototyping"],
  },
  {
    title: "BrandComms",
    description:
      "A product concept for an AI-powered brand management platform that simplifies design approval for students, universities, and partners through automated compliance feedback and built-in brand education.",
    href: "/projects/brandcomms",
    icon: "swatch-book",
    image: "/assets/projects/brandcomms/brandcomms-cover-photov4.webp",
    width: 1280,
    height: 720,
    tags: ["UX Research", "Product Design", "AI/ML Concept"],
  },
  */
  {
    title: "BLV Accessibility Research",
    description:
      "A research publication exploring how blind and low-vision people use Meta Glasses as an AI-powered, hands-free accessibility tool, examining benefits, challenges, workarounds, and verification strategies.",
    href: "/projects/blv-research",
    icon: "glasses",
    image: "/assets/projects/BLV/meta-coming-soon.webp",
    width: 1280,
    height: 720,
    tags: ["Accessibility", "UX Research", "Publication"],
    badge: "In Progress",
    lab: {
      stage: 3,
      question: "How do blind and low-vision people check what their AI glasses tell them?",
    },
  },
  {
    title: "Internship Data Scraper",
    description:
      "A personal tool that aggregates internship listings across hiring platforms into one place, cutting through fragmented alerts and tracking applications and progress per role.",
    href: "#",
    icon: "chart-line",
    image: "/assets/projects/internship-scraper/intern-coming-soon.webp",
    width: 1280,
    height: 720,
    tags: ["Python", "Web Scraping", "Productivity Tool"],
    badge: "In Progress",
    inactive: true,
  },
];

export const featuredProjects = projects.filter((p) => !p.inactive);
