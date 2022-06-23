<!-- 歌手详情 MV列表 -->
<template>
  <ul grid4Cols p-y-15px>
    <li v-for="mv in mvList" :key="mv.id" @click="$router.replace(`/mvDetail/${mv.id}`)" class="group" cursor-pointer>
      <div relative rounded overflow-hidden>
        <!-- 封面 -->
        <el-image :src="mv.imgurl" fit="cover" lazy brightness-80 h-35 transition duration-300 ease-in-out z-0 flex
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

<script setup lang="ts">
import { reactive, watch } from "vue";
import { useRoute } from "vue-router";
import { ArtistAPI } from "api";
import { Handle } from "utils";
const route = useRoute();
const props = defineProps(['activeComs']);
let id = parseInt(route.query.id as string);

// MV列表
let mvList = reactive<any>([]);
// 加载数据
let loadData = async () => {
  let { hasMore, code, mvs }: any = await ArtistAPI.getMV(id);
  if (code == 200) mvList.push(...mvs);
}

// 监听当前组件的激活状态
watch(() => props.activeComs, (newVal) => {
  if (newVal == "MV" && mvList.length == 0) loadData();
})
</script>