/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    // CUSTOM_VAR: process.env.API_URL || "default-value",
    CUSTOM_VAR: process.env.API_URL,
  },
  reactStrictMode: true,
};

export default nextConfig;
