<!-- mv排行榜 -->
<template>
  <div mt-12>
    <!-- 导航 -->
    <nav flex mb-4>
      <NavBar title="MV排行榜" path="/mvRankingList" />
      <TypeSelect
        :loading="loading"
        :typeList="areaList"
        @selected="selected"
      />
    </nav>

    <!-- 列表 -->
    <ul class="rankingList" v-loading="loading">
      <li v-for="(item, index) in result" :key="item.id">
        <MVRankingItem :data="item" :rank="index + 1" />
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import NavBar from "@/components/common/navBar/navBar.vue";
import TypeSelect from "@/components/content/typeSelect/typeSelect.vue";
import MVRankingItem from "@/components/content/mvRankingItem/mvRankingItem.vue";
import { MV } from "@/api/modules/video";

// 加载状态
let loading = ref(false);
// 地区列表
let areaList = reactive<string[]>(["内地", "港台", "欧美", "日本", "韩国"]);
// 选中类型
let selected = (area: string) => {
  loading.value = true;
  loadData(area);
};

// 获取排行榜的结果
let result = reactive<any>([]);
let loadData = async (area: string, limit: number = 10) => {
  let { code, data }: any = await MV.getTop(area, 0, limit);
  if (code == 200) {
    result.splice(0, result.length, ...data);
    loading.value = false;
  }
};
onMounted(() => loadData(areaList[0]));
</script>

<style lang="scss" scoped>
.rankingList {
  display: grid;

  grid-template-columns: repeat(2, 1fr);
  gap: 30px 20px;

  li {
    overflow: hidden;
  }
}
</style>
