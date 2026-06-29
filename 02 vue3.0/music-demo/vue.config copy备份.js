const { defineConfig } = require("@vue/cli-service");
//  按需引入vant组件库
const { VantResolver } = require("unplugin-vue-components/resolvers");
const ComponentsPlugin = require("unplugin-vue-components/webpack");
const webpack = require("webpack");
//const path = require("path");

module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    port: 8085, // 端口号
    open: true, // 自动打开浏览器
  },
  lintOnSave: false, // eslint是一种代码检查的工具,关闭eslint检查
  configureWebpack: {
    plugins: [
      ComponentsPlugin({
        resolvers: [VantResolver()],
      }),
      // 全局提供 process 变量
      new webpack.ProvidePlugin({
        process: "process/browser",
      }),
    ],
    resolve: {
      fallback: {
        assert: require.resolve("assert/"), // 提供 assert polyfill
        path: require.resolve("path-browserify"), // 提供 path polyfill
        // 关键修复：明确指向 process 包的主文件
        process: require.resolve("process/browser"),
        worker_threads: false, // 浏览器不支持，禁用
        module: false, // 不需要
        // 如果还有类似 fs, os, crypto 等报错也可以继续添加
      },
      // 额外添加别名，确保绝对定位
      alias: {
        process: "process/browser",
      },
    },
  },
});

/* module.exports = defineConfig({
  transpileDependencies: true,
});

module.exports = {
  devServer: {
    port: 8085, // 端口号
    open: true, // 自动打开浏览器
  },
  lintOnSave: false, // eslint是一种代码检查的工具,关闭eslint检查
};

module.exports = {
  configureWebpack: {
    plugins: [
      ComponentsPlugin({
        resolvers: [VantResolver()],
      }),
    ],
  },
}; */
