<!-- 歌单详情 -->
<template>
  <!-- 歌单描述 -->
  <Detail />

  <!-- 歌曲详情 -->
  <el-tabs class="tabs">
    <el-tab-pane label="歌曲列表">
      <SongList />
    </el-tab-pane>
    <el-tab-pane label="评论">
      <Comment />
    </el-tab-pane>
    <el-tab-pane label="收藏者">
      <Collector />
    </el-tab-pane>
  </el-tabs>
</template>

<script setup lang="ts" name="playListDetail">
import Detail from "./coms/detail.vue";
import SongList from "./coms/songList.vue";
import Comment from "./coms/comment.vue";
import Collector from "./coms/collector.vue";
</script>

<style lang="scss" scoped>
.tabs {
  margin: 0 auto;
  width: 80%;

  :deep(.el-tabs__header) {
    margin: 0px;
  }

  :deep(.el-tabs__nav) {
    .el-tabs__item {
      color: var(--font-color);

      &.is-active {
        color: var(--theme-bg-color);
      }
    }

    .el-tabs__active-bar {
      background-color: var(--theme-bg-color);
    }
  }
}
</style>