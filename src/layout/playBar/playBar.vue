<!-- 播放控件 -->
<template>
  <div class="playbar">
    <!-- 音频进度条 -->
    <div class="audio">
      <audio ref="audioEl" controls></audio>
    </div>

    <!-- 控制栏 -->
    <div class="controlLine">
      <!-- 歌曲信息 -->
      <section flex-1>
        <SongInfo :currentTime="songCurrentTime" :duration="songDuration" v-if="store.currentSong" />
      </section>

      <!-- 控制按钮 -->
      <section class="control">
        <!-- 喜欢 -->
        <span i-carbon:favorite hover:i-carbon-favorite-filled hover-text-red-500 hover:dark-text-orange-400></span>
        <!-- 上一首 -->
        <span @click="changeSong(false)" class="change" i-eva:skip-back-fill></span>
        <!-- 播放 -->
        <p @click="play" class="play">
          <span :class="playIcon" class="change"></span>
        </p>
        <!-- 下一首 -->
        <span @click="changeSong(true)" class="change" i-eva:skip-forward-fill></span>
        <!-- 分享 -->
        <span i-carbon:link hover-text-blue-500></span>
      </section>

      <!-- 操作 -->
      <section flex-1 class="operate">
        <!-- 打开播放列表 -->
        <span @click="openPlayListDrawer" i-carbon:list-boxes></span>
        <!-- 音量 -->
        <el-popover :hide-after="0" placement="top" trigger="hover">
          <template #reference>
            <span @click="setMute" :class="volumeIcon"></span>
          </template>
          <template #default>
            <div class="volumeSlider">
              <span>音量: {{ volume }}</span>
              <el-slider @change="volumeChange" :show-tooltip="false" :min="0" :max="100" v-model="volume" />
            </div>
          </template>
        </el-popover>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import SongInfo from "./coms/songInfo.vue";
import { ref, watch, onMounted, computed } from "vue";
import { useDebounceFn } from "@vueuse/shared";
import { ElMessage } from "element-plus";
import { useRoute } from "vue-router";
import { useMainStore } from "store";
import Plyr from "plyr";
const store = useMainStore();
const route = useRoute();


// audio元素
let audioEl = ref<HTMLElement | null>(null);
// audioPlyr实例
let audioPlyr = ref<Plyr | null>(null);
// 播放状态
let playing = ref<boolean>(false);
// 音量
let volume = ref<number>(store.volume);
// 歌曲持续时间
let songDuration = ref<number>(0);
// 歌曲当前播放时间
let songCurrentTime = ref<number>(0);
// 初始化plyr插件
onMounted(() => {
  audioPlyr.value = new Plyr(audioEl.value!, {
    controls: ['progress'],
    volume: volume.value / 100,
  });
  // 为plyr添加音乐源
  let source = store.currentSong || store.playList[0];
  if (source) {
    audioPlyr.value.source = {
      type: 'audio',
      sources: [{
        src: `https://music.163.com/song/media/outer/url?id=${source.song.id}.mp3`,
        type: 'audio/mp3',
      }]
    }
  }
  // 播放时触发
  audioPlyr.value.on("play", () => {
    // 音频播放,暂停视频播放
    store.playStatus = "audio";
    // 延迟100毫秒获取结果
    let timer = setTimeout(() => {
      // 改变当前playing的状态
      if (audioPlyr.value!.playing === true) playing.value = true;
      // 获取歌曲时间
      if (!songDuration.value) songDuration.value = audioPlyr.value!.duration;
      songCurrentTime.value = audioPlyr.value!.currentTime;
      clearTimeout(timer);
    }, 300);
  });
  // 暂停时触发
  audioPlyr.value.on("pause", () => {
    // 延迟100毫秒获取结果
    let timer = setTimeout(() => {
      // 视频暂停,播放状态为pause
      if (store.playStatus !== "video") store.playStatus = "pause";
      // 改变当前playing的状态
      if (audioPlyr.value!.playing === false) playing.value = false;
      clearTimeout(timer);
    }, 100);
  });
  // 播放完毕时触发
  audioPlyr.value.on("ended", () => {
    // 播放下一首
    changeSong(true);
  });
  // 当前歌曲播放进度
  audioPlyr.value.on("timeupdate", () => {
    store.playProgress = parseFloat((audioPlyr.value!.currentTime).toFixed(3));
  });
  // 监听键盘按键事件
  document.body.addEventListener("keydown", (event: KeyboardEvent) => {
    // 空格按键 -> 播放或暂停歌曲
    if (event.code === "Space" && audioPlyr.value!.source) {
      // 阻止默认事件
      event.preventDefault();
      // 播放
      play()
    };
  });
});
// 视频播放,暂停音频播放
watch(() => store.playStatus, (status) => {
  if (status == "video" && audioPlyr.value?.playing) {
    audioPlyr.value.pause();
  }
});


