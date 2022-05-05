<!-- 热播mv -->
<template>
  <div my-12>
    <!-- 导航栏 -->
    <nav mb-4>
      <NavBar title="热播MV" path="/allMV" />
    </nav>

    <!-- 列表 -->
    <ul class="list">
      <li v-for="item in result" :key="item.id">
        <MVlistItem v-bind="item" />
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import NavBar from "@/components/common/navBar/navBar.vue";
import MVlistItem from "@/components/content/mvListItem/mvListItem.vue";
import { MV } from "@/api/modules/video";

// 请求所有mv
let result = reactive<any>([])
onMounted(async () => {
  let { code, data }: any = await MV.getAllMV("全部", "全部", "最热", 0, 8);
  if (code == 200) result.push(...data);
})
</script>

<style lang="scss" scoped>
.list {
  display: grid;

  grid-template-columns: repeat(4, 1fr);
  gap: 30px;

  li {
    overflow: hidden;
  }
}
</style>
