import { createRouter, createWebHistory } from "vue-router";
import Find from "../views/Find.vue";
import My from "../views/My.vue";
import Part from "../views/Part.vue";
import NotFound from "../views/NotFound.vue";
// 二级路由组件
import Recommend from "../views/Second/Recommend.vue";
import Ranking from "../views/Second/Ranking.vue";
import SongList from "../views/Second/SongList.vue";

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
    name: "Home",
    redirect: "/find", //重定向，访问/时自动跳转到/find
  },
  {
    path: "/find",
    name: "Find",
    component: Find,
    children: [
      {
        path: "recommend", //二级路由路径，访问路径为/find/recommend ,二级路由路径前不加/，如果加了/则表示绝对路径，访问路径为/recommend
        name: "Recommend",
        component: Recommend,
      },
      {
        path: "ranking",
        name: "Ranking",
        component: Ranking,
      },
      {
        path: "songlist",
        name: "SongList",
        component: SongList,
      },
    ],
  },
  {
    path: "/my",
    name: "My",
    component: My,
  },
  {
    path: "/part",
    name: "Part",
    component: Part,
  },
  {
    path: "/part/:username", //有：的表示要接收具体的值，表示动态路由参数，访问路径如：/part/zhangsan
    name: "PartUser",
    component: Part,
  },
  // 404 匹配 (放在最后)
  // 通配符放在最后，前面的规则都匹配不上时才会命中
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: NotFound,
  },
];

// 创建 Router 实例
const router = createRouter({
  // 使用 HTML5 History 模式 (推荐)
  history: createWebHistory(), //默认不写就是哈希模式，createWebHashHistory()，哈希模式会在路径前加#，createWebHistory()则不会
  routes, // 路由配置
});

// 目标: 路由守卫
// 场景: 当你要对路由权限判断时
// 语法: router.beforeEach((to, from, next)=>{//路由跳转"之前"先执行这里, 决定是否跳转})
// 参数1: 要跳转到的路由 (路由对象信息)    目标
// 参数2: 从哪里跳转的路由 (路由对象信息)  来源
// 参数3: 函数体 - next()才会让路由正常的跳转切换, next(false)在原地停留, next("强制修改到另一个路由路径上")
// 注意: 如果不调用next, 页面留在原地

// 例子: 判断用户是否登录, 是否决定去"我的音乐"/my
const isLogin = true; // 模拟登录状态，实际项目中应该根据实际情况进行判断
router.beforeEach((to, from, next) => {
  // console.log("to:", to);
  // console.log("from:", from);
  // console.log("next:", next);
  if (to.path === "/my" && isLogin === false) {
    // const isLogin = confirm("请问您是否登录了？");
    alert("请问您是否登录了？");
    next(false); //停留在原地,阻止路由跳转
  } else {
    next(); //正常跳转
  }
});

export default router;
