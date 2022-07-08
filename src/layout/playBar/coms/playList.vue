<!-- 播放列表 -->
<template>
  <el-drawer direction="rtl" custom-class="playListDrawer" modal-class="playListModal" size="350px" :z-index="200"
    :append-to-body="true" v-model="isShow" :with-header="false">
    <!-- 头部 -->
    <header class="header">
      <h1 text-xl>当前播放</h1>
      <div class="content">
        <p text-gray-400 text-14px dark-text-gray-500>总{{ store.playList.length }}首</p>
        <div class="operate">
          <p flex items-center>
            <span class="icon" i-carbon:folder-add></span>
            <span>收藏全部</span>
          </p>
          <p @click="store.emptyPlayList" flex items-center>
            <span class="icon" i-carbon:trash-can></span>
            <span>清空列表</span>
          </p>
        </div>
      </div>
    </header>

    <!-- 列表 -->
    <div class="scrollbar">
      <el-scrollbar always>
        <!-- 列表 -->
        <ul class="list">
          <li @dblclick="playSong(item)" :class="{ active: item.song.id == currentSong?.song.id }"
            v-for="item in store.playList" :key="item.song.id" class="group">
            <!-- 播放图标 -->
            <span class="playIcon" hidden text-18px i-eva:arrow-right-fill></span>
            <!-- 歌名 -->
            <p class="name" group-hover-themeColor group-hover-dark-text-orange-400>{{ item.song.name }}</p>
            <!-- 艺术家 -->
            <Artists flex-1 :artists="item.artists" />
          </li>
        </ul>

        <!-- 播放列表为空 -->
        <div v-show="!playList.length" flexCenter h-full>
          <el-empty description="播放列表为空!" :image-size="200" />
        </div>
      </el-scrollbar>
    </div>
  </el-drawer>
</template>

<script setup lang="ts">
import Artists from "@/components/content/artists/artists.vue";
import { ElMessage } from "element-plus";
import { useRoute } from "vue-router";
import { useMainStore } from "store";
import { toRefs, ref } from "vue";
const store = useMainStore();
const route = useRoute();
let { playList, currentSong } = toRefs(store);

// 是否显示
let isShow = ref<boolean>(false);
let toggle = () => {
  isShow.value = !isShow.value;
}

// 播放音乐
let playSong = (song: any) => {
  if (route.path == "/privateFM") {
    return ElMessage.warning("当前为私人FM!");
  }

  if (song.song.id !== currentSong.value?.song.id) {
    store.playSong(song);
  }
}

defineExpose({ toggle });
</script>

<style lang="scss" scoped>
.header {
  @apply flex flex-col flex-nowrap justify-between py-10px px-15px bg-white shadow-md relative z-10 dark-bg-gray-300;

  .content {
    @apply flex items-center justify-between;

    .operate {
      @apply flex gap-10px;

      p {
        @apply py-5px px-10px text-14px border-1px border-#eee rounded-md cursor-pointer dark-bg-gray-200 dark-border-gray-200;

        &:hover {
          @apply bg-#f5f7fa themeColor hover-dark-text-orange-400;
        }

        .icon {
          @apply mr-3px text-16px;
        }
      }
    }
  }
}

.scrollbar {
  height: calc(100% - 80px);
  @apply bg-white pb-5px dark-bg-gray-300;

  .list li {
    @apply flex overflow-hidden py-7px px-15px important-fontColor whitespace-normal text-14px cursor-pointer select-none hover-bg-#f5f7fa hover-dark-bg-gray-200;

    .name {
      @apply flex-1 truncate mr-20px;
    }

    &.active {
      @apply pl-10px bg-#f5f7fa dark-bg-gray-200;

      .name,
      .playIcon {
        @apply themeColor dark-text-orange-400;
      }

      .playIcon {
        display: inline-block;
      }
    }
  }
}
</style>
<style lang="scss">
.playListDrawer {
  overflow: hidden;
  box-sizing: border-box;
  margin-top: var(--topNavBarHeight);
  max-height: calc(101% - var(--topNavBarHeight) - var(--playBarHeight));
  background-color: transparent;

  .el-drawer__body {
    overflow: hidden;
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