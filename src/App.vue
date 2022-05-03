<!-- CloudMusic -->
<template>
  <main :class="{ dark: store.isDark }">
    <Layout />
  </main>
</template>

<script setup lang="ts">
import Layout from "@/layout/index.vue"; // 布局
import { useMainStore } from "store/index";
const store = useMainStore();

// 初始化主题
onMounted(() => {
  document.documentElement.style.setProperty("--theme-bg-color", store.theme);
});
</script>
