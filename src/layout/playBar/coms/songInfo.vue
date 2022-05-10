<!-- 歌曲信息 -->
<template>
  <div class="songInfo">
    <!-- 封面 -->
    <el-image :src="currentSong?.album.picUrl" fit="cover" />

    <!-- 详情 -->
    <div class="detail">
      <!-- 信息 -->
      <p class="info">
      <p class="name">
        <span>{{ currentSong?.song.name }}</span>
        <span v-if="currentSong?.song.tns.length">({{ currentSong.song.tns.join("/") }})</span>
      </p>
      <span class="artist" v-html="handleArtists(currentSong?.artist)"></span>
      </p>
      <!-- 时间 -->
      <p class="time">
        <span>{{ handleTime(props.currentTime) }}</span>
        <span>&nbsp;/&nbsp;</span>
        <span>{{ handleTime(props.duration) }}</span>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
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
</script>

<style lang="scss" scoped>
.songInfo {
  display: flex;
  align-items: center;
  padding-left: 7.5px;
  height: 100%;

  gap: 7.5px;

  :deep(.el-image__inner) {
    width: calc(var(--playBarHeight) - 15px);
    height: calc(var(--playBarHeight) - 15px);
    border: 1px solid #eee;
    border-radius: 3px;
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