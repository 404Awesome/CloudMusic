<!-- 歌单详情 -->
<template>
  <el-scrollbar @scroll="scroll">
    <div class="wrapper">
      <!-- 歌单描述 -->
      <Detail>
        <template #fold="{ id, title, height, share }">
          <div :class="{ hidden: scrollTop <= height, disabled: activeComs !== 'SongList' }" class="detailFold">
            <div class="content">
              <!-- 标题 -->
              <h1 class="title">{{ title }}</h1>
              <!-- 操作 -->
              <ul class="operate">
                <li @click="playSongList(id)">
                  <span class="icon i-eva:arrow-right-fill"></span>
                </li>
                <li @click="collectSongList(id)">
                  <span class="icon i-heroicons-outline:folder-add"></span>
                </li>
                <li @click="share">
                  <span class="icon i-heroicons-outline:external-link"></span>
                </li>
              </ul>
            </div>
          </div>
        </template>
      </Detail>

      <!-- 歌曲详情 -->
      <el-tabs v-model="activeComs">
        <el-tab-pane v-for="item in tabPaneList" :key="item.name" :label="item.label" :name="item.name">
          <component :activeComs="activeComs" :is="item.component" />
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
import { playSongList, collectSongList } from "@/utils/operate";
import { useThrottleFn } from "@vueuse/core";

// 当前激活的组件
let activeComs = ref("SongList");
// tab列表
let tabPaneList = reactive([
  {
    label: "歌曲列表",
    name: "SongList",
    component: shallowRef(SongList)
  },
  {
    label: "评论",
    name: "Comment",
    component: shallowRef(Comment)
  },
  {
    label: "收藏者",
    name: "Collector",
    component: shallowRef(Collector)
  }
]);

// 视图滚动事件
let scrollTop = ref(0);
let scroll = useThrottleFn((event) => {
  scrollTop.value = event.scrollTop;
}, 100);
</script>

<style lang="scss" scoped>
@import "@/scss/mixins.scss";

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

      @include oneOmit;
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

  &.disabled {
    display: none !important;
  }
}

@media screen and (max-width: 1000px) {
  .detailFold .content {
    padding: 10px 30px;
    width: 100%;
  }
}
</style>