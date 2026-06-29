<template>
  <div>
    <!-- 
      目标: 父(App.vue) -> 子(MyProduct.vue) 分别传值进入
      需求: 每次组件显示不同的数据信息
      步骤(口诀):
        1. 子组件 - props - 变量 (准备接收)
        2. 父组件 - 传值进去
     -->
    <MyProduct
      v-for="obj in list"
      :key="obj.id"
      :title="obj.proname"
      :price="obj.proprice"
      :intro="obj.info"
    ></MyProduct>
  </div>
</template>

<script>
// 1. 创建组件 (.vue文件)
// 2. 引入组件
import MyProduct from "./components/MyProduct";
export default {
  data() {
    return {
      list: [
        {
          id: 1,
          proname: "超级好吃的棒棒糖",
          proprice: 18.8,
          info: "开业大酬宾, 全场8折",
        },
        {
          id: 2,
          proname: "超级好吃的大鸡腿",
          proprice: 34.2,
          info: "好吃不腻, 快来买啊",
        },
        {
          id: 3,
          proname: "超级无敌的棒棒糖",
          proprice: 14.2,
          info: "棒棒糖界的扛把子, 你值得拥有",
        },
        {
          id: 4,
          proname: "炸鸡啤酒花生可乐套餐",
          proprice: 30.5,
          info: "美味可口的炸鸡啤酒花生可乐套餐, 让你享受美食的同时也能畅饮可乐，满足你的味蕾！",
        },
      ],
    };
  },
  // 3. 注册组件
  components: {
    // MyProduct: MyProduct // key和value变量名同名 - 简写
    MyProduct,
  },
};
</script>

<style></style>
