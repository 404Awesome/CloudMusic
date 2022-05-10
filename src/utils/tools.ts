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