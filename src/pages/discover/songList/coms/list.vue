<!-- 歌单列表 -->
<template>
  <ul grid6Cols py-20px>
    <li @click="$router.push(`/songListDetail/${item.id}`)" v-for="item in props.songList" :key="item.id" class="group"
      cursor-pointer overflow-hidden>
      <div class="cover">
        <!-- 封面 -->
        <el-image fit-="cover" lazy :src="item.coverImgUrl" brightness-85 />

        <!-- 播放数 -->
        <p class="count">
          <span text-20px i-eva:arrow-right-outline></span>
          <span text-14px>{{ Handle.Count(item.playCount) }}</span>
        </p>

        <!-- 创建者名字-->
        <p class="nickname">
          <span>{{ item.creator.nickname }}</span>
        </p>

        <!-- 播放按钮 -->
        <div @click.stop="Operate.playSongList(item.id)" class="playIcon">
          <span i-eva:arrow-right-fill></span>
        </div>
      </div>

      <!-- 标题 -->
      <p twoLineOmit mt-5px text-14px group-hover:themeColor>{{ item.name }}</p>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { Handle, Operate } from "utils";
import { PropType } from "vue";
const props = defineProps({
  songList: {
    type: Array as PropType<any[]>,
    required: true
  }
});
</script>

<style lang="scss" scoped>
.cover {
  @apply relative flex overflow-hidden rounded-md text-white text-13px;

  .playIcon {
    top: calc(100% - 50px);
    left: calc(100% - 50px);
    transform: none !important;
  }

  .count {
    @apply absolute top-3px right-5px z-2 flex items-center;
  }

  .nickname {
    @apply absolute bottom-5px left-5px z-2 overflow-hidden truncate w-3/5;
  }
}
</style>