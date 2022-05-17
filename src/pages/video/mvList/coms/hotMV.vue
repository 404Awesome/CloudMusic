<!-- 热播mv -->
<template>
  <div my-12>
    <!-- 导航栏 -->
    <nav mb-4>
      <NavBar title="热播MV" path="/allMV/?area=全部&type=全部&order=最热" />
    </nav>

    <!-- 列表 -->
    <MVList :list="list" />
  </div>
</template>

<script setup lang="ts">
import NavBar from "@/components/common/navBar/navBar.vue";
import MVList from "@/components/content/mvList/mvList.vue";
import { MV } from "@/api/modules/video";

// 请求所有mv
let list = reactive<any>([])
onMounted(async () => {
  let { code, data }: any = await MV.getAllMV("全部", "全部", "最热", 0, 8);
  if (code == 200) list.push(...data);
})
</script>
