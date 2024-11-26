
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        hostname: "res.cloudinary.com",
      },
      {
        hostname: "i.ibb.co",
      },
      {
        hostname: "i.ibb.co.com",
      },
      {
        hostname: "lh3.googleusercontent.com",
      },
      {
        hostname: "os.alipayobjects.com",
      },
      {
        hostname: "ibb.co.com",
      },
      {
        hostname: "storage.googleapis.com",
      },
    ],
  },
};

export default nextConfig;

