<template>
  <div class="container">
    <div class="allS">
      <span> 全选： </span>
      <!-- 4. v-model 关联全选 - 选中状态 -->
      <input type="checkbox" v-model="isAll" />
      <button @click="selectOpposite">反选</button>
    </div>

    <ul>
      <li v-for="(obj, index) in arr" :key="index">
        <!-- 3. 对象.c - 关联 选中状态 -->
        <input type="checkbox" v-model="obj.c" />
        <label>{{ obj.name }}</label>
      </li>
    </ul>
  </div>
</template>

<script>
// 目标: 小选框 -> 全选
// 1. 标签+样式+js准备好
// 2. 把数据循环展示到页面上
//3. 对象.c - 关联 选中状态
// 4. 全选 - 计算属性 - get/set
// 5. 反选 - some方法 - 计算属性
export default {
  data() {
    return {
      arr: [
        {
          name: "猪八戒",
          c: false,
        },
        {
          name: "孙悟空",
          c: false,
        },
        {
          name: "唐僧",
          c: false,
        },
        {
          name: "白龙马",
          c: false,
        },
      ],
    };
  },
  computed: {
    isAll: {
      get() {
        // 6. 统计小选框状态 ->  全选状态
        // every口诀: 查找数组里"不符合"条件, 直接原地返回false
        console.log(
          "有人在读 isAll，当前组员状态：",
          this.arr.map((o) => o.c),
        );
        return this.arr.every((obj) => obj.c);
      },
      set(newVal) {
        // 7. 全选框 - 选中状态(true/false)
        console.log("有人在设置 isAll 为", newVal);
        this.arr.forEach((obj) => (obj.c = newVal));
      },
    },
  },
  methods: {
    selectOpposite() {
      // 8. 让数组里对象的c属性取反再赋予回去
      this.arr.forEach((obj) => (obj.c = !obj.c));
    },
  },
};
</script>

<style></style>
