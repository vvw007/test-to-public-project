<template>
  <div
    class="border-top d-flex justify-content-between mb-3 align-items-center"
  >
    <!-- 全选复选框 -->
    <div class="form-check">
      <input
        class="form-check-input"
        type="checkbox"
        id="check1"
        v-model="localIsAll"
      />
      <label class="form-check-label" for="check1">全选</label>
    </div>

    <!-- 合计金额 -->
    <div>
      合计：<span class="text-danger">￥{{ totalAmount }}</span>
    </div>

    <!-- 结算按钮 -->
    <div>
      <button type="button" class="btn btn-primary">
        结算 ({{ totalCount }})
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed, defineProps, defineEmits } from "vue";

// 定义 Props
const props = defineProps({
  cartItems: {
    type: Array,
    default: () => [],
  },
});

// 定义 Emits
const emit = defineEmits(["f-isall"]);

// 计算属性：总金额
const totalAmount = computed(() => {
  if (!props.cartItems?.length) return "0.00";

  const total = props.cartItems
    .filter((item) => item.selected)
    .reduce((sum, item) => {
      const price = parseFloat(item.price) || 0;
      const count = parseInt(item.count) || 0;
      return sum + price * count;
    }, 0);

  return total.toFixed(2);
});

// 计算属性：选中商品总数量
const totalCount = computed(() => {
  if (!props.cartItems?.length) return 0;

  return props.cartItems
    .filter((item) => item.selected)
    .reduce((sum, item) => {
      return sum + (parseInt(item.count) || 0);
    }, 0);
});

// 计算属性：是否全选
const isAllSelected = computed(() => {
  if (!props.cartItems?.length) return false;
  return props.cartItems.every((item) => item.selected === true);
});

// 全选复选框的双向绑定
const localIsAll = computed({
  get() {
    return isAllSelected.value;
  },
  set(value) {
    emit("f-isall", value);
  },
});
</script>

<style>
/* 样式保持不变 */
</style>
