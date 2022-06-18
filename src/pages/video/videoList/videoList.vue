<!-- Video -->
<template>
  <div class="wrapper videoList">
    <!-- 分类导航 -->
    <AllTypeSelect @selected="typeSelected" defaultType="全部视频" :hotTypeList="hotTypeList" />
  </div>
</template>

<script setup lang="ts">
import AllTypeSelect from "@/components/content/allTypeSelect/allTypeSelect.vue";
import { VideoAPI } from "api";

// 热门分类列表
let hotTypeList = reactive<string[]>(['现场', '翻唱', '舞蹈', '听BGM', 'MV', '生活', '游戏', 'ACG音乐', '最佳饭制']);

// 类型的选择
let typeSelected = (type: string) => {
  console.log(type);
}

onMounted(async () => {
  // let list = await VideoAPI.getCateList();
  // console.log(list);
})
</script>

<style lang="scss" scoped>
.videoList {
  padding-top: 15px;
}
</style>