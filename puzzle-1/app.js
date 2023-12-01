const fs = require("fs").promises;
const path = require('path');

const STRING_TO_NUM = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
}

function solveOne(lines) {
  let solution = 0;
  const totalLines = lines.length;
  for (let i = 0; i < totalLines; i++) {
    const line = lines[i];
    let numberAsString = "";
    const lineLength = line.length;
    for (let j = 0; j < lineLength; j++) {
      const char = line[j];
      if (Number.isInteger(parseInt(char))) {
        numberAsString += char;
      }
    }
    if (numberAsString.length > 0) {
      solution += parseInt(numberAsString[0]+numberAsString.at(-1));
    }
  }
  return solution;
}

function solveTwo(lines) {
  let solution = 0;
  const totalLines = lines.length;
  const strings = Object.keys(STRING_TO_NUM);

  for (let i = 0; i < totalLines; i++) {
    let line = lines[i];
    
    for (const str of strings) {
      // due to cases like 'oneight' i leave the first and last char of every string number
      // e.g. one => o1e, seven => s7n
      line = line.replaceAll(str, `${str[0]}${STRING_TO_NUM[str]}${str.at(-1)}`);
    }
    
    const match = line.match(/\d/g);
    solution += parseInt(`${match[0]}${match.at(-1)}`);
  }
  return solution;
}

async function main() {
  const filePath = path.join(__dirname, 'input.txt');
  const input = await fs.readFile(filePath, { encoding: "utf-8" });
  const lines = input.split("\n");

  const solutionOne = solveOne(lines);
  //console.log(solutionOne);
  const solutionTwo = solveTwo(lines);
  console.log(solutionTwo);
}

main();