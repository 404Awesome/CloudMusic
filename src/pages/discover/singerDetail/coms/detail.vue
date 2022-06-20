<!-- 歌手详情 详情 -->
<template>
  <div class="detail">
    <!-- 歌手图片 -->
    <el-image flex-none transition-all duration-300 ease-linear h-35 w-35 lg:h-50 lg:w-50 rounded
      :src="singerDetail.cover" fit="cover" />

    <!-- 歌手信息 -->
    <div class="info" pt-2>
      <!-- 姓名 -->
      <h1 class="name">{{ name }}</h1>
      <!-- 别名 -->
      <p class="alias" mt-1 v-if="alias">{{ typeof alias == 'string' ? alias : alias.join("; ") }}</p>
      <!-- 收藏 -->
      <div v-if="store.auth" @click="collection" mt-3 lg:mt-5 class="collection" :class="{ collected: followed }">
        <span class="icon i-heroicons-outline:folder-add"></span>
        <span>{{ followed ? '已收藏' : '收藏' }}</span>
      </div>
      <!-- 数量 -->
      <ul class="count" mt-3 lg:mt-5>
        <li>单曲数: {{ singerDetail.musicSize }}</li>
        <li>专辑数: {{ singerDetail.albumSize }}</li>
        <li>MV数: {{ singerDetail.mvSize }}</li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ArtistAPI } from "api";
import { useMainStore } from "store";
import { useRoute } from "vue-router";
const store = useMainStore();
const route = useRoute();
const { id, name, alias }: any = toRaw(route.query);

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
.detail {
  display: flex;
  color: var(--font-color);

  gap: 20px;

  .info {
    display: flex;
    overflow: hidden;
    flex: 1;
    flex-flow: column nowrap;

    .name,
    .alias,
    .count li {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .alias {
      color: rgba($color: #000000, $alpha: .5);
      font-size: 14px;
    }

    .collection {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 80px;
      border: 1px solid #eee;
      border-radius: 20px;
      white-space: nowrap;
      cursor: pointer;
      transition: width .2s ease-in-out;

      user-select: none;
      gap: 3px;

      span {
        padding: 5px 0px;

        &.icon {
          font-size: 19px;
        }
      }

      &:hover {
        background-color: #f5f7fa;
        color: var(--theme-color);
      }

      &.collected {
        width: 90px;
        color: var(--theme-color);
      }
    }

    .count {
      display: flex;
      font-size: 15px;

      gap: 20px;
    }
  }
}
</style>