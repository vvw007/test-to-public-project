import { createApp } from "vue";
import App from "./App.vue";

// 导入样式和依赖
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import moment from "moment";
import "./assets/fonts/iconfont.css"; // 引入字体图标css文件
// 注册全局组件
import Pannel from "./components/Pannel_1.vue";

// 全局注册组件
const app = createApp(App);

/* // 全局指令 - 到处"直接"使用
Vue.directive("gfocus", {
  inserted(el) {
    el.focus(); // 触发标签的事件方法
  },
});

// 目标: 自定义指令传值
Vue.directive("color", {
  inserted(el, binding) {
    el.style.color = binding.value;
  },
  update(el, binding) {
    el.style.color = binding.value;
  },
}); */

// 全局注册 moment
app.config.globalProperties.$moment = moment;
// 语法:
//   Vue.component("组件名", 组件对象)
app.component("PannelG", Pannel);

// 挂载应用
app.mount("#app");
