<!-- 个性推荐 MV -->
<template>
  <MVList mt-4 :list="mvList" />
</template>

<script setup lang="ts">
import MVList from "@/components/content/mvList/mvList.vue";
import { MV } from "@/api/modules/video";

// mv列表
let mvList = reactive<any[]>([]);
// 加载mv列表
onMounted(async () => {
  try {
    let { code, result }: any = await MV.getPersonalized();
    if (code == 200) mvList.push(...result);
  } catch (err: any) {
    ElMessage.error("加载MV列表失败!");
  }
});
</script>