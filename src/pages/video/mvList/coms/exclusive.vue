<!-- 网易出品 -->
<template>
  <div my-12>
    <!-- 导航栏 -->
    <nav mb-4>
      <NavBar title="网易出品" path="/allMV/?area=全部&type=网易出品&order=最新" />
    </nav>

    <!-- 列表 -->
    <MVList :list="list" :loading="loading" />
  </div>
</template>

<script setup lang="ts">
import NavBar from "@/components/common/navBar/navBar.vue";
import MVList from "@/components/content/mvList/mvList.vue";
import { MV } from "@/api/modules/video";

// 加载状态
let loading = ref(false);
// 请求到的结果
let list = reactive<any>([]);
onMounted(async () => {
  try {
    loading.value = true;
    let { code, data }: any = await MV.getExclusive(0, 8);
    if (code == 200) list.push(...data);
  } catch (err: any) {
    ElMessage.error("加载网易出品MV失败!");
  } finally {
    loading.value = false;
  }
});
</script>