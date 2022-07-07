<!-- 搜索 -->
<template>
  <el-popover ref="popoverEl" @hide="searchText = ''" :hide-after="0" @show="showPopover" width="200px"
    placement="bottom-start" trigger="click">
    <template #reference>
      <span class="icon" i-carbon:search></span>
    </template>

    <template #default>
      <div class="search" fontColor>
        <!-- 表单 -->
        <div flex gap-5px>
          <input v-model.trim.lazy="searchText" @keyup.enter="search" type="text" placeholder="搜索" class="input" />
          <button @click="search" class="searchBtn">搜索</button>
        </div>

        <!-- 热搜榜 -->
        <div v-if="searchHotList.length" mt-10px>
          <el-divider>
            <h4>热搜榜</h4>
          </el-divider>
          <el-scrollbar height="200px" :always="true">
            <p @click="searchHot(item.searchWord)" v-for="(item, index) in searchHotList" :key="item.searchWord"
              class="group listItem">
              <span truncate w-25px text-center :style="{ 'color': index < 3 ? 'var(--theme-color)' : '' }">
                {{ index + 1 }}
              </span>
              <span truncate flex-1 mr-5px group-hover:themeColor>{{ item.searchWord }}</span>
              <span truncate flex-1 text="black/30 13px">{{ item.score }}</span>
            </p>
          </el-scrollbar>
        </div>
      </div>
    </template>
  </el-popover>
</template>

<script setup lang="ts">
import { ElMessage } from "element-plus";
import { useRouter } from "vue-router";
import { ref, reactive } from "vue";
import { OtherAPI } from "api";
const router = useRouter();

//  ElPopover元素
let popoverEl = ref<any>(null);
// 热搜列表
interface SearchHotList {
  searchWord: string,
  score: number
}
let searchHotList = reactive<SearchHotList[]>([]);
// 显示Popover时触发事件
let showPopover = async () => {
  try {
    // 当热搜列表为空时,加载热搜列表
    if (!searchHotList.length) {
      let { code, data }: any = await OtherAPI.getSearchHot();
      if (code == 200) {
        let list = data.map((item: any) => {
          let { searchWord, score } = item;
          return { searchWord, score };
        })
        searchHotList.push(...list);
      };
    }
  } catch (err: any) {
    ElMessage.error("加载搜索热搜失败!");
  }
}

// 搜索
let searchText = ref("");
let search = () => {
  if (searchText.value.length) {
    router.push(`/search/${searchText.value}`);
    popoverEl.value?.hide();
  }
}

// 搜索热搜点击事件
let searchHot = (searchWord: string) => {
  router.push(`/search/${searchWord}`);
  popoverEl.value?.hide();
}
</script>

<style lang="scss" scoped>
.icon {
  @apply flex-1 text-white/70 whitespace-nowrap text-19px cursor-pointer hover-text-white;
}

// 输入框
.input {
  @apply px-10px py-5px w-130px outline-none border-none rounded-md bg-#eee text-14px box-border;
}

// 搜索按钮
.searchBtn {
  @apply flex-1 border-none rounded-md themeBgColor text-white whitespace-nowrap cursor-pointer;
}

// 热搜列表项
.listItem {
  @apply flex overflow-hidden mb-5px pr-6px text-14px cursor-pointer;
}
</style>