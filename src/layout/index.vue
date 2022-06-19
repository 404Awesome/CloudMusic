<!-- 布局组件 -->
<template>
  <main id="layout" :class="{ folding: isFolding, dark: isDark }">
    <section class="status">
      <TopNavBar />
    </section>
    <section class="navbar">
      <SideNavBar />
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
import TopNavBar from "./topNavBar/topNavBar.vue";      // 顶部导航栏
import SideNavBar from "./sideNavBar/sideNavBar.vue";   // 侧边导航栏
import PlayBar from "./playBar/playBar.vue";            // 播放栏
import { useThrottleFn } from "@vueuse/shared";
import { useMainStore } from "store";
import { useRoute } from "vue-router";
const store = useMainStore();
const route = useRoute();
let { isFolding, isDark } = toRefs(store);
let excludeList = reactive<string[]>(['singerDetail', 'mvDetails', 'playListDetail', 'allMV']);

// 滚动元素
let scrollEl = ref<HTMLElement | null>(null);
// 滚动事件
let scroll = useThrottleFn((event: UIEvent) => {
  if (route.meta.scroll) {
    let target = event.target as HTMLElement;
    store.scrollTop = target.scrollTop;
  }
}, 100);
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

  // 状态栏
  .status {
    grid-row: 1/2;
    grid-column: 1/3;
  }

  // 导航栏
  .navbar {
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
    overflow-x: hidden;
    overflow-y: overlay;

    grid-row: 2/3;
    grid-column: 2/3;

    &:hover::-webkit-scrollbar {
      width: 6px;
    }

    &::-webkit-scrollbar {
      width: 0px;
    }

    /* 滚动条滑块 */
    &::-webkit-scrollbar-thumb {
      border-radius: 3px;
      background: rgba(0, 0, 0, .2);
    }
  }
}

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
