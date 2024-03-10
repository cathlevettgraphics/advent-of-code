import fs from 'fs';

const calculateValue = (filePath) => {
  const data = fs.readFileSync(filePath, 'utf-8').split('\n');

  const parsecData = data.map((line) => {
    const [instruction, input] = line.split(' ');
    const operation = input[0];
    const value = Number(input.slice(1));

    return [instruction, operation, value];
  });

  const visited = {};
  let accumulator = 0;

  for (let i = 0; i < parsecData.length; i++) {
    const [instruction, operand, value] = parsecData[i];

    if (visited[i] === true) return accumulator;
    if (visited[i] === undefined) {
      visited[i] = true;

      if (instruction === 'acc') {
        if (operand === '+') accumulator += value;
        if (operand === '-') accumulator -= value;
      }

      if (instruction === 'jmp') {
        if (operand === '+') i += value - 1;
        if (operand === '-') i -= value + 1;
      }
    }
  }
  return accumulator;
};

console.log(calculateValue('./example.txt'));
