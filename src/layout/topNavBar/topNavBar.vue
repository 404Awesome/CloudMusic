<!-- 顶部导航栏 -->
<template>
  <div class="topNavBar">
    <!-- 标题 -->
    <h1 class="title no-select" hidden md:block @click="goRouter('/')">CloudMusic</h1>

    <!-- 导航栏 -->
    <nav class="nav">
      <!-- 路由 -->
      <section flex-1>
        <RouterNav />
      </section>

      <!-- 功能 -->
      <section class="function">
        <!-- 搜索 -->
        <Search />

        <!-- 主题 -->
        <ThemeSelect />

        <!-- 通知 -->
        <span @click="goRouter('/notice')" class="i-heroicons-outline:bell"></span>

        <!-- 暗夜模式 -->
        <span @click="setDark" class="i-heroicons-outline:sun dark:i-heroicons-outline:moon"></span>

        <!-- 设置 -->
        <span @click="goRouter('/setting')" class="i-heroicons-outline:cog"></span>
      </section>
    </nav>
  </div>
</template>

<script lang="ts" setup>
import RouterNav from "./coms/routerNav.vue";
import Search from "./coms/search.vue";
import ThemeSelect from "./coms/themeSelect.vue";
import { useRouter } from "vue-router";
import { useMainStore } from "store";
const store = useMainStore();
const router = useRouter();

// 黑夜模式
let setDark = () => {
  store.isDark = !store.isDark;
};

// 跳转路由
let goRouter = (path: string) => {
  if (store.isFolding) store.isFolding = false;
  router.push(path);
}
</script>

<style lang="scss" scoped>
@import "@/scss/mixins.scss";

.topNavBar {
  position: relative;
  z-index: 100;
  display: flex;
  align-items: center;
  height: 100%;
  background-color: var(--theme-color);
  box-shadow: 0 2px 5px rgba($color: #000000, $alpha: 0.2);

  user-select: none;

  // 标题
  h1.title {
    color: #fff;
    text-align: center;
    font-weight: 400;
    font-size: 20px;
    cursor: pointer;

    @include flexBasis(var(--sideNavBarWidth), 0, 0);
  }

  // 导航栏
  .nav {
    display: flex;
    overflow: hidden;
    flex: 1;
    justify-content: space-between;
    padding: 0px 15px;

    gap: 15px;
  }
}

.function {
  display: flex;
  align-items: center;

  gap: 10px;

  span,
  :deep(.icon) {
    flex: 1;
    color: rgba($color: #fff, $alpha: .7);
    white-space: nowrap;
    font-size: 19px;
    cursor: pointer;

    &:hover {
      color: #fff;
    }
  }
}
</style>
