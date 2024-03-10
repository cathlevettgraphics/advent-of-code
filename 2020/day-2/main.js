import fs from 'fs';

const checkPasswords = (filePath) => {
  const parsedData = fs.readFileSync(filePath, 'utf-8').split('\n');

  let currentCount = 0;
  let validPasswords = 0;

  for (const element of parsedData) {
    const [range, codeLetter, password] = element.split(' ');
    // const [codeNumbers, codeLetter] = code.split(' ');
    const [min, max] = range.split('-').map((char) => Number(char));

    const key = codeLetter[0];

    // Part 1 solution
    // const letterOccurrence = password
    //   .split('')
    //   .filter((letter) => letter === codeLetter).length;

    // const hasValidOccurrence =
    //   letterOccurrence >= min && letterOccurrence <= max;

    const firstMatch = key === password[min - 1];
    const lastMatch = key === password[max - 1];

    const hasValidCharacterMatches =
      (firstMatch && !lastMatch) || (!firstMatch && lastMatch);

    if (hasValidCharacterMatches) {
      validPasswords += 1;
    }
  }
  console.log({ validPasswords });
  return validPasswords;
};

checkPasswords('./data.txt');
