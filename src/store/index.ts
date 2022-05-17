import { defineStore } from "pinia";
import { useStorage, StorageSerializers } from "@vueuse/core";

// 歌曲信息
export interface SongInfo {
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
      // 是否折叠侧边栏
      isFolding: useStorage<boolean>("isFolding", false, sessionStorage),
      // 播放列表
      playList: useStorage<SongInfo[]>("playList", [], sessionStorage),
      // 当前播放歌曲
      currentSong: useStorage<SongInfo | null>("currentSong", null, sessionStorage, { serializer: StorageSerializers.object })
    };
  },
  actions: {
    IsExists(id: number) {
      // 检查歌单中是否已经存在该歌曲
      return !(this.playList.findIndex(item => item.song.id == id) === -1);
    },
    playSong(songInfo: SongInfo) {
      // 播放音乐并添加到播放列表
      let id = songInfo.song.id;
      if (this.currentSong?.song.id !== id) {
        this.currentSong = songInfo;
        if (!this.IsExists(id)) this.playList.push(songInfo);
      }
    },
    getCurrentSongIndex() {
      // 获取当前播放歌曲在播放列表中的位置
      return this.playList.findIndex(item => item.song.id == this.currentSong?.song.id);
    },
    emptyPlayList() {
      // 清空播放列表
      if (this.playList.length) {
        this.playList.splice(0);
      }
    },
    addPlayList(songList: SongInfo[]) {
      /*
       * 清空歌单
       * 将歌单中20首歌曲添加到播放列表当中
       * 并播放第一首歌
       */
      this.emptyPlayList();
      this.playList.push(...songList);
      this.playSong(songList[0]);
    }
  },
});
