import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // produce a static export (creates `out/` when running `next export`)
  output: "export",
  reactCompiler: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
