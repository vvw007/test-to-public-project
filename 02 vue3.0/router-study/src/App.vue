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
      <router-link to="/find">发现音乐</router-link>
      <router-link to="/my">我的音乐</router-link>
      <router-link to="/part?name=小传">朋友-小传</router-link>
      <router-link to="/part/小智">朋友-小智</router-link>
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

<script>
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

  a {
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
