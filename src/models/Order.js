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
    if (!this.findMenu(menu)) throwError(MESSAGES.errors.invalidMenu);
  }

  findMenu(menu) {
    const categories = Object.keys(MENUS);

    const matchedCategory = categories.find((category) =>
      getValueOfField(MENUS, `${category}.${menu}`),
    );

    return (
      matchedCategory && {
        category: matchedCategory,
        menu: menu,
        price: getValueOfField(MENUS, `${matchedCategory}.${menu}`),
      }
    );
  }
}

export default OrderItem;
