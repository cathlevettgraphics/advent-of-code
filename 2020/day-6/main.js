import fs from 'fs';

const format = (data) => {
  const parts = data
    .split(/\s/)
    .map((item) => item.split(''))
    .flat();

  return new Set(parts);
};

const customsDeclarations = (filePath) => {
  const parsedData = fs.readFileSync(filePath, 'utf-8').split('\n\n');

  const sumOfAnswers = parsedData
    .map((entry) => format(entry)) // format out data
    .map((item) => item.size) // get the length of each set
    .reduce((curr, acc) => curr + acc, 0); // add all lengths

  console.log({ sumOfAnswers });
};

console.log(customsDeclarations('./data.txt'));
