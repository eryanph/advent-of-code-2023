const fs = require('fs');
const path = require('path');

const rawInput = fs.readFileSync(path.resolve(__dirname, 'input.txt'), 'utf8');
const input = rawInput.split('\n');

let startingRow = null;
let startingColumn = null;
const maze = [];
for (const ln of input) {
  const line = ln.trim().split('');

  if (startingRow === null && line.indexOf('S') > -1) {
    startingRow = maze.length;
    startingColumn = line.indexOf('S');
  }
  maze.push(line);
}

const openings = {
  north: ['|', 'L', 'J'],
  south: ['|', '7', 'F'],
  east: ['-', 'L', 'F'],
  west: ['-', 'J', '7'],
};

const canEnter = (pipe, from) => {
  return openings[from].indexOf(pipe) > -1;
};

const findWayFromStart = () => {
  if (startingRow > 0) {
    const northPipe = maze[startingRow - 1][startingColumn];
    if (canEnter(northPipe, 'south')) {
      return {
        pipe: northPipe,
        row: startingRow - 1,
        column: startingColumn,
        from: 'south',
      };
    }
  }

  if (startingRow < maze.length - 1) {
    const southPipe = maze[startingRow + 1][startingColumn];
    if (canEnter(southPipe, 'north')) {
      return {
        pipe: southPipe,
        row: startingRow + 1,
        column: startingColumn,
        from: 'north',
      };
    }
  }

  if (startingColumn < maze[startingRow].length - 1) {
    const eastPipe = maze[startingRow][startingColumn + 1];
    if (canEnter(eastPipe, 'west')) {
      return {
        pipe: eastPipe,
        row: startingRow,
        column: startingColumn + 1,
        from: 'west',
      };
    }
  }

  if (startingColumn > 0) {
    const westPipe = maze[startingRow][startingColumn - 1];
    if (canEnter(westPipe, 'east')) {
      return {
        pipe: westPipe,
        row: startingRow,
        column: startingColumn - 1,
        from: 'east',
      };
    }
  }
};

const goToNextPipe = (currentPipe, to) => {
  let newRow = currentPipe.row;
  let newColumn = currentPipe.column;
  let newFrom;

  if (to === 'north') {
    newRow -= 1;
    newFrom = 'south';
  } else if (to === 'south') {
    newRow += 1;
    newFrom = 'north';
  } else if (to === 'east') {
    newColumn += 1;
    newFrom = 'west';
  } else if (to === 'west') {
    newColumn -= 1;
    newFrom = 'east';
  }

  const newPipe = maze[newRow][newColumn];
  return {
    pipe: newPipe,
    row: newRow,
    column: newColumn,
    from: newFrom,
  };
};

let currentPipe = findWayFromStart();
let moves = 1;
while (currentPipe.pipe !== 'S') {
  const directions = Object.keys(openings);
  for (const to of directions) {
    if (to === currentPipe.from || openings[to].indexOf(currentPipe.pipe) < 0) {
      continue;
    }

    currentPipe = goToNextPipe(currentPipe, to);
    moves++;
    break;
  }
}

const stepsToFarthest = moves / 2;
console.log(`Steps to farthest position: ${stepsToFarthest}`);
