<template>
  <main id="layout">
    <section class="status">
      <Status />
    </section>
    <section class="navbar">
      <NavBar />
    </section>
    <section class="playbar">
      <Playbar />
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
import Status from "./status.vue"; // 状态栏
import NavBar from "./navbar.vue"; // 导航栏
import Playbar from "./playbar.vue"; // 播放栏
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
  }
}
</style>
