<template>
  <div class="container">
    <h1>My App</h1>

    <nav class="top_wrap">
      <!-- router-link组件会被渲染成a标签, active-class属性: 定义被选中时的类名
      默认active-class是router-link-active, 也可以直接在样式里写
      .router-link-active 来定义选中状态的样式 也可以自定义类名,
      通过active-class属性来指定. -->
      <!-- <router-link to="/find" active-class="active-link">发现音乐</router-link>
      <router-link to="/my" active-class="active-link">我的音乐</router-link>
      <router-link to="/part" active-class="active-link">朋友</router-link>
      <router-link to="/nonexistent">404 Demo</router-link> -->
      <!--       <router-link to="/find">发现音乐</router-link>
      <router-link to="/my">我的音乐</router-link>
      <router-link to="/part?name=小传">朋友-小传</router-link>
      <router-link to="/part/小智">朋友-小智</router-link> -->
      <span
        @click="goTo('/find', 'Find')"
        :class="{ 'router-link-active': route.name === 'Find' }"
        >发现音乐</span
      >

      <span
        @click="goTo('/my', 'My')"
        :class="{ 'router-link-active': route.name === 'My' }"
        >我的音乐</span
      >

      <span
        @click="goTo('/part', 'Part')"
        :class="{ 'router-link-active': route.name === 'Part' }"
        >朋友</span
      >
      <!-- 或按如下写法 -->
      <!--       
      <span
        @click="goTo('/find')"
        :class="{ 'router-link-active': route.path === '/find' }"
      >发现音乐</span>

      <span
        @click="goTo('/my')"
        :class="{ 'router-link-active': route.path === '/my' }"
      >我的音乐</span>

      <span
        @click="goTo('/part')"
        :class="{ 'router-link-active': route.path === '/part' || route.path.startsWith('/part/') }"
      >朋友</span>
       -->
      <!-- 对 /part 用了 startsWith('/part/') 是为了让动态路由 /part/xxx 也高亮。 -->
      <!-- 如果需要传参，可写成：
      <span @click="goTo('/part?name=小传')">朋友-小传</span>
      <span @click="goTo('/part/小智')">朋友-小智</span>
      -->

      <!-- <router-link to="/nonexistent">404 Demo</router-link> -->
      <!-- 等价于 
       <a href="#/find">发现音乐</a>
      <a href="#/my">我的音乐</a>
      <a href="#/part">朋友</a> -->
    </nav>

    <hr />

    <main class="top">
      <router-view></router-view>
    </main>
  </div>
</template>

<script setup>
// 导航方式：编程式导航写法
/* import { useRouter, useRoute } from "vue-router";

const router = useRouter();
const route = useRoute();

// 跳转函数
function goTo(path) {
  router.push(path);
} */
import { useRouter, useRoute } from "vue-router";

const router = useRouter();
const route = useRoute();

// 虽然用name跳转, 但是url的hash值还是切换path路径值
// 场景:
// 方便修改: name路由名(在页面上看不见随便定义)
// path可以在url的hash值看到(尽量符合组内规范)

function goTo(path, name) {
  router.push(name);
}

//目标：声明式导航-传值
//方式1：
//to="/path?参数名=值"
//接收：$route.query.参数名
//方式2:
//(1）：路由规则path上定义/path/：参数名
// (2): to="/path/值"
//接收：$route.params.参数名
</script>

<style scoped lang="scss">
.top_wrap {
  position: fixed;
  left: 0;
  top: 60px;
  display: flex;
  width: 100%;
  text-align: center;
  background-color: #333;
  color: #ccc;

  span {
    flex: 1;
    text-decoration: none;
    padding: 20px 0;
    line-height: 20px;
    background-color: #333;
    color: #ccc;
    border: 1px solid black;
    cursor: pointer; /* 鼠标改成手型，更像链接 */

    &:hover {
      background-color: #555;
    }

    // 用 & 表示父选择器 .top_wrap a，然后追加 .active-link
    /*   &.active-link {
      font-weight: bold;
      color: #42b983; // 现在优先级足够，会覆盖默认颜色

      // 甚至可以定义激活状态下的悬停效果
      &:hover {
        background-color: #666;
      } */
    &.router-link-active {
      font-weight: bold;
      color: #42b983; // 现在优先级足够，会覆盖默认颜色
      background-color: rgb(67, 17, 114);
    }
  }
}

.top {
  padding-top: 62px;
}
</style>
