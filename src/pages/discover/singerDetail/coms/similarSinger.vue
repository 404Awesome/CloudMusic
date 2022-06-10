<!-- 歌手详情 相似歌手 -->
<template>
  <div>
    <p></p>
  </div>
</template>

<script setup lang="ts">
import { Discover } from '@/api/modules/discover';
import { useRoute } from "vue-router";
const route = useRoute();
const { id }: any = route.query;
const props = defineProps(['activeComs']);

// 相似歌手
let similarSinger = reactive([]);

// 加载数据 需要登陆
let loadData = async () => {
  // let res = await Discover.getSimiArtist(id);
}

// 监听当前组件的激活状态
watch(() => props.activeComs, (newVal) => {
  if (newVal == "SimilarSinger" && similarSinger.length == 0) loadData();
})
</script>

<style lang="scss" scoped>
</style>