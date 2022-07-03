<!-- 账户详情 -->
<template>
  <div rounded overflow-hidden h-80>
    <!-- 背景图片 -->
    <div relative>
      <el-image :src="info.backgroundUrl" fit="cover" :draggable="false" h-35 w-full brightness-95 />
      <!-- 编辑个人信息 -->
      <div absolute right-0px bottom-5px @click="goEditInfo">
        <el-tooltip ref="tooltipEl" content="编辑个人信息" placement="top" effect="light" :hide-after="0">
          <span cursor-pointer text-22px text-white i-eva:edit-2-outline></span>
        </el-tooltip>
      </div>
    </div>

    <!-- 头像 -->
    <el-image :src="info.avatarUrl" :draggable="false" w-70px h-70px rounded-full relative z-10 border="5px solid #fff"
      translate-y--35px translate-x-10px />

    <!-- 简介 -->
    <div h-full translate-y--70px bg-gray-200 p-10px pt-40px>
      <div text-15px>
        <p flex items-center gap-5px min-h-20px>
          <span text-18px themeColor>{{ info.nickname }}</span>
          <span bg-orange-400 py-2px px-5px text-white text-13px rounded>{{ info.level }}</span>
          <span v-if="info.gender" :style="{ color: info.gender == 1 ? '#3a9dd0' : '#e3357b' }" text-20px
            i-eva:smiling-face-fill></span>
        </p>
        <p truncate py-5px>个人介绍: {{ info.signature }}</p>
        <p truncate>所在地区: {{ info.city }}</p>
      </div>

      <!-- 计数 -->
      <ul flex gap-10px mt-10px h-12>
        <li @click="goCountPage('/dynamic')" class="count">
          <span text-17px text-blue-500 truncate>{{ count.dynamic }}</span>
          <span text-14px text-gray-500 truncate>动态</span>
        </li>
        <li @click="goCountPage('/follows')" class="count">
          <span text-17px text-teal-500 truncate>{{ count.follows }}</span>
          <span text-14px text-gray-500 truncate>关注</span>
        </li>
        <li @click="goCountPage('/followeds')" class="count">
          <span text-17px text-violet-500 truncate>{{ count.followeds }}</span>
          <span text-14px text-gray-500 truncate>粉丝</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";
import { ElMessage } from "element-plus";
import { useRouter } from "vue-router";
import { AccountAPI } from "api";
import ProvinceCode from "@/assets/areaCode/province.json";
import CityCode from "@/assets/areaCode/city.json";
const router = useRouter();
const emit = defineEmits(['getUid']);

// tooltip元素
let tooltipEl = ref<any>(null);
// 个人信息
let info = reactive<any>({});
// 计数
let count = reactive({
  // 动态
  dynamic: 0,
  // 关注
  follows: 0,
  // 粉丝
  followeds: 0
});

// 跳转编辑个人信息页面
let goEditInfo = () => {
  tooltipEl.value.hide();
  router.push("/editPersonalInfo");
}

// 获取 动态/关注/粉丝 数量
let getCount = async (uid: number) => {
  try {
    // 获取动态
    let dynamic: any = await AccountAPI.getUserEvent(uid);
    if (dynamic.code == 200) count.dynamic = dynamic.size;
    // 获取关注
    let follows: any = await AccountAPI.getUserFollows(uid);
    if (follows.code == 200) count.follows = follows.follow.length;
    // 获取粉丝
    let followeds: any = await AccountAPI.getUserFolloweds(uid);
    if (followeds.code == 200) count.followeds = followeds.size;
  } catch (err: any) {
    ElMessage.error("加载动态/关注/粉丝数失败!");
  }
}

// 跳转 动态/关注/粉丝 页面
let goCountPage = (path: string) => {
  if (info.uid) {
    router.push(`${path}/${info.uid}`);
  }
}

// 加载个人信息
onMounted(async () => {
  try {
    // 获取个人信息
    let { code, profile }: any = await AccountAPI.getUserAccount();

    // 获取个人等级
    let { data: { level } } = await AccountAPI.getUserLevel();
    if (code == 200) {
      // 发送uid
      emit("getUid", profile.userId)
      // 获取数量
      getCount(profile.userId);
      let { userId: uid, avatarUrl, backgroundUrl, city, nickname, signature, province, gender } = profile;
      // 处理城市
      let provinceName = ProvinceCode.filter((item: any) => item.code == `${province}`.slice(0, 2))[0].name;
      let cityName = CityCode.filter((item: any) => item.code == `${city}`.slice(0, 4))[0].name;
      Object.assign(info, {
        // 用户id
        uid,
        // 等级
        level,
        // 头像
        avatarUrl,
        // 背景图片
        backgroundUrl,
        // 性别
        gender,
        // 昵称
        nickname,
        // 签名
        signature,
        // 城市
        city: `${provinceName} ${cityName}`
      });
    }
  } catch (err: any) {
    ElMessage.error("加载账号信息失败!");
  }
});
</script>

<style lang="scss" scoped>
.count {
  @apply bg-white rounded h-full py-5px px-10px flex flex-col justify-between items-center cursor-pointer;
}
</style>