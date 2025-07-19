/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    // Cloudflare Pages optimization
    trailingSlash: true,
    images: {
        // Removed unoptimized to fix image rendering issues
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'avatars.githubusercontent.com',
            },
            {
                protocol: 'https',
                hostname: 'assets.aceternity.com',
            },
            {
                protocol: 'https',
                hostname: 'strapi.buzzverse.dev',
            },
        ],
    },
};

export default nextConfig;