import { ElMessage, ElNotification } from "element-plus";
import { useDebounceFn } from "@vueuse/core";
import { SongListAPI, SongAPI } from "api";
import { useMainStore } from "store";
import { saveAs } from "file-saver";
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
  downloadSong: useDebounceFn(async (id: number, name: string) => {
    try {
      let { code, data: { url, type } }: any = await SongAPI.getDownloadUrl(id);
      if (code == 200 && url) {
        // 下载歌曲
        saveAs(url, `${name}.${type}`);
      } else {
        ElMessage.warning("该歌曲暂时无法下载!");
      }
    } catch (err: any) {
      ElMessage.error("下载歌曲失败!");
    }
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
  },
  // 未登陆,清除登陆状态
  clearLoginStatus() {
    const store = useMainStore();
    // 清除登陆状态
    store.auth = '';
    // 提示用户重新登录
    ElNotification({
      title: '警告',
      message: '登陆失效, 请重新登录!',
      type: 'warning',
    });
  }
}