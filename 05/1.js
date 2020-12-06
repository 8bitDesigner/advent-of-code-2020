const fs = require('fs')
const lines = fs.readFileSync('./input', 'utf8').trim().split('\n')

function bisect (range, takeUpper) {
  let [min, max] = range
  const gap = max - min

  if (gap === 1) {
    return takeUpper ? max : min
  } else if (takeUpper) {
    min = min + Math.ceil(gap / 2)
  } else {
    max = min + Math.floor(gap / 2)
  }

  return [min, max]
}

function toSeat ([rows, cols]) {
  const row = rows.reduce((range, command) => bisect(range, command === 'B'), [0, 127])
  const col = cols.reduce((range, command) => bisect(range, command === 'R'), [0, 7])
  return [row, col]
}

console.log(
  Math.max(
    ...lines
      .map(line => [
        line.substring(0, 7).split(''),
        line.substring(7, 10).split('')
      ])
      .map(line => toSeat(line))
      .map(([row, col]) => (row * 8) + col)
  )
)
