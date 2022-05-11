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
    <div class="detail">
      <!-- 信息 -->
      <div class="info">
        <p @click="openSongDetail" class="name">
          <span>{{ currentSong?.song.name }}</span>
          <span v-if="currentSong?.song.tns.length">({{ currentSong.song.tns.join("/") }})</span>
        </p>
        <span class="artist" v-html="handleArtists(currentSong?.artist)"></span>
      </div>
      <!-- 时间 -->
      <p class="time">
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
import { handleArtists } from "@/utils/tools";
import { useMainStore } from "store/index";
const store = useMainStore();
let { currentSong } = toRefs(store);

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
  align-items: center;
  padding-left: 6px;
  height: 100%;

  gap: 6px;

  .cover {
    position: relative;
    overflow: hidden;
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


  .detail {
    overflow: hidden;
    flex: 1;
  }
}

.info .artist,
.time {
  overflow: hidden;
  color: rgba($color: #000000, $alpha: .4);
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 12px;
}

.info {
  display: flex;
  overflow: hidden;
  align-items: center;

  gap: 10px;

  .name {
    color: var(--font-color);
    white-space: nowrap;
    font-size: 14px;

    &:hover {
      color: var(--theme-bg-color);
      cursor: pointer;
    }
  }

  .artist {
    :deep(.name) {
      color: rgba($color: #000000, $alpha: .4);
      cursor: pointer;

      &:hover {
        color: var(--theme-bg-color);
      }
    }
  }
}
</style>