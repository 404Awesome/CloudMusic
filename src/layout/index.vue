<!-- 布局组件 -->
<template>
  <main id="layout" :class="{ folding: isFolding }">
    <section class="status">
      <TopNavBar />
    </section>
    <section class="navbar">
      <SideNavBar />
    </section>
    <section class="playbar">
      <PlayBar />
    </section>
    <section class="view">
      <router-view v-slot="{ Component }">
        <keep-alive :exclude="['mvDetails', 'playListDetail', 'allMV']">
          <el-scrollbar :always="true" @scroll="scroll">
            <component :scrollTop='scrollTop' :is="Component" />
          </el-scrollbar>
        </keep-alive>
      </router-view>
    </section>
  </main>
</template>

<script setup lang="ts">
import TopNavBar from "./topNavBar/topNavBar.vue";      // 顶部导航栏
import SideNavBar from "./sideNavBar/sideNavBar.vue";   // 侧边导航栏
import PlayBar from "./playBar/playBar.vue";            // 播放栏
import { useThrottleFn } from "@vueuse/core";
import { useMainStore } from "store/index";
const store = useMainStore();
let { isFolding } = toRefs(store);

// 视图滚动事件
let scrollTop = ref(0);
let scroll = useThrottleFn((event) => {
  scrollTop.value = event.scrollTop;
}, 200);
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
    overflow-y: auto;

    grid-row: 2/3;
    grid-column: 2/3;

    :deep(.el-scrollbar__view) {
      height: 100%;
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
