import { createApp } from "vue";
import App from "./App.vue";

// 导入样式和依赖
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
//全局引入及注册
//import moment from "moment";

// 1.0目标: 请求数据 - 打印
// 1.1. 下载axios库, main.js - 全局绑定属性 (确保任意.vue文件可以都访问到这个axios方法)
import axios from "axios";

// 1.2. 基础地址
//axios.defaults.baseURL = "https://fakestoreapi.com";

// 全局注册组件
const app = createApp(App);

// 全局组件注册语法:
//   Vue.component("组件名", 组件对象)
//app.component("PannelG", Pannel);

// 1.3 Vue 3 正确挂载全局属性
// 全局注册 moment
//app.config.globalProperties.$moment = moment;

app.config.globalProperties.$axios = axios;

//2.0目标：vue-router基础使用
//2.1下载vue-router
//2.2引入
import router from "./router"; // 导入配置好的路由实例
//2.3.注册全局组件,挂载路由
app.use(router);

// 挂载应用
app.mount("#app");

//createApp(App).mount("#app");
