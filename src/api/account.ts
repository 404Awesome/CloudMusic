// 账户
import { CloudMusicAPI } from "./request";

// 获取用户详情 -> 登陆
export const getUserDetails = (uid: number) => {
  return CloudMusicAPI({
    url: "/user/detail",
    method: "GET",
    params: {
      uid
    }
  })
}