<!-- 歌单详情 -->
<template>
  <el-skeleton :loading="loading" animated>
    <template #template>
      <div flex pt-15px pb-20px text-14px gap-20px>
        <el-skeleton-item variant="image" min-h-35 min-w-35 lg:h-50 lg:w-50 rounded-md />
        <div flex-1>
          <el-skeleton-item block variant="text" h-25px w="4/10" />
          <div w-full flex items-center mt-10px>
            <el-skeleton-item variant="image" w-8 h-8 rounded-full />
            <el-skeleton-item block variant="text" w-50px ml-5px />
            <el-skeleton-item block variant="text" w-100px ml-10px />
          </div>
          <div flex flex-wrap my-20px gap-7px>
            <el-skeleton-item block variant="text" w-110px h-29px rounded-full />
            <el-skeleton-item block variant="text" w-130px h-29px rounded-full />
            <el-skeleton-item block variant="text" w-130px h-29px rounded-full />
          </div>
          <el-skeleton-item block variant="text" w="2/10" mt-10px />
          <el-skeleton-item block variant="text" w="3/10" mt-10px />
          <el-skeleton-item block variant="text" w="8/10" mt-10px />
        </div>
      </div>
    </template>
    <template #default>
      <div ref="detailEl" flex pt-15px pb-20px text-14px gap-20px>
        <!-- 封面 -->
        <el-image :src="detail.coverImgUrl" fit="cover" transition-all flex-none h-35 w-35 lg:h-50 lg:w-50 rounded-md />

        <!-- 详情 -->
        <div flex-1 overflow-hidden>
          <section lg:h-50 flex overflow-hidden flex-1 flex-col flex-nowrap justify-between>
            <!-- 标题 -->
            <h1 text-19px truncate>{{ detail.name }}</h1>

            <!-- 创建者 -->
            <div @click="$router.push(`/otherHomePage/${detail.id}`)" my-3 lg:my-0 flex items-center gap-10px>
              <!-- 头像 -->
              <el-image :src="detail.avatarUrl" fit="cover" w-8 h-8 rounded-full />
              <!-- 名字 -->
              <p themeColor cursor-pointer truncate>{{ detail.nickname }}</p>
              <!-- 创建时间 -->
              <p truncate text="black/50">{{ detail.createTime }}</p>
            </div>

            <!-- 操作 -->
            <ul class="operate">
              <li @click="Operate.playSongList(id)">
                <span class="icon i-heroicons-outline:play"></span>
                <span>播放全部</span>
              </li>
              <li @click="Operate.collectSongList(id)">
                <span class="icon i-heroicons-outline:folder-add"></span>
                <span v-once>收藏({{ Handle.Count(detail.subscribedCount) }})</span>
              </li>
              <li @click="share()">
                <span class="icon i-heroicons-outline:external-link"></span>
                <span v-once>分享({{ Handle.Count(detail.shareCount) }})</span>
              </li>
            </ul>

            <!-- 元信息 -->
            <div text-14px>
              <!-- 标签 -->
              <p v-if="detail.tags.length" truncate>
                <span>标&emsp;签:&nbsp;</span>
                <span v-for="(item, index) in detail.tags" :key="item">
                  <span themeColor cursor-pointer>{{ item }}</span>
                  <span v-if="index < (detail.tags.length - 1)">&nbsp;/&nbsp;</span>
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
                <span v-if="describe.more" @click="showMore = !showMore" :class="{ active: showMore }"
                  i-eva:arrow-up-fill hover:themeColor min-w-25px text-22px cursor-pointer transition-transform
                  rotate-180></span>
              </div>
            </div>
          </section>

          <!-- 更多描述 -->
          <section v-show="showMore" whitespace-pre-wrap leading-6 text="black/50">{{ describe.more || "" }}</section>
        </div>
      </div>

      <!-- 折叠 -->
      <DetailFold :share="share" :name="detail.name" :id="id" :height="detailEl?.offsetHeight || 0"
        :disabled="props.activeComs !== 'SongList'" />
    </template>
  </el-skeleton>
</template>

<script setup lang="ts">
import DetailFold from "./detailFold.vue";
import { onMounted, reactive, ref } from "vue";
import { Handle, Operate } from "utils";
import { useRoute } from "vue-router";
import { SongListAPI } from "api";
import { ElMessage } from "element-plus";
const route = useRoute();
const props = defineProps({ activeComs: String });
let id = parseInt(route.params.id as string);

// 加载状态
let loading = ref(true);
//  元素DOM
let detailEl = ref<any>(null);
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

// 加载歌单详情
let loadData = async () => {
  try {
    loading.value = true;
    let { code, playlist }: any = await SongListAPI.getDetail(id);
    if (code == 200) {
      let { playCount, trackCount, shareCount, createTime, description, creator, name, coverImgUrl, subscribedCount, tags, id } = playlist;
      // 处理描述
      handleDescribe(description);
      // 合并对象
      Object.assign(detail, {
        // ID
        id,
        // 封面
        coverImgUrl,
        // 创建者头像
        avatarUrl: creator.avatarUrl,
        // 创建者头像
        nickname: creator.nickname,
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
      });
    }
  } catch (err: any) {
    ElMessage.error("加载歌单详情失败!");
  } finally {
    loading.value = false;
  }
}
// 初始化数据
onMounted(() => loadData());
</script>

<style lang="scss" scoped>
.operate {
  @apply mb-3 lg-my-0 flex content-center flex-row flex-wrap gap-y-7px gap-x-10px;

  li {
    @apply flexCenter select-none rounded-full w-130px text-center cursor-pointer border-1px border-#eee gap-5px whitespace-nowrap;

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

    &:first-child {
      width: 110px;
      border: none;
      background: linear-gradient(to right, #fa5042, #d43b32);
      color: rgba($color: #fff, $alpha: .8);

      &:hover {
        color: white;
      }
    }
  }
}

// 更多激活时样式
.active {
  transform: rotate(0deg) !important;
}
</style>