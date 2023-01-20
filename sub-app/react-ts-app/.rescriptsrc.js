const path = require('path');
const { appendWebpackPlugin } = require('@rescripts/utilities');
const SentryCliPlugin = require('@sentry/webpack-plugin');

const isProd = process.env.NODE_ENV === 'production';

module.exports = (isProd ? [] : [['use-stylelint-config', '.stylelintrc.js']]).concat({
  webpack: (config) => {
    config.output.publicPath = isProd ? '/react-app/' : undefined;
    config.output.library = `${process.env.REACT_APP_NAME}-[name]`;
    config.output.libraryTarget = 'umd';
    config.output.chunkLoadingGlobal = `webpackJsonp_${process.env.REACT_APP_NAME}`;
    config.output.globalObject = 'window';
    config.resolve.alias = {
      '@': path.resolve(__dirname, './src'),
    };
    if (!isProd) {
      const oneOfRule = config.module.rules.find((r) => r.oneOf);
      oneOfRule.oneOf.splice(0, 0, {
        test: /\.(svg)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              publicPath: `http://localhost:${process.env.PORT}`,
            },
          },
        ],
      });
    }
    if (isProd) {
      console.log(`version: ${process.env.REACT_APP_NAME}@${process.env.REACT_APP_VERSION}`);
      config = appendWebpackPlugin(
        new SentryCliPlugin({
          include: './build',
          ignore: ['node_modules', 'nginx'],
          release: `${process.env.REACT_APP_NAME}@${process.env.REACT_APP_VERSION}`,
          urlPrefix: '~/react-app',
        }),
        config,
      );
    }
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
