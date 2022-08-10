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
      <el-scrollbar ref="scrollbarEl" wrap-class="lyricScroll">
        <!-- 歌词列表 -->
        <ul @mouseenter="pause" @mouseleave="resume" ref="lyricEl" py-15px>
          <li v-for="({ time, lyric }, index) in lyricList" :key="time" v-show="lyric" @click.stop="lyricClick(time)"
            :class="{ active: progress >= time && progress <= lyricList[index + 1]?.time }" class="lyric">
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
import { onMounted, reactive, ref, toRef } from 'vue';
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
// ElScrollbar元素
let scrollbarEl = ref<any>(null);
// 歌词列表元素
let lyricEl = ref<HTMLElement | null>(null);
// 骨架屏容器元素
let skeletonEl = ref<HTMLElement | null>(null);
// 歌词列表
let lyricList = reactive<Lyric[]>([]);

// 滚动歌词
const { stop, pause, resume } = watchPausable(() => progress.value, useThrottleFn(() => {
  if (lyricList.length && scrollbarEl.value) {
    // scrollbarEl的高度
    let wrapHeight = scrollbarEl.value.$el.offsetHeight;
    // 当前播放的歌词元素
    let activeEl = lyricEl.value?.getElementsByClassName("active")[0];
    // 如果当前没有播放的歌词元素就返回
    if (!activeEl) return;
    // 歌词元素距离父元素顶部的距离
    let top = (activeEl as any).offsetTop;
    // 歌词距离顶部的距离超过容器高度一半
    if (top > (wrapHeight / 2)) {
      scrollbarEl.value.setScrollTop(top - (wrapHeight / 2) + 20);
    } else {
      scrollbarEl.value.setScrollTop(0);
    }
  }
}, 200))

// 点击歌词
let lyricClick = (time: number) => {
  if (store.audioPlyr) {
    store.audioPlyr.currentTime = time + 0.5;
  }
}

// 加载歌词
let loadLyric = async () => {
  try {
    loading.value = true;
    let { code, lrc: { lyric } }: any = await SongAPI.getLyric(props.id);
    if (code == 200) {
      // 处理歌词
      let list = Handle.Lyric(lyric);
      // 向歌词列表添加歌词
      lyricList.push(...list);
      // 判断歌词小于4句,停止监听进度
      if (list.length <= 4) {
        stop();
      }
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
  @apply py-10px text-15px truncate transition-all duration-250 ease-linear select-none cursor-pointer;

  &:hover {
    @apply bg-gray-100 px-10px rounded-md themeColor;
  }

  &.active {
    @apply themeColor text-18px dark-text-orange-400;
  }
}
</style>
<style lang="scss">
.lyricScroll {
  scroll-behavior: smooth;
}

.lyricScroll~.el-scrollbar__bar.is-vertical {
  width: 0% !important;
}
</style>