export default {
  props: {
    options: [Array]
  },
  data() {
    return {
      filterOptions: []
    }
  },
  mounted() {
    this.filterOptions = this.options
  },
  render(h) {
    return h('ul', this.filterOptions)
  },
  methods: {
    updateOption(filterVal) {
      this.filterOptions = this.options.filter(item => {
        const regx = new RegExp(filterVal, 'ig')
        return item.child.label.match(regx)
      })
    }
  }
}
