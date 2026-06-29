<template>
  <div>
    <!-- 一级路由-显示地方 -->
    <router-view></router-view>
  </div>
</template>

<!-- <script setup>
import { onMounted, provide, ref } from "vue";
import { recommendMusicApi } from "@/api";

onMounted(async () => {
  try {
    const res = await recommendMusicApi(); // api方法原地会得到axios请求在原地的Promise对象(里面有一个ajax请求)
    console.log(res);
  } catch (err) {
    console.error("请求失败：", err);
  }
});
</script> -->

<style></style>
