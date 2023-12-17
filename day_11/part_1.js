const fs = require('fs');
const path = require('path');

const rawInput = fs.readFileSync(path.resolve(__dirname, 'input.txt'), 'utf8');
const input = rawInput.split('\n');

const image = [];
for (const ln of input) {
  const line = ln.trim().split('');

  image.push(line);
}

const rowsWithoutGalaxy = new Set(Array.from(Array(image.length).keys()));
const colsWithoutGalaxy = new Set(Array.from(Array(image[0].length).keys()));
const galaxies = [];
for (let i = 0; i < image.length; i++) {
  const row = image[i];

  let galaxyLoc = undefined;
  while (galaxyLoc !== -1) {
    galaxyLoc = row.indexOf('#', galaxyLoc === undefined ? 0 : galaxyLoc + 1);

    if (galaxyLoc >= 0) {
      galaxies.push({ row: i, column: galaxyLoc });
      rowsWithoutGalaxy.delete(i);
      colsWithoutGalaxy.delete(galaxyLoc);
    }
  }
}

const getExpandedXValue = (x) => {
  let xActual = x;
  for (const col of colsWithoutGalaxy) {
    if (x > col) {
      xActual += 1;
    }
  }

  return xActual;
};

const getExpandedYValue = (y) => {
  let yActual = y;
  for (const col of rowsWithoutGalaxy) {
    if (y > col) {
      yActual += 1;
    }
  }

  return yActual;
};

let totalSteps = 0;
for (let j = 0; j < galaxies.length; j++) {
  const x1 = getExpandedXValue(galaxies[j].column);
  const y1 = getExpandedYValue(galaxies[j].row);

  for (let i = j + 1; i < galaxies.length; i++) {
    const x2 = getExpandedXValue(galaxies[i].column);
    const y2 = getExpandedYValue(galaxies[i].row);

    const steps = Math.abs(x2 - x1) + Math.abs(y2 - y1);
    totalSteps += steps;

    console.log(`(${j + 1}, ${i + 1}):\t${steps}`);
  }
}

console.log(`Sum of total steps: ${totalSteps}`);
