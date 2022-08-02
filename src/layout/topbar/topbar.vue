<!-- 顶部导航栏 -->
<template>
  <div class="topbar">
    <!-- 标题 -->
    <h1 @click="$router.push('/')" class="title">CloudMusic</h1>

    <!-- 导航栏 -->
    <nav flex overflow-hidden flex-1 justify-between p-x-15px gap-15px>
      <!-- 路由 -->
      <section flex-1>
        <RouterNav />
      </section>

      <!-- 功能 -->
      <section flex items-center gap-10px>
        <!-- 搜索 -->
        <Search />

        <!-- 主题 -->
        <ThemeSelect />

        <!-- 通知 -->
        <span v-if="store.auth" @click.stop="openNoticeDrawer" class="icon" i-carbon:notification></span>

        <!-- 暗夜模式 -->
        <span @click.stop="toggleDark()" class="icon" i-carbon:sun dark:i-carbon-moon></span>

        <!-- 设置 -->
        <span @click.stop="$router.push('/setting')" class="icon" i-carbon:settings></span>
      </section>
    </nav>
  </div>
</template>

<script lang="ts" setup>
import ThemeSelect from "./coms/themeSelect.vue";
import RouterNav from "./coms/routerNav.vue";
import Search from "./coms/search.vue";
import { useDark, useToggle } from "@vueuse/core";
import { useRouter } from "vue-router";
import { useMainStore } from "store";
const store = useMainStore();
const router = useRouter();
const isDark = useDark();
const toggleDark = useToggle(isDark);

// 打开通知
let openNoticeDrawer = () => {
  store.playListDrawer = false;
  store.messageDrawer = !store.messageDrawer;
}
</script>

<style lang="scss" scoped>
// 顶部导航栏
.topbar {
  @apply relative z-100 flex items-center h-full shadow-md themeBgColor select-none dark-bg-gray-700;
}

// 标题
.title {
  width: var(--sideNavBarWidth);
  @apply text-white text-20px text-center cursor-pointer select-none hidden md-block dark-text-gray-300;
}

// 图标
:deep(.icon) {
  @apply flex-1 text-white/70 whitespace-nowrap text-19px cursor-pointer hover-text-white hover-dark-text-orange-400;
}
</style>
