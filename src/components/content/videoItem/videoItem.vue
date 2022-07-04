<!-- 视频Item -->
<template>
  <div :class="{ flex: isFlex }" class="group" cursor-default>
    <div @click="goVideoDetailPage" class="cover" relative cursor-pointer>
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

    <div class="info" overflow-hidden>
      <!-- 标题 -->
      <p @click.stop="goVideoDetailPage" class="title" truncate mb-3px mt-5px text-15px group-hover:themeColor>
        {{ title }}
      </p>

      <!-- 创建人名称 -->
      <p text-13px text-gray-400 truncate w="2/3">
        <span>by&nbsp;</span>
        <span @click.stop="goOthersInfo" cursor-pointer hover:themeColor>{{ nickname }}</span>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { Handle } from "utils";
import { PropType, toRaw, toRef } from 'vue';
const router = useRouter();
const props = defineProps({
  mode: {
    type: String as PropType<"push" | "replace">,
    default: "push"
  },
  isFlex: {
    type: Boolean,
    default: false
  },
  uid: Number,
  vid: String,
  title: String,
  durationms: Number,
  coverUrl: String,
  playTime: Number,
  nickname: String
});
let { mode, uid, vid, title, durationms, coverUrl, playTime, nickname } = toRaw(props);
let isFlex = toRef(props, "isFlex");


// 跳转Video详情页面
let goVideoDetailPage = () => {
  if (mode == "push") {
    router.push(`/videoDetail/${vid}`);
  } else if (mode == "replace") {
    router.replace(`/videoDetail/${vid}`);
  } else {
    router.push(`/`);
  }
}

// 跳转创建人个人主页
let goOthersInfo = () => {
  router.push(`/othersInfo/${uid}`);
}
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

// 横向布局
.flex {
  display: flex;

  gap: 10px;

  .cover,
  .info {
    flex: 1;
  }

  .title {
    display: -webkit-box;
    overflow: hidden;
    -webkit-box-orient: vertical;
    margin-bottom: 10px;
    text-overflow: ellipsis;
    white-space: normal;

    -webkit-line-clamp: 2;
  }
}
</style>