<!-- 全部mv排行榜 -->
<template>
  <div class="wrapper ranking">
    <MVRanking :limit="50">
      <p class="title">
        <span>最近更新: 今天</span>
        <el-popover :hide-after="0" placement="bottom-start" :width="200" trigger="hover">
          <template #reference>
            <span class="i-heroicons-outline:information-circle"></span>
          </template>
          <template #default>
            <p>选取云音乐中三个月内发布的热度最高的50支MV,每天更新。热度由MV播放、收藏、分享数量综合计算</p>
          </template>
        </el-popover>
      </p>
    </MVRanking>
  </div>
</template>

<script setup lang="ts">
import MVRanking from "@/components/content/mvRanking/mvRanking.vue";
</script>

<style lang="scss" scoped>
.ranking {
  padding: 15px 0px 30px;

  .title {
    color: var(--font-color);
    font-size: 15px;
    white-space: nowrap;

    span:last-child {
      margin-left: 5px;
      font-size: 17px;
      cursor: pointer;

      &:hover {
        color: var(--theme-bg-color);
      }
    }
  }
}
</style>