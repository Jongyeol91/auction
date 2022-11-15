/** @type {import('next').NextConfig} */

const AntdDayjsWebpackPlugin = require('antd-dayjs-webpack-plugin');

const nextConfig = {
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  reactStrictMode: true,
  swcMinify: true,
  compiler: {
    styledComponents: true,
  },

  webpack(config) {
    [new AntdDayjsWebpackPlugin()],
      config.module.rules.push({
        test: /\.svg$/i,
        issuer: /\.[jt]sx?$/,
        use: ['@svgr/webpack'],
      });

    return config;
  },
};

module.exports = nextConfig;
