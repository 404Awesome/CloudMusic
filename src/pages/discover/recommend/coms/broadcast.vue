<!-- 个性推荐 独家放送 -->
<template>
  <el-skeleton :loading="loading" animated>
    <template #template>
      <ul pt-4 grid4Cols ref="skeletonEl">
        <li v-for="item in 4">
          <el-skeleton-item variant="image" w-full h-35 rounded-md />
        </li>
      </ul>
    </template>
    <template #default>
      <div pt-4 grid4Cols>
        <BroadcastItem v-for="item in broadcastList" :key="item.id" :id="item.id" :picUrl="item.picUrl"
          :copywriter="item.copywriter" />
      </div>
    </template>
  </el-skeleton>
</template>

<script setup lang="ts">
import BroadcastItem from "@/components/content/broadcastItem/broadcastItem.vue";
import { useIntersectionObserver } from "@vueuse/core";
import { reactive, onMounted, ref } from "vue";
import { ElMessage } from "element-plus";
import { MVAPI } from "api";

// 骨架屏容器元素
let skeletonEl = ref<HTMLElement | null>(null);
// 加载状态
let loading = ref<boolean>(true);
// 独家放送列表
let broadcastList = reactive<any>([]);
// 加载独家放送列表
let loadData = async () => {
  try {
    let { code, result }: any = await MVAPI.getBroadcastList(0, 4);
    if (code == 200) broadcastList.push(...result);
  } catch (err: any) {
    ElMessage.error("加载独家放送列表失败!");
  } finally {
    loading.value = false;
  }
}
// 监听容器元素是否显示在页面上
onMounted(() => {
  const { stop } = useIntersectionObserver(skeletonEl.value, ([{ isIntersecting }]) => {
    if (isIntersecting) {
      if (broadcastList.length) {
        stop();
      } else {
        loadData();
      }
    }
  })
});
</script>