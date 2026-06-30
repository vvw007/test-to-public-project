<template>
  <div>
    <!-- 注意comName.value值为组件名，不应使用字符串 -->
    <button @click="comName = UserName">账号密码填写</button>
    <button @click="comName = UserInfo">个人信息填写</button>

    <p>下面显示注册组件-动态切换：</p>
    <div style="border: 1px solid red">
      <keep-alive>
        <component :is="comName" />
      </keep-alive>
    </div>
  </div>
</template>

<script setup>
import { ref, markRaw } from "vue";
import UserName from "../components/02/UserName.vue";
import UserInfo from "../components/02/UserInfo.vue";

// ✅ 必须是 ref
// 以及注意value值为组件，不应使用字符串
const comName = ref(markRaw(UserName));
</script>
