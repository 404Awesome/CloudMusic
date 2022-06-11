<!-- MV相关 -->
<template>
  <div class="mvDetails" v-if="status">
    <div col-span-full lg:col-span-1>
      <!-- MV视频 -->
      <PlyrVideo :source="source" />
      <!-- 详情 -->
      <Detail :detail="detail" />
      <!-- 评论 -->
      <Comment :id="mvid!" />
    </div>

    <!-- 相关推荐 -->
    <div hidden lg:block>
      <Relevant :id="mvid!" />
    </div>
  </div>

  <!-- 加载状态 -->
  <div v-else v-loading="true" element-loading-text="Loading..." h-full></div>
</template>

<script setup lang="ts" name="mvDetails">
import PlyrVideo from "@/components/content/plyrVideo/plyrVideo.vue";
import Relevant from "./coms/relevant.vue";
import Detail from "./coms/detail.vue";
import Comment from "./coms/comment.vue";
import { MV } from "@/api/modules/video";
import { useRoute } from "vue-router";
const route = useRoute();

// MVID
let mvid = ref<number | null>(null);
// 状态 -> 用于确保加载完毕
let status = ref(false);
// 请求到MV资源
let source = reactive<any>({});
let getResolution = async (qualityArr: object[]) => {
  let request = qualityArr.map((quality: any) => {
    return MV.getAddress(mvid.value!, quality.br);
  });
  let result = await Promise.all(request);
  result.map(({ code, data }: any) => {
    if (code == 200) source[data.r] = data.url;
  });
  status.value = true;
};
// 详情
let detail = reactive<any>({});
let loadData = async (mvid: number) => {
  // 加载mv详情
  let result: any = await Promise.all([MV.getDetail(mvid), MV.getDetailInfo(mvid)]);
  if (result[0].code == 200) {
    // 请求所有MV分辨率的视频地址;
    getResolution(result[0].data.brs);
    // 合并详情
    Object.assign(detail, result[0].data, result[1]);
  }
}
// 监听路由 ->加载数据
watch(route, (val) => {
  if (val.fullPath.startsWith("/mvDetail")) {
    mvid.value = parseInt(val.params.id as string);
    status.value = false;
    loadData(mvid.value);
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
