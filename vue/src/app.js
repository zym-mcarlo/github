import Vue from 'vue'
import App from './app.vue'
import '@/assets/style/index.styl'
import UI from './mcarlo-ui'
import Table from './components/base/Table'

Table.addSortFunction('uu', () => -1)

Vue.use(UI)

/* eslint-disable-next-line */
new Vue({
  el: '#app',
  render: h => h(App)
})
