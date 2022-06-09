import { Discover } from "@/api/modules/discover";
import { handleSongList, handleSongInfo } from "./handle";
import { useDebounceFn } from "@vueuse/core";
import { useMainStore } from "store/index";
const store = useMainStore();

// 将歌单列表前20首歌添加到播放列表
export const playSongList = useDebounceFn(async (id: number) => {
  if (store.songListID == id) {
    ElMessage({
      message: '请不要重复播放相同歌单!',
      type: 'warning',
    })
    return null;
  };
  let { code, songs }: any = await Discover.getPlayListTrackAll(id, 20, 0);
  if (code == 200) {
    let songList = handleSongList(songs);
    store.addPlayList(songList);
    store.songListID = id;
  }
}, 500);

// 将歌曲列表添加到播放列表
export const addPlayList = (songs: any) => {
  let songList = handleSongList(songs);
  store.addPlayList(songList);
}

// 播放歌曲
export const playSong = (song: any) => {
  let songInfo = handleSongInfo(song);
  store.playSong(songInfo);
};

// 下载歌曲
export const downloadSong = useDebounceFn((id: number) => {
  console.log(id);
}, 500);

// 喜欢歌曲 / 取消 
export const likeSong = useDebounceFn((id: number) => {
  console.log(id);
}, 500);

// 收藏专辑
export const collectAlbum = useDebounceFn((id: number) => {
  console.log(id);
}, 500);

// 收藏歌单
export const collectSongList = useDebounceFn((id: number) => {
  console.log(id);
}, 500);

// 分享信息
export const shareInfo = (title: string, href: string, type: string, cover: string) => {
  console.log(title);
  console.log(href);
  console.log(type);
  console.log(cover);
}