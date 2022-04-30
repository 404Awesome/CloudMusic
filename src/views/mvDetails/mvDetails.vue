<template>
  <div class="mvDetails">
    <div>
      <!-- MV视频 -->
      <PlyrVideo v-if="status" :source="source" />
    </div>

    <!-- 相关推荐 -->
    <Relevant :id="id" />
  </div>
</template>

<script setup lang="ts" name="mvDetails">
import PlyrVideo from "@/components/plyrVideo/plyrVideo.vue";
import Relevant from "./coms/relevant.vue";
import { getMVDetails, getMVAddress } from "@/api/video";
import { useRoute } from "vue-router";
const route = useRoute();
let id = parseInt(route.params.id as string); // MVID

// 状态 -> 用于确保加载完毕
let status = ref(false);
// 请求到MV资源
let source = reactive<any>({});
let getResolution = async (qualityArr: object[]) => {
  let request = qualityArr.map((quality: any) => getMVAddress(id, quality.br));
  let result = await Promise.all(request);
  result.map(({ code, data }: any) => {
    if (code == 200) source[data.r] = data.url;
  });
  status.value = true;
};

// 详情
let details = reactive({});
// 请求数据
onMounted(async () => {
  let { code, data }: any = await getMVDetails(id);
  if (code == 200) {
    // 请求到的详情
    Object.assign(details, data);
    // 请求所有MV分辨率的视频地址
    getResolution(data.brs);
  }
});
</script>

<style lang="scss" scoped>
.mvDetails {
  display: grid;
  padding: 15px 30px;

  gap: 30px;
  grid-template-columns: 2fr 1fr;
}
</style>
