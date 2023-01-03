/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.discordapp.com',
        port: '',
        pathname: '/avatars/**',
      },
    ],
  },
}

module.exports = nextConfig
