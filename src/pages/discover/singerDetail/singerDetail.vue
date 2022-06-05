<!-- 歌手详情 -->
<template>
  <div class="wrapper" py-4>
    <!-- 个人详情 -->
    <Detail mb-4 />

    <!-- 个人成就 -->
    <el-tabs v-model="activeComs">
      <el-tab-pane v-for="item in tabPaneList" :key="item.name" :label="item.label" :name="item.name">
        <component :activeComs="activeComs" :is="item.component" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup lang="ts" name="singerDetail">
import Detail from "./coms/detail.vue";
import Album from "./coms/album.vue";
import MVList from "./coms/mvList.vue";
import SingerInfo from "./coms/singerInfo.vue";
import SimilarSinger from "./coms/similarSinger.vue";

// 当前激活的组件
let activeComs = ref("Album");
// tab列表
let tabPaneList = reactive([
  {
    label: "专辑",
    name: "Album",
    component: shallowRef(Album)
  },
  {
    label: "MV",
    name: "MV",
    component: shallowRef(MVList)
  },
  {
    label: "歌手详情",
    name: "SingerInfo",
    component: shallowRef(SingerInfo)
  },
  {
    label: "相似歌手",
    name: "SimilarSinger",
    component: shallowRef(SimilarSinger)
  }
]);
</script>