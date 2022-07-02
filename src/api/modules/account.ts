import { POST, GET } from "../request";
import md5 from "md5";

export default {
  // 获取账户详情
  getUserAccount() {
    return POST("/user/account");
  },
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
  // 登录状态
  loginStatus() {
    return GET("/login/status");
  },
  // 退出登录
  loginLogout() {
    return GET("/logout");
  },
  // 登陆密码 
  loginPassword(phone: number, password: string) {
    return POST("/login/cellphone", { phone, md5_password: md5(password) });
  },
  // 邮箱登录
  loginEmail(email: string, password: string) {
    return POST("/login", { email, md5_password: md5(password) });
  },
  // 验证码登录
  loginCaptcha(phone: number, captcha: number) {
    return POST("/login/cellphone", { phone, captcha });
  },
  // 二维码 key 生成接口
  loginQrKey() {
    return POST("/login/qr/key");
  },
  // 二维码生成接口
  loginQrCreate(key: string) {
    return POST("/login/qr/create", { key });
  },
  // 二维码检测扫码状态接口
  loginQrCheck(key: string) {
    return GET("/login/qr/check", { key });
  },
  // 获取用户等级信息
  getUserLevel() {
    return GET("/user/level");
  },
  // 获取用户动态
  getUserEvent(uid: number) {
    return GET("/user/event", { uid });
  },
  // 获取用户关注列表
  getUserFollows(uid: number) {
    return GET("/user/follows", { uid });
  },
  // 获取用户粉丝列表
  getUserFolloweds(uid: number) {
    return GET("/user/followeds", { uid });
  },
  // 获取用户信息 , 歌单，收藏，mv, dj 数量
  getUserSubcount() {
    return GET("/user/subcount");
  },
  // 获取用户歌单
  getUserPlaylist(uid: number, offset: number = 0, limit: number = 30) {
    return GET("/user/playlist", { uid, offset, limit });
  },
}