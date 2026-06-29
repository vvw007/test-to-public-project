<!-- <template>
  <h1 class="text-center mt-5">播放页</h1>
</template>

<script setup>
import { getSongByIdAPI, getLyricByIdAPI } from "@/api";
import { ref, onMounted } from "vue";

onMounted(async () => {
  try {
    const res = await getSongByIdAPI(); // api方法原地会得到axios请求在原地的Promise对象(里面有一个ajax请求)
    console.log(res);
    //recList.value = res.data.result;
    const res2 = await getLyricByIdAPI();
    console.log(res2);
    //newmusicList.value = res2.data.result;
  } catch (err) {
    console.error("请求失败：", err);
  }
});
</script>

<style></style>
 -->

<template>
  <div class="play">
    <!-- 模糊背景 -->
    <div
      class="song-bg"
      :style="`background-image: url(${
        songInfo?.al?.picUrl || ''
      }?imageView&thumbnail=360y360&quality=75&tostatic=0);`"
    ></div>

    <!-- 头部导航 -->
    <div class="header">
      <van-icon
        name="arrow-left"
        size="20"
        class="left-incon"
        @click="router.back()"
      />
    </div>

    <!-- 留声机 -->
    <div class="song-wrapper">
      <div
        class="song-turn ani"
        :style="`animation-play-state:${playState ? 'running' : 'paused'}`"
      >
        <div class="song-img">
          <img
            style="width: 100%"
            :src="`${
              songInfo?.al?.picUrl || ''
            }?imageView&thumbnail=360y360&quality=75&tostatic=0`"
            alt=""
          />
        </div>
      </div>

      <!-- 播放按钮 -->
      <div class="start-box" @click="audioStart">
        <span class="song-start" v-show="!playState"></span>
      </div>

      <!-- 歌词容器 -->
      <div class="song-msg">
        <h2 class="m-song-h2">
          <span class="m-song-sname"
            >{{ songInfo.name }}-{{ songInfo?.ar?.[0]?.name || "" }}</span
          >
        </h2>
        <div class="lrcContent">
          <p class="lrc">{{ curLyric }}</p>
        </div>
      </div>

      <!-- 唱臂 -->
      <div class="needle" :style="`transform: rotate(${needleDeg});`"></div>
    </div>

    <!-- 音频标签 -->
    <audio
      ref="audio"
      preload="true"
      :src="`https://music.163.com/song/media/outer/url?id=${id}.mp3`"
      @timeupdate="handleTimeUpdate"
    ></audio>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { getSongByIdAPI, getLyricByIdAPI } from "@/api";

// 路由
const router = useRouter();
const route = useRoute();
const id = route.query.id; // 从 query 获取歌曲 id

// 数据
const playState = ref(false);
const songInfo = ref({});
const lyric = ref({});
const curLyric = ref("");
const lastLy = ref("");

// 音频 DOM 引用
const audio = ref(null);

// 计算属性：唱臂角度
const needleDeg = computed(() => (playState.value ? "-7deg" : "-38deg"));

// 获取歌曲详情和歌词
const getSong = async () => {
  try {
    const res = await getSongByIdAPI(id);
    songInfo.value = res.data.songs[0];
    const lyrRes = await getLyricByIdAPI(id);
    const lyricStr = lyrRes.data.lrc.lyric;
    lyric.value = formatLyric(lyricStr);
    // 初始化显示第一句歌词
    curLyric.value = lyric.value[0] || "";
  } catch (err) {
    console.error("获取歌曲信息失败：", err);
  }
};

// 格式化歌词（将字符串转为 { 秒数: 歌词 } 对象）
const formatLyric = (lyricStr) => {
  const reg = /\[.+?\]/g;
  const timeArr = lyricStr.match(reg) || [];
  const contentArr = lyricStr.split(/\[.+?\]/).slice(1);
  const lyricObj = {};

  timeArr.forEach((item, index) => {
    const minute = parseInt(item.split(":")[0].replace("[", ""));
    const second = parseFloat(item.split(":")[1].replace("]", ""));
    const totalSeconds = Math.floor(minute * 60 + second);
    lyricObj[totalSeconds] = contentArr[index] || "";
  });

  return lyricObj;
};

// 播放 / 暂停切换
const audioStart = () => {
  if (playState.value) {
    audio.value.pause();
  } else {
    audio.value.play();
  }
  playState.value = !playState.value;
};

// 监听进度，更新当前歌词
const handleTimeUpdate = () => {
  if (!audio.value) return; // 🔥 关键修复
  const curTime = Math.floor(audio.value.currentTime);
  const currentLyric = lyric.value[curTime];
  if (currentLyric) {
    curLyric.value = currentLyric;
    lastLy.value = currentLyric;
  } else {
    curLyric.value = lastLy.value;
  }
};

// 生命周期
onMounted(() => {
  getSong();
});
</script>

<style scoped lang="scss">
/* 样式完全保留，无变化 */
.header {
  height: 50px;
}
.play {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1000;
}
.song-bg {
  background-color: #161824;
  background-position: 50%;
  background-repeat: no-repeat;
  background-size: auto 100%;
  transform: scale(1.5);
  transform-origin: center;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  height: 100%;
  overflow: hidden;
  z-index: 1;
  opacity: 1;
  filter: blur(25px);
}
.song-bg::before {
  content: " ";
  background: rgba(0, 0, 0, 0.5);
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
}
.song-wrapper {
  position: fixed;
  width: 247px;
  height: 247px;
  left: 50%;
  top: 50px;
  transform: translateX(-50%);
  z-index: 10001;
}
.song-turn {
  width: 100%;
  height: 100%;
  background: url("./img/bg.png") no-repeat;
  background-size: 100%;
}
.start-box {
  position: absolute;
  width: 156px;
  height: 156px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  justify-content: center;
  align-items: center;
}
.song-start {
  width: 56px;
  height: 56px;
  background: url("./img/start.png");
  background-size: 100%;
}
.needle {
  position: absolute;
  transform-origin: left top;
  background: url("./img/needle-ab.png") no-repeat;
  background-size: contain;
  width: 73px;
  height: 118px;
  top: -40px;
  left: 112px;
  transition: all 0.6s;
}
.song-img {
  width: 154px;
  height: 154px;
  position: absolute;
  left: 50%;
  top: 50%;
  overflow: hidden;
  border-radius: 50%;
  transform: translate(-50%, -50%);
}
.m-song-h2 {
  margin-top: 20px;
  text-align: center;
  font-size: 18px;
  color: #fefefe;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.lrcContent {
  margin-top: 50px;
}
.lrc {
  font-size: 14px;
  color: #fff;
  text-align: center;
}
.left-incon {
  position: absolute;
  top: 10px;
  left: 10px;
  font-size: 24px;
  z-index: 10001;
  color: #fff;
}
.ani {
  animation: turn 5s linear infinite;
}
@keyframes turn {
  0% {
    -webkit-transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
  }
}
</style>
