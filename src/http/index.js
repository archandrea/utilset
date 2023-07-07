import { api, http } from './modules/index.js'

if (window && typeof window === 'object') {
  Object.defineProperties(window, {
    $api: {
      get() {
        return api
      }
    },
    $http: {
      get() {
        return http
      }
    }
  })
}

export default http