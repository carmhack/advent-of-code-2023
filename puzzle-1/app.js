const fs = require("fs").promises;
const path = require('path');

async function solve() {
  const filePath = path.join(__dirname, 'input.txt');
  const input = await fs.readFile(filePath, { encoding: "utf-8" });
  const lines = input.split("\n");

  let sum = 0;
  const totalLines = lines.length;
  for (let i = 0; i < totalLines; i++) {
    const line = lines[i];
    let numberAsString = "";
    let number = 0;
    const lineLength = line.length;
    for (let j = 0; j < lineLength; j++) {
      const char = line[j];
      if (Number.isInteger(parseInt(char))) {
        numberAsString += char;
      }
    }
    number = parseInt(numberAsString[0]+numberAsString[numberAsString.length-1]);
    sum += number;
  }
  return sum;
}

solve();