// 控制播放
let play = () => {
  // 判断当前播放器是存在播放源
  if (audioPlyr.value!.source) {
    audioPlyr.value?.togglePlay();
  } else {
    ElMessage.warning('请添加音乐到播放列表!');
  }
}
// 切换歌曲
let changeSong = useDebounceFn((control: boolean) => {
  if (route.path == "/privateFM") {
    ElMessage.warning("当前为私人FM!");
  } else {
    // control为true是下一首, 反之是上一首
    let currentIndex = store.getCurrentSongIndex();
    if (currentIndex !== -1) {
      // 找到当前索引位置
      let target = control ? currentIndex + 1 : currentIndex - 1;
      let origin = control ? 0 : store.playList.length - 1;
      let result = store.playList[target] || store.playList[origin];
      if (result) store.currentSong = result;
    } else {
      // 未找到当前索引位置
      ElMessage.warning('暂无歌曲!');
    }
  }
}, 500);
// 改变音量
let volumeChange = (currentVolume: number) => {
  audioPlyr.value!.volume = currentVolume / 100;
  store.volume = currentVolume;
}
// 设置静音
let setMute = () => {
  if (volume.value == 0) {
    volume.value = 70;
    store.volume = 70;
    audioPlyr.value!.volume = 0.7;
  } else {
    volume.value = 0;
    store.volume = 0;
    audioPlyr.value!.volume = 0;
  }
}
// 打开播放列表
let openPlayListDrawer = () => {
  store.noticeDrawer = false;
  store.playListDrawer = !store.playListDrawer;
}


// 监听当播放音乐改动
watch(() => store.currentSong, async (newSong) => {
  let id = newSong?.song.id;
  if (!id) return;
  // 清空歌曲时间
  songDuration.value = 0;
  songCurrentTime.value = 0;
  // 赋予audio新的音源
  audioPlyr.value!.source = {
    type: 'audio',
    sources: [{
      src: `https://music.163.com/song/media/outer/url?id=${id}.mp3`,
      type: 'audio/mp3',
    }]
  }
  try {
    await audioPlyr.value?.play();
  } catch (err: any) {
    // 提示用户点击播放按钮
    if (err.name == "NotAllowedError") {
      ElMessage.success("加载完毕,请点击播放按钮!");
    }
  }
});
// 播放图标
let playIcon = computed(() => playing.value ? "i-carbon:pause-filled" : "i-eva:arrow-right-fill");
// 声音图标
let volumeIcon = computed(() => {
  if (volume.value == 0) {
    return "i-carbon:volume-mute";
  } else if (volume.value < 50) {
    return "i-carbon:volume-down";
  } else {
    return "i-carbon:volume-up";
  }
})
</script>

<style scoped lang="scss">
.dark {
  .playbar .audio :deep(.plyr--audio):hover {
    --plyr-range-thumb-background: #fb923c !important;
  }

  .volumeSlider :deep(.el-slider) {
    --el-slider-main-bg-color: #fb923c !important;
  }
}

.playbar {
  @apply relative z-300 h-full bg-white dark-bg-gray-600;

  .audio {
    @apply absolute top--10px z-200 w-full;

    :deep(.plyr--audio) {
      --plyr-control-spacing: 0px;
      --plyr-audio-controls-background: transparent;
      --plyr-range-track-height: 3px;
      --plyr-range-thumb-background: transparent;
      --plyr-range-thumb-shadow: none;
      --plyr-tooltip-radius: 2px;

      &:hover {
        --plyr-range-thumb-background: var(--theme-color);
      }
    }
  }

  .controlLine {
    @apply flex justify-between h-full gap-15px;
  }
}

// 控制
.control {
  @apply flex items-center justify-center gap-15px;

  .play {
    @apply themeBgColor p-3px rounded-full dark-bg-gray-500;

    span.change {
      @apply text-white dark-text-gray-300;
    }
  }

  span {
    @apply shrink-0 text-20px cursor-pointer dark-text-gray-300 hover-dark-text-orange-400;

    &.change {
      @apply text-30px themeColor dark-text-gray-300 hover-dark-text-orange-400;
    }
  }
}

// 操作
.operate {
  @apply flex items-center justify-end pr-15px gap-15px;

  span {
    @apply shrink-0 text-20px cursor-pointer hover-themeColor dark-text-gray-300 hover-dark-text-orange-400;
  }
}

// 音量滑块
.volumeSlider {
  padding: 7px 15px;

  :deep(.el-slider) {
    height: 20px;

    --el-slider-main-bg-color: var(--theme-color);

    .el-slider__button {
      width: 15px;
      height: 15px;
    }

    .el-slider__runway,
    .el-slider__bar {
      height: 4px;
    }
  }
}
</style>