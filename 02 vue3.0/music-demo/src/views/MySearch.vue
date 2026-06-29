<template>
  <van-sticky>
    <van-search
      v-model="val"
      placeholder="请输入搜索关键词"
      shape="round"
      @click-input="searchFn"
    />
  </van-sticky>

  <!-- 未搜索时展示热搜 -->
  <div class="search_wrap" v-if="!isSearched">
    <p class="hot_title">热门搜索</p>
    <div class="hot_name_wrap">
      <span
        v-for="obj in hotSearchList"
        :key="obj.first"
        @click="hotFn(obj.first)"
        class="hot_item"
        >{{ obj.first }}</span
      >
    </div>
  </div>

  <!-- 已搜索时展示分页列表 -->
  <div class="search_wrap" v-else>
    <p class="title">搜索结果</p>

    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <van-list
        v-model:loading="loading"
        :finished="finished"
        finished-text="没有更多了"
        error-text="加载失败，点击重试"
        @load="onLoad"
      >
        <!-- <van-cell
          v-for="item in songList"
          :key="item.id"
          center
          :title="item.name"
          :label="item.artists[0].name + ' - ' + item.name"
        >
          <template #right-icon>
            <van-icon name="play-circle-o" size="0.5rem" />
          </template>
        </van-cell> -->
        <Song-item
          v-for="item in songList"
          :key="item.id"
          :id="item.id"
          :musicName="item.name"
          :author="item.artists[0].name"
        />
      </van-list>
    </van-pull-refresh>
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

// 目标: 搜索框-显示结果
// 1. @input给van-search绑定事件
// 2. @input事件中, 获取搜索结果保存 resultList中
// 3. 判断如果搜索关键字为空(.length === 0), 数组清空, 阻止网络请求执行(提前return)

// 目标: 加载更多
// 1. 集成list组件-定义相关的变量(搞懂变量的作用) -监测触底事件
// 2. 一旦触底, 自动执行onload方法
// 3. 对page++, 给后台传递offset偏移量参数-请求下一页的数据
// 4. 把当前数据和下一页新来的数据拼接起来用在当前 页面的数组里
// (切记) - 加载更多数据后,一定要把loading改成false, 保证下一次还能触发onload方法
import { ref, onMounted } from "vue";
import { hotSearchAPI, searchResultAPI } from "@/api";
import { showToast } from "vant";
import SongItem from "@/components/SongItem";

const val = ref("");
const hotSearchList = ref([]);
const isSearched = ref(false);

const songList = ref([]);
const loading = ref(false);
const finished = ref(false);
const refreshing = ref(false);
let currentPage = 1;
const pageSize = 20;
const timer = ref(null);

onMounted(async () => {
  try {
    const res = await hotSearchAPI();
    hotSearchList.value = res.data.result.hots;
  } catch (err) {
    console.error("热搜获取失败：", err);
  }
});

const fetchSongs = async (page) => {
  const offset = (page - 1) * pageSize;
  const res = await searchResultAPI({
    keywords: val.value,
    limit: pageSize,
    offset,
  });
  const result = res.data.result;
  return {
    list: result.songs || [],
    total: result.songCount || 0,
  };
};

const onLoad = async () => {
  try {
    const { list, total } = await fetchSongs(currentPage);

    if (list.length === 0) {
      finished.value = true;
      return;
    }

    songList.value.push(...list);
    currentPage++;

    if (songList.value.length >= total) {
      finished.value = true;
    }
  } catch (error) {
    showToast("加载失败，请点击重试");
    loading.value = false; // 失败时手动关闭 loading，显示重试按钮
  } finally {
    loading.value = false;
  }
};

const onRefresh = async () => {
  currentPage = 1;
  finished.value = false;

  try {
    const { list, total } = await fetchSongs(currentPage);
    songList.value = list;
    currentPage++;
    if (songList.value.length >= total) {
      finished.value = true;
    }
  } catch (error) {
    showToast("刷新失败");
  } finally {
    refreshing.value = false;
    loading.value = false;
  }
};

const resetAndLoad = () => {
  songList.value = [];
  currentPage = 1;
  finished.value = false;
  onLoad(); // 手动触发加载
};

const hotFn = (keyword) => {
  if (val.value === keyword && isSearched.value) return;
  val.value = keyword;
  isSearched.value = true;
  resetAndLoad();
};

const searchFn = () => {
  if (timer.value) clearTimeout(timer.value);
  timer.value = setTimeout(() => {
    currentPage = 1;
    if (val.value.trim() === "") {
      isSearched.value = false;
      songList.value = [];
      return;
    }
    isSearched.value = true;
    resetAndLoad();
  }, 900);
};
</script>

<style scoped>
.search_wrap {
  padding: 0.266667rem;
}
.hot_title {
  font-size: 0.32rem;
  color: #666;
}
.hot_name_wrap {
  margin: 0.266667rem 0;
}
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
</style>
