<!-- 主题选择 -->
<template>
  <el-popover placement="bottom" trigger="click">
    <template #reference>
      <span class="icon" i-carbon:color-palette></span>
    </template>
    <template #default>
      <ul flex justify-center gap-20px @click="themeSelect">
        <li class="themeItem" bg="#d95047" bg-color="#d95047"></li>
        <li class="themeItem" cursor-pointer bg="#575fcf" bg-color="#575fcf"></li>
        <li class="themeItem" cursor-pointer bg="#fa8231" bg-color="#fa8231"></li>
      </ul>
    </template>
  </el-popover>
</template>

<script setup lang="ts">
import { useMainStore } from "store";
const store = useMainStore();

// 主题选择
let themeSelect = (event: Event) => {
  let color = (event.target as any).getAttribute("bg-color");
  if (!color || color == store.themeColor) return;
  store.themeColor = color;
  document.documentElement.style.setProperty("--theme-color", color);
};
</script>

<style lang="scss" scoped>
.themeItem {
  @apply w-20px h-20px rounded-full cursor-pointer;
}

.icon {
  @apply flex-1 text-white/70 whitespace-nowrap text-19px cursor-pointer hover-text-white;
}
</style>