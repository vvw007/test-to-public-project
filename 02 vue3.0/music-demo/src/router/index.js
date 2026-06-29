import { createRouter, createWebHistory } from "vue-router";
import MyLayout from "@/views/MyLayout.vue";
import MyHome from "@/views/MyHome.vue";
import MySearch from "@/views/MySearch.vue";
import MyPlay from "@/views/MyPlay.vue";
import NotFound from "@/views/NotFound.vue";

// 导入路由组件 (这里使用同步导入简化示例)
/* const Home = {
  template: "<h2>Home Page</h2><p>Welcome to the application home!</p>",
};
const About = {
  template: "<h2>About Us</h2><p>Learn more about this project.</p>",
};
 */
// 规则数组，定义路由记录数组
const routes = [
  {
    path: "/",
    redirect: "/layout", //重定向，访问/时自动跳转到/find
  },
  {
    path: "/layout",
    component: MyLayout,
    redirect: "/layout/home", //访问/layout时自动跳转到/layout/home
    children: [
      { path: "home", component: MyHome, meta: { title: "首页" } },
      { path: "search", component: MySearch, meta: { title: "搜索" } },
    ],
  },
  {
    path: "/play",
    component: MyPlay,
  },
  // 404 匹配 (放在最后)
  // 通配符放在最后，前面的规则都匹配不上时才会命中
  {
    path: "/:pathMatch(.*)*",
    component: NotFound,
  },
];

// 创建 Router 实例
const router = createRouter({
  // 使用 HTML5 History 模式 (推荐)
  history: createWebHistory(), //默认不写就是哈希模式，createWebHashHistory()，哈希模式会在路径前加#，createWebHistory()则不会
  routes, // 路由配置
});

export default router;
