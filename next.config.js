/** @type {import('next').NextConfig} */

const AntdDayjsWebpackPlugin = require('antd-dayjs-webpack-plugin');

const nextConfig = {
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
