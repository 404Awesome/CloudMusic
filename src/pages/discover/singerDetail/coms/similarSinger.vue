<!-- 歌手详情 相似歌手 -->
<template>
  <div>
    <p>相似歌手</p>
  </div>
</template>

<script setup lang="ts">
let props = defineProps(['activeComs']);

// 相似歌手
let similarSinger = reactive([]);

// 加载数据
let loadData = () => {
  console.log("loading...");
}

// 监听当前组件的激活状态
watch(() => props.activeComs, (newVal) => {
  if (newVal == "SimilarSinger" && similarSinger.length == 0) loadData();
})
</script>

<style lang="scss" scoped>
</style>