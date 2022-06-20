<!-- 个性推荐 独家放送 -->
<template>
  <div grid mt-4 gap-5 lg:gap-7 grid-cols-2 lg:grid-cols-4>
    <BroadcastItem v-for="item in broadcastList" :key="item.id" :id="item.id" :picUrl="item.picUrl"
      :copywriter="item.copywriter" />
  </div>
</template>

<script setup lang="ts">
import BroadcastItem from "@/components/content/broadcastItem/broadcastItem.vue";
import { reactive, onMounted } from "vue";
import { ElMessage } from "element-plus";
import { MVAPI } from "api";

// 独家放送列表
let broadcastList = reactive<any>([]);
// 加载独家放送列表
onMounted(async () => {
  try {
    let { code, result }: any = await MVAPI.getBroadcastList(0, 4);
    if (code == 200) broadcastList.push(...result);
  } catch (err: any) {
    ElMessage.error("加载独家放送列表失败!");
  }
});
</script>