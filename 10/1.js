const adaptors = require('../lib/utils.js').lines(__dirname).map(n => parseInt(n, 10))
const asc = (a, b) => a < b ? -1 : a > b ? 1 : 0
const is = n => el => el === n

adaptors.unshift(0)
adaptors.push(Math.max(...adaptors) + 3)

const gaps = adaptors.sort(asc).reduce((count, el, idx, array) => (
  count === 0 ? count : count.concat([el - array[idx - 1]])
), [])

console.log(gaps.filter(is(1)).length)
console.log(gaps.filter(is(3)).length)

console.log(
  gaps.filter(is(1)).length *
  gaps.filter(is(3)).length
)
