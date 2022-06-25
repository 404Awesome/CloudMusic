<!-- Video -->
<template>
  <div wrapBox pt-15px>
    <CateList :loading="loading" :currentType="currentType" />
  </div>
</template>

<script setup lang="ts">
import CateList from "./coms/cateList.vue";
import { ref } from "vue";
import { VideoAPI } from "api";
// await VideoAPI.getCateList()

// 是否正在加载
let loading = ref<boolean>(false);
// 当前类型
let currentType = ref<string>("全部视频");
</script>