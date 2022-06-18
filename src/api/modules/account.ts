import { POST } from "../request";

export default {
  // 获取用户详情
  getUserDetail(uid: number) {
    return POST("/user/detail", { uid });
  }
}