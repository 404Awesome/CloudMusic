// 视频 / MV
import { CloudMusicAPI } from "./request";

// MV详情
export const getMVDetails = (mvid: number) => {
  return CloudMusicAPI({
    url: "/mv/detail",
    method: "GET",
    params: {
      mvid
    }
  })
}

// 获取MV地址
export const getMVAddress = (id: number, r: number = 1080) => {
  return CloudMusicAPI({
    url: "/mv/url",
    method: "GET",
    params: {
      id,
      r
    }
  })
}

// 相关视频
export const getRelevantVideo = (id: number) => {
  return CloudMusicAPI({
    url: "/related/allvideo",
    method: "GET",
    params: {
      id,
    }
  })
}
