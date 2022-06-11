<!-- mv列表item -->
<template>
  <div class="mvListItem" :class="{ flex: isFlex }">
    <div class="cover" @click="$router.push(`/mvDetail/${id}`)">
      <!-- 封面 -->
      <el-image w-full h-30 fit="cover" lazy :src="cover" />
      <!-- 播放次数 -->
      <p class="playCount">
        <span class="icon i-eva:arrow-right-outline"></span>
        <span>{{ handleCount(playCount) }}</span>
      </p>
      <!-- hover:播放图标 -->
      <p class="playIcon">
        <span class="i-eva:arrow-right-fill"></span>
      </p>
    </div>

    <!-- 详情 -->
    <div class="detail">
      <!-- 标题 -->
      <p @click="$router.push(`/mvDetail/${id}`)" class="title">{{ name }}</p>
      <!-- 艺术家 -->
      <div v-html="handleArtists(artists)"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { handleCount, handleArtists } from "@/utils/handle";
let props = defineProps({
  id: {
    type: Number,
    required: true,
  },
  cover: {
    type: String,
    required: true,
  },
  artists: {
    type: Array,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  playCount: {
    type: Number,
    required: true,
  },
  isFlex: {
    type: Boolean,
    default: false,
  },
});
let { id, cover, artists, name, playCount, isFlex } = markRaw(props);
</script>

<style lang="scss" scoped>
@import "@/scss/mixins.scss";

.mvListItem {
  cursor: pointer;

  .cover {
    position: relative;
    display: flex;
    overflow: hidden;
    border-radius: 5px;

    &::after {
      position: absolute;
      z-index: 1;
      width: 100%;
      height: 100%;
      background-color: rgba($color: #000000, $alpha: 0.2);
      content: "";
    }

    .playCount {
      position: absolute;
      top: 2px;
      right: 6px;
      z-index: 2;
      color: #fff;
      font-size: 14px;

      .icon {
        font-size: 20px;
      }
    }

    .playIcon {
      position: absolute;
      top: 50%;
      left: 50%;
      z-index: 2;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background-color: rgba($color: #fff, $alpha: 0.5);
      color: #d33a31;
      font-size: 30px;
      opacity: 0;
      transition: opacity 0.3s linear;
      transform: translate(-50%, -50%);

      &:hover {
        background-color: rgba($color: #fff, $alpha: 0.8);
      }
    }

    &:hover .playIcon {
      opacity: 1;
    }
  }

  .detail {
    overflow: hidden;
    margin-top: 5px;

    .title {
      font-size: 15px;

      @include oneOmit;
    }
  }

  &:hover .detail .title {
    color: var(--theme-bg-color);
  }

  &.flex {
    width: 100%;

    gap: 10px;

    .cover,
    .detail {
      width: 50%;
    }

    .detail .title {
      white-space: normal;

      @include multilineOmit(2);
    }
  }
}
</style>
