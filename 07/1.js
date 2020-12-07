const lines = require('../lib/lines.js')()

function contains (type) {
  return lines
    .filter(l => l.includes(type))
    .map(l => l.split(' ').slice(0, 2).join(' '))
    .filter(t => t !== type)
}

function next (searchTypes, knownParents = new Set()) {
  const parents = searchTypes.flatMap(t => contains(t))
  parents.forEach(p => knownParents.add(p))

  if (parents.length) {
    return next(parents, knownParents)
  } else {
    return knownParents.size
  }
}

console.log(next(['shiny gold']))
