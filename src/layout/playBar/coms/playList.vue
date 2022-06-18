<!-- 播放列表 -->
<template>
  <el-drawer direction="rtl" custom-class="playListDrawer" modal-class="playListModal" size="350px" :z-index="200"
    :append-to-body="true" v-model="isShow" :with-header="false">
    <!-- 头部 -->
    <header class="header">
      <h1 text-xl>当前播放</h1>
      <div class="content">
        <p text-gray-400>总{{ store.playList.length }}首</p>
        <div class="operate">
          <p>
            <span class="icon i-eva:folder-add-outline"></span>
            <span>收藏全部</span>
          </p>
          <p @click="store.emptyPlayList">
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
        <!-- 列表 -->
        <ul class="list" v-if="playList.length">
          <li @dblclick="playSong(item)" :class="{ active: item.song.id == currentSong?.song.id }"
            v-for="item in store.playList" :key="item.song.id">
            <!-- 歌名 -->
            <p class="songName">{{ item.song.name }}</p>
            <!-- 艺术家 -->
            <Artists flex-1 :artists="item.artist" />
          </li>
        </ul>

        <!-- 播放列表为空 -->
        <div class="empty" v-else>
          <el-empty description="播放列表为空!" :image-size="200" />
        </div>
      </el-scrollbar>
    </div>
  </el-drawer>
</template>

<script setup lang="ts">
import Artists from "@/components/content/artists/artists.vue";
import { useMainStore } from "store";
const store = useMainStore();
const { playList, currentSong } = toRefs(store);

// 是否显示
let isShow = ref<boolean>(false);
let toggle = () => {
  isShow.value = !isShow.value;
}

// 播放音乐
let playSong = (song: any) => {
  if (song.song.id !== currentSong.value?.song.id) {
    store.playSong(song);
  }
}

defineExpose({ toggle });
</script>

<style lang="scss" scoped>
header.header {
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-between;
  box-sizing: border-box;
  padding: 10px 15px;
  background-color: #fff;

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

  .list li {
    display: flex;
    overflow: hidden;
    padding: 5px 15px;
    color: var(--font-color);
    white-space: nowrap;
    font-size: 14px;
    cursor: pointer;

    user-select: none;
    gap: 20px;

    .songName {
      overflow: hidden;
      flex-basis: 50%;
      text-overflow: ellipsis;
    }

    &:hover {
      background-color: #f5f7fa;

      .songName {
        color: var(--theme-bg-color);
      }
    }

    &.active {
      background-color: #f5f7fa;
      color: var(--theme-bg-color);
    }
  }

  .empty {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
  }
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

    .el-scrollbar__view {
      height: 100%;
    }
  }
}

.playListModal {
  background-color: transparent;
}
</style>