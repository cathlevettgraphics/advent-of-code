import fs from 'fs';

const findNonValidNumber = (filePath) => {
  const data = fs
    .readFileSync(filePath, 'utf-8')
    .split('\n')
    .map((element) => Number(element));

  let range = [];
  let targetNumber = 0;

  let targetNumbersArray = [];
  const validNumbers = [];

  for (let i = 0; i < data.length; i++) {
    range = data.slice(i, i + 25);
    targetNumber = data[i + 25];
    targetNumbersArray.push(targetNumber);

    // sum all the elements in range and compare with the current targetNumber
    for (let j = 0; j < range.length; j++) {
      for (let k = 0; k < range.length; k++) {
        // if the sum of two elements in the range is equal to the targetNumber
        // push the targetNumber to the validNumbers array
        if (range[j] + range[k] === targetNumber) {
          if (!validNumbers.includes(targetNumber)) {
            validNumbers.push(targetNumber);
          }
        }
      }
    }
  }

  // filter the targetNumbersArray array to get the non valid number
  return targetNumbersArray.filter(
    (element) => !validNumbers.includes(element),
  )[0];
  s;
};

console.log(findNonValidNumber('./data.txt'));
