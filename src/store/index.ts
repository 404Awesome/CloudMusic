import { defineStore } from "pinia";
import { useStorage } from "@vueuse/core";
import { Discover } from "@/api/modules/discover";

export const useMainStore = defineStore("main", {
  state: () => {
    return {
      // 登陆状态
      auth: useStorage("auth", false),
      // 暗夜模式
      isDark: useStorage("isDark", false, sessionStorage),
      // 主题色
      theme: useStorage("theme", '#ff3f34'),
      // 歌单
      playList: [],
      // 当前播放歌曲
      currentSong: ""
    };
  },
  actions: {
    // 获取音乐
    async getSong(id: number | number[]) {
      let res = await Discover.getSongUrl(id);
      console.log(res);
    }
  },
  getters: {},
});
