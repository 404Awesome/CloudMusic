<!-- 顶部导航栏 -->
<template>
  <div relative z-100 flex items-center h-full shadow-md themeBgColor select-none>
    <!-- 标题 -->
    <h1 @click="goRouter('/')" text="white 20px center" cursor-pointer sideNavBarWidth select-none hidden md:block>
      CloudMusic
    </h1>

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
        <span @click="goRouter('/notice')" class="icon" i-heroicons-outline:bell></span>

        <!-- 暗夜模式 -->
        <span @click="toggleDark()" class="icon i-heroicons-outline:sun dark:i-heroicons-outline:moon"></span>

        <!-- 设置 -->
        <span @click="goRouter('/setting')" class="icon" i-heroicons-outline:cog></span>
      </section>
    </nav>
  </div>
</template>

<script lang="ts" setup>
import RouterNav from "./coms/routerNav.vue";
import Search from "./coms/search.vue";
import ThemeSelect from "./coms/themeSelect.vue";
import { useDark, useToggle } from "@vueuse/core";
import { useRouter } from "vue-router";
import { useMainStore } from "store";
const store = useMainStore();
const router = useRouter();
const isDark = useDark();
const toggleDark = useToggle(isDark);

// 跳转路由
let goRouter = (path: string) => {
  if (store.isFolding) store.isFolding = false;
  router.push(path);
};
</script>

<style lang="scss" scoped>
.icon {
  @apply flex-1 text-white/70 whitespace-nowrap text-19px cursor-pointer hover-text-white;
}
</style>
