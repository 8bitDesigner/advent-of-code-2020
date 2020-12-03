const fs = require('fs')
const lines = fs.readFileSync('./input', 'utf8').split('\n').filter(l => l)
const countLetter = (letter, str) => str.split('').filter(l => l === letter).length

function toPassword (string) {
  const [count, letter, passwd] = string.split(' ')
  const [min, max] = count.split('-')

  return { min, max, passwd, letter: letter.replace(':', '') }
}

function isValid ({ min, max, passwd, letter }) {
  const count = countLetter(letter, passwd)
  return count >= min && count <= max
}

console.log(lines.map(toPassword).filter(isValid).length)
