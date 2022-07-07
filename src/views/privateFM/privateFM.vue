<!-- 私人FM -->
<template>
  <el-skeleton :loading="loading" animated>
    <template #template>
      <div wrapBox>
        <div class="songInfo" flex gap-20px py-15px>
          <section flex flex-1 flex-col gap-30px justify-center items-center>
            <!-- 封面 -->
            <el-skeleton-item variant="image" w-230px h-230px rounded-md />
            <!-- 操作按钮 -->
            <ul flex gap-30px>
              <li v-for="item in 4">
                <el-skeleton-item w-42px h-42px rounded-full />
              </li>
            </ul>
          </section>
          <section hidden md:inline-block flex-1>
            <!-- 标题 -->
            <el-skeleton-item variant="text" h-25px w="4/10" />
            <!-- 艺人 -->
            <div flex gap-100px mt-7px>
              <el-skeleton-item variant="text" w="2/10" />
              <el-skeleton-item variant="text" w="3/10" />
            </div>
          </section>
        </div>

        <!-- 评论 -->
        <el-skeleton-item variant="text" h-20px w-100px />
      </div>
    </template>
    <template #default>
      <div wrapBox pb-20px>
        <!-- 歌曲信息 -->
        <div class="songInfo" flex gap-20px py-15px>
          <section flex flex-col justify-center items-center gap-30px flex-1>
            <!-- 封面 -->
            <el-image :src="personalFM.album.picUrl" fit="cover" :draggable="false" w="1/2" shadow-xl rounded-md />

            <!-- 操作 -->
            <ul class="operate">
              <!-- 喜欢 -->
              <li class="group">
                <span i-carbon:favorite group-hover-i-carbon:favorite-filled group-hover-text-red-500></span>
              </li>
              <!-- 收藏 -->
              <li>
                <span i-carbon:folder-add></span>
              </li>
              <!-- 下一首 -->
              <li @click="loadData">
                <span important:text-20px i-carbon:skip-forward></span>
              </li>
              <!-- 分享 -->
              <li>
                <span i-carbon:link></span>
              </li>
            </ul>
          </section>

          <section hidden md:flex flex-1 flex-col overflow-hidden>
            <!-- 标题 -->
            <h1 text-20px truncate>{{ personalFM.name }}</h1>

            <!-- 歌曲信息 -->
            <div flex gap-10px text-14px pt-5px pb-10px>
              <p flex-1 truncate>
                <span>专辑:&nbsp;</span>
                <span themeColor>{{ personalFM.album.name }}</span>
              </p>
              <p flex-1 flex items-center truncate overflow-hidden>
                <span>歌手:&nbsp;</span>
                <Artists fontSize="14px" :artists="personalFM.artists" />
              </p>
            </div>

            <!-- 歌词 -->
            <div flex-1 overflow-hidden>
              <Lyric :id="personalFM.id" />
            </div>
          </section>
        </div>

        <!-- 发送评论 -->
        <SendComment :id="personalFM.id" @getComment="getComment" />

        <!-- 评论列表 -->
        <CommentList :id="personalFM.id" :RequestData="SongAPI.getComment" />
      </div>
    </template>
  </el-skeleton>
</template>

<script setup lang="ts">
import Lyric from "@/components/content/lyric/lyric.vue";
import Artists from "@/components/content/artists/artists.vue";
import SendComment from "@/components/content/sendComment/sendComment.vue";
import CommentList from "@/components/content/commentList/commentList.vue";
import { onMounted, reactive, ref } from "vue";
import { ElMessage } from "element-plus";
import { Operate } from "utils";
import { SongAPI } from "api";

// 加载状态
let loading = ref(true);
// 私人FM列表
let personalFM = reactive<any>({});

// 获取评论事件
let getComment = (id: number, content: string) => {
  console.log(id, content);
}

// 加载私人FM
let loadData = async () => {
  try {
    loading.value = true;
    let { code, data }: any = await SongAPI.getPersonalFM();
    if (code == 200) {
      Operate.playSong(data[0]);
      let { id, album, artists, name } = data[0];
      Object.assign(personalFM, { id, album, artists, name });
    }
  } catch (err: any) {
    ElMessage.error("加载私人FM错误!");
  } finally {
    loading.value = false;
  }
}

// 初始化私人FM
onMounted(() => loadData());
</script>

<style lang="scss" scoped>
/* 歌曲信息 */
.songInfo {
  height: calc(100vh - (var(--topNavBarHeight) + var(--playBarHeight) + 30px));
}

/* 操作 */
.operate {
  @apply flex items-center justify-center gap-30px;

  li {
    @apply p-10px rounded-full cursor-pointer bg-gray-100 hover-themeColor;

    span {
      @apply text-22px;
    }

    &:hover {
      @apply bg-gray-200;
    }
  }
}
</style>
