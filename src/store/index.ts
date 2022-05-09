import { defineStore } from "pinia";
import { useStorage } from "@vueuse/core";

export const useMainStore = defineStore("main", {
  state: () => {
    return {
      // 登陆状态
      auth: useStorage("auth", false),
      // 暗夜模式
      isDark: useStorage<boolean>("isDark", false, sessionStorage),
      // 主题色
      theme: useStorage<string>("theme", '#ff3f34'),
      // 歌单
      playList: useStorage<number[]>("playList", [], sessionStorage),
      // 当前播放歌曲
      currentSong: useStorage<number | null>("currentSong", null, sessionStorage)
    };
  },
  actions: {
    // 播放音乐并添加到播放列表
    playSong(id: number) {
      if (id !== this.currentSong) {
        this.currentSong = id;

        if (!this.playList.includes(id)) {
          this.playList.push(id);
        }
      }
    }
  },
  getters: {},
});
