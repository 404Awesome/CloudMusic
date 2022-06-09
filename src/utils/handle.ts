import { SongInfo } from "store/index";

// 处理次数 如播放次数等
export const handleCount = (count: number): string => {
  let num = (count / 10000).toFixed(0);
  if (num.length < 2) {
    return count.toString();
  } else if (num.length > 4) {
    return `${parseInt(num) / 10000}亿`;
  } else {
    return `${num}万`;
  }
}

// 处理时间 -> 02:23
export const handerTime = (time: number): string => {
  time = time / 1000 / 60;
  let arr = `${time.toFixed(2)}`.split(".");
  return `${arr[0].padStart(2, "0")}:${arr[1]}`;
};

// 处理艺人
export const handleArtists = (artists: any) => {
  let artistsList = artists.map((item: any) => `<span class="name" data-id="${item.id}">${item.name}</span>`);
  return artistsList.length == 1 ? artistsList[0] : artistsList.join("<span> / </span>");
}

// 处理歌曲信息
export const handleSongInfo = (songInfo: any): SongInfo => {
  let { ar, al, id, name, tns = [] } = songInfo;
  let artist = ar;
  let album = al;
  let song = { id, name, tns };
  return { artist, album, song };
}

// 处理歌单列表中歌曲信息
export const handleSongList = (songList: any): SongInfo[] => {
  return songList.map((item: any) => handleSongInfo(item));
}

// 处理索引
export const handleIndex = (index: number): any => {
  return (index + 1).toString().padStart(2, "0");
};

// 处理时间戳
export const handleTimeStamp = (time: number) => {
  let timeArr = new Date(time).toLocaleDateString('cn').split("/");
  timeArr[1] = timeArr[1].padStart(2, "0");
  timeArr[2] = timeArr[2].padStart(2, "0");
  return timeArr.join("-");
}