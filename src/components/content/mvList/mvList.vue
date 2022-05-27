<!-- mv列表 -->
<template>
  <ul gap-5 lg:gap-7 grid-cols-2 md:grid-cols-3 lg-grid-cols-4 class="mvList" element-loading-text="Loading..."
    v-loading="loading">
    <li overflow-hidden v-for="item in list" :key="item.id">
      <MVlistItem v-bind="item" />
    </li>
  </ul>
</template>

<script setup lang="ts">
import MVlistItem from "@/components/content/mvListItem/mvListItem.vue";
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

<style lang="scss" scoped>
.mvList {
  display: grid;
  min-height: 150px;
}
</style>