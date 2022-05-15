<!-- 主题选择 -->
<template>
  <el-popover placement="bottom" trigger="click">
    <template #reference>
      <span class="icon i-heroicons-outline:color-swatch"></span>
    </template>
    <template #default>
      <ul class="themeSelect" @click="themeSelect">
        <li data-color="#ff3f34"></li>
        <li data-color="#575fcf"></li>
        <li data-color="#6ab04c"></li>
      </ul>
    </template>
  </el-popover>
</template>

<script setup lang="ts">
import { useMainStore } from "store/index";
const store = useMainStore();

// 主题选择
let themeSelect = (event: Event) => {
  let color = (event.target as any).getAttribute("data-color");
  if (!color || color == store.theme) return;
  store.theme = color;
  document.documentElement.style.setProperty("--theme-bg-color", color);
};
</script>

<style lang="scss" scoped>
.themeSelect {
  display: flex;
  justify-content: center;

  gap: 20px;

  li {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    cursor: pointer;

    &:nth-child(1) {
      background-color: #ff3f34;
    }

    &:nth-child(2) {
      background-color: #575fcf;
    }

    &:nth-child(3) {
      background-color: #6ab04c;
    }
  }
}
</style>