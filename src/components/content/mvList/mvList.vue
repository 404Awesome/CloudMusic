<!-- mv列表 -->
<template>
  <ul v-loading="loading" element-loading-text="Loading..." grid4Cols min-h-35>
    <li overflow-hidden v-for="mv in list" :key="mv.id">
      <MVItem :id="mv.id" :cover="mv.cover || mv.picUrl" :name="mv.name" :artists="mv.artists"
        :playCount="mv.playCount" />
    </li>
  </ul>
</template>

<script setup lang="ts">
import MVItem from "@/components/content/mvItem/mvItem.vue";
import { PropType, toRefs } from "vue";
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