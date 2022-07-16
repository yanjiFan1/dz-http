import axios from 'axios';
import Toast from './toast/toast.js'

export default class dzHttp {
  constructor(options, config = {}) {
    const { duration = 2000, Message, quiet } = config
    const instance = axios.create({
      timeout: options.timeout || 20 * 1000,
      ...options
    });

    const errorConfig = {
      400: '错误请求',
      401: '未授权，请重新登录',
      403: '拒绝访问',
      404: '请求错误，未找到资源',
      406: '未授权，请重新登录',
      408: '请求超时',
      410: '参数错误',
      500: '服务器出错',
      502: '网络错误',
      503: '服务不可用',
      504: '网络超时',
      505: 'HTTP版本不受支持'
    }

    const errorHandle = (error, errorStatus) => errorConfig[errorStatus] || `连接错误${error.response.status}`;

    const handleMessage = (msg, traceId = '', type = 'error') => {
      const MsgModal = Message || Toast
      MsgModal({
        dangerouslyUseHTMLString: true,
        message: `${msg}<br>${traceId}`,
        type,
        duration
      })
    }

    const responseJson = (data, config) => {
      const { code, data: res, msg, traceId } = data;
      const { toast } = config;
      if (code && code !==200) {
        !quiet && handleMessage(msg, traceId);
        return Promise.reject(data);
      }

      if (toast) handleMessage(msg, '', 'success');
      return res;
    }

    const responseBlob = async (data) => {
      if(data.type === 'application/json') {
        const parseData = JSON.parse(await data.text());
        const { msg, traceId, code } = parseData;
        if (code && code !== 200) {
          !quiet && handleMessage(msg, traceId);
          return Promise.reject(parseData);
        }
      }
      return data;
    }

    // 拦截器
    const interceptors = {
      request: {
        config: (config) => config,
        error: (error) => (Promise.reject(error))
      },
      response: {
        response: (response) => {
          const { data, config } = response;
          if (data instanceof Blob) {
            return responseBlob(data, config)
          }
          return responseJson(data, config)
        },
        error: (error) => {
          if (error.message) error.msg = error.message
          if (error.response && error.response.status) {
            error.msg = errorHandle(error, error.response.status);
          }
          if (error.message.includes('timeout')) error.msg = '网络请求超时!';
          !quiet && handleMessage(error.msg);
          return Promise.reject(error);
        }
      }
    }

    // request interceptor
    instance.interceptors.request.use(
      interceptors.request.config,
      interceptors.request.error
    )

    // response interceptor
    instance.interceptors.response.use(
      interceptors.response.response,
      interceptors.response.error
    )

    return instance;
  }
}