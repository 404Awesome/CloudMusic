<!-- 播放控件 -->
<template>
  <div class="playbar">
    <!-- 音频进度条 -->
    <div class="audio">
      <audio ref="audioEl" controls>
        <source src="https://assets.mixkit.co/music/preview/mixkit-driving-ambition-32.mp3" type="audio/mp3" />
      </audio>
    </div>

    <!-- 控制栏 -->
    <div class="controlLine">
      <!-- 歌曲信息 -->
      <section class="info"></section>

      <!-- 控制按钮 -->
      <section class="control">
        <!-- eva:heart-fill -->
        <span class="i-eva:heart-outline"></span>
        <span @click="lastOne" class="change i-eva:skip-back-fill"></span>
        <p @click="play" class="play">
          <span :class="playIcon" class="change"></span>
        </p>
        <span @click="nextSong" class="change i-eva:skip-forward-fill"></span>
        <span class="i-eva:external-link-outline"></span>
      </section>

      <!-- 操作 -->
      <section class="operate">
        <!-- 播放列表 -->
        <span class="i-eva:inbox-outline"></span>
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
import Plyr from "plyr";

// audio元素
let audioEl = ref<HTMLElement | null>(null);
// plyr实例
let plyr = ref<Plyr | null>(null);
// 播放状态
let playing = ref<boolean>(false);
// 音量
let volume = ref<number>(50);
onMounted(() => {
  plyr.value = new Plyr(audioEl.value!, {
    controls: ['progress'],
    volume: volume.value / 100
  });
})

// 播放图标
let playIcon = computed(() => playing.value ? "i-eva:arrow-right-outline" : "i-eva:arrow-right-fill");
// 控制播放
let play = () => {
  plyr.value?.togglePlay();
  playing.value = plyr.value?.playing!;
}
// 上一首
let lastOne = () => { }
// 下一首
let nextSong = () => { }



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
// 改变音量
let volumeChange = (volume: number) => {
  plyr.value!.volume = volume / 100;
}
// 设置静音
let setMute = () => {
  if (volume.value == 0) {
    volume.value = 50;
    plyr.value!.volume = 0.5;
  } else {
    volume.value = 0;
    plyr.value!.volume = 0;
  }
}
</script>

<style scoped lang="scss">
.playbar {
  position: relative;
  z-index: 100;
  height: 100%;

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
        --plyr-range-thumb-background: var(--theme-bg-color);
      }
    }
  }

  .controlLine {
    display: flex;
    padding: 0px 30px;
    height: 100%;

    section {
      flex: 1;
    }
  }
}

.control {
  display: flex;
  align-items: center;
  justify-content: center;

  gap: 20px;

  .play {
    padding: 3px;
    border-radius: 50%;
    background-color: var(--theme-bg-color);

    span.change {
      color: #fff;
    }
  }

  span {
    color: var(--font-color);
    font-size: 20px;
    cursor: pointer;

    &:hover {
      color: var(--theme-bg-color);
    }

    &.change {
      color: var(--theme-bg-color);
      font-size: 30px;
    }
  }
}

.operate {
  display: flex;
  align-items: center;
  justify-content: flex-end;

  gap: 15px;

  span {
    color: var(--font-color);
    font-size: 20px;
    cursor: pointer;

    &:hover {
      color: var(--theme-bg-color);
    }
  }
}

// 音量滑块
.volumeSlider {
  :deep(.el-slider) {
    height: 20px;

    --el-slider-main-bg-color: var(--theme-bg-color);

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
