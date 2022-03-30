/** @type {import('next').NextConfig} */
const basePath = process.env.BASE_PATH || '';

const nextConfig = {
  basePath,
  reactStrictMode: true,
  images: {
    domains: ['avatars.githubusercontent.com'],
  },
  experimental: {
    esmExternals: 'loose',
  },
};

module.exports = nextConfig;
