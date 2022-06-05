<!-- 歌手详情 歌手信息 -->
<template>
  <div>
    <p>歌手信息</p>
  </div>
</template>

<script setup lang="ts">
let props = defineProps(['activeComs']);

// 歌手信息
let singerInfo = reactive([]);

// 加载数据
let loadData = () => {
  console.log("loading...");
}

// 监听当前组件的激活状态
watch(() => props.activeComs, (newVal) => {
  if (newVal == "SingerInfo" && singerInfo.length == 0) loadData();
})
</script>

<style lang="scss" scoped>
</style>