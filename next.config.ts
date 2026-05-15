import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'img.freepik.com', pathname: '/**' },
      { protocol: 'https', hostname: '**.supabase.co', pathname: '/**' }
    ],
    unoptimized: true, // если нужно
  },
  reactStrictMode: false,
  logging: { fetches: { fullUrl: true } },
  // Удаляем modularizeImports – lucide-react сам поддерживает tree-shaking
  experimental: {
    // Можно оставить для ускорения сборки, но не обязательно
    optimizePackageImports: ['lucide-react', 'framer-motion'],
  },
};

export default nextConfig;