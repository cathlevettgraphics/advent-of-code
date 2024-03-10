import fs from 'fs';

const formatEntry = (data) => {
  const parts = data.split(/\s/); // split on any white space
  let passport = {}; // create nice obj data shapes

  for (const part of parts) {
    const [key, value] = part.split(':');
    passport[key] = value;
  }

  return passport;
};

const countValidPassport = (filepath) => {
  const parsedData = fs.readFileSync(filepath, 'utf-8').split('\n\n');
  const formattedPassports = parsedData.map((entry) => formatEntry(entry));

  let validPassports = 0;

  const totalEntries = formattedPassports.map((passport) => {
    const passportKeys = Object.keys(passport);

    if (passportKeys.length === 8) {
      validPassports++;
    }

    if (passportKeys.length === 7 && !passportKeys.includes('cid')) {
      validPassports++;
    }
  });

  console.log({ validPassports });
};

countValidPassport('./data.txt');
