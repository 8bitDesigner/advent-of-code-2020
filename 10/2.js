const input = require('../lib/utils.js').lines(__dirname).map(n => parseInt(n, 10))
const asc = (a, b) => a < b ? -1 : a > b ? 1 : 0
const adaptors = [0, ...input.sort(asc), (Math.max(...input) + 3)]

// Blatantly stolen from @timzero
function countLeaves (root, nums, cache) {
  if (nums.indexOf(root) === -1) {
    console.log('root not in set', root)
    return 0
  } else if (root === Math.max(...nums)) {
    console.log('found root', root)
    return 1
  }

  if (cache.has(root)) {
    console.log('cached lookup for', root)
    return cache.get(root)
  } else {
    console.log('counting ', root + 1, root + 2, root + 3)
    const size = (
      countLeaves(root + 1, nums, cache) +
      countLeaves(root + 2, nums, cache) +
      countLeaves(root + 3, nums, cache)
    )

    console.log('counting permutations from', root, size)
    cache.set(root, size)

    return size
  }
}

console.log(countLeaves(100, adaptors, new Map()))
