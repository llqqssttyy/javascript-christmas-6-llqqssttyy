// Validate Numbers
export const isNumber = (input) => {
  return Number.isNaN(input);
};

export const isNumberInRange = (min, max, number) => {
  return number >= min && number <= max;
};

export const isInteger = (number) => {
  return Number.isInteger(number);
};

export const isPositive = (number) => {
  return number > 0;
};

// Validate Strings
export const isValidFormat = (regex, string) => {
  const reg = new RegExp(regex);
  return reg.test(string);
};