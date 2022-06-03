<!-- 歌手详情 -->
<template>
  <div class="wrapper" pt-4>
    <h1>{{ $route.query }}</h1>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
const route = useRoute();

onMounted(() => {
  console.log(route.query);
})
</script>

<style lang="scss" scoped>
</style>