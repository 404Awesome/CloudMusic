<!-- 导航栏 -->
<template>
  <nav class="navLine">
    <h4 @click="$router.push(props.path)">{{ props.title }}</h4>
    <span class="i-heroicons-outline:chevron-right"></span>
  </nav>
</template>

<script setup lang="ts">
let props = defineProps({
  path: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  }
})
</script>

<style lang="scss" scoped>
.navLine {
  width: 100%;
  display: flex;
  align-items: center;
  color: var(--font-color);

  h4 {
    margin: 0;
    margin-right: 5px;
    font-weight: 400;
    font-size: 17px;
    cursor: pointer;

    &:hover {
      color: var(--theme-bg-color);

      &+span {
        color: var(--theme-bg-color);
        transform: translateX(5px);
      }
    }
  }

  span {
    font-size: 20px;
    transition: transform 0.2s ease-in-out;
  }
}
</style>