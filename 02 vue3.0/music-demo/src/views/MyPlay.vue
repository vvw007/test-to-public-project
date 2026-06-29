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

      <!-- 歌词 + 控制区域 -->
      <div class="song-msg">
        <h2 class="m-song-h2">
          <span class="m-song-sname"
            >{{ songInfo.name }} - {{ songInfo?.ar?.[0]?.name || "" }}</span
          >
        </h2>

        <!-- 歌词列表 -->
        <div class="lrc-wrapper" ref="lrcWrapper">
          <div class="lrc-list">
            <p
              v-for="(item, index) in lyric"
              :key="index"
              class="lrc-line"
              :class="{ active: index === currentLineIndex }"
            >
              {{ item.text || "　" }}
            </p>
          </div>
        </div>

        <!-- 控制条（增强可见性） -->
        <div class="controls">
          <div class="control-icon" @click="toggleMute">
            <van-icon name="volume-o" size="22" v-show="!muted" />
            <van-icon name="volume-off" size="22" v-show="muted" />
          </div>
          <input
            type="range"
            class="progress-bar"
            :min="0"
            :max="duration || 0"
            step="1"
            :value="currentTime"
            @input="handleSeek"
          />
          <span class="time-display">
            {{ formatTime(currentTime) }} / {{ formatTime(duration) }}
          </span>
        </div>
      </div>

      <!-- 唱臂 -->
      <div class="needle" :style="`transform: rotate(${needleDeg});`"></div>
    </div>

    <!-- 音频标签 -->
    <audio
      ref="audio"
      loop
      preload="true"
      :src="`https://music.163.com/song/media/outer/url?id=${id}.mp3`"
      @timeupdate="handleTimeUpdate"
      @loadedmetadata="handleLoadedMetadata"
    ></audio>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch, nextTick } from "vue";
import { useRouter, useRoute } from "vue-router";
import { getSongByIdAPI, getLyricByIdAPI } from "@/api";

const router = useRouter();
const route = useRoute();
const id = route.query.id;

// ---------- 数据 ----------
const playState = ref(false);
const songInfo = ref({});
const lyric = ref([]);
const currentTime = ref(0);
const duration = ref(0);
const muted = ref(false);
const previousVolume = ref(1);
const audio = ref(null);
const lrcWrapper = ref(null);

// ---------- 计算属性 ----------
const needleDeg = computed(() => (playState.value ? "-7deg" : "-38deg"));

const currentLineIndex = computed(() => {
  if (!lyric.value.length) return -1;
  let index = 0;
  for (let i = 0; i < lyric.value.length; i++) {
    if (lyric.value[i].time <= currentTime.value) {
      index = i;
    } else {
      break;
    }
  }
  return index;
});

// ---------- 工具函数 ----------
const formatTime = (seconds) => {
  if (!seconds || isNaN(seconds)) return "00:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
};

const formatLyric = (lyricStr) => {
  const reg = /\[.+?\]/g;
  const timeArr = lyricStr.match(reg) || [];
  const contentArr = lyricStr.split(/\[.+?\]/).slice(1);
  const lyricList = [];
  timeArr.forEach((item, index) => {
    const minute = parseInt(item.split(":")[0].replace("[", ""));
    const second = parseFloat(item.split(":")[1].replace("]", ""));
    const totalSeconds = Math.floor(minute * 60 + second);
    lyricList.push({
      time: totalSeconds,
      text: contentArr[index] || "",
    });
  });
  lyricList.sort((a, b) => a.time - b.time);
  return lyricList;
};

// ---------- API ----------
const getSong = async () => {
  try {
    const res = await getSongByIdAPI(id);
    songInfo.value = res.data.songs[0];
    const lyrRes = await getLyricByIdAPI(id);
    const lyricStr = lyrRes.data.lrc.lyric;
    lyric.value = formatLyric(lyricStr);
    await nextTick();
    tryAutoPlay();
  } catch (err) {
    console.error("获取歌曲信息失败：", err);
  }
};

// ---------- 自动播放 ----------
const tryAutoPlay = () => {
  if (!audio.value) return;
  audio.value
    .play()
    .then(() => {
      playState.value = true;
    })
    .catch(() => {
      console.log("自动播放被阻止");
    });
};

