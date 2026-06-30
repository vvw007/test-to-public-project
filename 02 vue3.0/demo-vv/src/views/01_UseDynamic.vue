<template>
  <div>
    <!-- 注意comName.value值为组件名，不应使用字符串 -->
    <button @click="comName = UserName">账号密码填写</button>
    <button @click="comName = UserInfo">个人信息填写</button>
    <pre>{{ comName }}</pre>
    <!-- 点击按钮后能看到：
[Object]/ Object (UserName)
✅ 说明切换成功
如果一直是同一个对象
❌ 说明还在用字符串 -->

    <p>下面显示注册组件-动态切换:</p>
    <div style="border: 1px solid red">
      <component :is="comName"></component>
    </div>
  </div>
</template>

<script setup>
// 目标: 动态组件 - 切换组件显示
// 场景: 同一个挂载点要切换 不同组件 显示
// 1. 创建要被切换的组件 - 标签+样式
// 2. 引入到要展示的vue文件内, 注册
// 3. 变量-承载要显示的组件名
// 4. 设置挂载点<component :is="变量"></component>
// 5. 点击按钮-切换comName的值为要显示的组件名
import { ref, markRaw } from "vue";
import UserName from "../components/01/UserName";
import UserInfo from "../components/01/UserInfo";

// ✅ 必须是 ref
// 以及注意value值为组件，不应使用字符串
const comName = ref(markRaw(UserName));
</script>

<style></style>
