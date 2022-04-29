<template>
  <div flex justify-center h-full id="error">
    <Lottie w="1/2" :animationData="lottieAnima" />
  </div>
</template>

<script setup lang="ts">
import Lottie from "@/components/lottie/lottie.vue";
import lottieAnima from "@/assets/lottie/error.json";
</script>
