<!-- 最新MV -->
<template>
  <div>
    <!-- 导航栏 -->
    <nav flex mb-4>
      <NavBar flex-1 title="最新MV" path="/allMV/?area=内地&type=全部&order=最新" />
      <TypeSelect :loading="loading" :typeList="areaList" @selected="selected" />
    </nav>

    <!-- 列表 -->
    <MVList :list="list" :loading="loading" />
  </div>
</template>

<script setup lang="ts">
import NavBar from "@/components/common/navBar/navBar.vue";
import TypeSelect from "@/components/content/typeSelect/typeSelect.vue";
import MVList from "@/components/content/mvList/mvList.vue";
import { MVAPI } from "api";

// 加载状态
let loading = ref(false);
// 地区列表
let areaList = reactive<string[]>(["内地", "港台", "欧美", "日本", "韩国"]);
// 选择选项事件
let selected = (area: string) => loadData(area);

// 加载最新mv的结果
let list = reactive<any>([]);
let loadData = async (area: string, limit: number = 8) => {
  try {
    loading.value = true;
    let { code, data }: any = await MVAPI.getNewMV(area, limit);
    if (code == 200) {
      list.splice(0, list.length, ...data);
    }
  } catch (err) {
    ElMessage.error("加载最新MV失败!");
  } finally {
    loading.value = false;
  }
};
onMounted(() => loadData(areaList[0]));
</script>