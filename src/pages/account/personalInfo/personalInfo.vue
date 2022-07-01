<!-- 我的主页 -->
<template>
  <div wrapBox pt-15px pb-20px>
    <div grid grid-cols-1 md:grid-cols-2 md:gap-15px>
      <!-- 详情 -->
      <Detail />

      <div></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Detail from "./coms/detail.vue";
</script>

<style lang="scss" scoped>
</style>