<!-- 相关mv -->
<template>
  <!-- 标题 -->
  <h4 text-lg mb-2>相关推荐</h4>
  <!-- 列表 -->
  <section mb-4 v-for="item in relevantList" :key="item.id">
    <MVItem v-bind="item" :isFlex="true" />
  </section>
</template>

<script setup lang="ts">
import MVItem from "@/components/content/mvItem/mvItem.vue";
import { MVAPI } from "api";
import { useRoute } from "vue-router";
const route = useRoute();

// 相关mv列表
let relevantList = reactive<any[]>([]);
// 加载相关mv
onMounted(async () => {
  try {
    let id = parseInt(route.params.id as string);
    let { code, mvs }: any = await MVAPI.getRelevant(id);
    if (code == 200) relevantList.push(...mvs);
  } catch (err: any) {
    ElMessage.error("加载相关mv失败!");
  }
});
</script>