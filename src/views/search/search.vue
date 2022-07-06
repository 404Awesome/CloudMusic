<!-- 搜索 -->
<template>
  <div :key="($route.params.keyword as string)" wrapBox>
    <!-- 头部 -->
    <header mt-15px mb-10px>
      <h1 text-2xl>关键词: {{ $route.params.keyword }}</h1>
      <p text-gray-500 mt-5px min-h-20px>{{ count[activeName] }}</p>
    </header>

    <!-- 标签页 -->
    <el-tabs v-model="activeName">
      <el-tab-pane v-for="{ label, name, coms } in components" :key="label" :label="label" :name="name">
        <component :is="coms" @getCount="(text: string) => count[name] = text" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script lang="ts">
export default { name: "Search" }
</script>
<script setup lang="ts">
import Songs from "./coms/songs.vue";
import Album from "./coms/album.vue";
import Video from "./coms/video.vue";
import Lyric from "./coms/lyric.vue";
import Radio from "./coms/radio.vue";
import Users from "./coms/users.vue";
import Singer from "./coms/singer.vue";
import SongList from "./coms/songList.vue";
import { markRaw, reactive, ref } from "vue";

// 类型数量展示内容
let count = reactive<any>({
  Songs: "等待加载!",
  Album: "等待加载!",
  Video: "等待加载!",
  Lyric: "等待加载!",
  Radio: "等待加载!",
  Users: "等待加载!",
  Singer: "等待加载!",
  SongList: "等待加载!",
});

// 当前激活的标签页
let activeName = ref("Songs");
// 动态组件
let components = [
  {
    name: "Songs",
    label: "单曲",
    coms: markRaw(Songs)
  },
  {
    name: "Singer",
    label: "歌手",
    coms: markRaw(Singer)
  },
  {
    name: "Album",
    label: "专辑",
    coms: markRaw(Album)
  },
  {
    name: "Video",
    label: "视频",
    coms: markRaw(Video)
  },
  {
    name: "SongList",
    label: "歌单",
    coms: markRaw(SongList)
  },
  {
    name: "Lyric",
    label: "歌词",
    coms: markRaw(Lyric)
  },
  {
    name: "Radio",
    label: "电台",
    coms: markRaw(Radio)
  },
  {
    name: "Users",
    label: "用户",
    coms: markRaw(Users)
  },
]
</script>