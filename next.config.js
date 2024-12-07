/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: "5mb", //To allow sending up to 4 images, 1MB each
    },
  },
};

module.exports = nextConfig;
