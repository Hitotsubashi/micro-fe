const { defineConfig } = require("@vue/cli-service");
const path = require("path");
const { name, version } = require("./package.json");
const SentryWebpackPlugin = require("@sentry/webpack-plugin");

const isProd = process.env.NODE_ENV === "production";

module.exports = defineConfig({
  parallel: false,
  transpileDependencies: true,
  publicPath: isProd ? "/vue3-app/" : undefined,
  devServer: {
    hot: true,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    port: 3004,
    open: false,
  },
  configureWebpack: {
    devtool: "source-map",
    resolve: {
      alias: {
        "@": path.join(__dirname, "src"),
      },
    },
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
        urlPrefix: "~/vue3-app",
      }),
    ],
  },
});
