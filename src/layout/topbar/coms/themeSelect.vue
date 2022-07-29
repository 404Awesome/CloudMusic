<!-- 主题选择 -->
<template>
  <el-popover placement="bottom" trigger="click" :hide-after="0">
    <template #reference>
      <span class="icon" i-carbon:color-palette></span>
    </template>
    <template #default>
      <ul @click="themeSelect" class="themeList">
        <li bg="#d95047"></li>
        <li bg="#575fcf"></li>
        <li bg="#fa8231"></li>
        <li bg="#6ab04c"></li>
      </ul>
    </template>
  </el-popover>
</template>

<script setup lang="ts">
import { useMainStore } from "store";
const store = useMainStore();

// 主题选择
let themeSelect = (event: Event) => {
  let color = (event.target as any).getAttribute("bg");
  if (!color || color == store.themeColor) return;
  store.themeColor = color;
  document.documentElement.style.setProperty("--theme-color", color);
};
</script>

<style lang="scss" scoped>
.themeList {
  @apply flex justify-around py-10px;

  li {
    @apply w-20px h-20px rounded-full cursor-pointer;

  }
}
</style>