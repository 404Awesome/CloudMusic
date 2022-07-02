<!-- 用户歌单 -->
<template>
  <div v-if="props.uid">
    <h3 truncate>创建的歌单</h3>

    <ul grid grid-cols-3 gap-10px mt-10px>
      <li v-for="item in songList" :key="item.id" @click="$router.push(`/songListDetail/${item.id}`)" class="group"
        cursor-pointer>
        <!-- 封面 -->
        <div relative>
          <el-image :src="item.coverImgUrl" fit="cover" :draggable="false" rounded-md group-hover:brightness-90 />
          <!-- 播放数 -->
          <p absolute top-2px right-6px z-2 flex items-center text-white>
            <span text-21px i-eva:arrow-right-outline></span>
            <span text-15px>{{ Handle.Count(item.playCount) }}</span>
          </p>

          <!-- hover:播放图标 -->
          <p @click.stop="Operate.playSongList(item.id)" class="playIcon" group-hover:opacity-100>
            <span i-eva:arrow-right-fill></span>
          </p>
        </div>

        <!-- 名字 -->
        <p truncate group-hover:themeColor text-15px pt-5px pb-2px>{{ item.name }}</p>

        <!-- 多少首歌曲 -->
        <p truncate text-gray-400 text-13px>{{ item.trackCount }}首</p>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive } from "vue";
import { ElMessage } from "element-plus";
import { Handle, Operate } from "utils";
import { AccountAPI } from "api";
const props = defineProps({
  uid: {
    type: Number,
    required: true
  }
})

// 用户歌单
let songList = reactive<any>([]);

// 加载用户歌单
onMounted(async () => {
  try {
    let { code, playlist }: any = await AccountAPI.getUserPlaylist(props.uid);
    if (code == 200) {
      let reg = /.*喜欢的音乐$/g;
      playlist = playlist.map((item: any) => {
        let { coverImgUrl, id, name, playCount, trackCount } = item;
        if (reg.test(name)) name = "我喜欢的音乐";
        return { coverImgUrl, id, name, playCount, trackCount };
      });
      songList.push(...playlist)
    };
  } catch (err: any) {
    ElMessage.error("加载用户歌单失败!");
  }
})
</script>

<style lang="scss" scoped>
.playIcon {
  position: absolute;
  z-index: 10;
  bottom: 12px;
  right: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: rgba($color: #fff, $alpha: 0.5);
  color: #d33a31;
  font-size: 30px;
  opacity: 0;
  transition: opacity 0.3s linear;

  &:hover {
    background-color: rgba($color: #fff, $alpha: 0.8);
  }
}
</style>