<!-- 排行榜 -->
<template>
  <el-skeleton :loading="loading" animated>
    <template #template>
      <ul wrapBox grid6Cols py-20px>
        <li v-for="item in 12">
          <el-skeleton-item variant="image" w-full h-33 rounded-md />
          <el-skeleton-item variant="text" block mt-5px w="7/10" />
          <el-skeleton-item variant="text" block mt-3px h-10px w="4/10" />
        </li>
      </ul>
    </template>
    <template #default>
      <ul wrapBox grid6Cols py-20px>
        <li v-for="item in rankingList" :key="item.id" @click="goSongListDetail(item.id)" class="group" cursor-pointer>
          <div relative>
            <!-- 播放数 -->
            <p absolute top-3px right-5px z-2 flex items-center text-white>
              <span text-20px i-eva:arrow-right-outline></span>
              <span text-14px>{{ Handle.Count(item.playCount) }}</span>
            </p>

            <!-- 封面 -->
            <el-image :src="item.coverImgUrl" fit="cover" rounded-md brightness-90 />

            <!-- 播放按钮 -->
            <div class="playIcon" group-hover:opacity-100>
              <span i-eva:arrow-right-fill></span>
            </div>
          </div>

          <!-- 标题 -->
          <p truncate text-14px group-hover:themeColor>{{ item.name }}</p>

          <!-- 更新时间 -->
          <p truncate text="13px black/50" group-hover:themeColor>{{ Handle.TimeStamp(item.updateTime) }}</p>
        </li>
      </ul>
    </template>
  </el-skeleton>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";
import { ElMessage } from "element-plus";
import { SongListAPI } from "api";
import { Handle } from "utils";
import { useRouter } from "vue-router";
const router = useRouter();

// 加载状态
let loading = ref(true);
// 榜单列表
let rankingList = reactive<any>([]);

// 跳转歌单详情页面
let goSongListDetail = (id: number) => {
  router.push(`/songListDetail/${id}`);
}

// 加载榜单列表
let loadData = async () => {
  try {
    loading.value = true;
    let { code, list }: any = await SongListAPI.getTopDetail();
    if (code == 200) {
      list = list.map((item: any) => {
        let { id, coverImgUrl, name, playCount, updateTime } = item;
        return { id, coverImgUrl, name, playCount, updateTime };
      });
      rankingList.push(...list);
    }
  } catch (err: any) {
    ElMessage.error("加载榜单列表失败!");
  } finally {
    loading.value = false;
  }
}
// 初始化榜单列表
onMounted(() => loadData());
</script>

<style lang="scss" scoped>
.playIcon {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: rgba($color: #fff, $alpha: 0.5);
  color: #d33a31;
  font-size: 32px;
  opacity: 0;
  transition: opacity 0.3s linear;

  &:hover {
    background-color: rgba($color: #fff, $alpha: 0.9);
  }
}
</style>
