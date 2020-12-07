const lines = require('../lib/lines.js')()
const repeat = (count, word) => new Array(parseInt(count, 10)).fill(word)

// dark violet bags contain no other bags.
// vibrant chartreuse bags contain 1 dark red bag, 4 clear crimson bags, 1 faded red bag, 1 dull crimson bag.
const bagCounts = lines.reduce((counts, line) => {
  const [type, contentString] = line.split(' bags contain ')

  if (contentString === 'no other bags.') {
    counts[type] = []
  } else {
    counts[type] = contentString.replace('.').split(', ').flatMap(contains => {
      const [count, adj, color] = contains.split(' ')
      return repeat(count, adj + ' ' + color)
    })
  }

  return counts
}, {})

function assemble (types, bags = []) {
  const needed = types.flatMap(type => bagCounts[type])
  bags.push(...needed)

  if (needed.length) {
    return assemble(needed, bags)
  } else {
    return bags.length
  }
}

console.log(assemble(['shiny gold']))
