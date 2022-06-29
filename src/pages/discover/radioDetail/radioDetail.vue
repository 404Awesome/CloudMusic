<!-- 电台详情页面 -->
<template>
  <div>
    <p>{{ route.params.id }}</p>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
const route = useRoute();
</script>

<style lang="scss" scoped>
</style>