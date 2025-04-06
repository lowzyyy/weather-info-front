/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "s.w-x.co",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "www.hidmet.gov.rs",
        pathname: "/data/**",
      },
      {
        protocol: "https",
        hostname: "lowzyyy.pro",
        pathname: "api/weather-info/radar/**",
      },
      {
        protocol: "https",
        hostname: "sd-weather.up.railway.app",
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
