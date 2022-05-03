<template>
  <div id="lottie">
    <!-- 登陆表单 -->
    <section class="form"></section>
    <!-- lottie 动画 -->
    <section>
      <Lottie :animationData="lottieAnima" />
    </section>
  </div>
</template>

<script setup lang="ts">
import Lottie from "@/components/lottie/lottie.vue";
import lottieAnima from "@/assets/lottie/login.json";
</script>

<style lang="scss" scoped>
#lottie {
  display: flex;
  overflow: hidden;
  height: 100%;

  section {
    flex: 1;
  }
}
</style>
