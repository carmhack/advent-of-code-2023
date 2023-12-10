const fs = require("fs").promises;
const path = require("path");

function solveTwo(lines) {
  let solution = 0;

  const totalLines = lines.length;
  for (let i = 0; i < totalLines; i++) {
    const line = lines[i].split(" ").map(item => parseInt(item));
    
    const sequences = [];
    sequences.push(line);
    let currentSequence = line;
    do {
      const newSequence = generateSequence(currentSequence);
      sequences.push(newSequence);
      currentSequence = newSequence;
    } while (!currentSequence.every(item => item === 0));

    // Find next value in history
    for (let k = sequences.length-1; k >= 1; k--) {
      const currentRow = sequences[k];
      const upRow = sequences[k-1];
      const currentRowLastElem = parseInt(currentRow[0]);
      const upRowLastElem = parseInt(upRow[0]);
      sequences[k-1] = [upRowLastElem - currentRowLastElem, ...sequences[k-1]];
    }

    const history = sequences[0];
    solution += history[0];
  }

  return solution;
}

// e.g. [0, 3, 6, 9, 12, 15]
function generateSequence(numbers) {
  const sequence = [];
  for(let k = 0; k < numbers.length - 1; k++) {
    sequence.push(numbers[k+1]-numbers[k]);
  }
  return sequence;
}

function solveOne(lines) {
  let solution = 0;

  const totalLines = lines.length;
  for (let i = 0; i < totalLines; i++) {
    const line = lines[i].split(" ").map(item => parseInt(item));
    
    const sequences = [];
    sequences.push(line);
    let currentSequence = line;
    do {
      const newSequence = generateSequence(currentSequence);
      sequences.push(newSequence);
      currentSequence = newSequence;
    } while (!currentSequence.every(item => item === 0));
    // console.log(`For line ${line} found ${sequences.length} sequences.`)

    // Find next value in history
    for (let k = sequences.length-1; k >= 1; k--) {
      const currentRow = sequences[k];
      const upRow = sequences[k-1];
      const currentRowLastElem = currentRow[currentRow.length-1];
      const upRowLastElem = upRow[upRow.length-1];
      sequences[k-1].push(parseInt(currentRowLastElem) + parseInt(upRowLastElem));
      //console.log(`Sequence ${currentRow}: add ${currentRowLastElem} and ${upRowLastElem}`);
    }

    const history = sequences[0];
    solution += history[history.length-1];
  }
  
  return solution;
}

async function main() {
  const filePath = path.join(__dirname, 'input.txt');
  const input = await fs.readFile(filePath, { encoding: "utf-8" });
  const lines = input.split("\n");

  const solutionOne = solveOne(lines);
  console.log(solutionOne);
  const solutionTwo = solveTwo(lines);
  console.log(solutionTwo);
}

main();