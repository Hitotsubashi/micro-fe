const { defineConfig } = require("@vue/cli-service");
const path = require("path");
const { name } = require("./package");

const isProd = process.env.NODE_ENV === "production";

module.exports = defineConfig({
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
  },
});
