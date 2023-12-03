const fs = require('fs');
const path = require('path');

const rawInput = fs.readFileSync(path.resolve(__dirname, 'input.txt'), 'utf8');
const input = rawInput.split('\n');

const engineArray = [];
for (let line of input) {
  line = line.trim();
  engineArray.push(line.split(''));
}
const MAX_COLUMN = engineArray[0].length - 1;
const MAX_ROW = engineArray.length - 1;

const checkAsteriskLeft = (asterisks, partNumber, partRow, partColumnStart) => {
  const leftColumn = partColumnStart - 1;
  if (leftColumn < 0) {
    return;
  }

  for (const symbol of asterisks) {
    if (partRow === symbol.row && leftColumn === symbol.column) {
      symbol.parts.push(partNumber);
      return;
    }
  }
};

const checkAsteriskRight = (asterisks, partNumber, partRow, partColumnEnd) => {
  const rightColumn = partColumnEnd + 1;
  if (rightColumn > MAX_COLUMN) {
    return;
  }

  for (const symbol of asterisks) {
    if (partRow === symbol.row && rightColumn === symbol.column) {
      symbol.parts.push(partNumber);
      return;
    }
  }
};

const checkAsteriskAbove = (
  asterisks,
  partNumber,
  partRow,
  partColumnStart,
  partColumnEnd
) => {
  const aboveRow = partRow - 1;
  if (aboveRow < 0) {
    return;
  }

  for (const symbol of asterisks) {
    if (
      aboveRow === symbol.row &&
      partColumnStart <= symbol.column &&
      symbol.column <= partColumnEnd
    ) {
      symbol.parts.push(partNumber);
      return;
    }
  }
};

const checkAsteriskBelow = (
  asterisks,
  partNumber,
  partRow,
  partColumnStart,
  partColumnEnd
) => {
  const belowRow = partRow + 1;
  if (belowRow > MAX_ROW) {
    return;
  }

  for (const symbol of asterisks) {
    if (
      belowRow === symbol.row &&
      partColumnStart <= symbol.column &&
      symbol.column <= partColumnEnd
    ) {
      symbol.parts.push(partNumber);
      return;
    }
  }
};

const checkAsteriskUpperLeft = (
  asterisks,
  partNumber,
  partRow,
  partColumnStart
) => {
  const upperRow = partRow - 1;
  const leftColumn = partColumnStart - 1;
  if (upperRow < 0 || leftColumn < 0) {
    return;
  }

  for (const symbol of asterisks) {
    if (upperRow === symbol.row && leftColumn === symbol.column) {
      symbol.parts.push(partNumber);
      return;
    }
  }
};

const checkAsteriskLowerLeft = (
  asterisks,
  partNumber,
  partRow,
  partColumnStart
) => {
  const lowerRow = partRow + 1;
  const leftColumn = partColumnStart - 1;
  if (lowerRow > MAX_ROW || leftColumn < 0) {
    return;
  }

  for (const symbol of asterisks) {
    if (lowerRow === symbol.row && leftColumn === symbol.column) {
      symbol.parts.push(partNumber);
      return;
    }
  }
};

const checkAsteriskUpperRight = (
  asterisks,
  partNumber,
  partRow,
  partColumnEnd
) => {
  const upperRow = partRow - 1;
  const rightColumn = partColumnEnd + 1;
  if (upperRow < 0 || rightColumn > MAX_COLUMN) {
    return;
  }

  for (const symbol of asterisks) {
    if (upperRow === symbol.row && rightColumn === symbol.column) {
      symbol.parts.push(partNumber);
      return;
    }
  }
};

const checkAsteriskLowerRight = (
  asterisks,
  partNumber,
  partRow,
  partColumnEnd
) => {
  const lowerRow = partRow + 1;
  const rightColumn = partColumnEnd + 1;
  if (lowerRow > MAX_ROW || rightColumn > MAX_COLUMN) {
    return;
  }

  for (const symbol of asterisks) {
    if (lowerRow === symbol.row && rightColumn === symbol.column) {
      symbol.parts.push(partNumber);
      return;
    }
  }
};

const isNumber = (char) => {
  return /^\d$/.test(char);
};

const parts = [];
const asterisks = [];

let partConstructStart;
let partConstruct = '';

for (let j = 0; j < engineArray.length; j++) {
  for (let i = 0; i < engineArray.length; i++) {
    const data = engineArray[j][i];
    if (isNumber(data)) {
      if (partConstruct === '') {
        partConstructStart = i;
      }
      partConstruct += data;
    } else if (partConstruct !== '') {
      const partsDetails = {
        data: Number(partConstruct),
        row: j,
        column: {
          start: partConstructStart,
          end: i - 1,
        },
      };
      parts.push(partsDetails);
      partConstruct = '';
    }

    if (!isNumber(data) && data === '*') {
      const asterisksDetails = {
        data: data,
        row: j,
        column: i,
        parts: [],
      };
      asterisks.push(asterisksDetails);
    }
  }

  // flush partConstruct
  if (partConstruct !== '') {
    const partsDetails = {
      data: Number(partConstruct),
      row: j,
      column: {
        start: partConstructStart,
        end: MAX_COLUMN,
      },
    };
    parts.push(partsDetails);
    partConstruct = '';
  }
}

for (const part of parts) {
  checkAsteriskLeft(asterisks, part.data, part.row, part.column.start);
  checkAsteriskRight(asterisks, part.data, part.row, part.column.end);
  checkAsteriskAbove(
    asterisks,
    part.data,
    part.row,
    part.column.start,
    part.column.end
  );
  checkAsteriskBelow(
    asterisks,
    part.data,
    part.row,
    part.column.start,
    part.column.end
  );
  checkAsteriskUpperLeft(asterisks, part.data, part.row, part.column.start);
  checkAsteriskLowerLeft(asterisks, part.data, part.row, part.column.start);
  checkAsteriskUpperRight(asterisks, part.data, part.row, part.column.end);
  checkAsteriskLowerRight(asterisks, part.data, part.row, part.column.end);
}

let total = 0;
for (const asterisk of asterisks) {
  const parts = asterisk.parts;
  if (parts.length === 2) {
    total += parts[0] * parts[1];
  }
}

console.log(`sum of gear ratios: ${total}`);
