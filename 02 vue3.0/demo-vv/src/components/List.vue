<template>
  <ul class="my-list">
    <li v-for="(item, idx) in arr" :key="item.id">
      <span>{{ item.proname }}</span>
      <span>{{ item.proprice }}元</span>
    </li>
  </ul>
</template>

<script>
import EventBus from "../EventBus";

export default {
  props: ["arr"], // 接收父组件传入的数组
  mounted() {
    // mitt 只能接收一个参数，因此 payload 是一个对象 { inde, price }
    EventBus.on("sendData", (payload) => {
      const { inde, price } = payload;
      // 注意：这里的 this.arr 才是正确的 props 数据
      if (this.arr[inde] && this.arr[inde].proprice > 1) {
        this.arr[inde].proprice = (this.arr[inde].proprice - price).toFixed(2);
      }
    });
  },
  // 建议在组件卸载时移除监听（避免重复绑定）
  beforeUnmount() {
    EventBus.off("sendData");
  },
};
</script>

<style scoped>
.my-list {
  width: 400px;
  padding: 20px;
  border: 2px solid #000;
  border-radius: 5px;
  margin: 10px;
}
</style>
