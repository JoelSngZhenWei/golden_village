import withPWAInit from "@ducanh2912/next-pwa";
import type { NextConfig } from "next";

// Initialize the PWA configuration
const withPWA = withPWAInit({
  dest: "public",
});

const nextConfig: NextConfig = {
  // Add your Next.js config options here
  reactStrictMode: true,
  // Any other Next.js config options...
};

// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   /* config options here */
// };

// export default nextConfig;

