const [rulesGroup, myGroup, nearbyGroup] = require('../lib/utils.js').lines(__dirname, '\n\n')
const toTicket = l => l.split(',').map(n => parseInt(n, 10))
const groupToTickets = group => group.split('\n').slice(1, group.length).map(toTicket)

const myTicket = groupToTickets(myGroup)[0]
const nearbyTickets = groupToTickets(nearbyGroup)

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

console.log(
  nearbyTickets.flatMap(ticket => {
    return ticket.filter(number => {
      return rules.every(([name, validator]) => {
        console.log('validating', name, number, validator(number))
        return validator(number) === false
      })
    })
  }).reduce((a, b) => a + b)
)
