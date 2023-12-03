const fs = require("fs").promises;
const path = require("path");

function isSymbol(string) {
  return !Number.isInteger(parseInt(string)) && string !== ".";
}

const adjacentIndexes = [
  { x: -1, y: 0 },
  { x: -1, y: -1 },
  { x: -1, y: 1 },
  { x: 0, y: -1 },
  { x: 0, y: 1 },
  { x: 1, y: 0 },
  { x: 1, y: -1 },
  { x: 1, y: 1 },
]
/*
x x x
x 1 x
x x x
*/
function hasAdjacentSymbols(matrix, i, j) {
  // console.log(`Check on ${matrix[i][j]}`);
  for (const indexes of adjacentIndexes) {
    const { x, y } = indexes;
    const newX = i + x;
    const newY = j + y;
    if (
      matrix[newX] !== undefined &&
      matrix[newX][newY] !== undefined &&
      isSymbol(matrix[newX][newY])
    ) {
      // console.log(`Found symbol on ${newX}-${newY}: ${matrix[newX][newY]}`);
      return true;
    }
  }
  return false;
}

function solveOne(lines) {
  let solution = 0;
  const matrix = lines.map(line => line.split(''));
  
  let currentNumber = "";
  for (let i = 0; i < lines.length; i++) {
    let isValid = false;
    for (let j = 0; j < lines[i].length; j++) {
      const cell = matrix[i][j];

      if (Number.isInteger(parseInt(cell))) {
        currentNumber += cell;
        if (hasAdjacentSymbols(matrix, i, j)) {
          isValid = true;
        }
      } else {
        if (isValid) {
          // console.log(`${currentNumber} is a part`);
          solution += parseInt(currentNumber);
        }
        
        currentNumber = "";
        isValid = false;
      }
    }
    if (isValid) {
      solution += parseInt(currentNumber);
    }
  }

  return solution;
}

async function main() {
  const filePath = path.join(__dirname, 'input.txt');
  const input = await fs.readFile(filePath, { encoding: "utf-8" });
  const lines = input.split("\n");

  const solutionOne = solveOne(lines);
  console.log(solutionOne); // current 506273
}

main();