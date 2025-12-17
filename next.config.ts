import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // Enable static HTML export
  output: 'export',
  // When using `output: 'export'`, Next's default Image Optimization API
  // is incompatible. Disable optimization for static export builds.
  images: {
    unoptimized: true,
    // Define formats for better compression when using external optimization
    formats: ['image/avif', 'image/webp'],
  },
  reactCompiler: true,
  // Performance: Enable compression and minification
  compress: true,
  // Experimental features for performance
  experimental: {
    // Optimize package imports to reduce bundle size
    optimizePackageImports: ['framer-motion', 'lucide-react'],
  },
  // NOTE: Headers don't work with static export (output: 'export')
  // Configure caching on your hosting platform instead:
  // - Vercel: vercel.json
  // - Netlify: netlify.toml or _headers file
  // - GitHub Pages: configure via CDN
  // See public/_headers for Netlify or vercel.json for Vercel
};

export default nextConfig;
