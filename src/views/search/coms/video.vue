<!-- 视频 -->
<template>
  <el-skeleton :loading="loading" animated>
    <template #template>
      <ul ref="skeletonEl" grid4Cols pt-15px>
        <li v-for="item in 8">
          <!-- 封面 -->
          <el-skeleton-item variant="image" h-35 w-full rounded-md />
          <!-- 标题 -->
          <div flex gap-10px my-7px>
            <el-skeleton-item variant="text" w-30px />
            <el-skeleton-item variant="text" w="3/5" />
          </div>
          <!-- 创建人 -->
          <el-skeleton-item variant="text" w="1/3" />
        </li>
      </ul>
    </template>
    <template #default>
      <ul grid4Cols pt-15px>
        <li v-for="item in videoList" :key="item.vid">
          <!-- 封面 -->
          <div @click="goDetailPage(item.vid, item.type)" class="cover">
            <el-image :src="item.coverUrl" fit="cover" class="img" />

            <!-- 播放次数 -->
            <PlayCount :playCount="item.playTime" />

            <!-- 时长 -->
            <VideoDuration :durationms="item.durationms" />

            <!-- hover:播放图标 -->
            <p class="playIcon">
              <span i-eva:arrow-right-fill></span>
            </p>
          </div>

          <!-- 详情 -->
          <div class="detail">
            <!-- 标题 -->
            <p class="title">
              <span class="tag">{{ item.type == 0 ? "MV" : "Video" }}</span>
              <span @click="goDetailPage(item.vid, item.type)" class="content">{{ item.title }}</span>
            </p>

            <!-- 创建人 -->
            <p class="creator">
              <span>by: </span>
              <span @click.stop="goUserPage(item.userId, item.type, item.userName)" class="user">
                {{ item.userName }}
              </span>
            </p>
          </div>
        </li>
      </ul>
    </template>
  </el-skeleton>

  <!-- 分页 -->
  <div v-show="!loading" flex justify-center my-15px>
    <el-pagination @current-change="change" background layout="prev, pager, next" :page-size="limit" :total="total" />
  </div>
</template>

<script setup lang="ts">
import VideoDuration from "@/components/content/videoDuration/videoDuration.vue";
import PlayCount from "@/components/content/playCount/playCount.vue";
import { useIntersectionObserver } from "@vueuse/core";
import { useRoute, useRouter } from "vue-router";
import { onMounted, reactive, ref } from "vue";
import { ElMessage } from "element-plus";
import { OtherAPI } from "api";
const route = useRoute();
const router = useRouter();
const emit = defineEmits(["getCount"]);

// 骨架屏容器元素
let skeletonEl = ref<HTMLElement | null>(null);
// 获取歌曲数量限制
let limit = 20;
// 数据总条数
let total = ref<number>(0);
// 加载状态
let loading = ref<boolean>(true);
// 视频列表
interface VideoInfo {
  // 0[MV] 1[视频]
  type: 0 | 1,
  vid: string,
  playTime: number,
  coverUrl: string,
  durationms: number,
  title: string,
  userId: number,
  userName: string
}
let videoList = reactive<VideoInfo[]>([]);

// 分页发生改变
let change = (page: number) => {
  // 清空数组
  videoList.splice(0, videoList.length);
  let offset = (page - 1) * limit;
  loadData(offset);
}

// 跳转视频/MV详情页面
let goDetailPage = (vid: string, type: number) => {
  if (type == 0) {
    // 跳转MV详情页面
    router.push(`/mvDetail/${vid}`);
  } else {
    // 跳转Video详情页面
    router.push(`/videoDetail/${vid}`);
  }
}

// 跳转个人/歌手详情页面
let goUserPage = (userId: number, type: number, name: string) => {
  if (type == 0) {
    // 跳转歌手页面
    router.push({
      path: "/singerDetail",
      query: {
        id: userId,
        name
      }
    });
  } else {
    // 跳转个人页面
    router.push(`/othersInfo/${userId}`);
  }
}

// 加载歌手列表
let loadData = async (offset: number = 0) => {
  try {
    loading.value = true;
    let { code, result: { videoCount, videos } }: any = await OtherAPI.getCloudSearch(route.params.keyword as string, 1014, offset, limit);
    if (code == 200) {
      // 处理数据总条数
      if (!total.value) {
        emit("getCount", `找到 ${videoCount} 个视频`);
        total.value = videoCount;
      }
      // 处理视频列表
      let list = videos.map((item: any) => {
        let { type, vid, coverUrl, durationms, playTime, title, creator } = item;
        return {
          type,
          vid,
          playTime,
          coverUrl,
          durationms,
          title,
          userId: creator[0].userId,
          userName: creator[0].userName
        };
      });
      videoList.push(...list);
    }
  } catch (err: any) {
    ElMessage.error("加载歌手列表失败!");
  } finally {
    loading.value = false;
  }
}

// 监听容器元素是否显示在页面上
onMounted(() => {
  const { stop } = useIntersectionObserver(skeletonEl.value, ([{ isIntersecting }]) => {
    if (isIntersecting) {
      if (videoList.length) {
        stop();
      } else {
        loadData();
      }
    }
  })
});
</script>

<style lang="scss" scoped>
.cover {
  @apply w-full relative cursor-pointer;

  .img {
    @apply w-full h-35 rounded-md brightness-85;
  }
}

.detail {
  @apply pt-5px;

  .title {
    @apply truncate flex gap-3px items-center overflow-hidden;

    .tag {
      @apply themeBgColor rounded text-white text-12px py-2px px-5px inline-block;
    }

    .content {
      @apply truncate text-14px cursor-pointer hover-themeColor;
    }
  }

  .creator {
    @apply text-13px pt-5px text-gray-500;

    .user {
      @apply hover-themeColor cursor-pointer;
    }
  }
}
</style>