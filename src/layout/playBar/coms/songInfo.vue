<!-- 歌曲信息 -->
<template>
  <div class="songInfo">
    <!-- 封面 -->
    <div @click="openSongDetail" class="cover">
      <el-image :src="currentSong?.album.picUrl" fit="cover" />
      <div class="icon">
        <span class="i-heroicons-outline:chevron-up"></span>
        <span class="i-heroicons-outline:chevron-down"></span>
      </div>
    </div>

    <!-- 详情 -->
    <div hidden md:inline-block flex-1>
      <!-- 标题 -->
      <p @click="openSongDetail" sm:max-w-32 xl:max-w-62 truncate text-14px cursor-pointer hover:themeColor>
        {{ currentSong?.song.name }}
      </p>
      <!-- 时间 -->
      <p text="black/40" text-12px whitespace-nowrap text-nowrap>
        <span>{{ handleTime(props.currentTime) }}</span>
        <span>&nbsp;/&nbsp;</span>
        <span>{{ handleTime(props.duration) }}</span>
      </p>
    </div>

    <!-- 歌曲详情 -->
    <SongDetail ref="songDetailEl" />
  </div>
</template>

<script setup lang="ts">
import SongDetail from "./songDetail.vue";
import { useMainStore } from "store";
import { toRef, ref } from "vue";
const store = useMainStore();
let currentSong = toRef(store, "currentSong");

const props = defineProps({
  duration: {
    type: Number,
    required: true
  },
  currentTime: {
    type: Number,
    required: true
  }
})

// 处理歌曲时间
let handleTime = (time: number) => {
  let minute = Math.floor(time / 60).toFixed(0).padStart(2, "0");
  let seconds = Math.floor(time % 60).toFixed(0).padStart(2, "0");
  return `${minute}:${seconds}`;
}

// 打开歌曲详情
let songDetailEl = ref<InstanceType<typeof SongDetail>>();
let openSongDetail = () => {
  songDetailEl.value?.toggle();
}
</script>

<style lang="scss" scoped>
.songInfo {
  display: flex;
  overflow: hidden;
  align-items: center;
  padding-left: 6px;
  height: 100%;

  gap: 6px;

  .cover {
    position: relative;
    overflow: hidden;
    min-width: calc(var(--playBarHeight) - 12px);
    width: calc(var(--playBarHeight) - 12px);
    height: calc(var(--playBarHeight) - 12px);
    border: 1px solid #eee;
    border-radius: 5px;
    cursor: pointer;

    .icon {
      position: absolute;
      top: 0px;
      z-index: 10;
      display: flex;
      align-items: center;
      flex-flow: column nowrap;
      justify-content: center;
      width: 100%;
      height: 100%;
      background-color: rgba($color: #000, $alpha: .3);
      opacity: 0;
      transition: opacity .2s ease-in;

      span {
        color: #fff;
        font-size: 20px;
      }
    }

    &:hover .icon {
      opacity: 1;
    }
  }
}
</style>