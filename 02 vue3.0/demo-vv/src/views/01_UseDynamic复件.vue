<template>
  <div>
    <button @click="comName = 'UserName'">账号密码填写</button>
    <button @click="comName = 'UserInfo'">个人信息填写</button>

    <p>下面显示注册组件-动态切换:</p>
    <div style="border: 1px solid red">
      <component :is="comName" />
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import UserName from "../components/01/UserName";
import UserInfo from "../components/01/UserInfo";

// 响应式变量，存储当前要显示的组件名
const comName = ref("UserName");
</script>

<style>
/* 样式可根据需求自行补充 */
</style>

<!-- 其它vue2语法 -->
<template>
  <div>
    <button @click="comName = 'UserName'">账号密码填写</button>
    <button @click="comName = 'UserInfo'">个人信息填写</button>

    <p>下面显示注册组件-动态切换:</p>
    <div style="border: 1px solid red">
      <component :is="comName"></component>
    </div>
  </div>
</template>

<script>
// 目标: 动态组件 - 切换组件显示
// 场景: 同一个挂载点要切换 不同组件 显示
// 1. 创建要被切换的组件 - 标签+样式
// 2. 引入到要展示的vue文件内, 注册
// 3. 变量-承载要显示的组件名
// 4. 设置挂载点<component :is="变量"></component>
// 5. 点击按钮-切换comName的值为要显示的组件名

import UserName from "../components/01/UserName";
import UserInfo from "../components/01/UserInfo";
export default {
  data() {
    return {
      comName: "UserName",
    };
  },
  components: {
    UserName,
    UserInfo,
  },
};
</script>

<style></style>
