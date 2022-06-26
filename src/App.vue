<!-- CloudMusic -->
<template>
  <Layout />
</template>

<script setup lang="ts">
import Layout from "@/layout/index.vue";
import { onMounted } from "vue";
import { useMainStore } from "store";
const store = useMainStore();

onMounted(() => {
  // 初始化主题
  document.documentElement.style.setProperty("--theme-color", store.themeColor);
});
</script>

<!-- 原生样式修改 -->
<style lang="scss">
:root {
  /* 主题色 */
  --theme-color: #ff3f34;
  /* 字体颜色 */
  --font-color: #34495e;
  /* plyr主题色 */
  --plyr-color-main: var(--theme-color);
  /* 顶部导航栏高度 */
  --topNavBarHeight: 49px;
  /* 播放控件高度 */
  --playBarHeight: 52px;
  /* 侧边导航栏宽度 */
  --sideNavBarWidth: 230px;

  --plyr-control-radius: 6px;
}

body {
  color: var(--font-color);
  font-family: "Noto Sans SC", serif;
}

p {
  margin: 0;
}

ul {
  margin: 0;
  padding: 0;
  list-style-type: none;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  margin: 0px;
  font-weight: 400;
}

ul,
li,
div,
article,
header,
section,
nav,
main,
footer,
aside {
  box-sizing: border-box;
}
</style>
<!-- element-plus -->
<style lang="scss">
/* 修改elementui v-loading */
.el-loading-mask {
  z-index: 50 !important;

  svg circle {
    stroke: var(--theme-color) !important;
  }

  .el-loading-text {
    color: var(--theme-color) !important;
  }
}

/* 修改修改elementui el-pagination */
.el-pagination {
  .is-active {
    background-color: var(--theme-color) !important;
    color: #fff !important;
  }

  &.is-background .el-pager li:not(.is-active):hover {
    color: var(--theme-color) !important;
  }
}

/* 修改修改elementui tabs */
.el-tabs {
  .el-tabs__header {
    margin: 0px;
  }

  .el-tabs__nav {
    .el-tabs__item {
      color: var(--font-color);
    }

    .el-tabs__item.is-active {
      color: var(--theme-color);
    }

    .el-tabs__active-bar {
      background-color: var(--theme-color);
    }
  }
}
</style>