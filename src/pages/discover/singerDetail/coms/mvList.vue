<!-- 歌手详情 MV列表 -->
<template>
  <ul gap-5 lg:gap-7 grid-cols-2 md:grid-cols-3 lg-grid-cols-4 class="singerMV">
    <li v-for="mv in mvList" :key="mv.id" @click="$router.replace(`/mvDetail/${mv.id}`)">
      <div class="cover" rounded overflow-hidden>
        <!-- 封面 -->
        <el-image h-30 transition duration-300 ease-in-out z-0 flex :src="mv.imgurl" fit="cover" lazy />
        <!-- 播放次数 -->
        <p class="playCount">
          <span class="icon i-eva:arrow-right-outline"></span>
          <span>{{ handleCount(mv.playCount) }}</span>
        </p>
        <!-- mv时长 -->
        <p class="duration">{{ handerDuration(mv.duration) }}</p>
      </div>
      <!-- 标题 -->
      <p class="title">{{ mv.name }}</p>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { handleCount, handerDuration } from "@/utils/handle";
import { Discover } from "@/api/modules/discover";
import { useRoute } from "vue-router";
const route = useRoute();
const { id }: any = route.query;
const props = defineProps(['activeComs']);

// MV列表
let mvList = reactive<any>([]);
// 加载数据
let loadData = async () => {
  let { hasMore, code, mvs }: any = await Discover.getArtistMV(id);
  if (code == 200) {
    mvList.push(...mvs);
  }
}

// 监听当前组件的激活状态
watch(() => props.activeComs, (newVal) => {
  if (newVal == "MV" && mvList.length == 0) loadData();
})
</script>

<style lang="scss" scoped>
.singerMV {
  padding: 15px 0px;
  display: grid;

  li {
    cursor: pointer;

    &:hover {
      .title {
        color: var(--theme-bg-color);
      }

      :deep(.el-image) {
        transform: scale(1.15);
      }
    }

    .cover {
      position: relative;

      &::after {
        position: absolute;
        z-index: 1;
        top: 0px;
        width: 100%;
        height: 100%;
        background-color: rgba($color: #000000, $alpha: 0.2);
        content: "";
      }

      .playCount {
        position: absolute;
        top: 2px;
        right: 6px;
        z-index: 2;
        color: #fff;
        font-size: 14px;

        .icon {
          font-size: 20px;
        }
      }

      .duration {
        position: absolute;
        bottom: 2px;
        right: 6px;
        z-index: 2;
        color: #fff;
        font-size: 14px;
      }
    }

    .title {
      margin-top: 5px;
      font-size: 15px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
}
</style>