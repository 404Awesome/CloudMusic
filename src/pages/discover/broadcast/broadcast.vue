<!-- 独家放送 -->
<template>
  <div class="wrapper">
    <div pt-4 grid grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-4 xl:gap-6 v-infinite-scroll="loadData"
      :infinite-scroll-disabled="disabled">
      <BroadcastItem v-for="item in broadcastList" :key="item.id" :id="item.id" :picUrl="item.picUrl"
        :copywriter="item.copywriter" />
    </div>

    <!-- 提示 -->
    <el-divider w-full>
      <span class="tip">{{ disabled ? '无法加载更多!' : 'Loading...' }}</span>
    </el-divider>
  </div>
</template>

<script setup lang="ts">
import BroadcastItem from "@/components/content/broadcastItem/broadcastItem.vue";
import { Discover } from "@/api/modules/discover";

// 是否正在加载
let isLoading = ref(false);
// 是否禁用无限滚动
let disabled = ref(false);
// 独家放送列表
let broadcastList = reactive<any>([]);
// 偏移量
let offset = ref(0);
// 加载数据
let loadData = async () => {
  isLoading.value = true;
  let { code, result, more }: any = await Discover.getBroadcastList(offset.value);
  if (code == 200) {
    broadcastList.push(...result);
    offset.value = broadcastList.length;
    // 无法加载更多
    if (!more) disabled.value = true;
  }
  isLoading.value = false;
};
onMounted(() => {
  if (!isLoading.value) loadData();
})
</script>

<style lang="scss" scoped>
// 提示信息
.tip {
  padding-bottom: 15px;
  color: var(--font-color);
  font-size: 17px;
}
</style>
