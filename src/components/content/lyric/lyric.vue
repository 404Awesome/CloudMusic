<!-- 歌词 -->
<template>
  <el-skeleton :loading="loading" animated>
    <template #template>
      <!-- 歌词 -->
      <div ref="skeletonEl" mt-50px flex flex-col gap-20px>
        <el-skeleton-item variant="text" w="6/10" />
        <el-skeleton-item variant="text" w="2/10" />
        <el-skeleton-item variant="text" w="5/10" />
        <el-skeleton-item variant="text" w="8/10" />
        <el-skeleton-item variant="text" w="4/10" />
        <el-skeleton-item variant="text" w="3/10" />
        <el-skeleton-item variant="text" w="6/10" />
        <el-skeleton-item variant="text" w="7/10" />
        <el-skeleton-item variant="text" w="3/10" />
        <el-skeleton-item variant="text" w="5/10" />
      </div>
    </template>
    <template #default>
      <el-scrollbar wrap-class="lyricScroll">
        <!-- 歌词列表 -->
        <ul @mouseenter="pause" @mouseleave="resume" @touchstart="pause" @touchend="touchLeave" ref="lyricEl" py-15px>
          <li v-for="({ time, lyric }, index) in lyricList" :key="time" v-show="lyric"
            @click.stop="lyricClick(time, $event)" class="lyric"
            :class="{ active: progress >= time && progress < lyricList[index + 1]?.time }">
            {{ lyric }}
          </li>
        </ul>

        <!-- 提示 -->
        <el-empty v-show="!lyricList.length" description="暂无歌词!" />
      </el-scrollbar>
    </template>
  </el-skeleton>
</template>

<script setup lang="ts">
import { useIntersectionObserver, useThrottleFn, watchPausable } from '@vueuse/core';
import { onMounted, reactive, ref, toRef, nextTick } from 'vue';
import { ElMessage } from 'element-plus';
import { Lyric } from "@/utils/handle";
import { useMainStore } from "store";
import { Handle } from 'utils';
import { SongAPI } from 'api';
const store = useMainStore();
const props = defineProps({
  id: {
    type: Number,
    required: true
  }
})

// 加载状态
let loading = ref(true);
// 歌曲进度
let progress = toRef(store, "playProgress");
// 歌词列表元素
let lyricEl = ref<HTMLElement | null>(null);
// 骨架屏容器元素
let skeletonEl = ref<HTMLElement | null>(null);
// 歌词列表
let lyricList = reactive<Lyric[]>([]);

// 滚动歌词
let scrollLyrics = () => {
  nextTick(() => {
    // 当前播放的歌词元素
    let currentLyric = lyricEl.value?.getElementsByClassName("active")[0];
    if (lyricEl.value && lyricList.length && currentLyric) {
      // 歌词总高度
      let lyricHeight = lyricEl.value.offsetHeight;
      // 歌词元素距离父元素顶部的距离
      let lyricOffsetTop = (currentLyric as any).offsetTop;
      // 容器高度
      let wrapHeight = (lyricEl.value as any).offsetParent.offsetHeight;
      // 解决scrollIntoView会导致整体页面会滚动问题
      let block: ScrollLogicalPosition = lyricOffsetTop < lyricHeight - (wrapHeight / 2) ? "center" : "end";
      currentLyric.scrollIntoView({
        block,
        behavior: "smooth"
      });
    }
  });
};

// 监听音乐进度并滚动歌词
const { stop, pause, resume } = watchPausable(() => progress.value, useThrottleFn(scrollLyrics, 300));

// touch离开歌词
let touchLeave = (function () {
  let timer: any = null;
  return () => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      resume();
      scrollLyrics();
      clearTimeout(timer);
    }, 2000);
  }
}());

// 点击歌词
let lyricClick = (function () {
  // 定时器
  let timer: any = null;
  return (time: number, event: Event) => {
    // 如果定时器存在,就清除定时器
    if (timer) clearTimeout(timer);
    // 判断当前点击的歌词是否是正在播放的歌词
    let currentLyric = lyricEl.value?.getElementsByClassName("active")[0];
    let targetLyric = event.target;
    if (store.audioPlyr && targetLyric !== currentLyric) {
      // 改变音乐播放进度
      store.audioPlyr.currentTime = time;
      let timer = setTimeout(() => {
        // 滚动歌词
        scrollLyrics();
        // 添加动画
        // 清除定时器
        clearTimeout(timer);
      }, 100);
    };
  }
}());

// 加载歌词
let loadLyric = async () => {
  try {
    loading.value = true;
    let { code, lrc: { lyric } }: any = await SongAPI.getLyric(props.id);
    if (code == 200) {
      // 歌曲时长
      let duration = store.audioPlyr?.duration;
      // 处理歌词
      let list = Handle.Lyric(lyric);
      // 向歌词列表添加歌词
      lyricList.push(...list, { lyric: "", time: duration! });
      // 判断歌词小于4句,停止监听进度
      if (list.length <= 4) stop();
    }
  } catch (err: any) {
    ElMessage.error("加载歌词失败!");
  } finally {
    loading.value = false;
  }
}

// 监听容器元素是否显示在页面上
onMounted(() => {
  const { stop } = useIntersectionObserver(skeletonEl.value, ([{ isIntersecting }]) => {
    if (isIntersecting) {
      loadLyric();
      stop();
    }
  });
})
</script>

<style lang="scss" scoped>
// 歌词
.lyric {
  @apply p-10px text-15px truncate transition-all duration-250 ease-linear select-none cursor-pointer rounded-md;

  &.active {
    animation: lyric 1s ease-in-out;
    @apply themeColor text-18px dark-text-orange-400;
  }
}

@keyframes lyric {
  0% {
    @apply bg-white text-15px;
  }

  50% {
    @apply bg-gray-100 text-18px;
  }
}

@media (any-hover: hover) {
  .lyric:hover {
    @apply bg-gray-100 themeColor;
  }
}
</style>
<style lang="scss">
.lyricScroll~.el-scrollbar__bar.is-vertical {
  width: 0% !important;
}
</style>