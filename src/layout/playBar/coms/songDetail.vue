<!-- 歌曲详情 -->
<template>
  <el-drawer direction="btt" custom-class="songDetailDrawer" modal-class="songDetailModal" :z-index="50"
    :append-to-body="true" v-model="store.isFolding" :with-header="false">
    <el-scrollbar>
      <div class="songDetail wrapper">
        <!-- 信息 -->
        <section class="detail">
          <!-- 功能 -->
          <div hidden md:flex class="function">
            <!-- 封面 -->
            <div class="cover" shadow-xl>
              <el-image :src="currentSong?.album.picUrl" fit="cover" />
            </div>
            <!-- 操作 -->
            <ul class="operate">
              <!-- eva:heart-fill -->
              <li>
                <span class="i-eva:heart-outline"></span>
              </li>
              <li>
                <span class="i-eva:folder-add-outline"></span>
              </li>
              <li>
                <span class="i-eva:cloud-download-outline"></span>
              </li>
              <li>
                <span class="i-eva:external-link-outline"></span>
              </li>
            </ul>
          </div>

          <!-- 歌词 -->
          <div class="info">
            <!-- 头部 -->
            <header class="head">
              <!-- 标题 -->
              <h1 class="title">{{ currentSong?.song.name }}</h1>
              <!-- 元信息 -->
              <div class="metaInfo">
                <!-- 专辑 -->
                <section>
                  <span>专辑:&nbsp;</span>
                  <span class="albumName">{{ currentSong?.album.name }}</span>
                </section>
                <!-- 艺术家 -->
                <section>
                  <span>歌手:&nbsp;</span>
                  <Artists :artists="(currentSong?.artist as any)" />
                </section>
              </div>
            </header>

            <!-- 歌词内容 -->
            <main class="lyrics"></main>
          </div>
        </section>

        <!-- 评论 / 推荐 -->
        <section class="aside">
          <div class="comment">
            <h2 class="title">听友评论</h2>
          </div>
          <div class="recommend">
            <h2 class="title">包含这首歌的歌单</h2>
          </div>
        </section>
      </div>
    </el-scrollbar>
  </el-drawer>
</template>

<script setup lang="ts">
import Artists from "@/components/content/artists/artists.vue";
import { useMainStore } from "store";
import { toRef } from "vue";
const store = useMainStore();
let currentSong = toRef(store, 'currentSong');

// 是否显示
let toggle = () => store.isFolding = !store.isFolding;
defineExpose({ toggle });
</script>
  
<style lang="scss" scoped>
@import "@/scss/mixins.scss";

.songDetail {
  color: var(--font-color);

  .detail {
    display: flex;
    overflow: hidden;
    justify-content: center;
    width: 100%;
    height: calc(100vh - var(--topNavBarHeight) - var(--playBarHeight) - 40px);

    gap: 40px;

    .function {
      align-items: center;
      flex-flow: column nowrap;
      flex-basis: 45%;
      justify-content: center;

      gap: 40px;
    }

    .info {
      display: flex;
      flex: 1;
      flex-flow: column nowrap;
      padding: 15px 0px 20px;
    }
  }

  .aside {
    display: flex;

    gap: 30px;

    .title {
      height: 40px;
      white-space: nowrap;
      font-size: 17px;
      line-height: 40px;
    }

    .comment {
      flex: 1;
    }

    .recommend {
      flex-basis: 30%;
      flex-grow: 0;
      flex-shrink: 0;
    }
  }
}

// 封面
.cover {
  display: flex;
  overflow: hidden;
  width: 50%;
  border-radius: 5px;
}

// 操作
.operate {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 30px;

  li {
    padding: 10px;
    border-radius: 50%;
    background-color: #eee;
    cursor: pointer;

    span {
      font-size: 22px;
    }

    &:hover {
      background-color: #e4e4e4;

      span {
        color: var(--theme-bg-color);
      }
    }
  }
}

// 歌词
.info {
  overflow: hidden;

  .head {
    flex-basis: 60px;
    flex-grow: 0;
    flex-shrink: 0;

    .title {
      overflow: hidden;
      color: var(--font-color);
      text-overflow: ellipsis;
      white-space: nowrap;
      font-size: 22px;
    }

    .metaInfo {
      display: flex;
      font-size: 14px;

      gap: 15px;

      section {
        display: flex;
        overflow: hidden;
        align-items: center;
        flex: 1;
        white-space: nowrap;
      }

      .albumName {
        color: var(--theme-color);
        cursor: pointer;

        @include oneOmit;
      }
    }
  }

  .main {
    flex: 1;
  }
}
</style>
<style lang="scss">
.songDetailDrawer {
  margin-bottom: var(--playBarHeight);
  height: calc(100vh - var(--playBarHeight) - var(--topNavBarHeight)) !important;
  background-image: #e9e9e9;

  .el-drawer__body {
    padding: 0px;
  }
}

.songDetailModal {
  background-color: transparent;
}
</style>