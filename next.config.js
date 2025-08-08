/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["lh3.googleusercontent.com", "avatars.githubusercontent.com"],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  output: "standalone",
  async redirects() {
    return [
      {
        source: '/auth/signup',
        destination: '/auth',
        permanent: false,
      },
      {
        source: '/auth/signin',
        destination: '/auth',
        permanent: false,
      },
      {
        source: '/auth/login',
        destination: '/auth',
        permanent: false,
      },
      {
        source: '/api/auth/signin',
        destination: '/auth',
        permanent: false,
      },
      {
        source: '/api/auth/signup',
        destination: '/auth',
        permanent: false,
      },
    ];
  },
};

module.exports = nextConfig;
