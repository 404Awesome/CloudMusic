import Request from "@/api";

// 账户相关api
export const Account = {
  // 获取用户详情
  getUserDetails(uid: number) {
    return Request({
      url: "/user/detail",
      method: "GET",
      params: { uid }
    })
  }
}