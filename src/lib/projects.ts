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
    title: "Schematic Marketing",
    description:
      "Launched and scaled an accessibility-focused design agency for small businesses, nonprofits and entrepreneurs.",
    href: "/projects/schematic-marketing",
    image: "/gallery/schematic marketing project cover.png",
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
  {
    title: "All Executive Clean",
    description:
      "Redesigning the brand for professionalism & consistency — website auditing, new marketing materials including capability statement, business cards, and portfolio.",
    href: "/projects/all-executive-clean",
    image: "/gallery/Construction Site Photo.webp",
    tags: ["Brand Identity", "Web Design", "Marketing"],
  },
];

// Featured projects for home page (can be a subset)
export const featuredProjects = projects;
