import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Explore Susan Chapas's portfolio of UX design, marketing strategy, and full-stack development projects. Case studies in brand strategy, web design, and user experience.",
  openGraph: {
    title: "Projects | Susan Chapas Portfolio",
    description:
      "Case studies showcasing the intersection of design thinking, marketing expertise, and technical implementation.",
  },
};

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
