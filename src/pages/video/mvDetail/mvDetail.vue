<!-- MV相关 -->
<template>
  <div :key="(route.params.id as string)" class="mvDetails">
    <div overflow-hidden col-span-full lg:col-span-1>
      <el-skeleton :loading="loading" animated>
        <template #template>
          <el-skeleton-item w-full h-200px lg:h-300px xl:h-400px rounded-md pt-4 />
          <div flex gap-10px my-7px>
            <el-skeleton-item block variant="text" w-40px />
            <el-skeleton-item block variant="text" w-60px />
          </div>
          <el-skeleton-item block variant="text" h-20px w-200px />
          <div flex gap-10px my-7px>
            <el-skeleton-item block variant="text" w-90px />
            <el-skeleton-item block variant="text" w-50px />
          </div>
          <div flex justify-between items-center pb-8>
            <div flex gap-10px>
              <el-skeleton-item block variant="text" w-123px h-30px />
              <el-skeleton-item block variant="text" w-123px h-30px />
              <el-skeleton-item block variant="text" w-123px h-30px />
            </div>
            <el-skeleton-item block variant="text" w-50px />
          </div>
        </template>
        <template #default>
          <!-- MV视频 -->
          <PlyrVideo :source="mvSource" />
          <!-- 详情 -->
          <Detail v-bind="mvDetail" />
        </template>
      </el-skeleton>

      <!-- 评论 -->
      <Comment :id="parseInt(route.params.id as string)" />
    </div>

    <!-- 相关推荐 -->
    <div col-start-2 col-end-3 hidden lg:block overflow-hidden>
      <Relevant />
    </div>
  </div>
</template>

<script setup lang="ts">
import PlyrVideo from "@/components/content/plyrVideo/plyrVideo.vue";
import Relevant from "./coms/relevant.vue";
import Detail from "./coms/detail.vue";
import Comment from "./coms/comment.vue";
import { reactive, watch, ref } from "vue";
import { ElMessage } from "element-plus";
import { useRoute } from "vue-router";
import { MVAPI } from "api";
const route = useRoute();

// 加载状态
let loading = ref(true);
// 请求到MV资源
let mvSource = reactive<any>([]);
// 获取mv所有分辨率的视频地址
let getResolution = async (qualityArr: object[], id: number) => {
  let request = qualityArr.map((quality: any) => MVAPI.getAddress(id, quality.br));
  let result = await Promise.all(request);
  mvSource.push(...result.map(({ code, data }: any) => {
    if (code == 200) return { r: data.r, url: data.url };
  }));
};
// mv详情
let mvDetail = reactive<any>({});
// 加载mv详情
let loadMVDetail = async (id: number) => {
  try {
    loading.value = true;
    let [{ data: { brs, artists, publishTime, playCount, desc, name, subCount } }, { likedCount, shareCount }]: any = await Promise.all([MVAPI.getDetail(id), MVAPI.getDetailInfo(id)]);
    await getResolution(brs, id);
    Object.assign(mvDetail, { artists, publishTime, playCount, desc, name, subCount, likedCount, shareCount });
  } catch (err: any) {
    ElMessage.error("加载mv详情失败!");
  } finally {
    loading.value = false;
  }
};

// 监听路由id的变化 -> 加载数据
watch(() => route.params.id, (newVal) => {
  if (route.fullPath.startsWith("/mvDetail/")) {
    // 清空数组,以便于id改变时,重新渲染
    mvSource.splice(0, mvSource.length);
    // 加载mv详情
    loadMVDetail(parseInt(newVal as string));
  }
}, { immediate: true });
</script>

<style lang="scss" scoped>
.mvDetails {
  display: grid;
  padding: 15px 20px;

  gap: 30px;
  grid-template-columns: 2fr 1fr;
}
</style>