<template>
  <div :class="['root', scheme, 'aa']">
    123
    <McarloButton>btn</McarloButton>
    <button @click="swichScheme()" class="oo mcarlo-button">切换主题
      <a href="">456</a>
    </button>
    <button class="pp oo" @click="scheme = 'schemeC'">切换主题C</button>

    <div style="margin: 20px;">
      <label for="">
        <span style="vertical-align: top;">Group</span>
        <mcarlo-select :filterable="true" v-model="slct">
          <mcarlo-option v-for="(item, index) in options" :key="index" :value="item.value" :label="item.label"></mcarlo-option>
        </mcarlo-select>
      </label>
    </div>

    <div style="margin: 20px;">
      <mcarlo-table :tableTitle="tableTitle" :tableBody="tableBody" judgeSelectedKey="id" operationable :selectedList="selectedList" loading>
        <template #custom="asdf">
          <div @click="show(asdf.customs)">{{asdf.customs.id}}</div>
          <div>
            <span>123</span>
          </div>
        </template>
        <template #operate>
          <div>1</div>
          <div>2</div>
        </template>
        <template #operate>
          <div>1</div>
          <div>2</div>
        </template>
      </mcarlo-table>
    </div>

  </div>
</template>

<script>
export default {
  data () {
    return {
      selectedList: [],
      scheme: 'schemeC',
      options: [
        { label: 'm1', value: 1 },
        { label: 'm2', value: 2 },
        { label: 'm3', value: 3 }
      ],
      slct: '',
      tableTitle: [
        { name: '名称', key: 'name', sortable: true },
        { name: '年龄', key: 'age', sortable: true },
        { name: '性别', key: 'sex', sortable: true, sortFunction () { return -1 } },
        { name: '体重', key: 'weight', justify: 'center' },
        { name: '朋友', key: 'friend', justify: 'flex-end' },
        { name: '自定义列', key: 'customs', slot: 'custom' },
        { name: '爱好', key: 'hobby' }
      ],
      tableBody: [
        {
          id: '1',
          name: {
            data: 'zhengyimeng',
            click: () => {
              console.log(1)
            },
            tip: '这是我的名字'
          },
          age: 25,
          sex: 'man',
          weight: '65kg',
          friend: ['xixi', 'huahua', 'meimei'],
          hobby: [
            { data: '吃饭', tip: '我爱吃饭' },
            { data: '睡觉' },
            { data: '打豆豆' },
          ]
        },
        { id: '2', name: 'zhangpengtao', age: 27, sex: 'girl', weight: '60kg' },
        { id: '3', name: 'chenzhiji', age: 25, sex: 'man', weight: '55kg' },
        { id: '3', name: 'chenzhiji', age: 25, sex: 'man', weight: '55kg' },
        { id: '3', name: 'chenzhiji', age: 25, sex: 'man', weight: '55kg' },
        { id: '3', name: 'chenzhiji', age: 25, sex: 'man', weight: '55kg' },
        { id: '3', name: 'chenzhiji', age: 25, sex: 'man', weight: '55kg' }
      ]
    }
  },
  methods: {
    swichScheme () {
      this.scheme = this.scheme === 'schemeA' ? 'schemeB' : 'schemeA'
    },
    show (item) {
      console.log('****************')
      console.log(item)
    }
  }
}
</script>

<style lang="stylus" scoped>
  @import '~@/assets/style/scheme/index.styl'
  .pp
    border 10px solid primary
</style>
