import '../http/index.js'

new Vue({
  el: '#app',
  data: {
    result: null,
    err: null
  },
  methods: {
    fetch() {
      this.result = window.$http({ api: 'monitorMain' })
    },
  }
})