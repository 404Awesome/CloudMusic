<!-- 歌单列表 -->
<template>
  <ul grid6Cols py-20px>
    <li @click="$router.push(`/songListDetail/${item.id}`)" v-for="item in props.songList" :key="item.id" class="group"
      cursor-pointer overflow-hidden>
      <div class="group" relative flex overflow-hidden rounded-md text="white 13px">
        <!-- 封面 -->
        <el-image fit-="cover" lazy :src="item.coverImgUrl" brightness-85 />

        <!-- 播放数 -->
        <p absolute top-3px right-5px z-2 flex items-center>
          <span text-20px i-eva:arrow-right-outline></span>
          <span text-14px>{{ Handle.Count(item.playCount) }}</span>
        </p>

        <!-- 创建者名字-->
        <p absolute bottom-5px left-5px z-2 overflow-hidden truncate w="6/10">
          <span>{{ item.creator.nickname }}</span>
        </p>

        <!-- 播放按钮 -->
        <div @click.stop="Operate.playSongList(item.id)" class="playIcon" group-hover:opacity-100>
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
.playIcon {
  position: absolute;
  right: 7px;
  bottom: 7px;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 35px;
  height: 35px;
  border-radius: 50%;
  background-color: rgba($color: #fff, $alpha: 0.5);
  color: #d33a31;
  font-size: 30px;
  opacity: 0;
  transition: opacity 0.3s linear;

  &:hover {
    background-color: rgba($color: #fff, $alpha: 0.9);
  }
}
</style>