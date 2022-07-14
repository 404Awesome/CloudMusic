<!-- 个人主页 -->
<template>
  <div wrapBox :key="`${$route.params.uid}`">
    <Detail :key="($route.params.uid as string)" />
  </div>
</template>

<script lang="ts">
export default { name: "personalPage" }
</script>
<script setup lang="ts">
import Detail from "./coms/detail.vue";
</script>
