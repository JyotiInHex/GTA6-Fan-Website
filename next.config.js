/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.rockstargames.com',
        port: '',
        pathname: '/VI/**',
      },
    ],
  },
};

module.exports = nextConfig;
