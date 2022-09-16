const { name } = require('./package');
const path = require('path');

module.exports = [
  ['use-stylelint-config', '.stylelintrc.js'],
  {
    webpack: (config) => {
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
      config.hot = false;
      // config.watchContentBase = false;
      config.liveReload = false;
      config.port = 3001;
      return config;
    },
  },
];
