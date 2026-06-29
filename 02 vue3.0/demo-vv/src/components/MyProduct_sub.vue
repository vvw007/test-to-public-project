<template>
  <div class="my-product">
    <h3>标题: {{ title }}</h3>
    <p>价格: {{ price }}元</p>
    <p>{{ intro }}</p>
    <!-- <button @click="kanFn">砍一刀，省1元</button> 
     -->
    <button @click="subFn">砍一刀，省1元</button>
  </div>
</template>

<script>
import EventBus from "../EventBus";
export default {
  props: ["index", "title", "price", "intro"],
  methods: {
    // kanFn() {
    //   // 1. 触发事件, @事件名="父方法"
    //   // 2. $emit("事件名", 数据) - 传递数据给父组件
    //   this.$emit("subprice", this.index, 1);
    // },
    subFn() {
      // 父子组件通信（父组件 App.vue 中监听 @subprice）
      this.$emit("subprice", this.index, 1);
      // 跨组件通信（通过 eventBus），传递一个对象作为唯一参数
      EventBus.emit("sendData", { inde: this.index, price: 1 }); // 跨组件
    },
  },
};
</script>

<style scoped>
.my-product {
  width: 400px;
  padding: 20px;
  border: 2px solid #000;
  border-radius: 5px;
  margin: 10px;
}
</style>
