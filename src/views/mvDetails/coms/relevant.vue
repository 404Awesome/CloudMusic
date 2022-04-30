<template>
  <div class="recommend">
    <!-- 标题 -->
    <h4 class="title">相关推荐</h4>
    <!-- 列表 -->
    <ul class="list">
      <li v-for="item in relevant" :key="item.vid">
        <!-- banner图 -->
        <div class="banner">
          <el-image :src="item.coverUrl" fit="cover" lazy />
          <!-- 观看数 -->
          <p class="durationms">
            <span class="icon i-heroicons-outline:play"></span>
            <span>{{ handleDurationms(item.durationms) }}</span>
          </p>
          <!-- 时间 -->
          <p class="time">{{ handerTime(item.durationms) }}</p>
        </div>

        <!-- 详情 -->
        <div class="details">
          <p>{{ item.title }}</p>
          <p truncate>
            <span>by </span>
            <span>{{ item.creator[0].userName }}</span>
          </p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { getRelevantVideo } from "@/api/video";
let props = defineProps({
  id: {
    type: Number,
    required: true,
  },
});

// 获取相关视频
let relevant = reactive<any[]>([]);
onMounted(async () => {
  let { code, data }: any = await getRelevantVideo(props.id);
  if (code == 200) relevant.push(...data);
});

// 处理观看数
let handleDurationms = (count: number) => {
  let num = (count / 10000).toFixed(0);
  return num.length == 1 ? count : `${num}万`;
};

// 处理时间
let handerTime = (time: number) => {
  time = time / 1000 / 60;
  let arr = `${time.toFixed(2)}`.split(".");
  return `${arr[0].padStart(2, "0")}:${arr[1]}`;
};
</script>

<style lang="scss" scoped>
.recommend {
  // 标题
  .title {
    margin: 0px;
    margin-bottom: 15px;
    color: var(--font-color);
    font-weight: 400;
    font-size: 18px;
  }
  // 列表
  .list li {
    display: flex;
    margin-bottom: 10px;
    cursor: pointer;

    gap: 10px;

    // banner图
    .banner {
      position: relative;
      display: flex;
      overflow: hidden;
      overflow: hidden;
      flex-basis: 40%;
      height: auto;
      border-radius: 5px;
      color: #fff;
      font-size: 14px;

      &::after {
        position: absolute;
        z-index: 2;
        width: 100%;
        height: 100%;
        background-color: rgba($color: #000000, $alpha: 0.25);
        content: "";
      }

      :deep(.el-image__inner) {
        position: relative;
        z-index: 1;
        border-radius: 5px;
      }

      .durationms {
        position: absolute;
        top: 0px;
        right: 5px;
        z-index: 3;

        .icon {
          margin-right: 3px;
        }
      }

      .time {
        position: absolute;
        right: 5px;
        bottom: 0px;
        z-index: 3;
      }
    }

    // 详情
    .details {
      display: flex;
      flex: 1;
      flex-flow: column nowrap;
      justify-content: center;

      gap: 5px;

      p {
        &:first-child {
          display: -webkit-box;
          overflow: hidden;
          -webkit-box-orient: vertical;
          color: var(--font-color);
          text-overflow: ellipsis;
          font-size: 15px;

          -webkit-line-clamp: 2;
        }
        &:last-child {
          color: #b2bec3;
          font-size: 13px;

          span:last-child:hover {
            color: var(--font-color);
          }
        }
      }
    }
  }
}
</style>
