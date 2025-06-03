const withNextIntl = require('next-intl/plugin')();

/** @type {import('next').NextConfig} */
const nextConfig = {
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
        deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
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
