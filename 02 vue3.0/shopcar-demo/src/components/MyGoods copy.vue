<template>
  <div class="row border-bottom rounded p-3 mb-3">
    <div class="form-check d-flex align-items-center col-sm-1">
      <input
        class="form-check-input"
        type="checkbox"
        id="check1"
        name="option1"
        v-model="gCheckedarr"
      />
      <!-- @change="gChecked" -->
      <label class="form-check-label"></label>
    </div>

    <div class="goodsImg col-sm-5 rounded border p-2">
      <img :src="gObj.image" class="w-100" alt="goods" />
    </div>

    <div class="d-flex flex-column justify-content-between col-sm-6 p-3">
      <div class="">
        <h2>{{ gObj.title }}</h2>
      </div>

      <div class="d-flex justify-content-between">
        <div>
          <span class="text-danger">￥: {{ gObj.price }}</span>
        </div>
        <!-- 数量控制,采用引入子组件 -->
        <MyCount :gCount="mCount" :cObj="gObj" @updateCount="updateFn" />
        <!-- <MyCount v-model:gCount /> -->
        <!-- <MyCount v-model:gCount="myCount" /> -->
        <!-- <p>简介: {{ gObj.description }}</p> -->
      </div>
    </div>
  </div>
</template>

<script>
import MyCount from "./MyCount.vue";
export default {
  data() {
    return {
      mCount: 1,
      gCheckedarr: false, // 直接用布尔值 ;
    };
  },
  props: {
    // gSelected: { type: Array, default: () => [] },
    gObj: Object,
  },
  components: {
    MyCount,
  },
  methods: {
    updateFn(newCount) {
      // let num = parseInt(newCount, 10);
      // if (isNaN(num)) {
      //   num = 0;
      // }
      // num = Math.max(num, 0);
      // const maxCount = this.cObj.rating.count;
      // num = Math.min(num, maxCount);
      // if (num > maxCount) num = maxCount;
      // this.mCount = num;
      // this.mCount = newCount >= 0 ? newCount : 0;
      this.mCount = newCount;
    },
    // gChecked() {
    //   console.log("选中状态改变，当前选中数组：", this.gCheckedarr);
    //   this.$emit("gSelect", this.gObj.id, this.gCheckedarr);
    // },
  },
  watch: {
    gCheckedarr(newVal) {
      this.$emit("gSelect", this.gObj.id, newVal);
    },
  },
};
</script>

<style></style>
