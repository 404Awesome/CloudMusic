<!-- MV -->
<template>
  <div wrapBox pt-4 pb-8>
    <NewMV />
    <HotMV />
    <Exclusive />
    <MVRanking :limit="10">
      <template #default>
        <NavBar title="MV排行榜" path="/mvRankingList" />
      </template>
    </MVRanking>
  </div>
</template>

<script setup lang="ts">
import NewMV from "./coms/newMV.vue";                                 // 最新MV
import HotMV from "./coms/hotMV.vue";                                 // 热播MV
import Exclusive from "./coms/exclusive.vue";                         // 网易出品
import NavBar from "@/components/common/navBar/navBar.vue";           // 导航
import MVRanking from "@/components/content/mvRanking/mvRanking.vue"; // MV排行榜
</script>