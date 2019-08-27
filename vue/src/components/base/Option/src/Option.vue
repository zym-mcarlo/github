<template>
  <li :value="value" v-on="$listeners" style="cursor: pointer;" @click.stop="select()"><slot>{{label}}</slot></li>
</template>

<script>
export default {
  name: 'McarloOption',
  props: {
    value: {
      required: true
    },
    label: {
      required: true
    }
  },
  methods: {
    findParent(point) {
      let vnode = point.$parent
      if (vnode.$options.name === 'McarloSelect') {
        return vnode
      } else {
        if (vnode._uid === 0) return null
        return this.findParent(vnode)
      }
    },
    select() {
      let point = this.findParent(this)
      if (!point) {
        console.warn('Option must be in the select')
        return
      }
      point.$emit('selectOption', this.value, this.label)
    }
  }
}
</script>

<style lang="stylus" scoped>
  li
    user-select none
</style>
