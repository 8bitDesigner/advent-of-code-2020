const fs = require('fs')
const numbers = fs.readFileSync('./input', 'utf8').trim().split(',').map(n => parseInt(n, 10))

const spoken = new Map(numbers.map((n, idx) => ([n, [idx + 1]])))
let last = numbers[numbers.length - 1]

for (let iteration = (numbers.length + 1); iteration < 2021; iteration++) {
  let toSpeak

  if (!spoken.has(last) || spoken.get(last).length === 1) {
    toSpeak = 0
  } else {
    const [first, second] = spoken.get(last)
    toSpeak = second - first
  }

  if (!spoken.has(toSpeak)) {
    spoken.set(toSpeak, [iteration])
  } else if (spoken.get(toSpeak).length === 1) {
    spoken.get(toSpeak).push(iteration)
  } else {
    spoken.set(toSpeak, [spoken.get(toSpeak)[1], iteration])
  }

  last = toSpeak
}

console.log(last)
