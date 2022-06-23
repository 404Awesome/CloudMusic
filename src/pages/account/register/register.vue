<template>
  <div flex overflow-hidden h-full>
    <!-- 注册表单 -->
    <section flex-1 class="form"></section>
    <!-- lottie 动画 -->
    <section flex-1>
      <Lottie :animationData="lottieAnima!" />
    </section>
  </div>
</template>

<script setup lang="ts">
import Lottie from "@/components/common/lottie/lottie.vue";
import lottieAnima from "@/assets/lottieFile/register.json";
</script>