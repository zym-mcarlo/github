import './assets/iconfont/iconfont.css'
import Button from './components/base/Button'
import Select from './components/base/Select'
import Option from './components/base/Option'
import Table from './components/base/Table'

const components = [
  Button,
  Select,
  Option,
  Table
]

document.body.className = 'mcarlo-scheme'

for (let i = 0; i < components.length; i++) {
  components[i].install = function (Vue) {
    Vue.component(this.name, this)
  }
}

export default {
  install(Vue) {
    components.forEach(cpt => {
      cpt.install(Vue)
    })
  }
}
