<!-- mv列表 -->
<template>
  <ul grid min-h-30 gap-5 lg:gap-7 grid-cols-2 md:grid-cols-3 lg-grid-cols-4 element-loading-text="Loading..."
    v-loading="loading" class="mvList">
    <li overflow-hidden v-for="mv in list" :key="mv.id">
      <MVItem :id="mv.id" :cover="mv.cover || mv.picUrl" :name="mv.name" :artists="mv.artists"
        :playCount="mv.playCount" />
    </li>
  </ul>
</template>

<script setup lang="ts">
import MVItem from "@/components/content/mvItem/mvItem.vue";
import { PropType } from "vue";
const props = defineProps({
  list: {
    type: Array as PropType<any[]>,
    required: true
  },
  loading: {
    type: Boolean,
    default: false
  }
});
let { list, loading } = toRefs(props);
</script>