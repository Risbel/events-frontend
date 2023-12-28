/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      "image.lexica.art",
      "images.unsplash.com",
      "i.pinimg.com",
      "tailwindui.com",
      "avatars.githubusercontent.com",
      "res.cloudinary.com",
    ],
  },
};

module.exports = nextConfig;
