<!-- 他人的个人主页 -->
<template>
  <div>
    <h1>{{ route.params.uid }}</h1>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
const route = useRoute();
</script>

<style lang="scss" scoped>
</style>