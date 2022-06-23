<!-- 分类电台 -->
<template>
  <div v-if="result.length" wrapBox pb-7>
    <!-- 导航栏 -->
    <NavBar :title="title" :path="path" />

    <!-- 列表 -->
    <ul v-if="result.length" grid6Cols mt-15px>
      <li v-for="item in result" :key="item.id" class="group" cursor-pointer>
        <div border="1px solid #eee" relative flex overflow-hidden rounded-md>
          <el-image :src="item.picUrl" lazy />
          <p text="12px white" bg="black/20" w-full p-5px bottom-0 left-0 absolute truncate>
            {{ item.name }}
          </p>
        </div>
        <p group-hover:themeColor text-14px twoLineOmit mt-5px>{{ item.rcmdtext }}</p>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import NavBar from "@/components/common/navBar/navBar.vue";
import { reactive, toRefs, onMounted } from "vue";
import { RadioAPI } from "api";
const props = defineProps({
  cateId: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  path: {
    type: String,
    required: true,
  },
});
const { cateId, title, path } = toRefs(props);

let result = reactive<any[]>([]);
onMounted(async () => {
  let { code, djRadios }: any = await RadioAPI.getCateRadioHot(cateId.value, 0, 6);
  if (code == 200) result.push(...djRadios.splice(0, 6));
});
</script>