<template>
  <header class="container">
    <h1>Front-End-Dev-WebPath</h1>
    <label for="toggle-all"></label>
    <input
      id="toggle-all"
      class="toggle-all"
      type="checkbox"
      v-model="toggleAll"
    />
    <input
      class="add-learn"
      placeholder="输入任务名称-回车确认"
      autofocus
      @keydown.enter="addLearn"
      v-model="newLearn"
    />
  </header>
</template>

<script>
export default {
  data() {
    return {
      newLearn: "",
    };
  },
  props: ["hArr"],
  methods: {
    addLearn() {
      if (this.newLearn.trim().length === 0) {
        alert("任务名称不能为空");
        return;
      }
      this.$emit("addL", this.newLearn);
      this.newLearn = "";
    },
  },
  computed: {
    toggleAll: {
      set(value) {
        /* this.hArr.forEach((obj) => {
          obj.learned = value;
        }) */
        // 优化改正：直接发出事件，让父组件来处理数据的修改，保持单向数据流。 this.$emit("toggleAll", value);  通过事件把状态传递给父组件，由父组件来修改数据
        this.$emit("isAll", value);
      },
      get() {
        // 列表不为空且所有任务都已学习 -> 返回 true，否则返回 false
        return this.hArr.length > 0 && this.hArr.every((obj) => obj.learned);
      },
    },
  },
};
</script>

<style scoped></style>
