// 发现音乐
import { CloudMusicAPI } from "./request";

// 获取 banner
export const getBanner = (type: 0 | 1 | 2 | 3 = 0) => {
  return CloudMusicAPI({
    url: "/banner",
    method: "GET",
    params: {
      type
    }
  })
}

// 个性推荐 -- 独家放送
export const getBroadcast = () => {
  return CloudMusicAPI({
    url: "/personalized/privatecontent",
    method: "GET",
  })
}

// 独家放送列表
export const getBroadcastList = (offset: number = 0) => {
  return CloudMusicAPI({
    url: "/personalized/privatecontent/list",
    method: "GET",
    params: {
      limit: 60,
      offset
    }
  })
}
