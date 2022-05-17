<!-- mv列表 -->
<template>
  <ul class="mvList" element-loading-text="Loading..." v-loading="loading">
    <li v-for="item in list" :key="item.id">
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

  gap: 30px;
  grid-template-columns: repeat(4, 1fr);

  li {
    overflow: hidden;
  }
}
</style>