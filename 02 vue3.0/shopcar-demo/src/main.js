//引入包。
import { createApp } from "vue";
import App from "./App.vue";

// 导入样式和依赖
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
//全局引入及注册
//import moment from "moment";

// 目标: 请求数据 - 打印
// 1. 下载axios库, main.js - 全局绑定属性 (确保任意.vue文件可以都访问到这个axios方法)
import axios from "axios";

// 2. 基础地址
axios.defaults.baseURL = "https://fakestoreapi.com";

// 3. axios方法添加到Vue的原型上
// 为vue2的挂载方式：Vue.prototype.$axios = axios;

// 全局注册组件
const app = createApp(App);

// 语法:
//   Vue.component("组件名", 组件对象)
//app.component("PannelG", Pannel);

// Vue 3 正确挂载全局属性
// 全局注册 moment
//app.config.globalProperties.$moment = moment;

app.config.globalProperties.$axios = axios;

// 挂载应用
app.mount("#app");
