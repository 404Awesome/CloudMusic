<!-- 独家放送item -->
<template>
  <div @click="$router.push(`/mvDetail/${id}`)" class="group" cursor-pointer relative rounded-md overflow-hidden>
    <!-- 封面 -->
    <el-image :src="picUrl" fit="cover" group-hover:scale-110 transition-transform brightness-85 flex h-35 lazy />

    <!-- 描述 -->
    <p group-hover:themeColor bg="white/75" text-15px absolute bottom-0px w-full p-5px text-14px truncate>
      {{ copywriter }}
    </p>
  </div>
</template>
 
<script setup lang="ts">
import { toRaw } from "vue";
const props = defineProps({
  id: {
    type: Number,
    required: true
  },
  picUrl: {
    type: String,
    required: true
  },
  copywriter: {
    type: String,
    required: true
  },
});
let { id, picUrl, copywriter } = toRaw(props);
</script>