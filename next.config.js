/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["https://s.w-x.co/"],
    minimumCacheTTL: 1,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.hidmet.gov.rs",
        port: "",
        pathname: "/data/**",
      },
      {
        protocol: "https",
        hostname: "sd-weather.up.railway.app",
        port: "",
        pathname: "/radar/**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "3001",
        pathname: "/radar/**",
      },
    ],
  },
};

module.exports = nextConfig;
