/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
};

module.exports = {
  ...nextConfig,
  images: {
    remotePatterns: [
      {
        hostname: 'localhost',
      },
    ],
  },
  // experimental: {
  //   scrollRestoration: true,
  // },
};
