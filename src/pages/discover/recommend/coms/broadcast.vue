<!-- 个性推荐 独家放送 -->
<template>
  <div grid mt-4 gap-5 lg:gap-7 grid-cols-2 lg:grid-cols-4>
    <BroadcastItem v-for="item in broadcastList" :key="item.id" :id="item.id" :picUrl="item.picUrl"
      :copywriter="item.copywriter" />
  </div>
</template>

<script setup lang="ts">
import BroadcastItem from "@/components/content/broadcastItem/broadcastItem.vue";
import { Discover } from "@/api/modules/discover";

let broadcastList = reactive<any>([]);
onMounted(async () => {
  let { code, result }: any = await Discover.getBroadcastList(0, 4);
  // 获取成功
  if (code == 200) {
    broadcastList.push(...result);
  }
});
</script>