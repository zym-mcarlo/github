import Table from '@/components/base/Table'
import testData from './test.data'

let sortByAsc = Table.asc
let sortByNumber = Table.number

describe('===========【sort by asc】===========', () => {
  testData.forEach(data => {
    test(`arg[0]=${data[0]} arg[1]=${data[1]} return=${data[2]}`, () => {
      expect(sortByAsc(data[0], data[1])).toBe(data[2])
    })
  })
})

describe('===========【sort by number】===========', () => {
  testData.forEach(data => {
    test(`arg[0]=${data[0]} arg[1]=${data[1]} return=${data[3]}`, () => {
      expect(sortByNumber(data[0], data[1])).toBe(data[3])
    })
  })
})
