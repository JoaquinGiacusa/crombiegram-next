/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "crombiegram-s3.s3.sa-east-1.amazonaws.com",
      },
    ],
  },
  reactStrictMode: true,
};

module.exports = nextConfig;
