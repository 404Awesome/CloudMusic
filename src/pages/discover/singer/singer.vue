<!-- 歌手 -->
<template>
  <div pt-4 class="wrapper">
    <!-- 分类列表 -->
    <categoryList @selected="cateSelected" :loading="loading" />

    <!-- 歌手列表 -->
    <ul v-if="artistsList.length" gap-5 lg:gap-7 grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6
      class="singerList" v-infinite-scroll="loadData" :infinite-scroll-disabled="disabled">
      <li v-for="item in artistsList" :key="item.id" @click="goSingerDetail(item)">
        <el-avatar :size="120" shape="square" :src="item.picUrl" />
        <p class="info">
          <span class="name">{{ item.name }}</span>
        </p>
      </li>
    </ul>

    <!-- 分割线 -->
    <el-divider>
      <span class="tip">{{ disabled ? '已加载到底!' : 'Loading...' }}</span>
    </el-divider>
  </div>
</template>

<script setup lang="ts">
import categoryList from "./coms/categoryList.vue";
import { ArtistAPI } from "api";
import { useRouter } from "vue-router";
const router = useRouter();

// 是否禁用加载
let disabled = ref(false);
// 是否正在加载
let loading = ref(false);
// 类型列表
let typeList = {};
// 歌手列表
let artistsList = reactive<any>([]);

// 加载数据
let loadData = async () => {
  if (loading.value) return;
  loading.value = true;
  try {
    let { area, type, initial }: any = typeList;
    let { artists, code, more }: any = await ArtistAPI.getList(type, area, initial, artistsList.length, 30);
    if (code == 200) {
      artistsList.push(...artists);
      // 无法加载更多
      if (!more) disabled.value = true;
    }
  } catch (err: any) {
    ElMessage.error("加载歌手列表失败!");
  } finally {
    loading.value = false;
  }
}

// 分类已选择
let cateSelected = (category: any) => {
  // 清空数组
  artistsList.splice(0, artistsList.length);
  // 合并分类
  Object.assign(typeList, category);
  // 加载数据
  loadData();
}

// 跳转歌手页面
let goSingerDetail = (singer: any) => {
  let { alias, name, id } = toRaw(singer);
  router.push({
    path: `/singerDetail`,
    query: { id, name, alias }
  });
}
</script>

<style lang="scss" scoped>
.singerList {
  display: grid;
  margin-top: 15px;

  li {
    cursor: pointer;

    &:hover .info .name {
      color: var(--theme-color);
    }

    .info {
      margin-top: 5px;

      .name {
        color: var(--font-color);
        font-size: 15px;
      }
    }
  }
}

// 提示信息
.tip {
  padding-bottom: 15px;
  color: var(--font-color);
  font-size: 17px;
}
</style>
