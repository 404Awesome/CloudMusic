<!-- 歌手详情 MV列表 -->
<template>
  <el-skeleton :loading="loading" animated>
    <template #template>
      <ul ref="skeletonEl" grid4Cols mt-15px>
        <li v-for="item in 8">
          <el-skeleton-item variant="image" w-full h-35 rounded-md />
          <el-skeleton-item block variant="text" w="6/10" mt-7px />
        </li>
      </ul>
    </template>
    <template #default>
      <ul grid4Cols p-y-15px>
        <li v-for="mv in mvList" :key="mv.id" @click="$router.replace(`/mvDetail/${mv.id}`)" class="group"
          cursor-pointer>
          <div relative rounded overflow-hidden>
            <!-- 封面 -->
            <el-image :src="mv.imgurl" fit="cover" lazy brightness-85 h-35 transition duration-300 ease-in-out z-0 flex
              group-hover:scale-115 />
            <!-- 播放次数 -->
            <p absolute z-2 top-2px right-6px text="white 14px">
              <span text-20px i-eva:arrow-right-outline></span>
              <span>{{ Handle.Count(mv.playCount) }}</span>
            </p>
            <!-- mv时长 -->
            <p absolute right-6px bottom-2px z-2 text="white 14px">{{ Handle.Duration(mv.duration) }}</p>
          </div>

          <!-- 标题 -->
          <p truncate mt-5px text-15px group-hover:themeColor>{{ mv.name }}</p>
        </li>
      </ul>
    </template>
  </el-skeleton>
</template>

<script setup lang="ts">
import { useIntersectionObserver } from "@vueuse/core";
import { reactive, ref, onMounted } from "vue";
import { ElMessage } from "element-plus";
import { useRoute } from "vue-router";
import { ArtistAPI } from "api";
import { Handle } from "utils";
const route = useRoute();
let id = parseInt(route.query.id as string);

// 骨架屏容器元素
let skeletonEl = ref<HTMLElement | null>(null);
// 加载状态
let loading = ref(true);
// MV列表
let mvList = reactive<any>([]);
// 加载数据
let loadData = async () => {
  try {
    loading.value = true;
    let { hasMore, code, mvs }: any = await ArtistAPI.getMV(id);
    if (code == 200) mvList.push(...mvs);
  } catch (err: any) {
    ElMessage.error("加载MV列表失败!");
  } finally {
    loading.value = false;
  }
}

// 监听容器元素是否显示在页面上
onMounted(() => {
  const { stop } = useIntersectionObserver(skeletonEl.value, ([{ isIntersecting }]) => {
    if (isIntersecting) {
      loadData();
      stop();
    }
  })
});
</script>