<!-- 布局组件 -->
<template>
  <main id="layout">
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
      <el-scrollbar>
        <router-view v-slot="{ Component }">
          <keep-alive :exclude="['mvDetails']">
            <component :is="Component" />
          </keep-alive>
        </router-view>
      </el-scrollbar>
    </section>
  </main>
</template>

<script setup lang="ts">
import TopNavBar from "./topNavBar.vue";    // 顶部导航栏
import SideNavBar from "./sideNavBar.vue";  // 侧边导航栏
import PlayBar from "./playBar.vue";        // 播放栏
</script>

<style lang="scss" scoped>
#layout {
  display: grid;
  overflow: hidden;
  width: 100vw;
  height: 100vh;

  grid-template: 49px auto 60px / 230px auto;

  // 状态栏
  section.status {
    grid-row: 1/2;
    grid-column: 1/3;
  }

  // 导航栏
  section.navbar {
    grid-row: 2/4;
    grid-column: 1/2;
  }

  // 播放栏
  section.playbar {
    grid-row: 3/4;
    grid-column: 2/3;
  }

  // 路由视图
  section.view {
    overflow-x: hidden;
    overflow-y: auto;

    grid-row: 2/3;
    grid-column: 2/3;

    :deep(.el-scrollbar__view) {
      height: 100%;
    }
  }
}
</style>
