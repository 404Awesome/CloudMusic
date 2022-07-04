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
      <div flex items-center justify-between text-14px gap-10px select-none>
        <!-- 赞 / 收藏 / 分享 -->
        <ul flex flex-wrap overflow-hidden flex-1 gap-10px>
          <li v-for="item in control" :key="item.title" flex items-center py-6px px-13px rounded-full cursor-pointer
            hover="text-white themeBgColor" border="1px solid #eee">
            <span :class="item.icon" mr-5px text-17px></span>
            <span truncate>{{ item.title }}</span>
          </li>
        </ul>

        <!-- 举报 -->
        <p truncate cursor-pointer hover:themeColor>举报</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Artists from "@/components/content/artists/artists.vue";
import { toRaw, ref } from "vue";
import { Handle } from "utils";
const props = defineProps({
  desc: String,
  name: String,
  artists: Array,
  subCount: Number,
  playCount: Number,
  likedCount: Number,
  shareCount: Number,
  publishTime: String
});
let { artists, publishTime, playCount, desc, name, subCount, likedCount, shareCount } = toRaw(props);

// 赞 / 收藏 / 分享
let control = ([{
  title: `赞 (${likedCount})`,
  icon: "i-heroicons-outline:thumb-up",
}, {
  title: `收藏 (${subCount})`,
  icon: "i-heroicons-outline:folder-add",
}, {
  title: `分享 (${shareCount})`,
  icon: "i-heroicons-outline:external-link",
}]);

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
