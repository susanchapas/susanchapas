import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable static HTML export
  output: 'export',
  
  // Image configuration for static export
  images: {
    unoptimized: true,
    formats: ['image/avif', 'image/webp'],
    // Ensure proper sizing hints
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  
  // Enable React Compiler for better performance
  reactCompiler: true,
  
  // Performance: Enable compression and minification
  compress: true,
  
  // Experimental features for performance
  experimental: {
    // Optimize package imports to reduce bundle size
    optimizePackageImports: [
      'framer-motion',
      'lucide-react',
      'lenis',
    ],
  },
  
  // Compiler optimizations
  compiler: {
    // Remove console.log in production
    removeConsole: process.env.NODE_ENV === 'production',
  },
  
  // Empty turbopack config to silence the warning and use Turbopack
  turbopack: {},
  
  // NOTE: Headers don't work with static export (output: 'export')
  // Configure caching on your hosting platform instead:
  // - Vercel: vercel.json
  // - Netlify: netlify.toml or _headers file
  // See public/_headers for Netlify or vercel.json for Vercel
};

export default nextConfig;
