<template>
  <div my-12>
    <!-- 导航栏 -->
    <nav mb-4>
      <NavBar title="网易出品" path="/allMV" />
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

// 请求到的结果
let result = reactive<any>([]);
onMounted(async () => {
  let { code, data }: any = await MV.getExclusive(0, 8);
  if (code == 200) result.push(...data);
});
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
