/** @type {import('next').NextConfig} */

const contributorsConfig = require('../contributors.config');

const basePath = contributorsConfig.basePath || '';

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
