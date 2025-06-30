const withNextIntl = require("next-intl/plugin")();

/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/menu',
        destination: '/meny',
        permanent: true, // Use true for SEO benefits since this is a permanent change
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
    formats: ["image/avif", "image/webp"],
    // Optimized device sizes based on real-world usage
    deviceSizes: [640, 768, 1024, 1280, 1536, 1920, 2048],
    // Smaller image sizes for thumbnails and inline images
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // Optimize image loading
    minimumCacheTTL: 60 * 60 * 24 * 365, // 1 year
  },
  compiler: {
    removeConsole:
      process.env.NODE_ENV === "production"
        ? {
            exclude: ["error", "warn", "info"],
          }
        : false,
  },
  swcMinify: true,
  compress: true,
  poweredByHeader: false,
};

module.exports = withNextIntl(nextConfig);
