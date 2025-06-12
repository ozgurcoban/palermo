const withNextIntl = require('next-intl/plugin')();

/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
        return [
            {
                source: '/en/om-oss',
                destination: '/en',
                permanent: true,
            },
            {
                source: '/en/about',
                destination: '/en',
                permanent: true,
            },
            {
                source: '/sv/om-oss',
                destination: '/sv',
                permanent: true,
            },
            {
                source: '/om-oss',
                destination: '/sv',
                permanent: true,
            },
        ];
    },
    images: {
        remotePatterns: [
            {
                hostname: "lh3.googleusercontent.com",
                protocol: "https",
            },
            {
                hostname: "cdn.sanity.io",
                protocol: "https",
            },
        ],
        formats: ['image/avif', 'image/webp'],
        deviceSizes: [531, 640, 711, 828, 1080, 1200, 1920, 2048],
        imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    },
    experimental: {
        optimizeCss: false,
    },
    compiler: {
        removeConsole: process.env.NODE_ENV === "production" ? {
            exclude: ["error", "warn", "info"],
        } : false,
    },
    swcMinify: true,
    compress: true,
    poweredByHeader: false,
};

module.exports = withNextIntl(nextConfig);
