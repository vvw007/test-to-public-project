<template>
  <div class="d-flex align-items-center">
    <button
      @click="decreaseCount"
      :disabled="localCount <= 1"
      class="btn btn-outline-secondary"
    >
      -
    </button>
    <input
      type="text"
      class="form-control text-center mx-2"
      style="width: 60px"
      :value="displayValue"
      @input="handleInput"
      @blur="handleBlur"
    />
    <button
      @click="increaseCount"
      :disabled="isMaxReached"
      class="btn btn-outline-secondary"
    >
      +
    </button>
  </div>
</template>

<script setup>
import { computed, defineProps, defineEmits, ref, watch } from "vue";

// 定义 Props
const props = defineProps({
  cObj: {
    type: Object,
    default: () => ({}),
  },
  gCount: {
    type: Number,
    default: 1,
  },
});

// 定义 Emits
const emit = defineEmits(["update-count"]);

// 显示在输入框中的值
const displayValue = ref(props["gCount"].toString());

// 获取最大库存数量
const maxStock = computed(() => {
  return props["cObj"]?.rating?.count || Infinity;
});

// 计算属性：当前实际值
const localCount = computed(() => {
  return props["gCount"];
});

// 检查是否已达到最大库存
const isMaxReached = computed(() => {
  return localCount.value >= maxStock.value;
});

// 监听父组件传递的 gCount 变化
watch(
  () => props["gCount"],
  (newVal) => {
    displayValue.value = newVal.toString();
  },
);

// 处理输入事件（实时更新显示值）
const handleInput = (event) => {
  displayValue.value = event.target.value;
};

// 处理输入框失焦（执行验证和修正）
const handleBlur = () => {
  let num = parseInt(displayValue.value, 10);

  // 1. 处理非数字输入
  if (isNaN(num)) {
    num = 1;
  }

  // 2. 处理负数：强制变为1
  if (num < 1) {
    num = 1;
  }

  // 3. 处理超出库存：强制变为库存数量
  if (num > maxStock.value) {
    num = maxStock.value;
  }

  // 触发事件通知父组件
  emit("update-count", num);

  // 立即更新显示值（不等待父组件响应）
  displayValue.value = num.toString();
};

// 增加数量
const increaseCount = () => {
  let num = localCount.value + 1;

  // 检查库存限制
  if (num > maxStock.value) {
    num = maxStock.value;
  }

  emit("update-count", num);
  displayValue.value = num.toString();
};

// 减少数量
const decreaseCount = () => {
  if (localCount.value > 1) {
    const num = localCount.value - 1;
    emit("update-count", num);
    displayValue.value = num.toString();
  }
};
</script>

<style></style>
