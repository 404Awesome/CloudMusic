<!-- 相关视频 -->
<template>
  <div>
    <!-- 标题 -->
    <h4 class="title">相关推荐</h4>
    <!-- 列表 -->
    <section mb-4 v-for="item in relevant" :key="item.id">
      <MVListItem v-bind="item" :isFlex="true" />
    </section>
  </div>
</template>

<script setup lang="ts">
import { MV } from "@/api/modules/video";
import MVListItem from "@/components/content/mvListItem/mvListItem.vue";
let props = defineProps({
  id: {
    type: Number,
    required: true,
  },
});

// 加载相关mv
let relevant = reactive<any[]>([]);
onMounted(async () => {
  let { code, mvs }: any = await MV.getRelevant(props.id);
  if (code == 200) relevant.push(...mvs);
});
</script>

<style lang="scss" scoped>
.title {
  margin: 0px 0px 10px 0px;
  color: var(--font-color);
  font-weight: 400;
  font-size: 18px;
}
</style>
