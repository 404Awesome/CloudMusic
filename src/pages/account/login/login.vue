<template>
  <div flex overflow-hidden h-full>
    <!-- 登陆表单 -->
    <section flex-1 class="form"></section>
    <!-- lottie 动画 -->
    <section flex-1>
      <Lottie :animationData="lottieAnima!" />
    </section>
  </div>
</template>

<script setup lang="ts">
import Lottie from "@/components/common/lottie/lottie.vue";
import lottieAnima from "@/assets/lottieFile/login.json";
</script>