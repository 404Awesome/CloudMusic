<!-- 视频Item -->
<template>
  <div class="group" cursor-default>
    <div @click="$router.push(`/videoDetail/${vid}`)" class="cover" relative cursor-pointer>
      <!-- 封面 -->
      <el-image :src="coverUrl" fit="cover" h-35 rounded-md brightness-70 />

      <!-- 播放次数 -->
      <p absolute text-white text-15px right-5px top-5px>{{ Handle.Count(playTime!) }}</p>

      <!-- 时长 -->
      <p absolute text-white text-15px right-5px bottom-7px>{{ Handle.Duration(durationms!) }}</p>

      <!-- hover:播放图标 -->
      <p class="playIcon">
        <span i-eva:arrow-right-fill></span>
      </p>
    </div>

    <!-- 标题 -->
    <p @click.stop="$router.push(`/videoDetail/${vid}`)" truncate pb-3px pt-5px text-15px group-hover:themeColor>
      {{ title }}
    </p>

    <!-- 创建人名称 -->
    <p text-13px text-gray-400 truncate w="2/3">
      <span>by&nbsp;</span>
      <span @click.stop="$router.push(`/othersInfo/${uid}`)" cursor-pointer hover:themeColor>{{ nickname }}</span>
    </p>
  </div>
</template>

<script setup lang="ts">
import { Handle } from "utils";
import { toRefs } from 'vue';
const props = defineProps({
  uid: Number,
  vid: String,
  title: String,
  durationms: Number,
  coverUrl: String,
  playTime: Number,
  nickname: String
});
let { uid, vid, title, durationms, coverUrl, playTime, nickname } = toRefs(props);
</script>

<style lang="scss" scoped>
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
</style>