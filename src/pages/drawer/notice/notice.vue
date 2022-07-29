<!-- 通知 -->
<template>
  <el-drawer direction="rtl" size="350px" :z-index="200" :append-to-body="true" v-model="noticeDrawer"
    :with-header="false">
    <div class="notice"></div>
  </el-drawer>
</template>

<script setup lang="ts">
import { useMainStore } from "store";
import { toRefs } from "vue";
const store = useMainStore();
let { noticeDrawer } = toRefs(store);
</script>

<style lang="scss" scoped>
.notice {
  @apply bg-white h-full;
}
</style>