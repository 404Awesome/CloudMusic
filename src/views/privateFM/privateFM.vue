<!-- 私人FM -->
<template>
  <el-skeleton :loading="loading" animated>
    <template #template>
      <ul wrapBox pt-15px pb-20px>
        <li v-for="item in 3" pb-24px flex gap-15px>
          <!-- <el-skeleton-item variant="image" w-10 h-10 rounded-full />
          <div flex-1 pb-24px border-b="2px solid #eee">
            <div>
              <el-skeleton-item variant="text" w="8/100" mr-10px />
              <el-skeleton-item variant="text" w="35/100" />
            </div>
            <div>
              <el-skeleton-item variant="text" w="13/100" mr-10px />
              <el-skeleton-item variant="text" w="45/100" />
            </div>
            <div flex justify-between mt-3px>
              <el-skeleton-item variant="text" w="6/100" />
              <el-skeleton-item variant="text" w="13/100" />
            </div>
          </div> -->
        </li>
      </ul>
    </template>
    <template #default>
      <div wrapBox pb-20px>
        <!-- 歌曲信息 -->
        <div class="songInfo" flex gap-20px py-15px>
          <section hidden md:flex flex-col justify-center items-center gap-30px flex-1>
            <!-- 封面 -->
            <el-image :src="personalFM.album.picUrl" fit="cover" :draggable="false" w="1/2" shadow-xl rounded-md />

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
              <!-- 下一首 -->
              <li class="group" @click="loadData">
                <span important:text-25px i-eva:skip-forward-outline group-hover-i-eva:skip-forward-fill></span>
              </li>
              <!-- 分享 -->
              <li class="group">
                <span i-eva:undo-outline group-hover-i-eva:undo-fill></span>
              </li>
            </ul>
          </section>

          <section flex-1 flex flex-col overflow-hidden>
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
            <div flex-1></div>
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
