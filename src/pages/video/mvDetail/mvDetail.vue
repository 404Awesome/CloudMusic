<!-- MV相关 -->
<template>
  <div class="mvDetails">
    <div>
      <!-- MV视频 -->
      <PlyrVideo v-if="status" :source="source" />
      <!-- 详情 -->
      <Detail v-if="detail.id" :detail="detail" />
    </div>

    <!-- 相关推荐 -->
    <Relevant v-if="status" :id="mvid!" />
  </div>
</template>

<script setup lang="ts" name="mvDetails">
import PlyrVideo from "@/components/common/plyrVideo/plyrVideo.vue";
import Relevant from "./coms/relevant.vue";
import Detail from "./coms/detail.vue";
import { MV } from "@/api/modules/video";
import { useRoute } from "vue-router";
const route = useRoute();

// MVID
let mvid = ref<number | null>(null)
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
// 监听路由 -> 获取数据
watch(route, (val) => {
  if (val.fullPath.startsWith("/mvDetail")) {
    mvid.value = parseInt(val.params.id as string);
    status.value = false;
    loadData(mvid.value);
  }
}, { immediate: true })
</script>

<style lang="scss" scoped>
.mvDetails {
  display: grid;
  padding: 15px 30px;

  gap: 30px;
  grid-template-columns: 2fr 1fr;
}
</style>
