import { MENUS } from '../constants/menus.js';
import MESSAGES from '../constants/messages.js';
import { getValueOfField } from '../utils/object.js';
import throwError from '../utils/throwError.js';

class OrderItem {
  #category;

  #menu;

  #amount;

  constructor(menu, amount) {
    this.#validate(menu);
    this.#menu = menu;
    this.#amount = amount;
  }

  #validate(menu) {
    if (!this.#isMenuExists(menu)) throwError(MESSAGES.errors.invalidMenu);
  }

  #isMenuExists(menu) {
    this.setCategory(menu);
    return !!this.#category;
  }

  setCategory(menu) {
    const categories = Object.keys(MENUS);
    this.#category = categories.find((category) =>
      getValueOfField(MENUS, `${category}.${menu}`),
    );
  }

  get totalPrice() {
    const price = getValueOfField(MENUS, `${this.#category}.${this.#menu}`);
    return price * this.#amount;
  }

  get DTO() {
    return {
      category: this.#category,
      menu: this.#menu,
      amount: this.#amount,
      totalPrice: this.totalPrice,
    };
  }
}

export default OrderItem;
