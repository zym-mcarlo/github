import './assets/iconfont/iconfont.css'
import Button from './components/Button'
import Select from './components/Select'
import Option from './components/Option'
import Table from './components/Table'

document.body.className = 'mcarlo-scheme'

export default {
  install(Vue) {
    function addComponent(cpt) {
      Vue.component(cpt.name, cpt)
    }
    addComponent(Button)
    addComponent(Select)
    addComponent(Option)
    addComponent(Table)
  }
}
