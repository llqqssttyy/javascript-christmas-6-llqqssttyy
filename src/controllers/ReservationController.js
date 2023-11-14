import InputView from '../views/InputView.js';
import OutputView from '../views/OutputView.js';
import EventPlanner from '../models/EventPlanner.js';

import MESSAGES from '../constants/messages.js';
import { ORDER_REGEX } from '../constants/constants.js';

import throwError from '../utils/throwError.js';
import handleException from '../utils/handleException.js';
import { isNumber, isValidFormat } from '../utils/validators.js';

class ReservationController {
  #inputView;

  #outputView;

  #eventPlanner;

  constructor() {
    this.#inputView = InputView;
    this.#outputView = OutputView;
  }

  async reservation() {
    this.#outputView.printStart();

    await handleException(async () => await this.#getDate());
    await handleException(async () => await this.#getOrders());

    this.#printOrderResult();

    this.#printBenefitResult();
  }

  // use InputView
  async #getDate() {
    const date = await this.#inputView.readDate();

    this.#validateDateType(date);

    this.#eventPlanner = new EventPlanner(Number(date));
  }

  async #getOrders() {
    const orders = await this.#inputView.readOrders();

    this.#validateOrdersFormat(orders);

    const processedOrders = this.#processOrders(orders);
    await this.#eventPlanner.generateReceipt(processedOrders);
  }

  // use OutputView
  #printOrderResult() {
    this.#outputView.printMenus(this.#eventPlanner.menus);
    this.#outputView.printOriginalPrice(this.#eventPlanner.originalPrice);
  }

  async #printBenefitResult() {
    await this.#eventPlanner.generateBenefits();

    const gift = await this.#eventPlanner.gift;
    this.#outputView.printGift(gift);

    const benefits = await this.#eventPlanner.benefits;
    this.#outputView.printBenefits(benefits);
  }

  // validators
  #validateDateType(date) {
    if (!isNumber(date)) throwError(MESSAGES.errors.invalidDate);
  }

  #validateOrdersFormat(orders) {
    if (!isValidFormat(ORDER_REGEX, orders))
      throwError(MESSAGES.errors.invalidOrders);
  }

  // data processer
  #processOrders(orders) {
    return orders.split(',').map((order) => {
      const [menu, amount] = order.split('-');
      return { menu, amount: Number(amount) };
    });
  }
}

export default ReservationController;
