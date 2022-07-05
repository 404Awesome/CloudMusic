import { SongInfo } from "store";


export interface Lyric {
  lyric: string,
  time: number
}
export default {
  // 处理次数 如播放次数等
  Count(count: number): string {
    let num = (count / 10000).toFixed(0);
    if (num.length < 2) {
      return count.toString();
    } else if (num.length > 4) {
      return `${parseInt(num) / 10000}亿`;
    } else {
      return `${num}万`;
    }
  },
  // 处理时长 
  Duration(timeStamp: number): string {
    timeStamp = timeStamp / 1000 / 60;
    let timeArr = `${timeStamp.toFixed(2)}`.split(".");
    return `${timeArr[0].padStart(2, "0")}:${timeArr[1]}`;
  },
  // 处理价格
  Price(price: number) {
    return `￥${(price / 100).toFixed(1)}`;
  },
  // 处理时间戳
  TimeStamp(timeStamp: number) {
    let timeArr = new Date(timeStamp).toLocaleDateString('cn').split("/");
    timeArr[1] = timeArr[1].padStart(2, "0");
    timeArr[2] = timeArr[2].padStart(2, "0");
    return timeArr.join("-");
  },
  // 处理歌曲信息
  SongInfo(songInfo: any): SongInfo {
    if (songInfo?.ar?.length) {
      let { ar, al, id, name, tns = [] } = songInfo;
      return { artists: ar, album: al, song: { id, name, tns } };
    } else {
      let { artists, album, id, name, tns = [] } = songInfo;
      return { artists, album, song: { id, name, tns } };
    }
  },
  // 处理歌单列表中歌曲信息
  SongList(songList: any): SongInfo[] {
    return songList.map((item: any) => this.SongInfo(item));
  },
  // 处理歌词
  Lyric(lyricInfo: string): Lyric[] {
    // 分割成歌词列表
    let lyricList = lyricInfo.split(/\n/g);
    return <Lyric[]>lyricList.map((item: string) => {
      // 歌词
      let lyric = item.match(/(?<=]).+$/g);
      if (lyric) {
        // 取时间
        let timeList = item.match(/(?<=\[)(.+)(?=\])/g)![0].split(":");
        // 处理时间
        let time = ((parseInt(timeList[0]) * 60) + parseFloat(timeList[1]));
        return { lyric: lyric[0].trim(), time }
      }
      return null;
    }).filter((item: any) => item);
  }
}