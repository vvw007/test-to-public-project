<template>
  <form class="form" @submit.prevent="onSubmit">
    <h3>🔐 账号密码填写</h3>

    <div class="item">
      <label>用户名</label>
      <input v-model.trim="form.username" placeholder="请输入用户名" />
      <span class="error">{{ errors.username }}</span>
    </div>

    <div class="item">
      <label>密码</label>
      <input
        v-model.trim="form.password"
        type="password"
        placeholder="请输入密码"
      />
      <span class="error">{{ errors.password }}</span>
    </div>

    <button class="submit">下一步</button>
  </form>
</template>

<script setup>
import { reactive } from "vue";

const emit = defineEmits(["submit-account"]);

const form = reactive({
  username: "",
  password: "",
});

const errors = reactive({
  username: "",
  password: "",
});

const validate = () => {
  let valid = true;
  errors.username = "";
  errors.password = "";

  if (!form.username) {
    errors.username = "用户名不能为空";
    valid = false;
  }

  if (!form.password) {
    errors.password = "密码不能为空";
    valid = false;
  } else if (form.password.length < 6) {
    errors.password = "密码长度不能少于6位";
    valid = false;
  }

  return valid;
};

const onSubmit = () => {
  if (!validate()) return;
  emit("submit-account", {
    username: form.username,
    password: form.password,
  });
};
</script>

<style scoped>
.form {
  padding: 8px 0;
}
.item {
  margin-bottom: 16px;
}
label {
  display: block;
  margin-bottom: 6px;
  font-weight: 500;
}
input {
  width: 100%;
  padding: 8px 10px;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  font-size: 14px;
}
input:focus {
  outline: none;
  border-color: #409eff;
}
.error {
  color: #f56c6c;
  font-size: 12px;
  line-height: 1.5;
}
.submit {
  width: 100%;
  padding: 10px;
  background: #409eff;
  color: #fff;
  border: none;
  border-radius: 6px;
  font-size: 15px;
  cursor: pointer;
}
.submit:hover {
  background: #66b1ff;
}
</style>
