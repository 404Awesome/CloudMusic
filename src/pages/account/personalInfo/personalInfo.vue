<!-- 我的主页 -->
<template>
  <div wrapBox pt-15px pb-20px>
    <div grid grid-cols-1 gap-y-20px md:grid-cols-2 md:gap-x-15px lg:gap-x-30px>
      <!-- 详情 -->
      <Detail @getUid="(userId: number) => uid = userId" />

      <!-- 用户歌单 -->
      <SongList :uid="uid" />
    </div>
  </div>
</template>

<script setup lang="ts">
import Detail from "./coms/detail.vue";
import SongList from "./coms/songList.vue";
import { ref } from "vue";

// 用户ID
let uid = ref(0);
</script>