import axios, { AxiosRequestConfig } from "axios";
import { ElNotification } from "element-plus";
import { useRouter } from "vue-router";
import { useMainStore } from "store";

// 请求实例
let Request = (config: AxiosRequestConfig) => {
  // 实例
  const instance = axios.create({
    baseURL: "https://awesome404.vercel.app/",
    timeout: 5000,
    withCredentials: true,
  });

  // 请求拦截器
  instance.interceptors.request.use((resConfig) => resConfig);

  // 响应拦截器
  instance.interceptors.response.use((reqData) => reqData.data, error => {
    // token失效
    if (error.response.status === 401) {
      // 清除权限
      const store = useMainStore();
      store.auth = '';
      // 提示用户重新登录
      ElNotification({
        title: '警告',
        message: '登陆失效, 请重新登录!',
        type: 'warning',
      });
      // 跳转登陆页
      const router = useRouter();
      router.push("/account/login")
    }
    return Promise.reject(error);
  });

  // 返回实例
  return instance(config);
};

// GET请求
export const GET = (url: string, params?: object) => {
  return Request({
    url,
    method: "GET",
    params: { ...params, timestamp: Date.now() },
  })
};

// POST请求
export const POST = (url: string, data?: object) => {
  return Request({
    url,
    method: "POST",
    data: { ...data, timestamp: Date.now() },
  });
};