import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.js');

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'avatars.githubusercontent.com',
                port: '',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'assets.aceternity.com',
                port: '',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'strapi.buzzverse.dev',
                port: '',
                pathname: '/**',
            },
        ],
        unoptimized: false,
    },
};

export default withNextIntl(nextConfig);