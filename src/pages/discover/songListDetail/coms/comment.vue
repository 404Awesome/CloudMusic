<!-- 歌单评论 -->
<template>
  <div>
    <p>歌单评论</p>
  </div>
</template>

<script setup lang="ts">
const props = defineProps(['activeComs']);

// 评论列表
let commentList = reactive([]);

// 加载数据
let loadData = () => {
  console.log("loading...");
}

// 监听当前组件的激活状态
watch(() => props.activeComs, (newVal) => {
  if (newVal == "Comment" && commentList.length == 0) loadData();
})
</script>

<style lang="scss" scoped>
</style>