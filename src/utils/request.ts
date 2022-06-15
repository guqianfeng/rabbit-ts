import Message from "@/components/message";
import axios, { AxiosError } from "axios";

/**
 * 解绑手机号
 * http://pcapi-xiaotuxian-front.itheima.net/login/social/unbind?mobile=手机号
 * https://apipc-xiaotuxian-front.itheima.net/login/social/unbind?mobile=手机号
 */

// 备用接口地址: http://pcapi-xiaotuxian-front-devtest.itheima.net/
const instance = axios.create({
  baseURL: "http://pcapi-xiaotuxian-front.itheima.net/",
  timeout: 5000,
});

// 添加请求拦截器
instance.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    return config;
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 添加响应拦截器
instance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error: AxiosError<{message: string, code: string}>) {
    // 对响应错误做点什么
    if (!error.response) {
      Message.error('网络异常')
    } else {
      // console.log(error.response.data)
      const {code, message} = error.response.data
      if (code === '501' && message === "三方登录失败") {
        Message.warning('您未和平台关联账号，请操作！', 3000)
      } else {
        Message.error(message)
      }
    }
    return Promise.reject(error);
  }
);

export default instance;
