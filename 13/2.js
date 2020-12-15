const lines = require('../lib/utils.js').lines(__dirname)
const buses = lines[1].split(',').map(n => n === 'x' ? n : parseInt(n, 10))

// Convert our input to an array of [bus Id, array offset]
const toSolve = buses
  .map((bus, idx) => bus === 'x' ? bus : [bus, idx])
  .filter(bus => bus !== 'x')

// Start with first bus, incrementing `t` by its amount, each tick
const solved = [toSolve.shift()[0]]
let t = 0, step = solved[0]

while (toSolve.length) {
  const [next, nextOffset] = toSolve[0]

  t += step

  if ((t + nextOffset) % next === 0) {
    toSolve.shift()
    solved.push(next)

    // All mulitples of this bus ID and our current step will match for all
    // the buses in the `solved` array now
    step = step * next
  }
}

console.log(t)
