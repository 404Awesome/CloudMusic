<!-- 个性推荐 MV -->
<template>
  <MVList mt-4 :list="mvList" />
</template>

<script setup lang="ts">
import MVList from "@/components/content/mvList/mvList.vue";
import { reactive, onMounted } from "vue";
import { ElMessage } from "element-plus";
import { MVAPI } from "api";

// mv列表
let mvList = reactive<any[]>([]);
// 加载mv列表
onMounted(async () => {
  try {
    let { code, result }: any = await MVAPI.getPersonalized();
    if (code == 200) mvList.push(...result);
  } catch (err: any) {
    ElMessage.error("加载MV列表失败!");
  }
});
</script>