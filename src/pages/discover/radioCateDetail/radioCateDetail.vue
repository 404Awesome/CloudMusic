<!-- 电台分类详情 -->
<template>
  <div>
    <p>{{ route.query }}</p>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
const route = useRoute();
</script>

<style lang="scss" scoped>
</style>