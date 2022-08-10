export default {
  // 验证手机号
  phone(phone: string) {
    let reg = new RegExp("^(?:(?:\\+|00)86)?1[3-9]\\d{9}$");
    return reg.test(phone);
  },
  // 验证密码
  password(password: string) {
    let reg = new RegExp("^(?![\\d]+$)(?![a-zA-Z]+$)(?![-=+_.,]+$)[\\da-zA-Z-=+_.,]{8,20}$");
    return reg.test(password);
  },
  // 验证163邮箱
  email163(email: string) {
    let reg = new RegExp("^[A-Za-z]\\w{5,17}@(vip\\.(126|163|188)\\.com|163\\.com|126\\.com|yeach\\.net)");
    return reg.test(email);
  }
}