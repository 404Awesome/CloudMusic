<!-- 路由导航 -->
<template>
  <div class="routerNav" v-show="!store.isFolding">
    <p v-if="$route.meta.tablist">
      <span v-for="item in ($route.meta.tablist as any)" :class="{ active: $route.fullPath == item.path }"
        @click="$router.push(item.path)">
        {{ item.title }}
      </span>
    </p>
    <p v-else>
      <span class="active">{{ $route.meta.title }}</span>
    </p>
  </div>
</template>

<script setup lang="ts">
import { useMainStore } from "store/index";
const store = useMainStore();
</script>

<style lang="scss" scoped>
.routerNav p {
  display: flex;
  color: rgba($color: #fff, $alpha: 0.7);

  gap: 15px;

  span {
    font-size: 15px;
    cursor: pointer;

    &.active {
      color: #fff;
    }

    &:hover {
      color: #fff;
    }
  }
}
</style>