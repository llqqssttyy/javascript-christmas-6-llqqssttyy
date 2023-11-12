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
