<!-- 歌曲详情 -->
<template>
  <el-drawer direction="btt" custom-class="songDetailDrawer" modal-class="songDetailModal" :z-index="50"
    :append-to-body="true" v-model="store.isFolding" :with-header="false">
    <el-scrollbar>
      <div wrapBox>
        <!-- 信息 -->
        <section class="songInfo" flex gap-40px py-15px>
          <div flex-1 flex-col justify-center items-center gap-30px hidden sm:flex>
            <!-- 封面 -->
            <el-image :src="currentSong?.album.picUrl" fit="cover" w="2/5" rounded-md overflow-hidden shadow-xl />

            <!-- 操作 -->
            <ul class="operate">
              <!-- 喜欢 -->
              <li class="group">
                <span i-eva:heart-outline group-hover-i-eva:heart-fill group-hover-text-red-500></span>
              </li>
              <!-- 收藏 -->
              <li class="group">
                <span i-eva:folder-add-outline group-hover-i-eva:folder-add-fill></span>
              </li>
              <!-- 下载 -->
              <li class="group">
                <span i-eva:cloud-download-outline group-hover-i-eva:cloud-download-fill></span>
              </li>
              <!-- 分享 -->
              <li class="group">
                <span i-eva:undo-outline group-hover-i-eva:undo-fill></span>
              </li>
            </ul>
          </div>

          <div flex flex-1 flex-col flex-nowrap overflow-hidden>
            <!-- 标题 -->
            <h1 text-20px truncate>{{ currentSong?.song.name }}</h1>

            <!-- 歌曲信息 -->
            <div flex gap-10px text-14px pt-5px pb-10px>
              <p flex-1 truncate>
                <span>专辑:&nbsp;</span>
                <span themeColor>{{ currentSong?.album.name }}</span>
              </p>
              <p flex-1 flex items-center truncate overflow-hidden>
                <span>歌手:&nbsp;</span>
                <Artists fontSize="14px" :artists="currentSong!.artists" />
              </p>
            </div>

            <!-- 歌词 -->
            <div flex-1></div>
          </div>
        </section>

        <!-- 评论 / 推荐 -->
        <section flex gap-40px pb-20px>
          <div flex-1>
            <!-- 发表评论 -->
            <SendComment :id="currentSong!.song.id" @getComment="getComment" />

            <!-- 评论列表 -->
            <CommentList :id="currentSong!.song.id" :RequestData="SongAPI.getComment" />
          </div>

          <div w-300px hidden sm:inline-block>
            <h2 text-18px>包含这首歌的歌单</h2>
          </div>
        </section>
      </div>
    </el-scrollbar>
  </el-drawer>
</template>

<script setup lang="ts">
import SendComment from "@/components/content/sendComment/sendComment.vue";
import CommentList from "@/components/content/commentList/commentList.vue";
import Artists from "@/components/content/artists/artists.vue";
import { useMainStore } from "store";
import { SongAPI } from "api";
import { toRef } from "vue";
const store = useMainStore();
let currentSong = toRef(store, 'currentSong');

// 获取评论
let getComment = (id: number, content: string) => {
  console.log(id, content);
}

// 是否显示
let toggle = () => store.isFolding = !store.isFolding;
defineExpose({ toggle });
</script>
  
<style lang="scss" scoped>
// 歌曲信息容器高度
.songInfo {
  height: calc(100vh - var(--topNavBarHeight) - var(--playBarHeight) - 30px);
}

/* 操作 */
.operate {
  @apply flex items-center justify-center gap-30px;

  li {
    @apply p-10px rounded-full cursor-pointer bg-gray-100;

    span {
      @apply text-22px;
    }

    &:hover {
      @apply bg-gray-200;
    }
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