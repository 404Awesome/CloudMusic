<template>
  <nav class="nav">
    <!-- 全部类型 -->
    <el-popover :hide-after="0" popper-class="allTypeSelect" placement="bottom-start" trigger="click">
      <template #reference>
        <section class="allType">
          <span class="text">{{ currentSelect }}</span>
          <span class="icon i-heroicons-outline:chevron-right"></span>
        </section>
      </template>

      <div>
        <!-- 标题 -->
        <header class="header">
          <h1 @click="currentSelect = defaultType" :class="{ active: currentSelect == defaultType }" class="item">
            {{ defaultType }}
          </h1>
        </header>

        <!-- 分割线 -->
        <el-divider m-0 />

        <!-- 列表 -->
        <el-scrollbar :always="true" height="400px">
          <main class="categoryList">
            <slot :selected="selected" :currentSelect="currentSelect" name="customize"></slot>
          </main>
        </el-scrollbar>
      </div>
    </el-popover>

    <!-- 热门分类 -->
    <section class="hotTypeList" v-if="hotTypeList.length">
      <TypeSelect :loading="loading" @selected="(type: string) => currentSelect = type" :currentType="currentSelect"
        :typeList="hotTypeList" />
    </section>
  </nav>
</template>

<script setup lang="ts">
import TypeSelect from "@/components/content/typeSelect/typeSelect.vue";
import { ref, watch, toRef, toRaw } from "vue";
import { PropType } from "vue";
const emit = defineEmits(['selected'])
const props = defineProps({
  defaultType: {
    type: String,
    required: true
  },
  hotTypeList: {
    type: Array as PropType<string[]>,
    required: true
  },
  loading: {
    type: Boolean,
    default: false
  }
});
let loading = toRef(props, "loading");
let { hotTypeList, defaultType } = toRaw(props);

// 当前选中
let currentSelect = ref(defaultType || '');
// 监听当前类型的改变并发出事件
watch(currentSelect, () => {
  emit("selected", currentSelect.value);
}, { immediate: true });

// 改变了选择
let selected = (type: string) => {
  if (type !== currentSelect.value && !loading.value) {
    currentSelect.value = type;
  }
}
</script>

<style lang="scss" scoped>
nav.nav {
  display: flex;
  justify-content: space-between;

  gap: 20px;

  .allType {
    display: flex;
    align-items: center;
    padding: 5px 15px;
    border: 1px solid #eee;
    border-radius: 20px;
    white-space: nowrap;
    cursor: pointer;

    user-select: none;

    &:hover {
      background-color: #eee;
    }

    span {
      color: var(--font-color);

      &.text {
        font-size: 14px;
      }
    }
  }

  .hotTypeList {
    display: none;
    align-items: center;
  }
}

@media screen and (min-width: 1140px) {
  nav.nav .hotTypeList {
    display: flex;
    align-items: center;
  }
}
</style>
<style lang="scss">
.allTypeSelect {
  padding: 0px !important;
  width: 50% !important;

  .header,
  .categoryList {
    padding: 10px 15px;
  }

  .header {
    display: flex;
  }

  .list {
    display: grid;

    gap: 10px 15px;
    grid-template-columns: repeat(6, 1fr);

    li {
      display: flex;
      overflow: hidden;
    }
  }

  .item {
    display: inline-block;
    overflow: hidden;
    padding: 3px 10px;
    color: var(--font-color);
    text-align: center;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 15px;
    cursor: pointer;

    user-select: none;

    &:hover {
      color: #b82712;
    }

    &.active {
      border-radius: 20px;
      background-color: #fdf6f5;
      color: #b82712;
    }
  }
}

@media screen and (max-width: 960px) {
  .allTypeSelect {
    width: 70% !important;
  }
}
</style>