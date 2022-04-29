<template>
  <router-view v-slot="{ Component }">
    <keep-alive :include="['recommend']">
      <component :is="Component" />
    </keep-alive>
  </router-view>
</template>
