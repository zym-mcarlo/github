import Vue from 'vue'
import App from './app.vue'
import '@/assets/style/index.styl'
import UI from './mcarlo-ui'

Vue.use(UI)

/* eslint-disable-next-line */
new Vue({
  el: '#app',
  render: h => h(App)
})
