import axios from './axios.min.js';
import { BASE_URL, TIMEOUT } from '../base.config.js'
import { handleRequestHeader, handleAuth, handleNetworkError, handleAuthError, handleGeneralError, handleErrMsg } from './handlers.js'

// Full config:  https://github.com/axios/axios#request-config
let config = {
  baseURL: BASE_URL,
  timeout: TIMEOUT
  // withCredentials: true, // Check cross-site Access-Control
};

const _axios = axios.create(config);

// 请求拦截器
_axios.interceptors.request.use(
  (config) => {
    config = handleRequestHeader(config)
    config = handleAuth(config)
    // console.log(config)
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截器
_axios.interceptors.response.use(
  (response) => {
    // console.log(response)
    if (response.status !== 200) return Promise.reject(response)
    if (typeof response.data === 'string') {
      handleErrMsg(response.data)
      return Promise.reject(response)
    }

    handleAuthError(response.data?.state)
    handleGeneralError(response.data?.state, response.data?.msg)

    return response.data;
  },
  (error) => {
    // console.log(error)
    handleNetworkError(error?.status)
    return Promise.reject(error);
  }
);

export default _axios;