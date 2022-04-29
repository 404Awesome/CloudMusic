import { defineStore } from "pinia";
import { useStorage } from "@vueuse/core";

export const useMainStore = defineStore("main", {
  state: () => {
    return {
      status: useStorage("status", false),
      // 暗夜模式
      isDark: useStorage("isDark", false, sessionStorage),
      // 主题色
      theme: useStorage("theme", '#ff3f34'),
    };
  },
  actions: {},
  getters: {},
});
