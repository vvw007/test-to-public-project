<template>
  <div class="app">
    <h2>🚀 用户注册系统</h2>

    <!-- 切换按钮 -->
    <div class="tab">
      <button
        :class="{ active: comName === UserName }"
        @click="comName = UserName"
      >
        账号密码
      </button>
      <button
        :class="{ active: comName === UserInfo }"
        @click="comName = UserInfo"
      >
        个人信息
      </button>
    </div>

    <!-- 动态组件 -->
    <div class="panel">
      <keep-alive>
        <component
          :is="comName"
          @submit-account="handleAccountSubmit"
          @submit-info="handleInfoSubmit"
        />
      </keep-alive>
    </div>
  </div>
</template>

<script setup>
import { ref, markRaw } from "vue";
import UserName from "./components/01/UserName.vue";
import UserInfo from "./components/01/UserInfo.vue";

const comName = ref(markRaw(UserName));

/* 账号密码提交 */
const handleAccountSubmit = ({ username, password }) => {
  console.log("✅ 账号密码提交成功", { username, password });
  alert("账号密码验证通过，请继续填写个人信息");
  comName.value = UserInfo;
};

/* 个人信息提交 */
const handleInfoSubmit = (data) => {
  console.log("✅ 个人信息提交成功", data);
  alert("🎉 注册成功！请查看控制台输出");
};
</script>

<style>
* {
  box-sizing: border-box;
}
body {
  margin: 0;
  padding: 24px;
  font-family:
    -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue",
    Arial, sans-serif;
  background: #f4f6f8;
}
.app {
  max-width: 480px;
  margin: 0 auto;
  background: #fff;
  padding: 24px;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
}
h2 {
  text-align: center;
  margin-bottom: 24px;
}
.tab {
  display: flex;
  gap: 12px;
  margin-bottom: 24px;
}
.tab button {
  flex: 1;
  padding: 10px;
  border: 2px solid #409eff;
  background: #fff;
  color: #409eff;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
}
.tab button.active {
  background: #409eff;
  color: #fff;
}
.panel {
  min-height: 260px;
}
</style>
