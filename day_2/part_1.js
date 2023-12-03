const fs = require('fs');
const path = require('path');

const rawInput = fs.readFileSync(path.resolve(__dirname, 'input.txt'), 'utf8');
const input = rawInput.split('\n');

const extractIdFromGameText = (gameText) => Number(gameText.split(' ')[1]);

const isColorCountValid = (color, count) => {
  if (color === 'red') {
    return count <= 12;
  } else if (color === 'green') {
    return count <= 13;
  } else if (color === 'blue') {
    return count <= 14;
  }

  return true;
};

let total = 0;
for (const line of input) {
  const [gameText, sets] = line.split(': ');
  const gameId = extractIdFromGameText(gameText);
  let isValidGame = true;

  const data = sets.split('; ');

  for (const entries of data) {
    const entry = entries.split(', ');

    for (const numberAndColor of entry) {
      const splitted = numberAndColor.split(' ');
      const count = Number(splitted[0]);
      const color = splitted[1].trim();

      if (!isColorCountValid(color, count)) {
        isValidGame = false;
        break;
      }
    }

    if (!isValidGame) {
      break;
    }
  }

  if (isValidGame) {
    console.log(`${gameId} is valid.`);
    total += gameId;
  }
}

console.log(`total: ${total}`);
