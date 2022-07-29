<!-- 路由导航 -->
<template>
  <div class="routerNav">
    <p v-if="$route.meta.tablist">
      <span v-for="item in ($route.meta.tablist as any)" :class="{ active: $route.fullPath == item.path }"
        @click="$router.push(item.path)">
        {{ item.auth && !store.auth ? "" : item.title }}
      </span>
    </p>
    <p v-else>
      <span class="active">{{ $route.meta.title }}</span>
    </p>
  </div>
</template>

<script setup lang="ts">
import { useMainStore } from "store";
const store = useMainStore();
</script>

<style lang="scss" scoped>
.routerNav p {
  @apply flex text-white/70 whitespace-nowrap gap-15px select-none;

  span {
    @apply text-15px cursor-pointer;

    &.active,
    &:hover {
      @apply text-white dark-text-orange-400;
    }
  }
}
</style>