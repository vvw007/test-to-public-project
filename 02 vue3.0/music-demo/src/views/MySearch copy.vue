<template>
  <van-search
    v-model="val"
    placeholder="请输入搜索关键词"
    shape="round"
    @click-input="searchFn"
  />

  <div class="search_wrap" v-if="searchResultList.length === 0">
    <!-- 标题 -->
    <p class="hot_title">热门搜索</p>
    <!-- 标签容器 -->
    <div class="hot_name_wrap">
      <!-- 每个搜索关键词 -->
      <span
        v-for="(obj, index) in hotSearchList"
        :key="obj.index"
        @click="hotFn(obj.first)"
        class="hot_item"
        >{{ obj.first }}</span
      >
    </div>
  </div>

  <div class="search_wrap" v-else>
    <p class="title">搜索结果</p>

    <van-page-list :get-list="searchResultLis">
      <template #default="{ item }">
        <van-cell
          v-for="obj in searchResultList"
          :key="obj.id"
          center
          :title="obj.name"
          :label="obj.artists[0].name + `-` + obj.name"
        >
          <!-- 使用 right-icon 插槽来自定义右侧图标 -->
          <template #right-icon>
            <van-icon name="play-circle-o" size="0.5rem" />
          </template>
        </van-cell>
      </template>
    </van-page-list>
  </div>
</template>

<script setup>
// 目标: 铺设热搜关键字
// 1. 搜索框van-search组件, 关键词标签和样式
// 2. 找接口, api/Search.js里定义获取搜索关键词的请求方法
// 3. 引入到当前页面, 调用接口拿到数据循环铺设页面
// 4. 点击关键词把值赋予给van-search的v-model变量

// 目标: 铺设搜索结果
// 1. 找到搜索结果的接口 - api/Search.js定义请求方法
// 2. 再定义methods里getListFn方法(获取数据)
// 3. 在点击事件方法里调用getListFn方法拿到搜索结果数据
// 4. 铺设页面(首页van-cell标签复制过来)
// 5. 把数据保存到data后, 循环van-cell使用即可(切换歌手字段)
// 6. 互斥显示搜索结果和热搜关键词

import { ref, onMounted } from "vue";
import { hotSearchAPI, searchResultAPI } from "@/api";

const val = ref("");
const hotSearchList = ref([]);
const searchResultList = ref([]);

onMounted(async () => {
  try {
    const res = await hotSearchAPI(); // api方法原地会得到axios请求在原地的Promise对象(里面有一个ajax请求)
    // console.log(res);
    hotSearchList.value = res.data.result.hots;
  } catch (err) {
    console.error("请求失败：", err);
  }
});

// 2. 如果需要搜索函数，单独定义（可以放在 onMounted 外部或内部）
const getListFn = async () => {
  try {
    return await searchResultAPI({
      limit: 20,
      keywords: val.value,
    });
  } catch (err) {
    console.error("搜索失败：", err);
    throw err;
  }
  // 把搜索结果return出去
  // (难点):
  // async修饰的函数 -> 默认返回一个全新Promise对象
  // 这个Promise对象的结果就是async函数内return的值
  // 拿到getListFn的返回值用await提取结果
};

const hotFn = async (itemVal) => {
  val.value = itemVal;
  const res2 = await getListFn();
  console.log(res2);
  searchResultList.value = res2.data.result.songs;
};

const searchFn = async () => {
  if (val.value.length === 0) {
    searchResultList.value = [];
    return;
  }
  const res3 = await getListFn();
  console.log(res3);
  searchResultList.value = res3.data.result.songs;
};
</script>

<style scoped>
/* 搜索容器的样式 */
.search_wrap {
  padding: 0.266667rem;
}

/*热门搜索文字标题样式 */
.hot_title {
  font-size: 0.32rem;
  color: #666;
}

/* 热搜词_容器 */
.hot_name_wrap {
  margin: 0.266667rem 0;
}

/* 热搜词_样式 */
.hot_item {
  display: inline-block;
  height: 0.853333rem;
  margin-right: 0.213333rem;
  margin-bottom: 0.213333rem;
  padding: 0 0.373333rem;
  font-size: 0.373333rem;
  line-height: 0.853333rem;
  color: #333;
  border-color: #d3d4da;
  border-radius: 0.853333rem;
  border: 1px solid #d3d4da;
}
.title {
  padding: 0.266667rem 0.24rem;
  margin: 0 0 0.24rem 0;
  background-color: #eee;
  color: #333;
  font-size: 15px;
}

.song_name {
  font-size: 0.346667rem;
  padding: 0 0.08rem;
  margin-bottom: 0.266667rem;
  word-break: break-all;
  text-overflow: ellipsis;
  display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
  -webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
  -webkit-line-clamp: 2; /** 显示的行数 **/
  overflow: hidden; /** 隐藏超出的内容 **/
}
</style>
