<!-- mv列表item -->
<template>
  <div class="group" text-15px cursor-pointer :class="{ flex: isFlex }">
    <section class="cover" relative flex overflow-hidden @click="$router.push(`/mvDetail/${id}`)">
      <!-- 封面 -->
      <el-image rounded-md brightness-80 w-full h-35 fit="cover" lazy :src="cover" />
      <!-- 播放次数 -->
      <p text-white absolute top-2px right-6px z-2>
        <span text-22px i-eva:arrow-right-outline></span>
        <span>{{ Handle.Count(playCount) }}</span>
      </p>
      <!-- hover:播放图标 -->
      <p class="playIcon">
        <span i-eva:arrow-right-fill></span>
      </p>
    </section>

    <!-- 详情 -->
    <section mt-5px overflow-hidden>
      <!-- 标题 -->
      <p @click="$router.push(`/mvDetail/${id}`)" truncate group-hover:themeColor>{{ name }}</p>
      <!-- 艺术家 -->
      <Artists :artists="artists" />
    </section>
  </div>
</template>

<script setup lang="ts">
import Artists from "@/components/content/artists/artists.vue";
import { toRaw } from "vue";
import { Handle } from "utils";
const props = defineProps({
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
let { id, cover, artists, name, playCount, isFlex } = toRaw(props);
</script>

<style lang="scss" scoped>
@import "@/scss/mixins.scss";

.cover {
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

.flex {
  gap: 10px;

  &>section {
    width: 50%;

    &:last-child>p:first-child {
      white-space: normal;

      @include multilineOmit(2);
    }
  }
}
</style>
