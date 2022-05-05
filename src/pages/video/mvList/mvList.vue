<!-- MV -->
<template>
  <div mx-auto w="8/10" pb-8>
    <!-- 最新mv -->
    <NewMV />

    <!-- 热播mv -->
    <HotMV />

    <!-- 网易出品 -->
    <Exclusive />

    <!-- mv排行榜 -->
    <MVRanking :limit="10">
      <NavBar title="MV排行榜" path="/mvRankingList" />
    </MVRanking>
  </div>
</template>

<script setup lang="ts">
import NewMV from "./coms/newMV.vue";
import HotMV from "./coms/hotMV.vue";
import Exclusive from "./coms/exclusive.vue";
import NavBar from "@/components/common/navBar/navBar.vue";
import MVRanking from "@/components/content/mvRanking/mvRanking.vue";
</script>