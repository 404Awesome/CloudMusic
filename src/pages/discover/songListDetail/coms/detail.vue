<!-- 歌单详情 -->
<template>
  <div v-if="detail.name">
    <div ref="detailEl" flex pt-15px pb-20px text-14px gap-20px>
      <!-- 封面 -->
      <el-image transition-all flex-none h-35 w-35 lg:h-50 lg:w-50 rounded :src="detail.coverImgUrl" fit="cover" />

      <!-- 详情 -->
      <div flex-1 overflow-hidden>
        <section lg:h-50 flex overflow-hidden flex-1 flex-col flex-nowrap justify-between>
          <!-- 标题 -->
          <h1 text-19px truncate>{{ detail.name }}</h1>

          <!-- 创建者 -->
          <div my-3 lg:my-0 flex items-center gap-10px>
            <el-image :src="detail.creator.avatarUrl" fit="cover" w-8 rounded-full />
            <p themeColor cursor-pointer truncate>{{ detail.creator.nickname }}</p>
            <p truncate text="black/50">{{ detail.createTime }}</p>
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
              <span v-once>收藏({{ Handle.Count(detail.subscribedCount) }})</span>
            </li>
            <li @click="share">
              <span class="icon i-heroicons-outline:external-link"></span>
              <span v-once>分享({{ Handle.Count(detail.shareCount) }})</span>
            </li>
          </ul>

          <!-- 元信息 -->
          <div text-14px>
            <!-- 标签 -->
            <p truncate>
              <span>标&emsp;签:&nbsp;</span>
              <span v-for="(item, index) in detail.tags" :key="item">
                <span themeColor cursor-pointer>{{ item }}</span>
                <span v-if="index < detail.tags.length - 1">&nbsp;/&nbsp;</span>
              </span>
            </p>

            <!-- 次数 -->
            <div flex gap-10px>
              <p truncate>
                <span>歌曲数:&nbsp;</span>
                <span text="black/50">{{ detail.trackCount }}</span>
              </p>
              <p truncate>
                <span>播放数:&nbsp;</span>
                <span v-once text="black/50">{{ Handle.Count(detail.playCount) }}</span>
              </p>
            </div>

            <!-- 描述 -->
            <div v-if="describe.content" flex items-center justify-between gap-15px>
              <p>
                <span>简&emsp;介:&nbsp;</span>
                <span text="black/50">{{ describe.content || "" }}</span>
                <span v-if="describe.more">
                  <span v-show="!showMore" text="black/50">...</span>
                </span>
              </p>
              <span v-if="describe.more" @click="showMore = !showMore" :class="{ active: showMore }" i-eva:arrow-up-fill
                hover:themeColor min-w-25px text-22px cursor-pointer transition-transform rotate-180></span>
            </div>
          </div>
        </section>

        <!-- 更多描述 -->
        <section v-show="showMore" whitespace-pre-wrap leading-6 text="black/50">{{ describe.more || "" }}</section>
      </div>
    </div>

    <!-- 折叠 -->
    <slot :id="id" :share="share" name="fold" :title="detail.name" :height="detailEl?.offsetHeight || 0"></slot>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";
import { Handle, Operate } from "utils";
import { useRoute } from "vue-router";
import { SongListAPI } from "api";
const route = useRoute();
let id = parseInt(route.params.id as string);

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
      color: var(--theme-color);
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

// 更多激活时样式
.active {
  transform: rotate(0deg) !important;
}
</style>