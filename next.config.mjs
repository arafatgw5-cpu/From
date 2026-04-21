/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,

  images: {
    remotePatterns: [
      { protocol: "https", hostname: "avatars.githubusercontent.com" },
      { protocol: "https", hostname: "randomuser.me" },
      { protocol: "https", hostname: "i.dummyjson.com" },
      { protocol: "https", hostname: "www.startech.com.bd" },
      { protocol: "https", hostname: "covers.openlibrary.org" },
      { protocol: "https", hostname: "ia800404.us.archive.org" },
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
};

export default nextConfig;