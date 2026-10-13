import type { MetadataRoute } from "next";
import { featuredProjects } from "@/lib/projects";

export const dynamic = "force-static";

const baseUrl = "https://susanchapas.com";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    "",
    "/about",
    "/projects",
    "/resume",
    "/gallery",
    "/contact",
    ...featuredProjects.map((p) => p.href),
  ].map((path) => ({ url: `${baseUrl}${path}` }));
}
