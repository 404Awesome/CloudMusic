<!-- 歌手详情 歌手信息 -->
<template>
  <div>
    <!-- 简介 -->
    <section mt-15px>
      <h3 class="title">{{ name }}简介</h3>
      <p class="content">{{ singerDesc.briefDesc }}</p>
    </section>
    <!-- 成就 -->
    <section v-for="item in singerDesc.introduction" :key="item.ti" mt-30px>
      <h3 class="title">{{ item.ti }}</h3>
      <p class="content">{{ item.txt }}</p>
    </section>
  </div>
</template>

<script setup lang="ts">
import { reactive, watch } from "vue";
import { useRoute } from "vue-router";
import { ArtistAPI } from "api";
const props = defineProps(['activeComs']);
const route = useRoute();
let { id, name }: any = route.query;

// 歌手描述
let singerDesc = reactive<any>({});
// 加载歌手描述
let loadData = async () => {
  let { briefDesc, code, introduction }: any = await ArtistAPI.getDescribe(id);
  if (code == 200) Object.assign(singerDesc, { briefDesc, introduction, });
}

// 监听当前组件的激活状态
watch(() => props.activeComs, (newVal) => {
  if (newVal == "SingerInfo" && !singerDesc?.briefDesc) loadData();
})
</script>

<style lang="scss" scoped>
.title {
  @apply text-17px mb-10px;
}

.content {
  @apply text-15px text-black/45 indent-8 leading-6 whitespace-pre-wrap;
}
</style>