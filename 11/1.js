/* eslint-disable no-multi-spaces */
const input = require('../lib/utils.js').lines(__dirname).map(l => l.split(''))
const isStable = (a, b) => toString(a) === toString(b)
const toString = input => input.map(r => r.join('')).join('')
const is = key => el => el === key
// const print = input => console.log(input.map(row => row.join('')).join('\n') + '\n')

const directions = [
  (x, y) => [x, y - 1],     // top
  (x, y) => [x + 1, y - 1], // top-right
  (x, y) => [x + 1, y],     // right
  (x, y) => [x + 1, y + 1], // bottom-right
  (x, y) => [x, y + 1],     // bottom
  (x, y) => [x - 1, y + 1], // bottom-left
  (x, y) => [x - 1, y],     // left
  (x, y) => [x - 1, y - 1]  // top-left
]

function move (direction, input, x, y) {
  const [newX, newY] = direction(x, y)

  if (newX < 0 || newX > input[0].length - 1 || newY < 0 || newY > input.length - 1) {
    return ''
  } else {
    return input[newY][newX]
  }
}

function step (input) {
  return input.map((row, y) => {
    return row.map((spot, x) => {
      const adjacents = directions.map(func => move(func, input, x, y))
      const occupied = adjacents.filter(is('#')).length

      if (spot === 'L' && occupied === 0) {
        return '#'
      } else if (spot === '#' && occupied >= 4) {
        return 'L'
      } else {
        return spot
      }
    })
  })
}

function run (initial) {
  let previous = [...initial]
  let current = step(previous)

  while (!isStable(previous, current)) {
    previous = current
    current = step(previous)
  }

  return current.join('').split('').filter(is('#')).length
}

console.log(run(input))
