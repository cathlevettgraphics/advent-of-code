import fs from 'fs';

// find the two entries that sum to 2020 and then multiply those two numbers
const findTwoAndMultiply = ({ filePath, target }) => {
  const parsedData = fs
    .readFileSync(filePath, 'utf-8')
    .split('\n')
    .map((char) => parseInt(char));

  let result: number;

  for (let i = 0; i < parsedData.length; i++) {
    const num1 = parsedData[i];

    for (let j = i + 1; j < parsedData.length; j++) {
      const num2 = parsedData[j];

      if (num1 + num2 === target) {
        return num1 * num2;
      }
    }
  }
};

// find the three entries that sum to 2020 and then multiply those three numbers
// Use a set to cut this time. Three loops on data.txt = 4.199ms
const findThreeAndMultiply = ({ filePath, target }) => {
  const parsedData = fs
    .readFileSync(filePath, 'utf-8')
    .split('\n')
    .map((char) => parseInt(char));

  let result: number;

  console.time();

  for (let i = 0; i < parsedData.length; i++) {
    const num1 = parsedData[i];

    for (let j = i + 1; j < parsedData.length; j++) {
      const num2 = parsedData[j];
      const onePlusTwo = num1 + num2;

      for (let k = j + 1; k < parsedData.length; k++) {
        const num3 = parsedData[k];

        if (onePlusTwo + num3 === target) {
          console.timeEnd();
          return num1 * num2 * num3;
        }
      }
    }
  }
};

// 444019
findTwoAndMultiply({ filePath: './data.txt', target: 2020 });

// 241861950
findThreeAndMultiply({ filePath: './data.txt', target: 2020 });
