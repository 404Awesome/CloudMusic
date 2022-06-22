<!-- MV相关 -->
<template>
  <div class="mvDetails" :key="(route.params.id as string)">
    <div col-span-full lg:col-span-1>
      <div v-if="mvSource.length">
        <!-- MV视频 -->
        <PlyrVideo :source="mvSource" />
        <!-- 详情 -->
        <Detail v-bind="mvDetail" />
      </div>
      <!-- 评论 -->
      <Comment :id="parseInt(route.params.id as string)" />
    </div>

    <!-- 相关推荐 -->
    <div hidden lg:block>
      <Relevant />
    </div>
  </div>
</template>

<script setup lang="ts">
import PlyrVideo from "@/components/content/plyrVideo/plyrVideo.vue";
import Relevant from "./coms/relevant.vue";
import Detail from "./coms/detail.vue";
import Comment from "./coms/comment.vue";
import { ElMessage } from "element-plus";
import { reactive, watch } from "vue";
import { useRoute } from "vue-router";
import { MVAPI } from "api";
const route = useRoute();

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
    let [{ data: { brs, artists, publishTime, playCount, desc, name, subCount } }, { likedCount, shareCount }]: any = await Promise.all([MVAPI.getDetail(id), MVAPI.getDetailInfo(id)]);
    getResolution(brs, id);
    Object.assign(mvDetail, { artists, publishTime, playCount, desc, name, subCount, likedCount, shareCount });
  } catch (err: any) {
    ElMessage.error("加载mv详情失败!");
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

  &>div {
    overflow: hidden;
  }
}
</style>
