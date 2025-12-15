import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // Enable static HTML export
  output: 'export',
  // When using `output: 'export'`, Next's default Image Optimization API
  // is incompatible. Disable optimization for static export builds.
  images: {
    unoptimized: true,
  },
  reactCompiler: true,
};

export default nextConfig;
