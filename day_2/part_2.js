const fs = require('fs');
const path = require('path');

const rawInput = fs.readFileSync(path.resolve(__dirname, 'input.txt'), 'utf8');
const input = rawInput.split('\n');

const extractIdFromGameText = (gameText) => Number(gameText.split(' ')[1]);

let total = 0;
for (const line of input) {
  const [gameText, sets] = line.split(': ');
  const gameId = extractIdFromGameText(gameText);

  const data = sets.split('; ');

  const minimumColorDict = {
    red: 0,
    green: 0,
    blue: 0,
  };
  for (const entries of data) {
    const entry = entries.split(', ');

    for (const numberAndColor of entry) {
      const splitted = numberAndColor.split(' ');
      const count = Number(splitted[0]);
      const color = splitted[1].trim();

      if (minimumColorDict[color] < count) {
        minimumColorDict[color] = count;
      }
    }
  }

  const power =
    minimumColorDict.red * minimumColorDict.blue * minimumColorDict.green;
  console.log(`${gameId} power: ${power}`);
  total += power;
}

console.log(`total power: ${total}`);
