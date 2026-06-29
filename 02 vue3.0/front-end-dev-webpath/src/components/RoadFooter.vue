<template>
  <footer class="container RoadFooter col-sm-6">
    <!-- Content here -->
    <span>剩余{{ totalCount }}</span>
    <ul class="list-group list-group-horizontal">
      <li class="list-group-item">
        <!-- 👇 加上 ' ' 变成字符串 'all' -->
        <a
          href="#"
          class="list-group-item list-group-item-action"
          @click="filterAll('all')"
          >全部</a
        >
      </li>
      <li class="list-group-item">
        <!-- 👇 加上 ' ' 变成字符串 'no' -->
        <a
          href="#"
          class="list-group-item list-group-item-action"
          @click="filterUnlearned('no')"
          >未完成</a
        >
      </li>
      <li class="list-group-item">
        <!-- 👇 加上 ' ' 变成字符串 'yes' -->
        <a
          href="#"
          class="list-group-item list-group-item-action"
          @click="filterLearned('yes')"
          >已完成</a
        >
      </li>
    </ul>
    <button type="button" class="btn" @click="clearUp">清除已完成</button>
  </footer>
</template>

<script>
export default {
  data() {
    return {
      //sFilter: "all", // 过滤状态：all - 全部，no - 未完成，yes - 已完成
      // filteredItems: [],
    };
  },
  props: ["Farr"],
  methods: {
    filterAll(val) {
      // Implementation for filtering all items
      //this.filteredItems = this.Farr; // 显示全部 任务
      this.$emit("filteredI", val);
    },
    filterUnlearned(val) {
      // Implementation for filtering unlearned items
      // this.filteredItems = this.Farr.filter((obj) => !obj.learned); // 显示未完成 任务
      this.$emit("filteredI", val);
    },
    filterLearned(val) {
      // Implementation for filtering learned items
      // this.filteredItems = this.Farr.filter((obj) => obj.learned); // 显示已完成 任务
      this.$emit("filteredI", val);
    },
    clearUp() {
      // Implementation for clearing completed items
      this.$emit("clearCompleted");
    },
  },
  computed: {
    totalCount() {
      return this.Farr.length;
    },
  },
};
</script>

<style scoped lang="scss">
.RoadFooter {
  display: flex;
  align-items: center; /* 垂直居中对齐（防止列表和按钮高度不一） */
  justify-content: flex-start;
  gap: 15px; /* 每个元素之间的间距 */
  width: 100%; /* 宽度铺满 */
  padding: 0 10px; /* 给整体加一点点左右内边距，防止太贴边 */
}
</style>
