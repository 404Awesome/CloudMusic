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

// 处理时间
export const handerTime = (time: number) => {
  time = time / 1000 / 60;
  let arr = `${time.toFixed(2)}`.split(".");
  return `${arr[0].padStart(2, "0")}:${arr[1]}`;
};