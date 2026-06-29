import { createApp } from "vue";
import App from "./App.vue";

//   导入样式和依赖
// main.js
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js"; // 全局激活所有 data 属性

createApp(App).mount("#app");
