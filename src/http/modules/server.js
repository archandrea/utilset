import _axios from "./axios.config.js";
import API from '../api.config.js'

export const get = (url, { params }, clearFn) => {
  return new Promise((resolve) => {
    _axios
      .get(url, { params })
      .then((result) => {
        let res
        if (clearFn !== undefined) {
          res = clearFn(result.data)
        } else {
          res = result.data
        }
        resolve([null, res])
      })
      .catch((err) => {
        resolve([err, undefined])
      })
  })
}

export const post = (url, data, params) => {
  return new Promise((resolve) => {
    _axios
      .post(url, data, { params })
      .then((result) => {
        resolve([null, result.data])
      })
      .catch((err) => {
        resolve([err, undefined])
      })
  })
}