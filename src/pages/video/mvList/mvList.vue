<!-- MV -->
<template>
  <div class="mvList">
    <!-- 最新mv -->
    <NewMV />

    <!-- 热播mv -->
    <HotMV />

    <!-- 网易出品 -->
    <Exclusive />

    <!-- mv排行榜 -->
    <RankingList />
  </div>
</template>

<script setup lang="ts">
import NewMV from "./coms/newMV.vue";
import HotMV from "./coms/hotMV.vue";
import Exclusive from "./coms/exclusive.vue";
import RankingList from "./coms/rankingList.vue";
</script>

<style lang="scss" scoped>
.mvList {
  margin: 0px auto;
  padding: 15px 0px 30px;
  width: 80%;
}
</style>
