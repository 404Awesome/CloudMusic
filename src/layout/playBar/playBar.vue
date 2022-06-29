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
        <!-- eva:heart-fill -->
        <span class="i-eva:heart-outline"></span>
        <span @click="changeSong(false)" class="change i-eva:skip-back-fill"></span>
        <p @click="play" class="play">
          <span :class="playIcon" class="change"></span>
        </p>
        <span @click="changeSong(true)" class="change i-eva:skip-forward-fill"></span>
        <span class="i-eva:external-link-outline"></span>
      </section>

      <!-- 操作 -->
      <section flex-1 class="operate">
        <!-- 打开播放列表 -->
        <span @click="openPlayList" class="i-eva:inbox-outline"></span>
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

    <!-- 播放列表 -->
    <PlayList ref="playListEl" />
  </div>
</template>

<script setup lang="ts">
import PlayList from "./coms/playList.vue";
import SongInfo from "./coms/songInfo.vue";
import Plyr from "plyr";
import { useMainStore } from "store";
import { ElMessage } from "element-plus";
import { useDebounceFn } from "@vueuse/shared";
import { ref, watch, onMounted, computed } from "vue";
const store = useMainStore();

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
}, 500);
// 改变音量
let volumeChange = (currentVolume: number) => {
  audioPlyr.value!.volume = currentVolume / 100;
  store.volume = currentVolume;
}
// 设置静音
let setMute = () => {
  if (volume.value == 0) {
    volume.value = 50;
    store.volume = 50;
    audioPlyr.value!.volume = 0.5;
  } else {
    volume.value = 0;
    store.volume = 0;
    audioPlyr.value!.volume = 0;
  }
}
// 打开播放列表
let playListEl = ref<InstanceType<typeof PlayList>>();
let openPlayList = () => {
  playListEl.value!.toggle()
}


// 监听当播放音乐改动
watch(() => store.currentSong, (newSong) => {
  let id = newSong?.song.id;
  if (id) {
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
    audioPlyr.value?.play();
  }
});
// 播放图标
let playIcon = computed(() => playing.value ? "i-eva:close-outline" : "i-eva:arrow-right-fill");
// 声音图标
let volumeIcon = computed(() => {
  if (volume.value == 0) {
    return "i-eva:volume-off-outline";
  } else if (volume.value < 50) {
    return "i-eva:volume-down-outline";
  } else {
    return "i-eva:volume-up-outline";
  }
})
</script>

<style scoped lang="scss">
.playbar {
  position: relative;
  z-index: 300;
  height: 100%;
  background-color: #fff;

  .audio {
    position: absolute;
    top: -10px;
    z-index: 200;
    width: 100%;

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
    display: flex;
    justify-content: space-between;
    height: 100%;

    gap: 15px;
  }
}

// 控制
.control {
  display: flex;
  align-items: center;
  justify-content: center;

  gap: 15px;

  .play {
    padding: 3px;
    border-radius: 50%;
    background-color: var(--theme-color);

    span.change {
      color: #fff;
    }
  }

  span {
    flex-shrink: 0;
    color: var(--font-color);
    font-size: 20px;
    cursor: pointer;

    &:hover {
      color: var(--theme-color);
    }

    &.change {
      color: var(--theme-color);
      font-size: 30px;
    }
  }
}

// 操作
.operate {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-right: 15px;

  gap: 15px;

  span {
    flex-shrink: 0;
    color: var(--font-color);
    font-size: 20px;
    cursor: pointer;

    &:hover {
      color: var(--theme-color);
    }
  }
}

// 音量滑块
.volumeSlider {
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