import { defineStore } from "pinia";
import { useStorage, StorageSerializers } from "@vueuse/core";

// 歌曲信息
interface SongInfo {
  artist: {
    id: number,
    name: string,
    tns: string[],
    alias: string[]
  }[],
  album: {
    id: number,
    name: string,
    picUrl: string,
    tns: string[],
    pic: number
  },
  song: {
    id: number,
    name: string,
    tns: string[]
  }
}
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
      playList: useStorage<SongInfo[]>("playList", [], sessionStorage),
      // 当前播放歌曲
      currentSong: useStorage<SongInfo | null>("currentSong", null, sessionStorage, { serializer: StorageSerializers.object })
    };
  },
  actions: {
    // 检查歌单中是否已经存在该歌曲
    IsExists(id: number) {
      return !(this.playList.findIndex(item => item.song.id == id) === -1);
    },
    // 播放音乐并添加到播放列表
    playSong(songInfo: SongInfo) {
      let id = songInfo.song.id;
      if (this.currentSong?.song.id !== id) {
        this.currentSong = songInfo;
        if (!this.IsExists(id)) this.playList.push(songInfo);
      }
    },
    // 获取当前播放歌曲在播放列表中的位置
    getCurrentSongIndex() {
      return this.playList.findIndex(item => item.song.id == this.currentSong?.song.id);
    }
  },
});
