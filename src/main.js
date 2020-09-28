// The Vue build version to load with the `import` command
import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false

Vue.filter('format-date', val => {
  return new Date(val).toLocaleString()
})

// eslint-disable-next-line no-new
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
