// 配置vue的开发服务器，vue脚手架项目-默认的配置文件名
//webpack+node环境-导出配置对象
const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
});
module.exports = {
  devServer: {
    port: 8083, // 端口号
    open: true, // 自动打开浏览器
  },
  lintOnSave: false, // eslint是一种代码检查的工具,关闭eslint检查
};
