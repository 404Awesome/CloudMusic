<!-- 歌单详情 -->
<template>
  <el-scrollbar @scroll="scroll">
    <div class="wrapper">
      <!-- 歌单描述 -->
      <Detail>
        <template #fold="{ title, height, collection, share, download, playAll }">
          <div :class="{ hidden: scrollTop <= height }" class="detailFold">
            <div class="content">
              <h1 class="title">{{ title }}</h1>
              <ul class="operate">
                <li @click.once="playAll">
                  <span class="icon i-eva:arrow-right-fill"></span>
                </li>
                <li @click="collection">
                  <span class="icon i-heroicons-outline:folder-add"></span>
                </li>
                <li @click="share">
                  <span class="icon i-heroicons-outline:external-link"></span>
                </li>
                <li @click="download">
                  <span class="icon i-eva:cloud-download-outline"></span>
                </li>
              </ul>
            </div>
          </div>
        </template>
      </Detail>

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
    </div>
  </el-scrollbar>
</template>

<script setup lang="ts" name="playListDetail">
import Detail from "./coms/detail.vue";
import SongList from "./coms/songList.vue";
import Comment from "./coms/comment.vue";
import Collector from "./coms/collector.vue";
import { useThrottleFn } from "@vueuse/core";

// 视图滚动事件
let scrollTop = ref(0);
let scroll = useThrottleFn((event) => {
  scrollTop.value = event.scrollTop;
}, 100);
</script>

<style lang="scss" scoped>
.tabs {
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

// 详情折叠
.detailFold {
  position: fixed;
  top: var(--topNavBarHeight);
  right: 0px;
  left: var(--sideNavBarWidth);
  z-index: 10;
  height: 80px;
  opacity: 1;
  transition: all .3s ease-in-out;
  transform: translateY(0px);

  .content {
    display: flex;
    flex-flow: column nowrap;
    justify-content: space-between;
    margin: 0 auto;
    padding: 10px 0px;
    width: 80%;
    height: 100%;
    border-bottom: 3px solid var(--theme-bg-color);
    border-radius: 0px 0px 3px 3px;
    background-color: #fff;

    .title {
      color: var(--font-color);
      font-size: 19px;
    }

    .operate {
      display: flex;

      gap: 10px;

      li {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 23px;
        height: 23px;
        cursor: pointer;

        &:first-child {
          border-radius: 50%;
          background: linear-gradient(to right, #fa5042, #d43b32);

          .icon {
            color: #fff !important;
          }
        }

        .icon {
          color: #7f8c8d;
          font-size: 20px;

          &:hover {
            color: var(--theme-bg-color);
          }
        }
      }
    }
  }

  &.hidden {
    opacity: 0;
    transition: all .2s ease-out;
    transform: translateY(-80px);
  }
}

@media screen and (max-width: 1000px) {
  .detailFold .content {
    padding: 10px 30px;
    width: 100%;
  }
}
</style>