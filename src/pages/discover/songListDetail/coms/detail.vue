<!-- 歌单详情 -->
<template>
  <div v-if="detail.name" class="detail">
    <!-- 封面 -->
    <el-image flex-none h-60 rounded :src="detail.coverImgUrl" fit="cover" />

    <!-- 详情 -->
    <div flex-1>
      <section h-60 class="content">
        <!-- 标题 -->
        <h1 text-xl>{{ detail.name }}</h1>
        <!-- 创建者 -->
        <div class="creator">
          <el-image w-8 rounded-full :src="detail.creator.avatarUrl" fit="cover" />
          <p class="nickname">{{ detail.creator.nickname }}</p>
          <p class="text createTime">{{ detail.createTime }}</p>
        </div>

        <!-- 操作 -->
        <ul class="operate">
          <li class="playAll">
            <p>
              <span class="icon i-heroicons-outline:play"></span>
              <span>播放全部</span>
            </p>
            <span class="icon i-heroicons-outline:plus-sm"></span>
          </li>
          <li>
            <span class="icon i-heroicons-outline:folder-add"></span>
            <span>收藏({{ handleCount(detail.subscribedCount) }})</span>
          </li>
          <li>
            <span class="icon i-heroicons-outline:external-link"></span>
            <span>分享({{ handleCount(detail.shareCount) }})</span>
          </li>
          <li>
            <span class="icon i-eva:cloud-download-outline"></span>
            <span>下载全部</span>
          </li>
        </ul>

        <!-- 元信息 -->
        <div class="metaInfo">
          <!-- 标签 -->
          <p>
            <span>标&emsp;签:&nbsp;</span>
            <span v-for="(item, index) in detail.tags" :key="item">
              <span class="tag">{{ item }}</span>
              <span v-if="index < detail.tags.length - 1">&nbsp;/&nbsp;</span>
            </span>
          </p>

          <!-- 次数 -->
          <div class="count">
            <p>
              <span>歌曲数:&nbsp;</span>
              <span class="text">{{ detail.trackCount }}</span>
            </p>
            <p>
              <span>播放数:&nbsp;</span>
              <span class="text">{{ handleCount(detail.playCount) }}</span>
            </p>
          </div>

          <!-- 描述 -->
          <div v-if="describe.content" class="describe">
            <p>
              <span>简&emsp;介:&nbsp;</span>
              <span class="text">{{ describe.content || "" }}</span>
              <span v-if="describe.more">
                <span class="text" v-show="!showMore">...</span>
              </span>
            </p>
            <span v-if="describe.more" @click="showMore = !showMore" class="more i-eva:arrow-up-fill"
              :class="{ active: showMore }"></span>
          </div>
        </div>
      </section>

      <!-- 更多描述 -->
      <section whitespace-pre-wrap v-show="showMore" class="text">{{ describe.more || "" }}</section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { handleCount } from "@/utils/tools";
import { Discover } from "@/api/modules/discover";
import { useRoute } from "vue-router";
const route = useRoute();
let id = parseInt(route.params.id as string);

// 详情
let detail = reactive<any>({});
// 描述
let describe = reactive<{ [prop: string]: string | null }>({
  content: null,
  more: null
});
// 展示更多
let showMore = ref<boolean>(false);

// 处理创建时间
let handleCreateTime = (time: number) => {
  let Time = new Date(time);
  let year = Time.getFullYear();
  let month = (Time.getMonth() + 1).toString().padStart(2, "0");
  let day = Time.getDate();
  return `${year}-${month}-${day} 创建`;
};

// 处理描述
let handleDescribe = (desc: string) => {
  let splitArr = desc.split("\n");
  if (splitArr.length > 1) {
    // 有更多
    describe.content = splitArr[0];
    describe.more = splitArr.splice(1).join("\n");
  } else {
    // 没有更多
    describe.content = desc;
  }
}

// 获取歌单详情
onMounted(async () => {
  let { code, playlist }: any = await Discover.getPlayListDetail(id);
  if (code == 200) {
    let { playCount, trackCount, shareCount, createTime, description, creator, name, coverImgUrl, subscribedCount, tags } = playlist;
    // 处理描述
    handleDescribe(playlist.description);
    Object.assign(detail, {
      // 封面
      coverImgUrl,
      // 创建者信息
      creator,
      // 标题
      name,
      // 创建时间
      createTime: handleCreateTime(createTime),
      // 收藏次数
      subscribedCount,
      // 分享次数
      shareCount,
      // 标签
      tags,
      // 歌曲数量
      trackCount,
      // 播放次数
      playCount,
    })
  }
})
</script>

<style lang="scss" scoped>
.detail {
  display: flex;
  margin: 0 auto;
  padding: 15px 0px 30px;
  width: 80%;
  color: var(--font-color);
  font-size: 14px;

  gap: 30px;

  .content {
    display: flex;
    overflow: hidden;
    flex: 1;
    flex-flow: column nowrap;
    justify-content: space-between;
  }
}

// 创建人
.creator {
  display: flex;
  align-items: center;

  gap: 10px;

  .nickname {
    color: var(--theme-bg-color);
    cursor: pointer;
  }
}

// 操作
.operate {
  display: flex;

  gap: 10px;

  li {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 130px;
    border: 1px solid #eee;
    border-radius: 20px;
    text-align: center;
    white-space: nowrap;
    cursor: pointer;

    gap: 5px;

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

    &.playAll {
      border: none;
      background: linear-gradient(to right, #fa5042, #d43b32);
      color: rgba($color: #fff, $alpha: .8);

      p {
        padding-right: 5px;
        border-right: 1px solid #e2564d;
      }

      p,
      span {
        &:hover {
          color: #fff;
        }
      }
    }
  }
}

// 元信息
.metaInfo {
  font-size: 14px;

  .tag {
    color: var(--theme-bg-color);
    cursor: pointer;
  }

  .count {
    display: flex;

    gap: 10px;
  }

  .describe {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .more {
      font-size: 20px;
      cursor: pointer;
      transition: transform 0.3s ease-in-out;
      transform: rotate(180deg);

      &:hover {
        color: var(--theme-bg-color);
      }

      &.active {
        transform: rotate(0deg);
      }
    }
  }
}

// 文本
.text {
  color: rgba($color: #000000, $alpha: .6);
}
</style>