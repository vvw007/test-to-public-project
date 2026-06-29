<
<template>
  <div class="container">
    <!-- Content here -->
    <!-- 顶部框架模块 -->
    <div class="form-group">
      <div class="input-group">
        <h1>品牌管理</h1>
      </div>
    </div>

    <!-- 数据表格 -->
    <table class="table table-hover table-bordered">
      <thead>
        <tr>
          <th scope="col">编号</th>
          <th scope="col">资产名称</th>
          <th scope="col">价格</th>
          <th scope="col">创建时间</th>
          <th scope="col">操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="obj in list" :key="obj.id">
          <td>{{ obj.id }}</td>
          <td>{{ obj.name }}</td>
          <!-- 如果价格超过100，就有ext-danger这个类 -->
          <td :class="{ 'text-danger': obj.price > 100 }">{{ obj.price }}</td>
          <td>{{ $moment(obj.time).format("YYYY-MM-DD HH:mm:ss") }}</td>
          <td>
            <a href="#" @click.prevent="deleteAsset(obj.id)">删除</a>
          </td>
        </tr>
        <!-- 9. 统计得有数据才显示 -->
        <tr class="table-light" v-show="list.length !== 0">
          <td>统计</td>
          <td colspan="2">总价钱为：{{ total }}</td>
          <td colspan="2">平均价为：{{ average }}</td>
        </tr>
      </tbody>

      <tfoot v-show="list.length === 0">
        <tr>
          <td colspan="5" style="text-align: center">暂无数据</td>
        </tr>
      </tfoot>
    </table>

    <!-- 添加资产表单区域 -->
    <form class="form-inline">
      <div class="form-group row g-3">
        <div class="col-sm-3">
          <input
            type="text"
            class="form-control"
            placeholder="资产名称"
            v-model.trim="name"
          />
        </div>

        <div class="col-sm-3">
          <!-- 修复价格如果为汉字字母等bug， 改为数字更严谨 -->
          <input
            type="number"
            class="form-control"
            placeholder="价格"
            v-model.number="price"
          />
        </div>

        <div class="col-sm-2">
          <!-- 阻止表单提交 ,注意 ： type="button" 的按钮不会触发表单提交 -->
          <!-- <button type="button" class="btn btn-primary" @click="addAsset">添加资产</button> -->
          <button class="btn btn-primary" @click.prevent="addAsset">
            添加资产
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { setBlockTracking } from "vue";

// 1. 明确需求
// 2. 标签+样式+默认数据
// 3. 下载bootstrap, main.js引入bootstrap.css
// 4. 把list数组 - 铺设表格
// 5. 修改价格颜色

// 目标: 新增
// 1. 按钮 - 事件
// 2. 给表单v-model绑定vue变量

// 目标: 删除功能/添加缓存
// 1. 删除a标签-点击事件
// 2. 对应方法名
// 3. 数据id到事件方法中
// 4. 通过id, 找到这条数据在数组中的下标
// 5. splice方法删除原数组里的对应元素
// 6. 设置tfoot, 无数据给出提示
// 7. 无数据再新增, id要判断一下
// 8. 添加watch监听器, 监听list数组的变化, 把list数组存储到本地localStorage中, 刷新页面时从localStorage中取出数据并赋值给list数组
// 9. 修复平均价格的bug, 当没有数据时, 平均价格应该为0, 而不是NaN
export default {
  // 1. 准备变量
  data() {
    return {
      name: "", // 名称
      price: 0, // 价格
      // 8.1 侦听器-list数组
      // list:
      // 本地取出数据
      list: localStorage.getItem("plist")
        ? JSON.parse(localStorage.getItem("plist"))
        : [],
    };
  },
  computed: {
    // 计算属性
    total() {
      // 求总和
      return this.list.reduce((sum, obj) => sum + obj.price, 0);
    },
    average() {
      // 求平均值
      return this.list.length ? this.total / this.list.length : 0;
    },
  },
  // 2. 准备方法
  methods: {
    addAsset() {
      // 添加资产的逻辑
      // 非空判断
      // if (!this.name || isNaN(this.price) || this.price <= 0) {
      //   alert("请输入有效的资产名称和价格！");
      //   return;
      // }
      // 如果按上面的方式判断价格, 那么如果输入了汉字, 价格就会被转换成NaN, 这样就会弹出提示了，对应的输入框就无需定义v-model.number了
      if (!this.name || this.price <= 0) {
        alert("请输入有效的资产名称和价格！");
        return;
      }
      // 3. 把值以对象形式-插入list数组中
      this.list.push({
        // 解决bug: 无数组新增-list没有数据, id需要给一个固定值(以后id都是后台生成, 现在是模拟给一个id)
        // 暂时有个bug：如果删除了最后一条数据, 那么id就会重复了
        id: this.list.length ? this.list[this.list.length - 1].id + 1 : 100, // 当前数组最后一个对象的id+1作为新对象id值
        name: this.name,
        price: this.price,
        time: new Date(), // 当前时间
      });
      // 清空输入框
      this.name = "";
      this.price = 0;
    },
    deleteAsset(id) {
      // 删除资产的逻辑
      // 4. 通过id, 找到这条数据在数组中的下标
      let index = this.list.findIndex((obj) => obj.id === id);
      if (index !== -1) {
        // 5. splice方法删除原数组里的对应元素
        this.list.splice(index, 1);
      }
    },
  },
  watch: {
    // 监听器
    list: {
      // 8.2. 存入本地
      handler() {
        localStorage.setItem("plist", JSON.stringify(this.list));
      },
      deep: true, // 深度监听，监听对象内部的变化
      immediate: true, // 立即执行一次handler，获取初始值
    },
  },
};
</script>

<style>
.text-danger {
  color: red;
}
</style>
