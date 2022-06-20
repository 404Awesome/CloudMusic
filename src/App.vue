<!-- CloudMusic -->
<template>
  <Layout />
</template>

<script setup lang="ts">
import Layout from "@/layout/index.vue"; // 布局
import { useMainStore } from "store";
const store = useMainStore();

onMounted(() => {
  // 初始化主题
  document.documentElement.style.setProperty("--theme-color", store.themeColor);
});
</script>