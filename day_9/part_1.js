const fs = require('fs');
const path = require('path');

const rawInput = fs.readFileSync(path.resolve(__dirname, 'input.txt'), 'utf8');
const input = rawInput.split('\n');

const histories = [];
for (const ln of input) {
  const line = ln
    .trim()
    .split(' ')
    .map(i => Number(i));

    histories.push([...line]);
}

const sequences = [];
for (let k = 0; k < histories.length; k++) {
  sequences.push([histories[k]]);

  do {
    const newSequence = [];
    sequences[k][sequences[k].length - 1].reduce((a, b) => {
      if (a !== null) {
        newSequence.push(b - a);
      }
      return b;
    }, null);
    sequences[k].push(newSequence);
  } while(sequences[k][sequences[k].length - 1].reduce((a, b) => Math.abs(a) + Math.abs(b), 0) > 0); 
}

let total = 0;
for (const sequence of sequences) {
  sequence.reverse().reduce((a, b) => {
    if (a === null) {
      b.push(0);
      return b;
    }

    b.push(a[a.length - 1] + b[b.length - 1]);
    return b;
  }, null);

  total += sequence[sequence.length - 1][sequence[sequence.length - 1].length - 1];
}

console.log(`Sum of extrapolated values: ${total}`);
