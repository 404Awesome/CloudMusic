<!-- 歌单详情 -->
<template>
  <div v-if="detail.name">
    <div ref="detailEl" class="detail">
      <!-- 封面 -->
      <el-image transition-all duration-300 ease-linear flex-none h-35 w-35 lg:h-50 lg:w-50 rounded
        :src="detail.coverImgUrl" fit="cover" />

      <!-- 详情 -->
      <div flex-1 overflow-hidden>
        <section lg:h-50 class="content">
          <!-- 标题 -->
          <h1 text-xl class="title">{{ detail.name }}</h1>

          <!-- 创建者 -->
          <div my-3 lg:my-0 class="creator">
            <el-image w-8 rounded-full :src="detail.creator.avatarUrl" fit="cover" />
            <p class="nickname">{{ detail.creator.nickname }}</p>
            <p class="text createTime">{{ detail.createTime }}</p>
          </div>

          <!-- 操作 -->
          <ul mb-3 lg:my-0 class="operate">
            <li class="playAll">
              <p @click="Operate.playSongList(id)">
                <span class="icon i-heroicons-outline:play"></span>
                <span>播放全部</span>
              </p>
              <span @click="addPlayList" class="icon i-heroicons-outline:plus-sm"></span>
            </li>
            <li @click="Operate.collectSongList(id)">
              <span class="icon i-heroicons-outline:folder-add"></span>
              <span>收藏({{ Handle.Count(detail.subscribedCount) }})</span>
            </li>
            <li @click="share">
              <span class="icon i-heroicons-outline:external-link"></span>
              <span>分享({{ Handle.Count(detail.shareCount) }})</span>
            </li>
          </ul>

          <!-- 元信息 -->
          <div class="metaInfo">
            <!-- 标签 -->
            <p class="tags">
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
                <span class="text">{{ Handle.Count(detail.playCount) }}</span>
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
        <section whitespace-pre-wrap leading-6 v-show="showMore" class="text">{{ describe.more || "" }}</section>
      </div>
    </div>

    <!-- 折叠 -->
    <slot :id="id" :share="share" name="fold" :title="detail.name" :height="detailEl?.offsetHeight || 0"></slot>
  </div>
</template>

<script setup lang="ts">
import { Handle, Operate } from "utils";
import { SongListAPI } from "api";
import { useRoute } from "vue-router";
const route = useRoute();
const id = parseInt(route.params.id as string);

//  元素DOM
let detailEl = ref<HTMLElement | null>(null);
// 详情
let detail = reactive<any>({});
// 描述
let describe = reactive<{ [prop: string]: string | null }>({
  content: null,
  more: null
});
// 展示更多
let showMore = ref<boolean>(false);

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

// 分享
let share = () => {
  let href = location.href;
  let title = detail.name;
  let cover = detail.coverImgUrl;
  Operate.shareInfo(title, href, "歌单", cover);
}

// 添加到歌单
let addPlayList = () => {
  console.log(detail.id);
}
// 加载歌单详情
onMounted(async () => {
  let { code, playlist }: any = await SongListAPI.getDetail(id);
  if (code == 200) {
    let { playCount, trackCount, shareCount, createTime, description, creator, name, coverImgUrl, subscribedCount, tags, id } = playlist;
    // 处理描述
    handleDescribe(description);
    Object.assign(detail, {
      // ID
      id,
      // 封面
      coverImgUrl,
      // 创建者信息
      creator,
      // 标题
      name,
      // 创建时间
      createTime: `${Handle.TimeStamp(createTime)} 创建`,
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
@import "@/scss/mixins.scss";

.detail {
  display: flex;
  padding: 15px 0px 30px;
  color: var(--font-color);
  font-size: 14px;

  gap: 20px;

  .content {
    display: flex;
    overflow: hidden;
    flex: 1;
    flex-flow: column nowrap;
    justify-content: space-between;
  }
}

// 标题
.title {
  @include oneOmit;
}

// 创建人
.creator {
  display: flex;
  align-items: center;

  gap: 10px;

  .nickname,
  .createTime {
    @include oneOmit;
  }

  .nickname {
    color: var(--theme-bg-color);
    cursor: pointer;
  }
}

// 操作
.operate {
  display: flex;
  align-content: center;
  flex-flow: row wrap;

  gap: 7px 10px;

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

    user-select: none;
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

  .tags,
  .count>p {
    @include oneOmit;
  }

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

    gap: 15px;

    .more {
      font-size: 22px;
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
  color: rgba($color: #000000, $alpha: .5);
}
</style>