// ---------- 播放控制 ----------
const audioStart = () => {
  if (!audio.value) return;
  if (playState.value) {
    audio.value.pause();
    playState.value = false;
  } else {
    audio.value
      .play()
      .then(() => {
        playState.value = true;
      })
      .catch((err) => console.warn("播放失败", err));
  }
};

// ---------- 音频事件 ----------
const handleTimeUpdate = () => {
  if (!audio.value) return;
  currentTime.value = Math.floor(audio.value.currentTime);
};

const handleLoadedMetadata = () => {
  if (audio.value && !isNaN(audio.value.duration)) {
    duration.value = audio.value.duration;
    if (audio.value.volume === 0 && !muted.value) {
      audio.value.volume = 1;
    }
  }
};

// ---------- 进度跳转 ----------
const handleSeek = (e) => {
  const val = parseFloat(e.target.value);
  if (isNaN(val)) return;
  currentTime.value = val;
  if (audio.value) {
    audio.value.currentTime = val;
  }
};

// ---------- 静音切换（使用 volume） ----------
const toggleMute = () => {
  if (!audio.value) return;
  if (audio.value.volume > 0) {
    previousVolume.value = audio.value.volume;
    audio.value.volume = 0;
    muted.value = true;
  } else {
    audio.value.volume = previousVolume.value || 1;
    muted.value = false;
  }
};

// ---------- 歌词滚动 ----------
watch(currentLineIndex, (newIndex) => {
  if (newIndex === -1 || !lrcWrapper.value) return;
  nextTick(() => {
    const activeLine = lrcWrapper.value.querySelector(".lrc-line.active");
    if (activeLine) {
      const wrapper = lrcWrapper.value;
      const lineTop = activeLine.offsetTop;
      const wrapperHeight = wrapper.clientHeight;
      const lineHeight = activeLine.clientHeight;
      wrapper.scrollTop = lineTop - wrapperHeight / 2 + lineHeight / 2;
    }
  });
});

// ---------- 生命周期 ----------
onMounted(() => {
  getSong();
});
</script>

<style scoped lang="scss">
/* ===== 原有样式（未改动） ===== */
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

.song-msg {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: 280px;
  width: 100%;
  max-width: 100vw;
  padding: 0 20px 10px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: calc(100vh - 320px);
}
.lrc-wrapper {
  width: 100%;
  flex: 1;
  overflow-y: auto;
  margin-top: 10px;
  scroll-behavior: smooth;
  &::-webkit-scrollbar {
    width: 0;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.lrc-list {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px 0;
  width: 100%;
}
.lrc-line {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.6);
  line-height: 2;
  transition: all 0.3s ease;
  text-align: center;
  padding: 2px 0;
  width: 100%;
  white-space: pre-wrap;
  word-break: break-all;
  &.active {
    color: #fff;
    font-size: 16px;
    font-weight: bold;
    transform: scale(1.05);
  }
}

/* ===== 控制条样式（增强可见性） ===== */
.controls {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 8px 12px;
  gap: 12px;
  color: #fff;
  flex-shrink: 0;
  background: rgba(0, 0, 0, 0.4); /* 半透明背景条 */
  border-radius: 20px;
  backdrop-filter: blur(4px); /* 毛玻璃效果 */
  margin-top: 6px;
}

.control-icon {
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.15); /* 图标背景圈 */
  transition: background 0.2s;
  color: #fff;
  font-size: 20px;
  flex-shrink: 0;
  &:hover {
    background: rgba(255, 255, 255, 0.25);
  }
}

.progress-bar {
  flex: 1;
  -webkit-appearance: none;
  appearance: none;
  height: 4px;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 2px;
  outline: none;
  cursor: pointer;
  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 14px;
    height: 14px;
    border-radius: 50%;
    background: #fff;
    cursor: pointer;
  }
  &::-moz-range-thumb {
    width: 14px;
    height: 14px;
    border-radius: 50%;
    background: #fff;
    cursor: pointer;
    border: none;
  }
}

.time-display {
  font-size: 12px;
  min-width: 80px;
  text-align: center;
  font-variant-numeric: tabular-nums;
  color: rgba(255, 255, 255, 0.8);
}
</style>
