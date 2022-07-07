<!-- 歌手详情 详情 -->
<template>
  <div flex gap-20px>
    <!-- 歌手图片 -->
    <el-image flex-none transition-all duration-300 ease-linear h-35 w-35 lg:h-50 lg:w-50 rounded-md
      :src="singerDetail.cover" fit="cover" />

    <!-- 歌手信息 -->
    <div flex overflow-hidden flex-1 flex-col flex-nowrap pt-2>
      <!-- 姓名 -->
      <h1 class="name" truncate>{{ name }}</h1>
      <!-- 别名 -->
      <p class="alias" text="14px black/50" truncate mt-1 v-if="alias">
        {{ typeof alias == 'string' ? alias : alias.join("; ") }}
      </p>

      <!-- 收藏 -->
      <div v-if="store.auth" @click="collection" :class="{ collected: followed }" mt-3 lg:mt-5 flexCenter w-80px
        border="1px solid #eee" rounded-20px whitespace-nowrap cursor-pointer gap-3px select-none transition-all
        hover="themeColor bg-#f5f7fa">
        <span text-19px p-y-5px i-carbon:folder-add></span>
        <span p-y-5px>{{ followed ? '已收藏' : '收藏' }}</span>
      </div>

      <!-- 数量 -->
      <ul flex text-15px gap-20px mt-3 lg:mt-5>
        <li truncate>单曲数: {{ singerDetail.musicSize }}</li>
        <li truncate>专辑数: {{ singerDetail.albumSize }}</li>
        <li truncate>MV数: {{ singerDetail.mvSize }}</li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref, toRaw } from "vue";
import { ElMessage } from "element-plus";
import { useRoute } from "vue-router";
import { useMainStore } from "store";
import { ArtistAPI } from "api";
const store = useMainStore();
const route = useRoute();
let { id, name, alias }: any = toRaw(route.query);

// 收藏状态
let followed = ref(false);
// 收藏 需登陆
let collection = () => { }

// 歌手详情
let singerDetail = reactive<any>({});
// 加载歌手详情
onMounted(async () => {
  try {
    let { code, data: { artist } }: any = await ArtistAPI.getDetail(parseInt(id as string));
    if (code == 200) Object.assign(singerDetail, artist);
  } catch (err: any) {
    ElMessage.error("加载歌手详情失败!");
  }
})
</script>

<style lang="scss" scoped>
.collected {
  width: 90px;
  color: var(--theme-color);
}
</style>