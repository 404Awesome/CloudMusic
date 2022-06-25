<!-- 搜索 -->
<template>
  <el-popover @hide="searchText = ''" :hide-after="0" @show="showPopover" width="200px" placement="bottom-start"
    trigger="click">
    <template #reference>
      <span class="icon i-heroicons-outline:search"></span>
    </template>

    <template #default>
      <div class="search" fontColor>
        <!-- 表单 -->
        <div flex gap-5px>
          <input v-model.trim.lazy="searchText" type="text" placeholder="搜索" px-10px py-5px w-130px outline-none
            border-none rounded-md bg="#eee" text-14px box-border />
          <button @click="search" flex-1 border-none rounded-md themeBgColor text-white whitespace-nowrap
            cursor-pointer>搜索</button>
        </div>

        <!-- 热搜榜 -->
        <div v-if="searchHotList.length" mt-10px>
          <el-divider>
            <h4>热搜榜</h4>
          </el-divider>
          <el-scrollbar height="200px" :always="true">
            <p @click="searchHot(item)" v-for="(item, index) in searchHotList" :key="item.searchWord" class="group" flex
              overflow-hidden mb-5px pr-6px text-14px cursor-pointer>
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
import { ref, reactive } from "vue";
import { SearchAPI } from "api";

// 热搜列表
let searchHotList = reactive<any>([]);
// 显示Popover时触发事件
let showPopover = async () => {
  if (!searchHotList.length) {
    // 加载搜索热搜
    let { code, data }: any = await SearchAPI.getSearchHot();
    if (code == 200) searchHotList.push(...data);
  }
}

// 搜索
let searchText = ref("");
let search = () => {
  if (searchText.value.length) {
    console.log(searchText.value);
  }
}

// 搜索热搜
let searchHot = (songInfo: any) => {
  console.log(songInfo);
}
</script>

<style lang="scss" scoped>
.icon {
  @apply flex-1 text-white/70 whitespace-nowrap text-19px cursor-pointer hover-text-white;
}
</style>