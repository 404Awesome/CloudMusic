<!-- 最新MV -->
<template>
  <div>
    <!-- 导航栏 -->
    <nav flex mb-4>
      <NavBar title="最新MV" path="/allMV" />
      <TypeSelect
        :loading="loading"
        :typeList="areaList"
        @selected="selected"
      />
    </nav>

    <!-- 列表 -->
    <ul class="list" v-loading="loading">
      <li v-for="item in result" :key="item.id">
        <MVlistItem v-bind="item" />
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import NavBar from "@/components/common/navBar/navBar.vue";
import TypeSelect from "@/components/content/typeSelect/typeSelect.vue";
import MVlistItem from "@/components/content/mvListItem/mvListItem.vue";
import { MV } from "@/api/modules/video";

// 加载状态
let loading = ref(false);
// 地区列表
let areaList = reactive<string[]>(["内地", "港台", "欧美", "日本", "韩国"]);
// 选择选项
let selected = (area: string) => {
  loading.value = true;
  loadData(area);
};

// 获取最新mv的结果
let result = reactive<any>([]);
let loadData = async (area: string, limit: number = 8) => {
  let { code, data }: any = await MV.getNewMV(area, limit);
  if (code == 200) {
    result.splice(0, result.length, ...data);
    loading.value = false;
  }
};
onMounted(() => loadData(areaList[0]));
</script>

<style lang="scss" scoped>
.list {
  display: grid;

  gap: 30px;
  grid-template-columns: repeat(4, 1fr);

  li {
    overflow: hidden;
  }
}
</style>
