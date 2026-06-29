<template>
  <div class="container RoadApp">
    <RoadHeader :hArr="learnList" @addL="addFn" @isAll="isAllFn" />
    <RoadMain :arr="reShow" @delete="delFn" />
    <RoadFooter
      :Farr="reShow"
      @filteredI="filteredFn"
      @clearCompleted="clearFn"
    />
  </div>
</template>

<script>
// 1. 目标: 创建工程-准备相关组件文件-标签+样式 (静态)
// 1.0 样式引入
import "./styles/index.css";
import "./styles/base.css";
// 1.1 组件引入
import RoadHeader from "./components/RoadHeader.vue";
import RoadMain from "./components/RoadMain.vue";
import RoadFooter from "./components/RoadFooter.vue";
export default {
  components: {
    RoadHeader,
    RoadMain,
    RoadFooter,
  },
  // 2. 目标: 铺设待学习任务
  // 2.0 - 准备数据
  /* data() {
    return {
      // learnList: [
      //   { id: 1, name: "Html", learned: true },
      //   { id: 2, name: "Css", learned: false },
      //   { id: 3, name: "JavaScript", learned: true },
      //   { id: 4, name: "JQuery", learned: false },
      //   { id: 5, name: "Ajax", learned: false },
      //   { id: 6, name: "Git", learned: false },
      //   { id: 7, name: "Node.js", learned: false },
      //   { id: 8, name: "Npm", learned: false },
      //   { id: 9, name: "Express", learned: false },
      //   { id: 10, name: "Database", learned: false },
      //   { id: 11, name: "Api_server", learned: false },
      //   { id: 12, name: "Webpack", learned: false },
      //   { id: 13, name: "Vue", learned: false },
      //   { id: 14, name: "React", learned: false },
      //   { id: 15, name: "Angular", learned: false },
      // ]
      learnList: JSON.parse(localStorage.getItem("plearnList")) || [
        { id: 1, name: "Html", learned: true },
        { id: 2, name: "Css", learned: false },
        { id: 3, name: "JavaScript", learned: true },
        { id: 4, name: "JQuery", learned: false },
        { id: 5, name: "Ajax", learned: false },
        { id: 6, name: "Git", learned: false },
        { id: 7, name: "Node.js", learned: false },
        { id: 8, name: "Npm", learned: false },
        { id: 9, name: "Express", learned: false },
        { id: 10, name: "Database", learned: false },
        { id: 11, name: "Api_server", learned: false },
        { id: 12, name: "Webpack", learned: false },
        { id: 13, name: "Vue", learned: false },
        { id: 14, name: "React", learned: false },
        { id: 15, name: "Angular", learned: false },
      ],
      // 当前选中的过滤状态：'all' | 'no' | 'yes'
      currentFilter: "all",
    };
  }, */
  //优化：设置不显示空数据，设置默认数据，保证历史数据存储，并且当数据损坏时回退到默认数据。
  data() {
    const defaultList = [
      { id: 1, name: "Html", learned: true },
      { id: 2, name: "Css", learned: true },
      { id: 3, name: "JavaScript", learned: true },
      { id: 4, name: "JQuery", learned: true },
      { id: 5, name: "Ajax", learned: true },
      { id: 6, name: "Git", learned: true },
      { id: 7, name: "Node.js", learned: true },
      { id: 8, name: "Npm", learned: true },
      { id: 9, name: "Express", learned: true },
      { id: 10, name: "Database", learned: true },
      { id: 11, name: "Api_server", learned: true },
      { id: 12, name: "Webpack", learned: true },
      { id: 13, name: "Vue", learned: false },
      { id: 14, name: "React", learned: false },
      { id: 15, name: "Angular", learned: false },
    ];

    const stored = localStorage.getItem("plearnList");
    let initList = defaultList;

    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        // 只有当解析结果是数组且长度 > 0 时才使用，否则用默认
        if (Array.isArray(parsed) && parsed.length > 0) {
          initList = parsed;
        }
      } catch (e) {
        // 如果存储格式损坏，也回退到默认
      }
    }

    return {
      learnList: initList,
      currentFilter: "all",
    };
  },
  watch: {
    learnList: {
      //handler(newVal, oldVal) {
      //learnList里的对象
      //console.log(newVal, oldVal);
      // 存储到本地localStorage中
      //localStorage.setItem("plearnList", JSON.stringify(newVal));
      handler() {
        //learnList里的对象
        // 存储到本地localStorage中
        localStorage.setItem("plearnList", JSON.stringify(this.learnList));
      },
      deep: true,
      immediate: true,
    },
  },
  // 2.1 - 添加功能
  methods: {
    addFn(newLearn) {
      let id =
        this.learnList.length === 0
          ? 1
          : this.learnList[this.learnList.length - 1].id + 1;
      this.learnList.push({
        id: id,
        name: newLearn,
        learned: false,
      });
    },
    delFn(ind) {
      let index = this.learnList.findIndex((obj) => obj.id === ind);
      this.learnList.splice(index, 1);
    },
    filteredFn(status) {
      // 3. 目标: 实现过滤功能
      // 3.0 - 准备过滤状态
      // 3.1 - 设计过滤功能
      // 3.2 - 把过滤状态传递给组件
      // 3.3 - 根据过滤状态展示不同的任务列表
      this.currentFilter = status;
    },
    clearFn() {
      this.learnList = this.learnList.filter((obj) => obj.learned === false);
    },
    // 【新增】处理全选/全不选事件
    isAllFn(value) {
      // 直接修改父组件的 learnList，所有任务的 learned 状态设为 value
      this.learnList.forEach((obj) => {
        obj.learned = value;
      });
    },
  },
  computed: {
    // 核心逻辑：基于 currentFilter 动态计算要传给兄弟组件的数据
    reShow() {
      if (this.currentFilter === "all") {
        return this.learnList; // 显示全部 任务
      } else if (this.currentFilter === "no") {
        return this.learnList.filter((obj) => obj.learned === false); // 显示未完成 任务
      } else if (this.currentFilter === "yes") {
        return this.learnList.filter((obj) => obj.learned === true); // 显示已完成 任务
      }
      return this.learnList; // 增加默认显示全部
    },
  },
};
</script>

<style></style>
