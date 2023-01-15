const { defineConfig } = require("@vue/cli-service");
const { name, version } = require("./package");
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
      library: `${name}-[name]`,
      libraryTarget: "umd", // 把微应用打包成 umd 库格式
      chunkLoadingGlobal: `webpackJsonp_${name}`,
    },
    plugins: [
      new SentryWebpackPlugin({
        include: "./dist",
        ignore: ["node_modules", "nginx"],
        release: `${name}@${version}`,
        urlPrefix: "~/vue-app",
      }),
    ],
  },
});
