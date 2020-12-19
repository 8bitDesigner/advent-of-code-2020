/* eslint-disable no-multi-spaces */
const input = require('../lib/utils.js').lines(__dirname)
const strToPoints = str => str.split(',').map(s => parseInt(s, 10))

let state = new Set()

function print (points) {
  const active = [...state].map(strToPoints)
  const x = active.map(([x, y, z, w]) => x)
  const minX = Math.min(...x)
  const maxX = Math.max(...x)
  const y = active.map(([x, y, z, w]) => y)
  const minY = Math.min(...y)
  const maxY = Math.max(...y)
  const z = active.map(([x, y, z, w]) => z)
  const minZ = Math.min(...z)
  const maxZ = Math.max(...z)
  const w = active.map(([x, y, z, w]) => w)
  const minW = Math.min(...w)
  const maxW = Math.max(...w)

  for (let plane = minZ; plane <= maxZ; plane++) {
    for (let dim = minW; dim <= maxW; dim++) {
      console.log(`z=${plane}, w=${dim}`)

      for (let row = minY; row <= maxY; row++) {
        let rowOutput = ''

        for (let col = minX; col <= maxX; col++) {
          rowOutput += points.has(`${col},${row},${plane},${dim}`) ? '#' : '.'
        }

        console.log(rowOutput)
      }
    }
  }

  console.log('')
}

input.forEach((row, y) => {
  row.split('').forEach((cell, x) => {
    if (cell === '#') {
      state.add(`${x},${y},0,0`)
    }
  })
})

function getNeighbors (string, state) {
  const [x, y, z, w] = strToPoints(string)
  const neighbors = new Set()

  const plane = (z, w) => {
    return [
      `${x},${y},${z},${w}`,
      `${x},${y + 1},${z},${w}`,     // top
      `${x + 1},${y + 1},${z},${w}`, // top-right
      `${x + 1},${y},${z},${w}`,     // right
      `${x + 1},${y - 1},${z},${w}`, // bottom-right
      `${x},${y - 1},${z},${w}`,     // bottom
      `${x - 1},${y - 1},${z},${w}`, // bottom-left
      `${x - 1},${y},${z},${w}`,     // left
      `${x - 1},${y + 1},${z},${w}`  // top-left
    ]
  }

  plane(z, w).forEach(point => neighbors.add(point))
  plane(z, w + 1).forEach(point => neighbors.add(point))
  plane(z, w - 1).forEach(point => neighbors.add(point))
  plane(z + 1, w).forEach(point => neighbors.add(point))
  plane(z + 1, w + 1).forEach(point => neighbors.add(point))
  plane(z + 1, w - 1).forEach(point => neighbors.add(point))
  plane(z - 1, w).forEach(point => neighbors.add(point))
  plane(z - 1, w + 1).forEach(point => neighbors.add(point))
  plane(z - 1, w - 1).forEach(point => neighbors.add(point))

  neighbors.delete(string)

  return neighbors
}

function cycle (active) {
  const newState = new Set()
  const inactive = new Set()

  active.forEach(point => {
    const neighbors = getNeighbors(point, active)
    let activeCount = 0

    // Add any inactive neighbors to our list of points to check
    neighbors.forEach(point => {
      if (active.has(point)) {
        activeCount++
      } else {
        inactive.add(point)
      }
    })

    if (activeCount === 2 || activeCount === 3) {
      newState.add(point)
    }
  })

  // Walk through the inactive points, and activate any with 3 active neigbors
  inactive.forEach(point => {
    const neighbors = getNeighbors(point, active)
    let activeCount = 0

    neighbors.forEach(p => {
      if (active.has(p)) {
        activeCount++
      }
    })

    if (activeCount === 3) {
      newState.add(point)
    }
  })

  return newState
}

print(state)

for (let i = 1; i <= 6; i++) {
  state = cycle(state)
  print(state)
}

console.log(state.size)
