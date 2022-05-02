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

// 推荐歌单
export const getPersonalized = (limit: number = 30) => {
  return CloudMusicAPI({
    url: "/personalized",
    method: "GET",
    params: {
      limit
    }
  })
}

// 独家放送列表
export const getBroadcastList = (offset: number = 0, limit: number = 60) => {
  return CloudMusicAPI({
    url: "/personalized/privatecontent/list",
    method: "GET",
    params: {
      limit,
      offset
    }
  })
}

// 推荐新音乐
export const getNewSong = (limit: number = 10) => {
  return CloudMusicAPI({
    url: "/personalized/newsong",
    method: "GET",
    params: {
      limit
    }
  })
}