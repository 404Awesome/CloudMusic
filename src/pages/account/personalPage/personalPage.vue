<!-- 个人主页 -->
<template>
  <div wrapBox :key="`${$route.params.uid}`">
    <!-- 详情 -->
    <Detail :key="($route.params.uid as string)" />
    <!-- 歌单 -->
    <SongList />
  </div>
</template>

<script lang="ts">
export default { name: "personalPage" }
</script>
<script setup lang="ts">
import Detail from "./coms/detail.vue";
import SongList from "./coms/songList.vue";
</script>
