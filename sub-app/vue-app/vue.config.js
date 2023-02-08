const { defineConfig } = require("@vue/cli-service");
const { name, version } = require("./package.json");
const SentryWebpackPlugin = require("@sentry/webpack-plugin");

const isProd = process.env.NODE_ENV === "production";

process.env.VUE_APP_RELEASE = `${name}@${version}`;
process.env.VUE_APP_NAME = name;

module.exports = defineConfig({
  parallel: false,
  transpileDependencies: true,
  publicPath: isProd ? "/vue-app/" : undefined,
  devServer: {
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    hot: true,
    port: 3002,
    open: false,
  },
  configureWebpack: {
    devtool: isProd ? "hidden-source-map" : "eval-cheap-source-map",
    output: {
      library: `${name}`,
      libraryTarget: "umd", // 把微应用打包成 umd 库格式
      chunkLoadingGlobal: `webpackJsonp_${name}`,
    },
  },
  chainWebpack(config) {
    config.when(isProd, (config) => {
      config.plugin("sentry-webpack-plugin").use(
        new SentryWebpackPlugin({
          include: "./dist",
          ignore: ["node_modules", "nginx"],
          release: process.env.VUE_APP_RELEASE,
          urlPrefix: "~/vue-app",
        })
      );
    });
  },
});
