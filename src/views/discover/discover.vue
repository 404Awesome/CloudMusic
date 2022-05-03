<!-- 发现音乐 -->
<template>
  <router-view v-slot="{ Component }">
    <keep-alive :include="['recommend', 'radioStation']">
      <component :is="Component" />
    </keep-alive>
  </router-view>
</template>
