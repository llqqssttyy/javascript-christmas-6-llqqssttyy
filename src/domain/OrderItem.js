import MESSAGES from '../constants/messages.js';
import { CATEGORIES, MENUS } from '../constants/menus.js';

import { getValueOfField } from '../utils/object.js';
import throwError from '../utils/throwError.js';
import { isMenuExists } from '../utils/validators.js';

class OrderItem {
  #category;

  #menu;

  #amount;

  constructor(menu, amount) {
    this.#validate(menu);
    this.#setCategory(menu);
    this.#menu = menu;
    this.#amount = amount;
  }

  #validate(menu) {
    if (!isMenuExists(menu)) throwError(MESSAGES.errors.invalidMenu);
  }

  #setCategory(menu) {
    this.#category = CATEGORIES.find((category) =>
      getValueOfField(MENUS, `${category}.${menu}`),
    );
  }

  get totalPrice() {
    const price = getValueOfField(MENUS, `${this.#category}.${this.#menu}`);
    return price * this.#amount;
  }

  get item() {
    return {
      category: this.#category,
      menu: this.#menu,
      amount: this.#amount,
    };
  }
}

export default OrderItem;
