import axios from 'axios'

const DEFAULT_CONFIG = {
  baseURL: '',
  timeout: 10000
}

export class axios_request {
  constructor(configs) {
    if (!configs || typeof configs !== 'object') {
      throw new Error('初始化的请求参数应该是object')
    }
    const instance = axios.create(Object.assign(DEFAULT_CONFIG, configs));
    // 添加请求拦截器
    instance.interceptors.request.use(function (config) {
      // 在发送请求之前做些什么
      return config;
    }, function (error) {
      // 对请求错误做些什么
      return Promise.reject(error);
    });

    // 添加响应拦截器
    instance.interceptors.response.use(response => {
      const data = response.data
      switch (data.code) { // 根据返回的code值来做不同的处理（和后端约定）
        case 200:
          // 这一步保证数据返回，如果没有return则会走接下来的代码，不是未登录就是报错
          return response
        case 400:
          // 这一步保证数据返回，如果没有return则会走接下来的代码，不是未登录就是报错
          return response
        default:
      }
      // 若不是正确的返回code，且已经登录，就抛出错误
      //   const err = new Error()
      const err = {}
      err.data = data
      err.response = response
      throw err
    }, (err) => { // 这里是返回状态码不为200时候的错误处理
      if (err && err.response) {
        switch (err.response.status) {
          case 406:
            window.location.replace('#/login')
            err.message = '未授权，请登录'
            break
          case 401:
            err.message = `参数格式出错`
            break
          case 402:
            err.message = `请求出错`
            break
          case 403:
            window.location.replace('#/app/exception/403')
            err.message = '拒绝访问'
            break
          case 404:
            err.message = `请求地址出错`
            break
          case 408:
            err.message = '请求超时'
            break
          case 410:
            err.message = '参数错误'
            break
          case 500:
            err.message = '服务器内部错误'
            break
          case 501:
            err.message = '服务未实现'
            break
          case 502:
            err.message = '网关错误'
            break
          case 503:
            err.message = '服务不可用'
            break
          case 504:
            err.message = '网关超时'
            break
          case 505:
            err.message = 'HTTP版本不受支持'
            break
          default:
        }
      }
      return Promise.reject(err)
    })
  }
}