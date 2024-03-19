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
    },
};

module.exports = withNextIntl(nextConfig);
