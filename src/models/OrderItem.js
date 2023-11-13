import { CATEGORIES, MENUS } from '../constants/menus.js';
import MESSAGES from '../constants/messages.js';

import { getValueOfField } from '../utils/object.js';
import throwError from '../utils/throwError.js';
import { isMenuExists } from '../utils/validators.js';

class OrderItem {
  #menu;

  #amount;

  constructor(menu, amount) {
    this.#validate(menu);
    this.#menu = menu;
    this.#amount = amount;
  }

  #validate(menu) {
    if (!isMenuExists(menu)) throwError(MESSAGES.errors.invalidMenu);
  }

  get totalPrice() {
    const price = getValueOfField(
      MENUS,
      `${this.#getCategory()}.${this.#menu}`,
    );
    return price * this.#amount;
  }

  get item() {
    return {
      category: this.#getCategory(),
      menu: this.#menu,
      amount: this.#amount,
    };
  }

  #getCategory() {
    return CATEGORIES.find((category) =>
      getValueOfField(MENUS, `${category}.${this.#menu}`),
    );
  }
}

export default OrderItem;
