<!-- 歌手详情 详情 -->
<template>
  <div class="detail">
    <!-- 歌手图片 -->
    <el-image flex-none h-60 w-60 rounded :src="picUrl" fit="cover" />

    <!-- 歌手信息 -->
    <div class="info">
      <!-- 姓名 -->
      <h1 class="name">{{ name }}</h1>
      <!-- 别名 -->
      <p class="alias" v-if="alias">{{ typeof alias == 'string' ? alias : alias.join("; ") }}</p>
      <!-- 收藏 -->
      <div @click="collection" class="collection" :class="{ collected: followed }">
        <span class="icon i-heroicons-outline:folder-add"></span>
        <span>{{ followed ? '已收藏' : '收藏' }}</span>
      </div>
      <!-- 数量 -->
      <ul class="count">
        <li>单曲数: {{ musicSize }}</li>
        <li>专辑数: {{ albumSize }}</li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
const route = useRoute();
let { name, alias, picUrl, musicSize, albumSize }: any = route.query;
let followed = ref(route.query.followed == 'true');

// 收藏
let collection = () => {
  followed.value = !followed.value;
}
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
    padding-top: 15px;

    .name,
    .alias,
    .count li {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .alias {
      margin-top: 5px;
      color: rgba($color: #000000, $alpha: .5);
      font-size: 14px;
    }

    .collection {
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 20px 0px;
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
        color: var(--theme-bg-color);
      }

      &.collected {
        width: 90px;
        color: var(--theme-bg-color);
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