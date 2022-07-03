<!-- 歌手 -->
<template>
  <div pt-4 wrapBox>
    <!-- 分类列表 -->
    <categoryList @selected="cateSelected" :loading="loading" />

    <!-- 歌手列表 -->
    <ul v-if="artistsList.length" v-infinite-scroll="loadData" :infinite-scroll-disabled="disabled" grid6Cols mt-15px>
      <li v-for="item in artistsList" :key="item.id" @click="goSingerDetail(item)" class="group" cursor-pointer>
        <!-- 头像 -->
        <el-image :src="item.picUrl" lazy fit="cover" h-140px rounded-md />
        <!-- 名称 -->
        <p mt-5px group-hover:themeColor text-15px>{{ item.name }}</p>
      </li>
    </ul>

    <!-- 提示 -->
    <el-divider>
      <span tip>{{ disabled ? '已加载到底!' : 'Loading...' }}</span>
    </el-divider>
  </div>
</template>

<script setup lang="ts">
import categoryList from "./coms/categoryList.vue";
import { ref, reactive, toRaw } from "vue";
import { ElMessage } from "element-plus";
import { useRouter } from "vue-router";
import { ArtistAPI } from "api";
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