<template>
  <div>
    <button
      @click="decreaseCount"
      :disabled="localCount <= 1"
      class="btn btn-outline-light text-dark"
    >
      -
    </button>

    <input
      type="text"
      class="rounded border text-center w-25"
      :value="displayValue"
      @input="onInput"
      @blur="onBlur"
    />

    <button
      @click="increaseCount"
      :disabled="localCount >= (cObj?.rating?.count ?? Infinity)"
      class="btn btn-outline-light text-dark"
    >
      +
    </button>
  </div>
</template>

<script>
export default {
  props: {
    cObj: {
      type: Object,
      default: () => ({ rating: { count: Infinity } }),
    },
    gCount: {
      type: Number,
      default: 1,
    },
  },
  emits: ["updateCount"],
  data() {
    return {
      displayValue: this.gCount, // 接管显示
    };
  },
  computed: {
    // 仍然保留 localCount 方便按钮禁用判断
    localCount() {
      return this.gCount;
    },
  },
  watch: {
    // 外部 prop 变化时同步到输入框（比如父组件点击了加减按钮）
    gCount(newVal) {
      this.displayValue = newVal;
    },
  },
  methods: {
    onInput(e) {
      // 输入过程中只更新本地显示，不做任何校验
      this.displayValue = e.target.value;
    },
    onBlur() {
      let num = parseInt(this.displayValue, 10);
      if (isNaN(num)) num = 1;
      num = Math.max(num, 1); // 下限 1
      const max = this.cObj?.rating?.count;
      if (max != null) num = Math.min(num, max); // 上限

      // 同步到父组件
      this.$emit("updateCount", num);
      // 输入框立刻显示修正后的值（不依赖 prop 异步回传）
      this.displayValue = num;
    },
    increaseCount() {
      let num = this.gCount + 1;
      const max = this.cObj?.rating?.count;
      if (max != null && num > max) num = max;
      this.$emit("updateCount", num);
      this.displayValue = num;
    },
    decreaseCount() {
      let num = this.gCount - 1;
      if (num < 1) num = 1;
      this.$emit("updateCount", num);
      this.displayValue = num;
    },
  },
};
</script>
