/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['avatars.githubusercontent.com'],
  },
  experimental: {
    esmExternals: 'loose',
  },
};

module.exports = nextConfig;
