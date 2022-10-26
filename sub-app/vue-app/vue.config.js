const { defineConfig } = require("@vue/cli-service");
const { name } = require("./package");

const isProd = process.env.NODE_ENV === "production";

module.exports = defineConfig({
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
    output: {
      library: `${name}-[name]`,
      libraryTarget: "umd", // 把微应用打包成 umd 库格式
      chunkLoadingGlobal: `webpackJsonp_${name}`,
    },
  },
});
