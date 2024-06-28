import fs from 'fs';

const voltageDifference = (filepath) => {
  const data = fs
    .readFileSync(filepath, 'utf-8')
    .split('\n')
    .map((element) => parseInt(element))
    .sort((a, b) => a - b);

  let chainsArray = [];
  let oneJolt = 0;
  let threeJolt = 0;

  // break the data into groups where the numbers are within 3 jolts of each other
  for (let i = 0; i < data.length; i++) {
    let chain = [data[i]];

    for (let nextChain = i + 1; nextChain < data.length; nextChain++) {
      if (data[nextChain] - chain[chain.length - 1] <= 3) {
        chain.push(data[nextChain]);
      }
    }
    chainsArray.push(chain);
  }

  // find the longest chain in the chainsArray array
  const longest = chainsArray.reduce((current, next) =>
    current.length > next.length ? current : next,
  );

  // add a zero at the start and the max number + 3 at the end
  const longestChain = [0, ...longest, longest[longest.length - 1] + 3];

  // iterate through the longest chain and count the number of 1 and 3 jolt differences
  for (let element = 0; element <= longestChain.length + 3; element++) {
    const current = longestChain[element];
    const next = longestChain[element + 1];

    if (next - current === 1) {
      oneJolt++;
    }

    if (next - current === 3) {
      threeJolt++;
    }
  }

  console.log({ oneJolt, threeJolt });
};

console.log(voltageDifference('./data.txt'));
