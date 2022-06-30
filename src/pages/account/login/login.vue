<!-- 登陆 -->
<template>
  <div flex h-full overflow-hidden>
    <el-scrollbar flex-1 min-w-400px>
      <el-tabs tab-position="left" pt-25px md:pt-150px pb-25px>
        <el-tab-pane v-for="{ label, component } in components" :key="label" :label="label">
          <component :is="component"></component>
        </el-tab-pane>
      </el-tabs>

      <!-- 提示 -->
      <div pl-90px pb-25px>
        <el-alert title="密码登录暂时不要使用,尽量使用短信验证码登录和二维码登录" type="info" :closable="false" w-270px mx-auto />
      </div>
    </el-scrollbar>

    <Lottie :animationData="lottieAnima!" flex-1 hidden md:block />
  </div>
</template>

<script lang="ts">
export default { name: "Login" }
</script>
<script setup lang="ts">
import Lottie from "@/components/common/lottie/lottie.vue";
import lottieAnima from "@/assets/lottieFile/login.json";
import Password from "./coms/password.vue";
import Captcha from "./coms/captcha.vue";
import QrCode from "./coms/qrCode.vue";
import Email from "./coms/email.vue";
import { markRaw } from "vue";

// 子组件列表
let components = [
  {
    label: "密码",
    component: markRaw(Password)
  },
  {
    label: "邮箱",
    component: markRaw(Email)
  },
  {
    label: "验证码",
    component: markRaw(Captcha)
  },
  {
    label: "二维码",
    component: markRaw(QrCode)
  },
]
</script>