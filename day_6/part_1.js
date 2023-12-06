const fs = require('fs');
const path = require('path');

const rawInput = fs.readFileSync(path.resolve(__dirname, 'input.txt'), 'utf8');
const input = rawInput.split('\n');

const times = [];
const distances = [];
for (let line of input) {
  line = line.trim();
  line = line.replace(/ +(?= )/g,'').split(' ');

  if (line[0].includes('Time:')) {
    times.push(...line.slice(1));
  } else if (line[0].includes('Distance:')) {
    distances.push(...line.slice(1));
  }
}

const getQuadraticFormula = (time, distance) => {
  const a = -1 * (-1 * time);
  const b = Math.sqrt(Math.pow(-1 * time, 2) - (4 * 1 * distance));
  const c = 2;

  // (a +- b) / c
  return [a, b, c];
}

const numberOfWays = [];
for (let i = 0; i < times.length; i++) {
  const time = Number(times[i]);
  const distance = Number(distances[i]);

  // (a +- b) / c
  const [a, b, c] = getQuadraticFormula(time, distance);
  let minimumHold = Math.ceil((a - b) / c);
  let maximumHold = Math.floor((a + b) / c);

  // calibration, should not exact at distance at 0s
  const minimumSpeed = minimumHold;
  if (distance === minimumSpeed * (time - minimumHold)) {
    minimumHold += 1;
  }
  const maximumSpeed = maximumHold;
  if (distance === maximumSpeed * (time - maximumHold)) {
    maximumHold -= 1;
  }

  numberOfWays.push(maximumHold - minimumHold + 1);
  console.log(`Race ${i + 1}, time=${time}, distance=${distance}:\t${minimumHold}, ${maximumHold}`);
}

let total = 0;
for (const ways of numberOfWays) {
  if (total === 0) {
    total = ways;
    continue;
  }

  total *= ways;
}

console.log(`Product of number of ways to beat races: ${total}`);
