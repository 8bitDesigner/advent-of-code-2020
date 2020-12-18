const [rulesGroup, myGroup, nearbyGroup] = require('../lib/utils.js').lines(__dirname, '\n\n')
const toTicket = l => l.split(',').map(n => parseInt(n, 10))
const groupToTickets = group => group.split('\n').slice(1, group.length).map(toTicket)

const myTicket = groupToTickets(myGroup)[0]
const nearbyTickets = groupToTickets(nearbyGroup)

// Create an array of [rule, ruleValidationFn()]
const rules = rulesGroup.split('\n').map(line => {
  const [type, rule] = line.split(': ')
  const ranges = rule.split(' or ').map(range => {
    return range.split('-').map(n => parseInt(n, 10))
  })

  const validator = number => {
    return ranges.some(([min, max]) => {
      return number >= min && number <= max
    })
  }

  return [type, validator]
})

const departureFields = rules.filter(([type, validator]) => {
  return type.startsWith('departure')
}).map(([type, validator]) => {
  return type
})

// Select all the tickets which have valid field across all positions
const valid = nearbyTickets.filter(ticket => {
  return ticket.every(number => {
    return rules.some(([name, validator]) => validator(number))
  })
})

// Build a map of array positions, each containing a map of every possible rule
const fieldMapping = new Map()
valid[0].forEach((n, idx) => fieldMapping.set(idx, new Map(rules)))

// Walk through each position and test all valid tickets against all validators
// in that position. If any fail, remove the validator from the map for this position
fieldMapping.forEach((possibleRules, position) => {
  possibleRules.forEach((isValid, type) => {
    const allValid = valid.every(ticket => isValid(ticket[position]))

    if (!allValid) {
      possibleRules.delete(type)
    }
  })
})

// Dose every position have a ruleset with a single rule
function isResolved (positions) {
  return [...fieldMapping.values()].every(rules => rules.size === 1)
}

// Contitue walking through our map of positions, looking for any position where
// only one rule applies. When we find that, remove that rule from every other
// possible position. Continue doing this until each position has a single rule
while (!isResolved(fieldMapping)) {
  fieldMapping.forEach((rules, idx) => {
    if (rules.size > 1) { return }

    const found = [...rules.keys()][0]

    fieldMapping.forEach((rules, otherIdx) => {
      if (idx !== otherIdx) {
        rules.delete(found)
      }
    })
  })
}

// Finally, clean up our position mapping and create a label mapping
const labelToPosition = new Map()
fieldMapping.forEach((rules, position) => {
  const name = [...rules.keys()][0]
  fieldMapping.set(position, name)
  labelToPosition.set(name, position)
})

console.log(
  departureFields.map(name => {
    const position = labelToPosition.get(name)
    return myTicket[position]
  }).reduce((a, b) => a * b)
)
