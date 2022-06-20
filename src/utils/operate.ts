import { useDebounceFn } from "@vueuse/core";
import { ElMessage } from "element-plus";
import { useMainStore } from "store";
import { SongListAPI } from "api";
import { Handle } from "utils";

// 防抖函数延迟时间
const delay = 300;
export default {
  // 将歌单列表前20首歌添加到播放列表
  playSongList: useDebounceFn(async (id: number) => {
    const store = useMainStore();
    if (store.songListID == id) return ElMessage.warning('请不要重复播放相同歌单!');
    let { code, songs }: any = await SongListAPI.getTrackAll(id, 0, 20);
    if (code == 200) {
      let songList = Handle.SongList(songs);
      store.addPlayList(songList);
      store.songListID = id;
    }
  }, delay),
  // 将歌曲列表添加到播放列表
  addPlayList: useDebounceFn((songs: any, id: number) => {
    const store = useMainStore();
    if (store.songListID == id) return ElMessage.warning('请不要重复播放相同歌单!');
    let songList = Handle.SongList(songs);
    store.addPlayList(songList);
    store.songListID = id;
  }, delay),
  // 播放歌曲
  playSong(song: any) {
    const store = useMainStore();
    let songInfo = Handle.SongInfo(song);
    store.playSong(songInfo);
  },
  // 下载歌曲
  downloadSong: useDebounceFn((id: number) => {
    console.log(id);
  }, delay),
  // 喜欢歌曲 / 取消 
  likeSong: useDebounceFn((id: number) => {
    console.log(id);
  }, delay),
  // 收藏专辑
  collectAlbum: useDebounceFn((id: number) => {
    console.log(id);
  }, delay),
  // 收藏歌单
  collectSongList: useDebounceFn((id: number) => {
    console.log(id);
  }, delay),
  // 分享信息
  shareInfo: (title: string, href: string, type: string, cover: string) => {
    console.log(title);
    console.log(href);
    console.log(type);
    console.log(cover);
  }
}