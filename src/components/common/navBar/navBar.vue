<!-- 导航栏 -->
<template>
  <nav flex items-center w-full>
    <!-- 标题 -->
    <h4 @click="$router.push(path)" class="peer" hover="themeColor" m-0 whitespace-nowrap text-17px cursor-pointer>
      {{ title }}
    </h4>
    <!-- 图标 -->
    <span peer-hover="themeColor translate-x-5px" text-20px transition-transform
      i-heroicons-outline:chevron-right></span>
  </nav>
</template>

<script setup lang="ts">
import { toRaw } from "vue";

const props = defineProps({
  path: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  }
});
const { path, title } = toRaw(props);
</script>