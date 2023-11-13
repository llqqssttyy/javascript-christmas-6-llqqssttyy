import { BEVERAGES, MENUS } from '../constants/menus';
import MESSAGES from '../constants/messages';
import throwError from '../utils/throwError';
import OrderItem from './OrderItem';

class Receipt {
  #orders;

  #totalPrice;

  constructor(orders) {
    if (!this.#validate(orders)) throwError(MESSAGES.errors.invalidOrders);

    this.#orders = this.#generateOrders(orders);
    this.#totalPrice = this.#caculateTotalPrice();
  }

  get totalPrice() {
    return this.#totalPrice;
  }

  #generateOrders(orders) {
    return orders.map(({ menu, amount }) => {
      this.#orders.push(new OrderItem(menu, amount));
    });
  }

  #caculateTotalPrice() {
    return this.#orders?.reduce((totalPrice, orderItem) => {
      totalPrice += orderItem.totalPrice;
    }, 0);
  }

  // validators
  #validate(orders) {
    if (this.#totalAmountOfMenus(orders) >= 21) return false;

    if (this.#hasDuplicatedMenu(orders)) return false;

    if (this.#hasOnlyBeverages(orders)) return false;

    return true;
  }

  #totalAmountOfMenus(orders) {
    return orders.reduce((acc, { amount }) => acc + amount, 0);
  }

  #hasDuplicatedMenu(orders) {
    const set = new Set();

    orders.forEach(({ menu }) => {
      set.add(menu);
    });
    return set.size !== orders.length;
  }

  #hasOnlyBeverages(orders) {
    const beverages = orders.filter(({ menu }) => {
      return Object.keys(MENUS[BEVERAGES]).includes(menu);
    });

    return beverages.length === orders.length;
  }
}

export default Receipt;
