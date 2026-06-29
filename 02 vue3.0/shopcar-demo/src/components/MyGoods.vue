<template>
  <div class="row border-bottom rounded p-3 mb-3">
    <div class="form-check d-flex align-items-center col-sm-1">
      <input
        class="form-check-input"
        type="checkbox"
        :checked="selected"
        @change="$emit('g-select', gObj.id, $event.target.checked)"
      />
      <label class="form-check-label"></label>
    </div>

    <div class="goodsImg col-sm-5 rounded border p-2">
      <div class="ratio ratio-1x1">
        <img
          :src="gObj.image"
          class="img-fluid rounded h-100 w-100"
          style="object-fit: contain"
          alt="goods"
        />
      </div>
    </div>

    <div class="d-flex flex-column justify-content-between col-sm-6 p-3">
      <div>
        <h2>{{ gObj.title }}</h2>
      </div>

      <div class="d-flex justify-content-between align-items-center">
        <div>
          <span class="text-danger">￥{{ gObj.price.toFixed(2) }}</span>
        </div>
        <MyCount
          :g-count="count"
          :c-obj="gObj"
          @update-count="handleCountChange"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";
import MyCount from "./MyCount.vue";

// 定义 Props
const props = defineProps({
  gObj: {
    type: Object,
    required: true,
  },
  selected: {
    type: Boolean,
    default: false,
  },
  count: {
    type: Number,
    default: 1,
  },
});

// 定义 Emits
const emit = defineEmits(["g-select", "count-change"]);

// 处理数量变化
const handleCountChange = (newVal) => {
  emit("count-change", props.gObj.id, newVal);
};
</script>

<style></style>
