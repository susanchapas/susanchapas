import type { Metadata } from "next";

export const siteName = "Susan Chapas";
export const siteTitle = "Susan Chapas | UX Researcher & Designer";
export const siteDescription =
  "Susan Chapas is a UX researcher and designer based in Jersey City, NJ. Case studies in user research, accessibility, heuristic evaluation, and prototyping.";

const defaultImage = "/assets/misc/og-default.jpg";

export const baseOpenGraph = {
  type: "website",
  locale: "en_US",
  siteName,
  url: "./",
  images: defaultImage,
} satisfies Metadata["openGraph"];

export function pageMetadata({
  title,
  description,
  image,
}: {
  title: string;
  description: string;
  image?: string;
}): Metadata {
  return {
    title,
    description,
    openGraph: {
      ...baseOpenGraph,
      title: `${title} | ${siteName}`,
      description,
      images: image ?? defaultImage,
    },
  };
}
