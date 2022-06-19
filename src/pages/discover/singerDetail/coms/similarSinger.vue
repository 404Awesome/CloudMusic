<!-- 歌手详情 相似歌手 -->
<template>
  <!-- 提示 -->
  <el-alert v-if="!store.auth" mt-2 title="需登陆后进行查看!" type="warning" :closable="false" />

  <!-- 相似歌手列表 -->
  <div>
    <p></p>
  </div>
</template>

<script setup lang="ts">
import { ArtistAPI } from "api";
import { useMainStore } from "store";
import { useRoute } from "vue-router";

const route = useRoute();
const store = useMainStore();
const { id }: any = route.query;
const props = defineProps(['activeComs']);

// 相似歌手
let similarSinger = reactive([]);
// 加载相似歌手 需要登陆
let loadData = async () => {
  // let res = await ArtistAPI.getSimilar(id);
}

// 监听当前组件的激活状态
watch(() => props.activeComs, (newVal) => {
  if (newVal == "SimilarSinger" && similarSinger.length == 0) loadData();
})
</script>

<style lang="scss" scoped>
</style>