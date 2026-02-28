import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'img.freepik.com',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: '**.supabase.co',
                pathname: '/**',
            }
        ],
        unoptimized: true,
    },
    // ОТКЛЮЧАЕМ STRICT MODE
    reactStrictMode: false,
    // Добавляем для диагностики
    logging: {
        fetches: {
            fullUrl: true,
        },
    },
};

export default nextConfig;
