const lines = require('../lib/utils').lines(__dirname)

function toPassword (string) {
  const [count, letter, passwd] = string.split(' ')
  const [first, second] = count.split('-')

  return { first, second, passwd, letter: letter.replace(':', '') }
}

function isValid ({ first, second, passwd, letter }) {
  const firstMatch = passwd[first - 1] === letter
  const secondMatch = passwd[second - 1] === letter

  if (firstMatch && secondMatch) {
    return false
  } else if (firstMatch || secondMatch) {
    return true
  } else {
    return false
  }
}

console.log(lines.map(toPassword).filter(isValid).length)
