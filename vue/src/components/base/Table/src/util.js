import Table from './Table.vue'

Table.addSortFunction = function (key, sortFunction) {
  Table[key] = sortFunction
}

Table.addSortFunction('asc', (optionP, optionN) => {
  const lhsArr = optionP.toString()
  const rhsArr = optionN.toString()
  let orderNum = 0
  if (lhsArr !== rhsArr) {
    orderNum = lhsArr < rhsArr ? -1 : 1
  }
  return orderNum
})

Table.addSortFunction('number', (optionP, optionN) => {
  const intOrString = s => {
    const n = parseInt(s, 10)
    /* eslint no-restricted-globals: ["warn", ""] */
    return isNaN(n) ? s : n
  }
  const lhsArr = optionP.toString().split(/(\d+)/).map(intOrString)
  const rhsArr = optionN.toString().split(/(\d+)/).map(intOrString)
  let orderNum = 0
  const arr = lhsArr.length > rhsArr.length ? lhsArr : rhsArr
  for (let i = 0; i < arr.length; i++) {
    if (lhsArr[i] !== rhsArr[i]) {
      const lhsIsUndefined = typeof lhsArr[i] === 'undefined'
      const rhsIsUndefined = typeof rhsArr[i] === 'undefined'
      if (lhsIsUndefined) {
        orderNum = -1
      } else if (rhsIsUndefined) {
        orderNum = 1
      } else {
        orderNum = lhsArr[i] < rhsArr[i] ? -1 : 1
      }
      break
    }
  }
  return orderNum
})
