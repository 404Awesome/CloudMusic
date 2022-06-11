<!-- 热播MV -->
<template>
  <div my-12>
    <!-- 导航栏 -->
    <nav mb-4>
      <NavBar title="热播MV" path="/allMV/?area=全部&type=全部&order=最热" />
    </nav>

    <!-- 列表 -->
    <MVList :list="mvList" :loading="loading" />
  </div>
</template>

<script setup lang="ts">
import NavBar from "@/components/common/navBar/navBar.vue";
import MVList from "@/components/content/mvList/mvList.vue";
import { MV } from "@/api/modules/video";

// 加载状态
let loading = ref(false);
// mv列表
let mvList = reactive<any>([])
onMounted(async () => {
  try {
    loading.value = true;
    let { code, data }: any = await MV.getAllMV("全部", "全部", "最热", 0, 8);
    if (code == 200) mvList.push(...data);
  } catch (err: any) {
    ElMessage.error("加载热播MV失败!");
  } finally {
    loading.value = false;
  }
})
</script>
