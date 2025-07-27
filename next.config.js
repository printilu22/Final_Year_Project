/** @type {import('next').NextConfig} */
const nextConfig = {
 output: 'server',
 experimental: {
  appDir: true,
 },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
};

module.exports = nextConfig;
