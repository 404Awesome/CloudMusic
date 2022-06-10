<!-- 歌手 -->
<template>
  <div pt-4 class="wrapper">
    <!-- 分类列表 -->
    <categoryList @selected="cateSelected" :isLoading="isLoading" />

    <!-- 歌手列表 -->
    <ul gap-5 lg:gap-7 grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 class="singerList"
      v-infinite-scroll="loadData" :infinite-scroll-disabled="disabled">
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
import { Discover } from "@/api/modules/discover";
import { useRouter } from "vue-router";
const router = useRouter();

// 请求偏移量
let offset = ref(0);
// 请求限制数据个数
let limit = 30;
// 是否禁用加载
let disabled = ref(false);
// 是否正在加载
let isLoading = ref(false);
// 类型列表
let typeList = reactive({
  area: "",
  type: "",
  initial: ""
})

// 分类已选择
let cateSelected = (category: any) => {
  offset.value = 0;
  artistsList.splice(0, artistsList.length);
  Object.assign(typeList, category);
  loadData();
}

// 歌手列表
let artistsList = reactive<any>([]);
// 加载数据
let loadData = async () => {
  if (isLoading.value) return;
  isLoading.value = true;
  let { area, type, initial } = toRaw(typeList);
  let { artists, code, more }: any = await Discover.getArtistList(type, area, initial, offset.value, limit);
  if (code == 200) {
    artistsList.push(...artists);
    offset.value = artistsList.length;

    // 无法加载更多
    if (!more) {
      disabled.value = true;
    }
  }
  isLoading.value = false;
}

// 跳转到歌手详情页面
let goSingerDetail = (singer: any) => {
  let { id, alias, followed, name } = toRaw(singer);
  router.push({
    path: '/singerDetail',
    query: { id, alias, followed, name }
  })
}
</script>

<style lang="scss" scoped>
.singerList {
  display: grid;
  margin-top: 15px;

  li {
    cursor: pointer;

    &:hover .info .name {
      color: var(--theme-bg-color);
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
