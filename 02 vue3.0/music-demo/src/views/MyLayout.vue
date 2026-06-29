<template>
  <div>
    <van-nav-bar :title="activeTitle" />

    <div class="main">
      <!-- 二级路由-挂载点 -->
      <router-view></router-view>
    </div>

    <van-tabbar v-model="active" route>
      <van-tabbar-item replace to="/layout/home" icon="home-o"
        >首页</van-tabbar-item
      >
      <van-tabbar-item replace to="/layout/search" icon="search"
        >搜索</van-tabbar-item
      >
    </van-tabbar>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const active = ref(0);
const activeTitle = ref(route.meta.title); // "默认"顶部导航要显示的标题 (默认获取当前路由对象里的meta中title值);

// 监听路由 meta.title 的变化，动态更新顶部标题
watch(
  () => route.meta.title,
  (newTitle) => {
    activeTitle.value = newTitle;
  },
  { immediate: true }, // 立即执行，确保初始值正确
);
</script>

<style scoped>
/* 中间内容区域 - 容器样式(留好上下导航所占位置) */
.main {
  padding-top: 46px;
  padding-bottom: 50px;
}
</style>
