/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  // Ensure we're not using features incompatible with static export
  experimental: {
    serverActions: false,
  },
};

module.exports = nextConfig; 