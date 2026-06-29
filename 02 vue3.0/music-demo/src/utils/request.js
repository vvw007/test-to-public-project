// 目标: 请求数据 - 打印
// 1. 下载axios库, main.js - 全局绑定属性 (确保任意.vue文件可以都访问到这个axios方法)
import axios from "axios";

// 2. 基础地址
axios.defaults.baseURL = "http://localhost:3000";
export default axios;
