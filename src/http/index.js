import http from './modules/http.js'

if (window && typeof window === 'object') {
  Object.defineProperties(window, {
    $api: {
      get() {
        return http;
      }
    },
  })
}

export default http