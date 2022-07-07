<!-- 独家放送 -->
<template>
  <div wrapBox>
    <!-- 独家放送列表 -->
    <div v-infinite-scroll="loadData" :infinite-scroll-disabled="disabled" pt-4 grid4Cols overflow-hidden>
      <BroadcastItem v-for="item in broadcastList" :key="item.id" :id="item.id" :picUrl="item.picUrl"
        :copywriter="item.copywriter" />
    </div>

    <!-- 提示 -->
    <el-divider>
      <span tip>{{ disabled ? '无法加载更多!' : 'Loading...' }}</span>
    </el-divider>
  </div>
</template>

<script setup lang="ts">
import BroadcastItem from "@/components/content/broadcastItem/broadcastItem.vue";
import { ref, reactive } from "vue";
import { ElMessage } from "element-plus";
import { MVAPI } from "api";

// 是否正在加载
let loading = ref(false);
// 是否禁用无限滚动
let disabled = ref(false);
// 独家放送列表
let broadcastList = reactive<any>([]);

// 加载数据
let loadData = async () => {
  if (loading.value) return;
  loading.value = true;
  try {
    let { code, result, more }: any = await MVAPI.getBroadcastList(broadcastList.length, 30);
    if (code == 200) {
      broadcastList.push(...result);
      // 无法加载更多
      if (!more) disabled.value = true;
    }
  } catch (err: any) {
    ElMessage.error("加载独家放送失败!");
  } finally {
    loading.value = false;
  }
};
</script>