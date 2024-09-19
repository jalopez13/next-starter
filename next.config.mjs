/** @type {import('next').NextConfig} */

const nextConfig = {
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  experimental: {
    serverComponentsExternalPackages: ["oslo", "@node-rs/argon2", "@node-rs/bcrypt"],
  },
};

export default nextConfig;
