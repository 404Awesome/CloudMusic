<!-- 布局组件 -->
<template>
  <main id="layout" :class="{ folding: store.isFolding }">
    <section class="topbar">
      <Topbar />
    </section>

    <section class="sidebar">
      <Sidebar />
    </section>

    <section class="playbar">
      <PlayBar />
    </section>

    <section class="view" ref="scrollEl" @scroll="scroll">
      <router-view v-slot="{ Component }">
        <keep-alive :exclude="excludeList">
          <component :is="Component" />
        </keep-alive>
      </router-view>
    </section>
  </main>
</template>

<script setup lang="ts">
import Topbar from "./topbar/topbar.vue";       // 顶部导航栏
import Sidebar from "./sidebar/sidebar.vue";    // 侧边导航栏
import PlayBar from "./playBar/playBar.vue";    // 播放栏
import { useThrottleFn } from "@vueuse/core";
import { useRoute } from "vue-router";
import { useMainStore } from "store";
import { ref, watch } from "vue";
const store = useMainStore();
const route = useRoute();

// keepAlive排除列表
let excludeList = ['Login', 'Register', 'singerDetail', 'songListDetail', 'AllMV', 'MVDetail', 'VideoDetail', 'Search', 'personalPage'];

// 滚动元素
let scrollEl = ref<HTMLElement | null>(null);
// 滚动事件
let scroll = useThrottleFn((event: UIEvent) => {
  if (route.meta.scroll) {
    let target = event.target as HTMLElement;
    store.scrollTop = target.scrollTop;
  }
}, 200);
// 监听路由,将页面滚动到顶部
watch(route, () => scrollEl.value?.scrollTo({ top: 0 }));
</script>

<style lang="scss" scoped>
#layout {
  display: grid;
  overflow: hidden;
  width: 100vw;
  height: 100vh;

  grid-template: var(--topNavBarHeight) auto var(--playBarHeight) / var(--sideNavBarWidth) auto;

  // 顶部栏
  .topbar {
    grid-row: 1/2;
    grid-column: 1/3;
  }

  // 侧边栏
  .sidebar {
    grid-row: 2/4;
    grid-column: 1/2;
  }

  // 播放栏
  .playbar {
    grid-row: 3/4;
    grid-column: 2/3;
  }

  // 路由视图
  .view {
    overflow-y: overlay;

    grid-row: 2/3;
    grid-column: 2/3;
    @apply dark-bg-gray-400 overflow-x-hidden rows-2/3;

    &:hover::-webkit-scrollbar {
      width: 5px;
    }

    &::-webkit-scrollbar {
      width: 0px;
    }

    /* 滚动条滑块 */
    &::-webkit-scrollbar-thumb {
      @apply rounded bg-black/15 dark-bg-gray-200;
    }
  }
}

// 折叠侧边栏
#layout.folding {
  .navbar {
    display: none;
  }

  .view {
    grid-row: 2/3;
    grid-column: 1/3;
  }

  .playbar {
    grid-row: 3/4;
    grid-column: 1/3;
  }
}
</style>
