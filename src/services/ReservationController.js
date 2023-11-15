import InputView from '../views/InputView.js';
import OutputView from '../views/OutputView.js';
import EventPlanner from './EventPlanner.js';

import MESSAGES from '../constants/messages.js';

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

    await handleException(async () => this.#getDate());
    await handleException(async () => this.#getOrders());

    this.#printOrderResult();

    await this.#eventPlanner.generateBenefits();

    await this.#printBenefitResult();

    this.#printBadge();
  }

  // InputView
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

  // OutputView
  #printOrderResult() {
    const { menus, visitDate, originalPrice } = this.#eventPlanner;

    this.#outputView.printMenus({ visitDate, menus });
    this.#outputView.printOriginalPrice(originalPrice);
  }

  async #printBenefitResult() {
    const { gift, benefits, totalBenefitMoney, payment } = this.#eventPlanner;

    this.#outputView.printGift(gift);
    this.#outputView.printBenefits(benefits);
    this.#outputView.printTotalBenefitMoney(totalBenefitMoney);
    this.#outputView.printPayment(payment);
  }

  async #printBadge() {
    const badge = await this.#eventPlanner.badge;
    this.#outputView.printBadge(badge);
  }

  // validators
  #validateDateType(date) {
    if (!isNumber(date)) throwError(MESSAGES.errors.invalidDate);
  }

  #validateOrdersFormat(orders) {
    const ORDER_REGEX = /^([ㄱ-ㅎㅏ-ㅣ가-힣]+-([1-9]|1\d|20),?)+$/;

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
