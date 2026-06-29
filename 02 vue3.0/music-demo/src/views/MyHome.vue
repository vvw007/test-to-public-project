<template>
  <p class="title">推荐歌单</p>
  <van-row gutter="6">
    <van-col span="8" v-for="obj in recList" :key="obj.id">
      <van-image width="100%" height="3rem" fit="cover" :src="obj.picUrl" />
      <p class="song_name">{{ obj.name }}</p>
    </van-col>
  </van-row>

  <p class="title">最新音乐</p>
  <Song-item
    v-for="obj in newmusicList"
    :key="obj.id"
    :id="obj.id"
    :musicName="obj.name"
    :author="obj.song.artists[0].name"
  />
  <!-- <van-cell
    v-for="obj in newmusicList"
    :key="obj.id"
    center
    :title="obj.name"
    :label="obj.song.artists[0].name + `-` + obj.name"
  > -->
  <!-- 使用 right-icon 插槽来自定义右侧图标 -->
  <!-- <template #right-icon>
      <van-icon name="play-circle-o" size="0.5rem" />
    </template>
  </van-cell> -->
</template>

<script setup>
// 目标: 铺设推荐歌单
// 1. van-row和van-col来搭建外框布局
// 2. van-col里内容(van-image和p)
// 3. 调整间距和属性值
// 4. 调用封装的api/index.js-推荐歌单api方法
// 5. 拿到数据保存到data里变量-去上面循环标签

// 目标: 铺设最新音乐
// 1. van-cell铺设一套标签结构
// 2. 自定义右侧插槽里小图标, 调整垂直居中
// 3. api/Home.js和api/index.js-封装导出获取最新音乐接口方法
// 4. 获取数据循环铺设页面即可
import { recommendMusicApi, newMusicAPI } from "@/api";
import { ref, onMounted } from "vue";
import SongItem from "@/components/SongItem";

const recList = ref([]);
const newmusicList = ref([]);
// 获取数据
// 立即执行异步请求（不会阻塞挂载，但数据在组件挂载后可用）
onMounted(async () => {
  try {
    const res = await recommendMusicApi({ limit: 6 }); // api方法原地会得到axios请求在原地的Promise对象(里面有一个ajax请求)
    // console.log(res);
    recList.value = res.data.result;
    const res2 = await newMusicAPI({ limit: 20 });
    console.log(res2);
    newmusicList.value = res2.data.result;
  } catch (err) {
    console.error("请求失败：", err);
  }
});
</script>

<style scoped lang="scss">
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
