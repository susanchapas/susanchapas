import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Gallery",
  description:
    "Explore Susan Chapas's creative work including illustrations, motion graphics, photography, and visual design. Art at the intersection of humanity and technology.",
});

export default function GalleryLayout({ children }: { children: React.ReactNode }) {
  return children;
}
