<!-- 歌手详情 MV列表 -->
<template>
  <div>
    <p>MV</p>
  </div>
</template>

<script setup lang="ts">
let props = defineProps(['activeComs']);

// MV列表
let mvList = reactive([]);

// 加载数据
let loadData = () => {
  console.log("loading...");
}

// 监听当前组件的激活状态
watch(() => props.activeComs, (newVal) => {
  if (newVal == "MV" && mvList.length == 0) loadData();
})
</script>

<style lang="scss" scoped>
</style>