<!-- 个性推荐 推荐歌单 -->
<template>
  <el-skeleton :loading="loading" animated>
    <template #template>
      <ul grid6Cols mt-15px min-h-300px>
        <li v-for="item in 12">
          <el-skeleton-item variant="image" w-full h-33 rounded-md />
          <el-skeleton-item variant="text" mt-6px />
          <el-skeleton-item variant="text" w="5/10" />
        </li>
      </ul>
    </template>
    <template #default>
      <ul grid6Cols mt-15px min-h-300px>
        <li v-for="item in songList" :key="item.id" @click="$router.push(`/songListDetail/${item.id}`)" class="group"
          cursor-pointer>
          <div relative flex overflow-hidden rounded-md>
            <!-- 封面 -->
            <el-image brightness-85 :src="item.picUrl" fit="cover" />

            <!-- 播放次数 -->
            <p absolute top-2px right-6px z-2 flex items-center text-white>
              <span text-21px i-eva:arrow-right-outline></span>
              <span text-15px>{{ Handle.Count(item.playCount) }}</span>
            </p>

            <!-- 播放图标 -->
            <p absolute right-5px bottom-5px z-2 text="white/70 28px" opacity-0 transition-opacity hover:text-white
              group-hover:opacity-100>
              <span @click.stop="Operate.playSongList(item.id)" i-eva:play-circle-outline></span>
            </p>
          </div>

          <!-- 名字 -->
          <p mt-5px text-14px twoLineOmit group-hover:themeColor>{{ item.name }}</p>
        </li>
      </ul>
    </template>
  </el-skeleton>
</template>

<script setup lang="ts">
import { reactive, ref, onActivated } from "vue";
import { ElMessage } from "element-plus";
import { Handle, Operate } from "utils";
import { SongListAPI } from "api";

// 加载状态
let loading = ref<boolean>(false);
// 推荐歌单列表
let songList = reactive<any[]>([]);
// 加载推荐歌单列表
let loadData = async () => {
  try {
    loading.value = true;
    let { code, result }: any = await SongListAPI.getPersonalized(12);
    if (code == 200) songList.push(...result);
  } catch (err: any) {
    ElMessage.error("加载推荐列表失败!");
  } finally {
    loading.value = false;
  }
}

// 如果没有请求到数据,重新发起请求
onActivated(() => {
  if (!loading.value && !songList.length) {
    loadData();
  }
})
</script>