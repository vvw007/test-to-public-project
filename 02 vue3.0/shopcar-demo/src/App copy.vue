<template>
  <div class="container">
    <MyHeader title="大润发超市购物车" bgc="yellow" color="#333" />
    <div class="flex-column mt-5 mb-5">
      <!-- 
      目标: 父(App.vue) -> 子(MyGoods.vue) 分别传值进入
      需求: 每次组件显示不同的数据信息
      步骤(口诀):
        1. 子组件 - props - 变量 (准备接收)
        2. 父组件 - 传值进去
     -->
      <MyGoods
        v-for="obj in list"
        :key="obj.id"
        :gObj="obj"
        :selected="obj.selected"
        :count="obj.count"
        @g-Select="selectFn"
        @count-change="countChangeFn"
      />
    </div>
    <MyFooter @f-isall="isallFn" />
  </div>
</template>

<script>
//引入子组件
import { ref, onMounted } from "vue";

import MyHeader from "./components/MyHeader.vue";
import MyGoods from "./components/MyGoods.vue";
import MyFooter from "./components/MyFooter.vue";
const list = ref([]);
export default {
  components: {
    MyHeader,
    MyGoods,
    MyFooter,
  },
  data() {
    return {
      list: [], // 商品所有数据
    };
  },
  created() {
    // 不必在自己引入axios变量, 而是直接使用全局属性$axios
    this.$axios({
      url: "/products",
      method: "get",
    })
      .then((res) => {
        console.log(res);
        // res.data 是商品数组，直接赋值
        this.list = res.data;
      })
      .catch((err) => {
        console.error("请求失败：", err);
      });
  },
  methods: {
    // isallFn(value) {
    //   // 处理全选/取消全选的逻辑
    //   console.log("全选状态改变为:", value);
    //   // 这里应该通知父组件更新所有商品的选中状态
    //   this.list.forEach((item) => {
    //     item.selected = value; // 假设每个商品对象都有一个 selected 属性
    //   });
    // },
    selectFn(gId, selected) {
      // 处理单个商品的选中状态改变
      console.log(`商品 ${gId} 的选中状态改变为:`, selected);
      const item = this.list.find((item) => item.id === gId);
      if (item) {
        item.selected = selected;
        console.log("更新后的商品列表：", this.list, this.list.select);
      }
    },
  },
};
</script>

<style></style>
