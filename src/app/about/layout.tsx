import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "About",
  description:
    "About Susan Chapas, a UX researcher and designer studying human-computer interaction at NJIT in New Jersey.",
});

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <link
        rel="preload"
        href="/assets/misc/lake-erie.webp"
        as="image"
        type="image/webp"
      />
      {children}
    </>
  );
}
