import { useStorage, StorageSerializers } from "@vueuse/core";
import { defineStore } from "pinia";

// 歌曲信息
export interface SongInfo {
  artists: {
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
      auth: useStorage<string>('auth', '', localStorage),
      // 页面滚动距离
      scrollTop: useStorage<number>('scrollTop', 0, sessionStorage),
      // 播放状态 
      playStatus: useStorage<'audio' | 'video' | 'pause'>("playStatus", 'pause', sessionStorage),
      // 主题色
      themeColor: useStorage<string>('theme', '#d95047', localStorage),
      // 是否折叠侧边栏
      isFolding: useStorage<boolean>('isFolding', false, sessionStorage),
      // 音量大小
      volume: useStorage<number>('volume', 50, localStorage),
      // 播放列表
      playList: useStorage<SongInfo[]>('playList', [], sessionStorage),
      // 当前歌单ID
      songListID: useStorage<number>('songListID', 0, sessionStorage),
      // 当前播放进度
      playProgress: useStorage<number>("playProgress", 0, sessionStorage),
      // 当前播放歌曲
      currentSong: useStorage<SongInfo | null>('currentSong', null, sessionStorage, { serializer: StorageSerializers.object })
    };
  },
  actions: {
    IsExists(id: number) {
      // 检查歌单中是否已经存在该歌曲
      return !(this.playList.findIndex(item => item.song.id == id) === -1);
    },
    playSong(songInfo: SongInfo) {
      let id = songInfo.song.id;
      if (this.currentSong?.song.id !== id) {
        // 限制播放列表只能存30首歌
        if (this.playList.length >= 30) this.playList.shift();
        this.currentSong = songInfo;
        if (!this.IsExists(id)) this.playList.push(songInfo);
      }
    },
    getCurrentSongIndex() {
      // 获取当前播放歌曲在播放列表中的位置
      return this.playList.findIndex(item => item.song.id == this.currentSong?.song.id);
    },
    emptyPlayList() {
      if (this.playList.length) {
        // 清空播放列表
        this.playList.splice(0);
        // 清空当前歌单ID
        this.songListID = 0;
      }
    },
    addPlayList(songList: SongInfo[]) {
      /*
       * 清空歌单
       * 将传进来的歌曲全部传入当前播放列表
       * 并播放第一首歌
       */
      this.emptyPlayList();
      this.playList.push(...songList);
      this.playSong(songList[0]);
    }
  },
});
