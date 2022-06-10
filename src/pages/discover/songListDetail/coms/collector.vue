<!-- 歌单收藏者 -->
<template>
  <div>
    <p>收藏者</p>
  </div>
</template>

<script setup lang="ts">
const props = defineProps(['activeComs']);

// 收藏者列表
let collectorList = reactive([]);

// 加载数据
let loadData = () => {
  console.log("loading...");
}

// 监听当前组件的激活状态
watch(() => props.activeComs, (newVal) => {
  if (newVal == "Collector" && collectorList.length == 0) loadData();
})
</script>

<style lang="scss" scoped>
</style>