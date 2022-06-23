<!-- 歌单列表 -->
<template>
  <ul min-h-30 grid6Cols m-y-20px>
    <li @click="$router.push(`/songListDetal/${item.id}`)" v-for="item in props.songList" :key="item.id" class="group"
      cursor-pointer overflow-hidden>
      <div class="cover">
        <el-image fit-="cover" lazy :src="item.coverImgUrl" />
        <!-- 次数 -->
        <p absolute top-3px right-5px z-2 flex items-center>
          <span text-22px i-eva:arrow-right-outline></span>
          <span text-15px>{{ Handle.Count(item.playCount) }}</span>
        </p>
        <!-- 创建者名字-->
        <p absolute bottom-5px left-5px z-2 overflow-hidden truncate w="6/10">
          <span>{{ item.creator.nickname }}</span>
        </p>
        <!-- 播放按钮 -->
        <div @click.stop="Operate.playSongList(item.id)" class="playIcon">
          <span class="i-eva:arrow-right-fill"></span>
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
  position: relative;
  display: flex;
  overflow: hidden;
  border-radius: 7px;
  color: #fff;
  font-size: 13px;

  &:hover .playIcon {
    opacity: 1;
  }

  &::after {
    position: absolute;
    top: 0px;
    z-index: 1;
    width: 100%;
    height: 100%;
    background-color: rgba($color: #000000, $alpha: .2);
    content: '';
  }

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
      background-color: rgba($color: #fff, $alpha: 0.8);
    }
  }
}
</style>