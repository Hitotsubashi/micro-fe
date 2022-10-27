const { name } = require('./package');
const path = require('path');

const isProd = process.env.NODE_ENV === 'production';

module.exports = (isProd ? [] : [['use-stylelint-config', '.stylelintrc.js']]).concat({
  webpack: (config) => {
    config.output.publicPath = isProd ? '/react-app/' : undefined;
    config.output.library = `${name}-[name]`;
    config.output.libraryTarget = 'umd';
    config.output.chunkLoadingGlobal = `webpackJsonp_${name}`;
    config.output.globalObject = 'window';
    config.resolve.alias = {
      '@': path.resolve(__dirname, './src'),
    };
    return config;
  },

  devServer: (_) => {
    const config = _;

    config.headers = {
      'Access-Control-Allow-Origin': '*',
    };
    config.historyApiFallback = true;
    // config.hot = false;
    // config.watchContentBase = false;
    config.liveReload = false;
    config.port = 3001;
    return config;
  },
});
