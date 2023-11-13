import { BEVERAGES, CATEGORIES, MENUS } from '../constants/menus.js';
import { getValueOfField } from './object.js';

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
  return CATEGORIES.find((category) =>
    getValueOfField(MENUS, `${category}.${menu}`),
  );
};

// Validate Receipt
export const isTotalAmountOfMenusValid = (orders) => {
  const totalAmount = orders.reduce((acc, { amount }) => acc + amount, 0);
  return totalAmount <= 20;
};

export const hasDuplicatedMenu = (orders) => {
  const set = new Set();

  orders.forEach(({ menu }) => {
    set.add(menu);
  });

  return set.size !== orders.length;
};

export const hasOnlyBeverages = (orders) => {
  const beverages = orders.filter(({ menu }) => {
    return Object.keys(MENUS[BEVERAGES]).includes(menu);
  });

  return beverages.length === orders.length;
};
