<template>
  <section class="mcarlo-table">

    <!-- 表格头部 -->
    <ul class="table-title" v-if="!hiddenTitle">
      <li class="table-title-item"
        v-for="(item, index) in tableTitle" :key="index"
        @click="item.sortable && sort(item)"
        :style="{
          'cursor': item.sortable && 'pointer',
          'justify-content': item.justify
        }">
        <span>{{item.name || item.key}}</span>
        <i class="triangle iconfont icontriangle-right"
          v-if="item.sortable"
          :class="sortBy === item.key
            ? sortOrder
              ? 'sortS' : 'sortI'
            : ''"></i>
      </li>
    </ul>

    <!-- 表格内容 -->
    <ul class="table-body" style="position: relative;">
      <slot name="nodata">
        <p v-if="!tableContent.length" style="text-align: center; color: #9e9e9e; font-size: 12px; line-height: 37px; margin: 0;">暂无任何数据</p>
      </slot>
      <slot name="loading">
        <div class="loading" v-if="loading" style="position: absolute; left: 50%; top: 50%; transform: translate3d(-50%, -50%, 0);color: #fff;background: rgba(0,0,0,0.7);">正在加载...</div>
      </slot>

      <li v-for="(info, index) in tableContent" :key="index"
        @click="rowClickCallback ? rowClickCallback(info) : (info.click && info.click())">
        <div class="table-body-item"
          v-for="({key}, i) in tableTitle" :key="i"
          :style="{
            'justify-content': tableTitle[i].justify
          }">

          <slot v-if="tableTitle[i].slot" :name="tableTitle[i].slot" :[key]="info"></slot>

          <span class="item-content"
            v-else-if="info[key] === null || info[key] === undefined">-</span>

          <span class="item-content"
            v-else-if="info[key].constructor === Object"
            @click="info[key] && info[key].click && info[key].click()"
            @mouseover="info[key] && info[key].tip && showTip($event, info[key].tip)"
            @mouseleave="showTipFlag = false">{{ info[key].data }}</span>

          <div
            v-else-if="info[key].constructor === Array">
            <span class="item-content"
              v-for="(item, ind) in info[key]" :key="ind"
              @click="item.click && item.click()"
              @mouseover="item.tip && showTip($event, item.tip)"
              @mouseleave="showTipFlag = false">{{ item.data || item }}</span>
          </div>

          <span class="item-content"
            v-else>{{ info[key] }}</span>
        </div>
      </li>
    </ul>

    <!-- tooltip -->
    <div class="tip-box" ref="tipBox" :style="tipSide" v-if="showTipFlag">{{tipInfo.value || tipInfo}}</div>

  </section>
</template>

<script>
export default {
  name: 'McarloTable',
  props: {
    tableTitle: { // table 头部
      type: Array,
      required: true,
      validator (newVal) {
        if (!newVal.length) {
          console.warn('tableTile的长度不能小于1')
        }
        return newVal.every(item => {
          return item.key
        })
      }
    },
    tableBody: { // table 内容
      type: Array,
      default: () => []
    },
    loading: Boolean,
    hiddenTitle: Boolean,
    rowClickCallback: Function
  },
  data () {
    return {
      tableContent: [],
      sortBy: '',
      sortOrder: true, // true 正序
      operationItem: {},
      showTipFlag: false,
      tipInfo: {},
      tipSide: {
        top: 0,
        left: 0
      }
    }
  },
  watch: {
    tableBody: {
      immediate: true,
      handler (newVal) {
        this.tableContent = newVal.concat([])
      }
    }
  },
  created () {
    this.sort(this.tableTitle[0])
  },
  methods: {
    sort (item) {
      this.sortOrder = this.sortBy === item.key ? !this.sortOrder : true
      this.sortBy = item.key
      this.tableContent.sort((pre, next) => {
        let optionP = pre[this.sortBy] || ''
        let optionN = next[this.sortBy] || ''
        optionP = optionP.data || optionP
        optionN = optionN.data || optionN
        let orderNum = 0
        if (item.sortFunction) {
          orderNum = item.sortFunction(optionP, optionN)
        } else {
          if (item.useSortFunction) {
            orderNum = this.$options[item.useSortFunction] && this.$options[item.useSortFunction](optionP, optionN)
          } else {
            orderNum = this.$options.asc(optionP, optionN)
          }
        }
        if (orderNum !== 0) {
          if (!this.sortOrder) {
            orderNum = orderNum === 1 ? -1 : 1
          }
        }
        return orderNum
      })
    },
    showTip (e, tip) {
      this.showTipFlag = true
      this.tipInfo = tip
      this.$nextTick(() => {
        let tipW = this.$refs.tipBox.offsetWidth / 2
        let tipH = this.$refs.tipBox.offsetHeight
        let btnH = e.currentTarget.offsetHeight
        this.tipSide.top = `${e.clientY - tipH - btnH}px`
        this.tipSide.left = `${e.clientX - tipW}px`
      })
    }
  }
}
</script>
