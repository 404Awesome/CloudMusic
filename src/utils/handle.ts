import { SongInfo } from "store";

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
    let { ar, al, id, name, tns = [] } = songInfo;
    return { artist: ar, album: al, song: { id, name, tns } };
  },
  // 处理歌单列表中歌曲信息
  SongList(songList: any): SongInfo[] {
    return songList.map((item: any) => this.SongInfo(item));
  }
}