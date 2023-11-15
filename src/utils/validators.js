import { BEVERAGES, CATEGORIES, MENUS } from '../constants/menus.js';
import { getValueOfField } from './object.js';

// Validate Numbers
export const isNumber = (input) => !Number.isNaN(Number(input));

export const isNumberInRange = (min, max, number) =>
  number >= min && number <= max;

export const isInteger = (number) => Number.isInteger(number);

// Validate Orders
export const isValidFormat = (regex, string) => {
  const reg = new RegExp(regex);
  return reg.test(string);
};

// Validate OrderItem
export const isMenuExists = (menu) =>
  CATEGORIES.find((category) => getValueOfField(MENUS, `${category}.${menu}`));

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
  const beverages = orders.filter(({ menu }) =>
    Object.keys(MENUS[BEVERAGES]).includes(menu),
  );

  return beverages.length === orders.length;
};
