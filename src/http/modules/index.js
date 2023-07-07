import _axios from "./axios.config.js";
import API from '../api.config.js'
import { handleErrMsg } from './handlers.js'
import { get, post } from './server.js'

export const http = {
  get,
  post
}

export async function api({ api, data }) {
  if (!API[api]) {
    handleErrMsg(`api:${api} 未注册或不存在`)
    return false
  }

  let { url, method, params, rest, required, headers } = API[api]

  if (!params) params = {}
  method = method.toLowerCase()

  if (data && typeof data === 'object') {
    Object.assign(params, data)
  }

  if (rest) {
    let param = url.match(/:(.*)$/)[1]
    url = url.replace(/:(.*)$/, params[param])
  }

  if (required) {
    if (!params || typeof params !== 'object') console.warn(`请传入参数，在请求api: ${api} 时!!!`)
    else {
      if (Array.isArray(required)) {
        required.forEach(v => {
          if (!Object.hasOwnProperty.call(params, v)) {
            console.warn(`${v}  是必传参数，在请求api: ${api} 时!!!`)
          }
        })
      }
      else if (required instanceof Object) {
        for (const key in required) {
          if (!Object.hasOwnProperty.call(params, key)) {
            console.warn(`${key}  是必传参数，在请求api: ${api} 时!!!`)
          }
          else if (required[key] === 'number' ? /[^0-9]/.test(String(params[key])) : typeof params[key] !== 'string') {
            console.warn(`${key}  必须是 ${required[key]} 类型，在请求api: ${api} 时 !!!`)
          }
        }
      }
    }
  }

  let result
  try {
    if (method === 'get') {
      result = await _axios({
        method,
        url,
        params,
        headers
      })
    } else {
      result = await _axios({
        method,
        url,
        data: params,
        headers
      })
    }
  } catch (err) {
    handleErrMsg(err)
  }

  return result
}