// See:
// https://qiita.com/syuji-higa/items/931e44046c17f53b432b#1-1-nextjs-%E3%81%AE%E8%A8%AD%E5%AE%9A
const { resolve } = require('path');

const nextConfig = {
  webpack: (config) => {
    config.resolve.alias['~'] = resolve(__dirname, 'src');
    return config;
  },
};

module.exports = nextConfig;
