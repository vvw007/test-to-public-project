<
<template>
  <div id="app">
    <h3>{{ msg }}</h3>
    <!-- 4. 组件名当做标签使用 -->
    <!-- <组件名></组件名> -->
    <PannelG> </PannelG>
    <Pannel> </Pannel>
    <PannelG> </PannelG>
    <Pannel> </Pannel>
  </div>
</template>

<script>
// 目标: 局部注册 (用的多)
// 1. 创建组件 - 文件名.vue
// 2. 引入组件
import Pannel from "./components/Pannel.vue";
export default {
  // 3. 局部 - 注册组件
  /*
    语法: 
    components: {
      "组件名": 组件对象
    }
  */
  components: {
    Pannel: Pannel,
  },
  // 1. 准备变量
  data() {
    return {
      msg: "案例：折叠面板",
    };
  },
};
</script>

<style lang="scss">
// 变量：$color: red;
// 嵌套：父 { 子 { ... } }
// 混合器：@mixin xxx { ... } 和 @include xxx;
// 模块化：@use 'file.scss'
// 继承：@extend .XXX
$color: rgb(204, 204, 204);
body {
  background-color: $color;
  #app {
    width: 400px;
    margin: 20px auto;
    background-color: #fff;
    border-radius: 1em;
    box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.5);
    padding: 1em 2em 2em;
    border: 4px solid rgb(138, 43, 226);
    h3 {
      text-align: center;
    }
  }
}
</style>
>
