<template>
  <form class="form" @submit.prevent="onSubmit">
    <h3>👤 个人信息填写</h3>

    <div class="item">
      <label>昵称</label>
      <input v-model.trim="form.nickname" placeholder="请输入昵称" />
      <span class="error">{{ errors.nickname }}</span>
    </div>

    <div class="item">
      <label>手机号</label>
      <input v-model.trim="form.phone" placeholder="请输入手机号" />
      <span class="error">{{ errors.phone }}</span>
    </div>

    <div class="item">
      <label>邮箱</label>
      <input v-model.trim="form.email" placeholder="请输入邮箱" />
      <span class="error">{{ errors.email }}</span>
    </div>

    <button class="submit">提交注册</button>
  </form>
</template>

<script setup>
import { reactive } from "vue";

const emit = defineEmits(["submit-info"]);

const form = reactive({
  nickname: "",
  phone: "",
  email: "",
});

const errors = reactive({
  nickname: "",
  phone: "",
  email: "",
});

/* 手机号正则 */
const phoneReg = /^1[3-9]\d{9}$/;
/* 邮箱正则 */
const emailReg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;

const validate = () => {
  let valid = true;
  errors.nickname = "";
  errors.phone = "";
  errors.email = "";

  if (!form.nickname) {
    errors.nickname = "昵称不能为空";
    valid = false;
  }

  if (!form.phone) {
    errors.phone = "手机号不能为空";
    valid = false;
  } else if (!phoneReg.test(form.phone)) {
    errors.phone = "手机号格式不正确";
    valid = false;
  }

  if (!form.email) {
    errors.email = "邮箱不能为空";
    valid = false;
  } else if (!emailReg.test(form.email)) {
    errors.email = "邮箱格式不正确";
    valid = false;
  }

  return valid;
};

const onSubmit = () => {
  if (!validate()) return;
  emit("submit-info", { ...form });
};
</script>

<style scoped>
/* 复用统一样式 */
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
