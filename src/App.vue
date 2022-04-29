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

<style lang="scss">
:root {
  --theme-bg-color: #ff3f34;
  --font-color: #34495e;
}

body {
  margin: 0;
  padding: 0;
}

img,
span {
  vertical-align: middle;
}

p {
  margin: 0;
}

ul {
  margin: 0;
  padding: 0;
  list-style-type: none;
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
