import { createApp } from "vue";
import App from "./App.vue";

// 导入样式和依赖
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import "@/mobile/flexible"; // 引入flexible适配库
import "@/styles/reset.css"; // 引入初始化样式
import router from "./router"; // 导入配置好的路由实例
import {
  Tabbar,
  TabbarItem,
  NavBar,
  Col,
  Row,
  Image as VanImage,
  Cell,
  CellGroup,
  Icon,
  Search,
  List,
  Sticky,
} from "vant";

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

// 获取数据
// 立即执行异步请求（不会阻塞挂载，但数据在组件挂载后可用）
/* (async () => {
  try {
    const res = await recommendMusicApi(); // api方法原地会得到axios请求在原地的Promise对象(里面有一个ajax请求)
    console.log(res);
  } catch (err) {
    console.error("请求失败：", err);
  }
})(); */

//2.0目标：vue-router基础使用
//2.1下载vue-router
//2.2引入
//import router from "./router"; // 导入配置好的路由实例
//2.3.注册全局组件,挂载路由
app.use(router);

// 目标: Vant组件库自动适配
// 自动让所有px转成rem (以后我们可以直接写px) - webpack配合postcss和postcss-pxtorem插件就可以翻译css代码, 把px转rem使用
// 1. 下载 postcss  postcss-pxtorem (要和当前脚手架webpack兼容)
// 2. postcss.config.js - 填入插件转换的基准值 (配置可以复制md)
// 3. 一定要重启服务器, 观察效果

// 使用vant的Tabbar 标签栏组件库
app.use(Tabbar);
app.use(TabbarItem);
app.use(NavBar);
app.use(Col);
app.use(Row);
app.use(VanImage);
app.use(Cell);
app.use(CellGroup);
app.use(Icon);
app.use(Search);
app.use(List);
app.use(Sticky);
// 挂载应用
app.mount("#app");
