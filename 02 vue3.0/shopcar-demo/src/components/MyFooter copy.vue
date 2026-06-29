<template>
  <div class="border-top d-flex justify-content-between mb-3">
    <!-- d-flex align-items-center col-sm -->
    <div class="form-check">
      <input
        class="form-check-input"
        type="checkbox"
        id="check1"
        name="option1"
        value="something"
        v-model="isAll"
      />
      <label class="form-check-label">全选</label>
    </div>
    <!-- w-40 col-sm d-flex align-items-center p-2 -->
    <div class="">
      合计：<span class="text-danger">￥: {{ totalAmount }}</span>
    </div>
    <!-- class="col-sm p-2 w-20" -->
    <div>
      <button type="button" class="btn btn-primary">
        结算 {{ totalCount }}
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      totalAmount: 0,
      totalCount: 0,
      isAll: false,
    };
  },
  computed: {
    // 计算属性：当依赖的响应式数据发生变化时，自动重新计算
    // 这里 totalAmount 和 totalCount 都是依赖于父组件传来的数据（如购物车商品列表）
    // 当父组件数据变化时，这些计算属性会自动更新
    isAll: {
      get() {
        // 这里应该根据父组件传来的商品列表来判断是否全选
        // 例如：return this.cartItems.every(item => item.selected);
        return this._isAll;
      },
      set(value) {
        this.$emit("f-isall", value);
        // 这里应该通知父组件更新所有商品的选中状态
        // 例如：this.$emit('update:isAll', value);
      },
    },
  },
};
</script>

<style></style>
