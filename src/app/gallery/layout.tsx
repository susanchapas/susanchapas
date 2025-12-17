import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Explore Susan Chapas's creative work including illustrations, motion graphics, photography, and visual design. Art at the intersection of humanity and technology.",
  openGraph: {
    title: "Creative Gallery | Susan Chapas",
    description:
      "Visual art exploring the intersection of humanity and technology - illustrations, motion graphics, and photography.",
  },
};

export default function GalleryLayout({ children }: { children: React.ReactNode }) {
  return children;
}
