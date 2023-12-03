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

const hasSymbolLeft = (symbols, partRow, partColumnStart) => {
  const leftColumn = partColumnStart - 1;
  if (leftColumn < 0) {
    return false;
  }

  for (const symbol of symbols) {
    if (partRow === symbol.row && leftColumn === symbol.column) {
      return true;
    }
  }
  return false;
};

const hasSymbolRight = (symbols, partRow, partColumnEnd) => {
  const rightColumn = partColumnEnd + 1;
  if (rightColumn > MAX_COLUMN) {
    return false;
  }

  for (const symbol of symbols) {
    if (partRow === symbol.row && rightColumn === symbol.column) {
      return true;
    }
  }
  return false;
};

const hasSymbolAbove = (symbols, partRow, partColumnStart, partColumnEnd) => {
  const aboveRow = partRow - 1;
  if (aboveRow < 0) {
    return false;
  }

  for (const symbol of symbols) {
    if (
      aboveRow === symbol.row &&
      partColumnStart <= symbol.column &&
      symbol.column <= partColumnEnd
    ) {
      return true;
    }
  }
  return false;
};

const hasSymbolBelow = (symbols, partRow, partColumnStart, partColumnEnd) => {
  const belowRow = partRow + 1;
  if (belowRow > MAX_ROW) {
    return false;
  }

  for (const symbol of symbols) {
    if (
      belowRow === symbol.row &&
      partColumnStart <= symbol.column &&
      symbol.column <= partColumnEnd
    ) {
      return true;
    }
  }
  return false;
};

const hasSymbolUpperLeft = (symbols, partRow, partColumnStart) => {
  const upperRow = partRow - 1;
  const leftColumn = partColumnStart - 1;
  if (upperRow < 0 || leftColumn < 0) {
    return false;
  }

  for (const symbol of symbols) {
    if (upperRow === symbol.row && leftColumn === symbol.column) {
      return true;
    }
  }
  return false;
};

const hasSymbolLowerLeft = (symbols, partRow, partColumnStart) => {
  const lowerRow = partRow + 1;
  const leftColumn = partColumnStart - 1;
  if (lowerRow > MAX_ROW || leftColumn < 0) {
    return false;
  }

  for (const symbol of symbols) {
    if (lowerRow === symbol.row && leftColumn === symbol.column) {
      return true;
    }
  }
  return false;
};

const hasSymbolUpperRight = (symbols, partRow, partColumnEnd) => {
  const upperRow = partRow - 1;
  const rightColumn = partColumnEnd + 1;
  if (upperRow < 0 || rightColumn > MAX_COLUMN) {
    return false;
  }

  for (const symbol of symbols) {
    if (upperRow === symbol.row && rightColumn === symbol.column) {
      return true;
    }
  }
  return false;
};

const hasSymbolLowerRight = (symbols, partRow, partColumnEnd) => {
  const lowerRow = partRow + 1;
  const rightColumn = partColumnEnd + 1;
  if (lowerRow > MAX_ROW || rightColumn > MAX_COLUMN) {
    return false;
  }

  for (const symbol of symbols) {
    if (lowerRow === symbol.row && rightColumn === symbol.column) {
      return true;
    }
  }
  return false;
};

const isNumber = (char) => {
  return /^\d$/.test(char);
};

const parts = [];
const symbols = [];

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

    if (!isNumber(data) && data !== '.') {
      const symbolDetails = {
        data: data,
        row: j,
        column: i,
      };
      symbols.push(symbolDetails);
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

let total = 0;
for (const part of parts) {
  let isValid =
    hasSymbolLeft(symbols, part.row, part.column.start) ||
    hasSymbolRight(symbols, part.row, part.column.end) ||
    hasSymbolAbove(symbols, part.row, part.column.start, part.column.end) ||
    hasSymbolBelow(symbols, part.row, part.column.start, part.column.end) ||
    hasSymbolUpperLeft(symbols, part.row, part.column.start) ||
    hasSymbolLowerLeft(symbols, part.row, part.column.start) ||
    hasSymbolUpperRight(symbols, part.row, part.column.end) ||
    hasSymbolLowerRight(symbols, part.row, part.column.end);

  if (isValid) {
    // console.log(`${part.data} is a valid part.`);
    total += part.data;
  } else {
    console.log(`${part.data} from line ${part.row + 1} invalid`);
  }
}

console.log(`sum of valid parts: ${total}`);
