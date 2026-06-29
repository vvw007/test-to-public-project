<template>
  <div style="display: flex">
    <div>
      <!-- 
      目标: 父(App.vue) -> 子(MyProduct.vue) 分别传值进入
      需求: 每次组件显示不同的数据信息
      步骤(口诀):
        1. 子组件 - props - 变量 (准备接收)
        2. 父组件 - 传值进去
     -->
      <MyProduct
        v-for="(obj, ind) in list"
        :key="obj.id"
        :title="obj.proname"
        :price="obj.proprice"
        :intro="obj.info"
        :index="ind"
        @subprice="fn"
      ></MyProduct>
    </div>

    <div>
      <!-- 目标: 跨组件传值 -->
      <List :arr="list"></List>
    </div>
  </div>
</template>

<script>
// 1. 创建组件 (.vue文件)
// 2. 引入组件
import MyProduct from "./components/MyProduct_sub";
import List from "./components/List";
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
          proname: "超级无敌的冰激凌",
          proprice: 14.2,
          info: "炎热的夏天, 来个冰激凌了",
        },
      ],
    };
  },
  // 3. 注册组件
  components: {
    MyProduct,
    List,
  },
  methods: {
    fn(inde, price) {
      // 逻辑代码
      this.list[inde].proprice > 1 &&
        (this.list[inde].proprice = (this.list[inde].proprice - price).toFixed(
          2,
        ));
    },
  },
};
</script>

<style></style>
