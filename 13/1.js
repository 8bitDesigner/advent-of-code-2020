const lines = require('../lib/utils.js').lines(__dirname)
const arrivalTime = parseInt(lines[0], 10)
const buses = lines[1].split(',').filter(l => l !== 'x').map(n => parseInt(n, 10))
const asc = (a, b) => a < b ? -1 : a > b ? 1 : 0

const fastestBus = buses.map(bus => {
  const departureTime = Math.ceil(arrivalTime / bus) * bus
  const waitTime = departureTime - arrivalTime

  return [waitTime, bus]
}).sort(([a, aId], [b, bId]) => asc(a, b))[0]

console.log(fastestBus[0] * fastestBus[1])
