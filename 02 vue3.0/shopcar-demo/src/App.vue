<template>
  <div class="container">
    <MyHeader title="大润发超市购物车" bgc="yellow" color="#333" />
    <div class="flex-column mt-5 mb-5">
      <MyGoods
        v-for="obj in list"
        :key="obj.id"
        :g-obj="obj"
        :selected="obj.selected"
        :count="obj.count"
        @g-select="selectFn"
        @count-change="countChangeFn"
      />
    </div>
    <MyFooter :cart-items="list" @f-isall="isallFn" />
  </div>
</template>

<script setup>
import { getCurrentInstance, ref, onMounted } from "vue";

import MyHeader from "./components/MyHeader.vue";
import MyGoods from "./components/MyGoods.vue";
import MyFooter from "./components/MyFooter.vue";

// 获取 axios
const instance = getCurrentInstance();
const axios = instance.appContext.config.globalProperties.$axios;

// 商品列表
const list = ref([]);

// 获取数据
onMounted(async () => {
  try {
    const res = await axios.get("/products");
    list.value = res.data.map((item) => ({
      ...item,
      count: 1,
      selected: false,
    }));
  } catch (err) {
    console.error("请求失败：", err);
  }
});

// 处理单个商品选中状态
const selectFn = (gId, selected) => {
  const item = list.value.find((item) => item.id === gId);
  if (item) {
    item.selected = selected;
  }
};

// 处理商品数量变化
const countChangeFn = (gId, newCount) => {
  const item = list.value.find((item) => item.id === gId);
  if (item) {
    item.count = Math.max(0, parseInt(newCount) || 0);
  }
};

// 处理全选/取消全选
const isallFn = (value) => {
  list.value.forEach((item) => {
    item.selected = value;
  });
};
</script>

<style>
/* 样式保持不变 */
</style>
