<!-- 播放列表 -->
<template>
  <el-drawer custom-class="playListDrawer" modal-class="playListModal" size="350px" :z-index="200"
    :append-to-body="true" v-model="isShow" :with-header="false">
    <!-- 头部 -->
    <header class="header">
      <h1 class="title">当前播放</h1>
      <div class="content">
        <p text-gray-400>总{{ store.playList.length }}首</p>
        <div class="operate">
          <p>
            <span class="icon i-eva:folder-add-outline"></span>
            <span>收藏全部</span>
          </p>
          <p @click="store.playList.splice(0)">
            <span class="icon i-eva:trash-2-outline"></span>
            <span>清空列表</span>
          </p>
        </div>
      </div>
    </header>

    <!-- 分割线 -->
    <el-divider m-0 />

    <!-- 列表 -->
    <div class="scrollbar">
      <el-scrollbar always>
        <div class="list">
          <ul>
            <li :class="{ active: item.song.id == store.currentSong?.song.id }" v-for="item in store.playList"
              :key="item.song.id">{{ item.song.name }}</li>
          </ul>
        </div>
      </el-scrollbar>
    </div>
  </el-drawer>
</template>

<script setup lang="ts">
import { useMainStore } from "store/index";
const store = useMainStore();

let isShow = ref<boolean>(false);
let toggle = () => {
  isShow.value = !isShow.value;
}

defineExpose({ toggle })
</script>

<style lang="scss" scoped>
header.header {
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-between;
  box-sizing: border-box;
  padding: 10px 15px;
  height: 80px;
  background-color: #fff;

  .title {
    color: var(--font-color);
    font-size: 20px;
  }

  .content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #fff;

    .operate {
      display: flex;
      color: var(--font-color);

      gap: 10px;

      p {
        padding: 3px 6px;
        border: 1px solid #eee;
        border-radius: 5px;
        cursor: pointer;

        &:hover {
          background-color: #f5f7fa;
          color: var(--theme-bg-color);
        }

        .icon {
          margin-right: 3px;
          font-size: 16px;
        }
      }
    }
  }
}

.scrollbar {
  height: calc(100% - 80px - 1px);
  background-color: #fff;

  .list {
    padding: 15px;
  }
}

.active {
  color: var(--theme-bg-color);
}
</style>
<style lang="scss">
.playListDrawer {
  box-sizing: border-box;
  margin-top: var(--topNavBarHeight);
  margin-bottom: var(--playBarHeight);
  max-height: calc(100% - var(--topNavBarHeight) - var(--playBarHeight));
  background-color: transparent;

  .el-drawer__body {
    padding: 0px;
  }
}

.playListModal {
  background-color: transparent;
}
</style>