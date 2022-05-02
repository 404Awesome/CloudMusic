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