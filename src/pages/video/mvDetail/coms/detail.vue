<!-- MV详情 -->
<template>
  <div pt-4 pb-8>
    <!-- 艺术家 -->
    <Artists fontSize="15px" :artists="artists!" />

    <!-- mv信息 -->
    <div pt-10px>
      <!-- 标题 -->
      <h4 text-20px flex items-center gap-5px>
        <span max-w="7/10" truncate>{{ name }}</span>
        <span v-if="desc" @click="showDesc = !showDesc" class="descIcon" :class="{ active: showDesc }"
          i-eva:arrow-up-fill></span>
      </h4>

      <!-- 元信息 -->
      <p flex py-10px text="black/50 14px" gap-15px>
        <span>发布: {{ publishTime }}</span>
        <span>播放: {{ Handle.Count(playCount!) }}</span>
      </p>

      <!-- 简介 -->
      <p v-show="showDesc" p-10px mb-10px rounded-md bg="#f4f4f5" text-14px>{{ desc }}</p>

      <!-- 操作 -->
      <Operate mode="mv" :id="id!" :subCount="subCount!" :likedCount="likedCount!" :shareCount="shareCount!" />
    </div>
  </div>
</template>

<script setup lang="ts">
import Operate from "@/components/content/operate/operate.vue";
import Artists from "@/components/content/artists/artists.vue";
import { toRaw, ref } from "vue";
import { Handle } from "utils";
const props = defineProps({
  id: Number,
  desc: String,
  name: String,
  artists: Array,
  subCount: Number,
  playCount: Number,
  likedCount: Number,
  shareCount: Number,
  publishTime: String
});
let { id, artists, publishTime, playCount, desc, name, subCount, likedCount, shareCount } = toRaw(props);

// 是否显示简介
let showDesc = ref(false);
</script>

<style lang="scss" scoped>
// 描述图标
.descIcon {
  min-width: 25px;
  font-size: 25px;
  cursor: pointer;
  transition: transform 0.3s ease-in-out;
  transform: rotate(180deg);

  &.active {
    transform: rotate(0deg);
  }

  &:hover {
    color: var(--theme-color);
  }
}
</style>
