const { defineConfig } = require("@vue/cli-service");
const { name, version } = require("./package.json");
const SentryWebpackPlugin = require("@sentry/webpack-plugin");

const isProd = process.env.NODE_ENV === "production";

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
    devtool: "source-map",
    output: {
      filename: "js/[name]-[contenthash:8].js",
      chunkFilename: "js/[name]-[contenthash:8].chunk.js",
      assetModuleFilename: "css/[name].[hash][ext]",
      library: `${name}-[name]`,
      libraryTarget: "umd", // 把微应用打包成 umd 库格式
      chunkLoadingGlobal: `webpackJsonp_${name}`,
    },
    // plugins: [
    //   new SentryWebpackPlugin({
    //     include: "./dist",
    //     ignore: ["node_modules", "nginx"],
    //     release: `${name}@${version}`,
    //     urlPrefix: "~/vue-app",
    //   }),
    // ],
  },
  chainWebpack(config) {
    config.when(isProd, (config) => {
      config.plugin("sentry-webpack-plugin").use(
        new SentryWebpackPlugin({
          include: "./dist",
          ignore: ["node_modules", "nginx"],
          release: `${name}@${version}`,
          urlPrefix: "~/vue-app",
        })
      );
    });
  },
});
