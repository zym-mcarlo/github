<template>
  <div class="mcarlo-select" @mouseleave="hiddenOptions()">
    <div class="view-box" @click="showOptions()">
      <span :style="{
        opacity: focus
          ? filterOptionInput
            ? 0
            : (whenFocusOpacity || 0.3)
          : 1
      }">{{label}}</span>
      <input type="text"
        ref="filterInput"
        class="filter-input"
        v-model="filterOptionInput"
        v-if="filterable"
        :placeholder="label ? '' : placeholder"
        @focus="focus = true"
        @blur="focus = false">
      <i class="iconfont icontriangle-down"></i>
    </div>

    <div class="option-box" v-show="showOptionsFlag">
      <GenerateOption
        ref="generateOption"
        :options="options"
        ></GenerateOption>
    </div>
  </div>
</template>

<script>
import GenerateOption from './GenerateOption'
export default {
  name: 'McarloSelect',
  props: {
    filterable: Boolean,
    value: {
      required: true
    },
    whenFocusOpacity: Number,
    placeholder: {
      type: String,
      default: '请输入信息'
    }
  },
  data() {
    return {
      options: this.$slots.default,
      focus: false,
      filterOptionInput: '',
      showOptionsFlag: false,
      label: ''
    }
  },
  watch: {
    filterOptionInput (newVal) {
      this.$refs.generateOption.updateOption(newVal)
    }
  },
  created() {
    this.$on('selectOption', function (value, label) {
      this.filterOptionInput = ''
      this.$emit('input', value)
      this.label = label
      this.showOptionsFlag = false
    })
  },
  methods: {
    showOptions() {
      this.showOptionsFlag = true
      this.$refs.filterInput && this.$refs.filterInput.focus()
    },
    hiddenOptions() {
      this.showOptionsFlag = false
      this.filterOptionInput = ''
      this.$refs.filterInput && this.$refs.filterInput.blur()
    }
  },
  components: {
    GenerateOption
  }
}
</script>
