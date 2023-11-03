// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    async rewrites() {
      return [
        {
          source: "/api/product/create",
          destination: "http://grocery-store-server:4000/api/v1/product",
        },
        {
          source: "/api/image/getPresignedUrl",
          destination: "http://grocery-store-server:4000/api/v1/presignedUrl",
        },
        {
          source: "/api/image/upload",
          destination: "http://grocery-store-server:4000/api/v1/upload",
        },
        {
          source: "/api/upload",
          destination: "http://grocery-store-server:4000/upload",
        }
      ];
    },
  };
  module.exports = nextConfig;