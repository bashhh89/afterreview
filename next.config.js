/** @type {import('next').NextConfig} */
const nextConfig = {
  // Keep default output to support API routes
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  // Set specific settings to help with build errors
  reactStrictMode: true,
  swcMinify: true,
  distDir: '.next',
  // Ensure proper error handling
  onDemandEntries: {
    // Keep the pages in memory for longer
    maxInactiveAge: 60 * 60 * 1000, // 1 hour
    // The number of pages to keep in memory
    pagesBufferLength: 5,
  },
};

module.exports = nextConfig; 