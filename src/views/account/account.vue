<!-- 登陆 / 注册 -->
<template>
  <router-view v-slot="{ Component }">
    <component :is="Component" />
  </router-view>
</template>
