<template>
  <div class="my-header" :style="{ backgroundColor: bgc, color: color }">
    {{ title }}
  </div>
</template>

<script setup>
import { defineProps } from "vue";

// 定义 Props
const props = defineProps({
  bgc: {
    type: String,
    default: "#f0f0f0",
  },
  color: {
    type: String,
    default: "#333",
  },
  title: {
    type: String,
    required: true,
  },
});
</script>

<style scoped>
.my-header {
  height: 45px;
  line-height: 45px;
  text-align: center;
  background-color: #1d7bff;
  color: #fff;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 2;
}
</style>
