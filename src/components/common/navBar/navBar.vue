<!-- 导航栏 -->
<template>
  <nav class="navLine">
    <h4 class="title" @click="$router.push(path)">{{ title }}</h4>
    <span class="icon i-heroicons-outline:chevron-right"></span>
  </nav>
</template>

<script setup lang="ts">
const props = defineProps({
  path: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  }
});
const { path, title } = toRaw(props);
</script>

<style lang="scss" scoped>
.navLine {
  display: flex;
  align-items: center;
  width: 100%;

  .title {
    margin: 0;
    margin-right: 5px;
    white-space: nowrap;
    font-weight: 400;
    font-size: 17px;
    cursor: pointer;

    &:hover {
      color: var(--theme-bg-color);

      &+.icon {
        color: var(--theme-bg-color);
        transform: translateX(5px);
      }
    }
  }

  .icon {
    font-size: 20px;
    transition: transform 0.2s ease-in-out;
  }
}
</style>