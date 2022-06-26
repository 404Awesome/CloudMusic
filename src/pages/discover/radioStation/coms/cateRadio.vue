<!-- 分类电台 -->
<template>
  <el-skeleton :loading="loading" animated>
    <template #template>
      <ul ref="skeletonEl" grid6Cols mt-15px>
        <li v-for="item in 6">
          <el-skeleton-item variant="image" w-full h-35 rounded-md />
          <el-skeleton-item block variant="text" w="6/10" mt-7px />
        </li>
      </ul>
    </template>
    <template #default>
      <ul grid6Cols mt-15px>
        <li v-for="item in radioList" :key="item.id" class="group" cursor-pointer min-h-35>
          <div border="1px solid #eee" relative flex overflow-hidden rounded-md>
            <el-image :src="item.picUrl" lazy />
            <p text="12px white" bg="black/20" w-full p-5px bottom-0 left-0 absolute truncate>
              {{ item.name }}
            </p>
          </div>
          <p group-hover:themeColor text-14px twoLineOmit mt-5px>{{ item.rcmdtext }}</p>
        </li>
      </ul>
    </template>
  </el-skeleton>
</template>

<script setup lang="ts">
import { useIntersectionObserver } from "@vueuse/core";
import { reactive, onMounted, ref, onActivated } from "vue";
import { RadioAPI } from "api";
import { ElMessage } from "element-plus";
const props = defineProps({
  id: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    required: true
  }
});

// 骨架屏容器元素
let skeletonEl = ref<HTMLElement | null>(null);
// 加载状态
let loading = ref(true);
// 电台列表
let radioList = reactive<any[]>([]);

// 加载电台列表
let loadData = async () => {
  try {
    loading.value = true;
    let { code, djRadios }: any = await RadioAPI.getCateRadioHot(props.id, 0, 6);
    if (code == 200) radioList.push(...djRadios.splice(0, 6));
  } catch (err: any) {
    ElMessage.error(`加载${props.title}失败!`);
  } finally {
    loading.value = false;
  }
}

// 监听容器元素是否显示在页面上
onMounted(() => {
  const { stop } = useIntersectionObserver(skeletonEl.value, ([{ isIntersecting }]) => {
    if (isIntersecting) {
      loadData();
      stop();
    }
  })
});

// 如果没有请求到数据,重新发起请求
onActivated(() => {
  if (!loading.value && !radioList.length) {
    loadData();
  }
})
</script>