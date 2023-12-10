const fs = require("fs").promises;
const path = require("path");

function solveTwo(lines) {
  let solution = 0;

  const totalLines = lines.length;
  const instructions = lines[0].split("");
  
  const nodes = {};
  const startingNodes = [];
  
  for (let i = 2; i < totalLines; i++) {
    const line = lines[i];
    
    let [node, optionsRaw] = line.split(" = ");
    let options = optionsRaw.match(/\w+/g);

    nodes[node] = options;
    if (node.endsWith('A')) {
      startingNodes.push(node);
    }
  }

  let currentInstructionIndex = 0;
  let currentInstruction = instructions[currentInstructionIndex];
  let currentNodes = startingNodes;
  
  while(!currentNodes.every(item => item.endsWith("Z"))) {
    for (let i = 0; i < currentNodes.length; i++) {
      let currentNode = currentNodes[i]
      const options = nodes[currentNode];
      //console.log(`Node ${currentNode} => options: ${options}`)

      if (currentInstruction === "L") {
        currentNodes[i] = options[0];
      } else {
        currentNodes[i] = options[1];
      }
    }
    
    currentInstructionIndex = (currentInstructionIndex + 1) % instructions.length;
    currentInstruction = instructions[currentInstructionIndex];
    
    console.log(`Current nodes: ${currentNodes.join(", ")}, current instr: ${currentInstruction}`)
    solution++;
  }

  return solution;
}

function solveOne(lines) {
  let solution = 0;

  const totalLines = lines.length;
  const instructions = lines[0].split("");
  
  const nodes = {};
  for (let i = 2; i < totalLines; i++) {
    const line = lines[i];
    
    let [node, optionsRaw] = line.split(" = ");
    let options = optionsRaw.match(/\w+/g);

    nodes[node] = options;
  }
  
  let currentNode = "AAA";
  let currentInstructionIndex = 0;
  let currentInstruction = instructions[currentInstructionIndex];
  
  while(currentNode !== "ZZZ") {
    const options = nodes[currentNode];
    if (currentInstruction === "L") {
      currentNode = options[0];
    } else {
      currentNode = options[1];
    }
    currentInstructionIndex = (currentInstructionIndex + 1) % instructions.length;
    currentInstruction = instructions[currentInstructionIndex];
    solution++;
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