import fs from 'fs';

// Part one
const sumCalibrationValues = (filePath) => {
  // const validNumbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
  const parsedData = fs
    .readFileSync(filePath, 'utf-8')
    .split('\n')
    .filter(Boolean);

  const lines = parsedData
    .map((line) => {
      const first = line.split('').find((value) => !isNaN(value));
      const last = line.split('').findLast((value) => !isNaN(value));

      return parseInt(first + last);
    })
    .reduce((acc, curr) => acc + curr, 0);

  return lines;
};

const finalCalibration = sumCalibrationValues('./raw-data.txt');

const partTwo = (filePath) => {
  const validWordsRegex = [
    'one',
    'two',
    'three',
    'four',
    'five',
    'six',
    'seven',
    'eight',
    'nine',
  ].join('|');

  const validWordsRegexReverse = [
    'one',
    'two',
    'three',
    'four',
    'five',
    'six',
    'seven',
    'eight',
    'nine',
  ];

  const parsedData = fs
    .readFileSync(filePath, 'utf-8')
    .split('\n')
    .filter(Boolean);

  const lines = parsedData.map((line) => {
    const firstWordNumber = line.match(validWordsRegex);
    // console.log({ firstWordNumber });
    // const lastWordNumber =
    //   .match(validWordsRegex);
    console.log(line.split('').reverse().join(''));
  });
};

console.log(partTwo('./example.txt'));
