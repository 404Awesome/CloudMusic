<!-- 歌手详情 歌手信息 -->
<template>
  <div class="singerDesc">
    <!-- 简介 -->
    <section>
      <h3 class="title">{{ name }}简介</h3>
      <p class="content">{{ singerDesc.briefDesc }}</p>
    </section>
    <!-- 成就 -->
    <section v-for="item in singerDesc.introduction" :key="item.ti">
      <h3 class="title">{{ item.ti }}</h3>
      <p class="content">{{ item.txt }}</p>
    </section>
  </div>
</template>

<script setup lang="ts">
import { Discover } from "@/api/modules/discover";
import { useRoute } from "vue-router";
const route = useRoute();
const { id, name }: any = route.query;
const props = defineProps(['activeComs']);

// 歌手描述
let singerDesc = reactive<any>({});
// 加载数据
let loadData = async () => {
  let { briefDesc, code, introduction }: any = await Discover.getArtistDesc(id);
  if (code == 200) Object.assign(singerDesc, { briefDesc, introduction, });
}

// 监听当前组件的激活状态
watch(() => props.activeComs, (newVal) => {
  if (newVal == "SingerInfo" && !singerDesc?.briefDesc) loadData();
})
</script>

<style lang="scss" scoped>
.singerDesc {
  padding: 15px 0px;

  section {
    margin-bottom: 30px;

    &:last-child {
      margin-bottom: 0px;
    }
  }
}

.title {
  font-size: 16px;
  margin-bottom: 15px;
}

.content {
  font-size: 14px;
  color: rgba($color: #000000, $alpha: .45);
  line-height: 1.7em;
  white-space: pre-wrap;
}
</style>