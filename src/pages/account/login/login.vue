<template>
  <div flex overflow-hidden h-full>
    <section flex-1 class="form"></section>

    <Lottie :animationData="lottieAnima!" flex-1 hidden md:block />
  </div>
</template>

<script setup lang="ts">
import Lottie from "@/components/common/lottie/lottie.vue";
import lottieAnima from "@/assets/lottieFile/login.json";
</script>