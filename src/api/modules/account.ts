import { POST, GET } from "../request";

export default {
  // 获取用户详情
  getUserDetail(uid: number) {
    return POST("/user/detail", { uid });
  },
  // 发送验证码
  captchaSent(phone: number) {
    return POST("/captcha/sent", { phone });
  },
  // 注册(修改密码)
  registerCellphone(captcha: number, phone: number, password: string, nickname: string) {
    return GET("/register/cellphone", { captcha, phone, password, nickname });
  },
}