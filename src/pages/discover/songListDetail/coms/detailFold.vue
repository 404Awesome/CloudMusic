<!-- 详情折叠 -->
<template>
  <div :class="{ visible: store.scrollTop >= height, disabled: disabled }" class="detailFold">
    <div class="content">
      <!-- 标题 -->
      <h1 text-19px truncate>{{ name }}</h1>
      <!-- 操作 -->
      <ul flex gap-10px>
        <li @click="Operate.playSongList(id)">
          <span class="icon" i-eva:arrow-right-fill></span>
        </li>
        <li @click="Operate.collectSongList(id)">
          <span class="icon" i-carbon:folder-add></span>
        </li>
        <li @click="share()">
          <span class="icon" i-carbon:link></span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { toRefs, computed } from "vue";
import { useMainStore } from "store";
import { Operate } from "utils";
const store = useMainStore();
const props = defineProps({
  name: {
    type: String,
    required: true
  },
  id: {
    type: Number,
    required: true
  },
  height: {
    type: Number,
    required: true
  },
  disabled: {
    type: Boolean,
    required: true
  },
  share: {
    type: Function,
    required: true
  }
});
let { name, id, share, disabled } = toRefs(props);

let left = computed(() => {
  return store.sidebarFolding ? '70px' : '230px';
})
</script>

<style lang="scss" scoped>
.detailFold {
  top: var(--topNavBarHeight);
  left: v-bind(left);
  @apply fixed right-0 z-10 h-80px opacity-0 translate-y--80px;

  .content {
    border-bottom: 3px solid var(--theme-color);
    border-radius: 0px 0px 3px 3px;
    @apply flex flex-col flex-nowrap justify-between mx-auto bg-white;
    @apply w-full h-full py-10px px-10px lg-py-10px lg-w-8/10;

    li {
      @apply flex items-center justify-center w-23px h-23px cursor-pinter;

      &:first-child {
        border-radius: 50%;
        background: linear-gradient(to right, #fa5042, #d43b32);

        .icon {
          color: #fff !important;
        }
      }

      .icon {
        @apply text-#7f8c8d text-20px cursor-pinter hover-themeColor;
      }
    }
  }

  &.visible {
    opacity: 1;
    transition: all .3s ease-in-out;
    transform: translateY(0px);
  }

  &.disabled {
    display: none !important;
  }
}
</style>