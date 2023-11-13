import { CATEGORIES, MENUS } from '../constants/menus';
import { getValueOfField } from './object';

// Validate Numbers
export const isNumber = (input) => {
  return !Number.isNaN(Number(input));
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

// Validate OrderItem
export const isMenuExists = (menu) => {
  return !!CATEGORIES.find((category) =>
    getValueOfField(MENUS, `${category}.${menu}`),
  );
};
