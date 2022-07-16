# dz-http
请求封装

基于 axios 封装的网络请求库

### Feature

- 响应拦截处理，成功时返回 res.data.data
- 错误响应时间， traceId 弹框提示 (默认为 toast形式)

### Install

```
  npm install -S dz-http 
```

### Request(axiosConfig, config)

参数：

- axiosConfig (Object): 和axios config 一致(必须)
- config (Object): conifg(可选)

返回:
axios instance

### axiosConfig

运行时自定义参数:

- toast (Boolean) 是否静默显示成功弹框, 默认为false(可选)

### config

参数:

- duration (Number): 弹框显示时间, 单位毫秒， 默认为2000 可选
- Message (Object): 例如 element-ui 的Message对象，当为pc端时，并且想使用message.error 作为弹框传入 可选
- quiet (Boolean): 是否静默不显示错误弹框，默认为false 可选


### Usage

```javascript
import Request from 'Dz-http'

const baseURL = 'https://xxx.com';
const axiosConfig = {
  baseURL,
  headers: {},
  // ...more
}

// 可选
const config = {}

const instance = Request(axiosConfig, config);

// 拦截器
instance.interceptors.request.use(() => {
  // do something
})

instance.interceptors.response.use(() => {
  // do something
})

instance({
  url: '/api/getUserInfo',
  method: 'get',
  params: {b: 1},
  toast: true, // 运行时toast参数
}).then(res => {
  // do something
})

```
