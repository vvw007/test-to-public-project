const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
});

module.exports = {
  devServer: {
    port: 8084, // 端口号
    open: true, // 自动打开浏览器
  },
  lintOnSave: false, // eslint是一种代码检查的工具,关闭eslint检查
};
