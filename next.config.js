/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
};

module.exports = {
  ...nextConfig,
  images: {
    remotePatterns: [
      {
        hostname: 'online-shop.iran.liara.run',
      },
    ],
  },
  // experimental: {
  //   scrollRestoration: true,
  // },
};
