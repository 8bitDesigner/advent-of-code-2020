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
  const id = row * 8 + col

  return { row, col, id }
}

const seatingChart = lines.map(line => [
  line.substring(0, 7).split(''),
  line.substring(7, 10).split('')
]).map(line => toSeat(line)).reduce((hash, { row, col, id }) => {
  if (!hash[row]) { hash[row] = [] }
  hash[row].push({ col, id })
  return hash
}, {})

const myRow = Object.entries(seatingChart).filter(([rowId, seats], idx, array) => {
  return idx !== 0 && idx !== (array.length - 1) && seats.length !== 8
})[0]

const mySeat = [0, 1, 2, 3, 4, 5, 6, 7].filter(n => {
  return !myRow[1].map(c => c.col).includes(n)
})[0]

console.log(myRow[0] * 8 + mySeat)
