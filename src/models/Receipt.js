import OrderItem from './OrderItem.js';

import MESSAGES from '../constants/messages.js';

import throwError from '../utils/throwError.js';
import {
  hasDuplicatedMenu,
  hasOnlyBeverages,
  isTotalAmountOfMenusValid,
} from '../utils/validators.js';

class Receipt {
  #orders;

  #orderItems;

  constructor(orders) {
    this.#validate(orders);
    this.#orders = orders;
    this.#orderItems = [];
  }

  #validate(orders) {
    if (!isTotalAmountOfMenusValid(orders))
      throwError(MESSAGES.errors.invalidOrders);

    if (hasDuplicatedMenu(orders)) throwError(MESSAGES.errors.invalidOrders);

    if (hasOnlyBeverages(orders)) throwError(MESSAGES.errors.invalidOrders);
  }

  generateOrders() {
    this.#orderItems = this.#orders.map(
      ({ menu, amount }) => new OrderItem(menu, amount),
    );
  }

  get totalPrice() {
    return this.#orderItems.reduce((totalPrice, orderItem) => {
      return totalPrice + orderItem.totalPrice;
    }, 0);
  }

  get receipt() {
    const receipt = {};

    this.#orderItems.forEach((orderItem) => {
      const { category, menu, amount } = orderItem.item;

      if (!Array.isArray(receipt[category])) {
        receipt[category] = [];
      }

      receipt[category].push({ menu, amount });
    });

    return receipt;
  }

  get orderCntByCategory() {
    const orderCnt = {};

    this.#orderItems.forEach((orderItem) => {
      const { category, amount } = orderItem.item;

      if (!orderCnt[category]) orderCnt[category] = 0;

      orderCnt[category] += amount;
    });

    return orderCnt;
  }

  get menus() {
    return this.#orderItems.map((orderItem) => {
      const { menu, amount } = orderItem.item;
      return { menu, amount };
    });
  }
}

export default Receipt;
