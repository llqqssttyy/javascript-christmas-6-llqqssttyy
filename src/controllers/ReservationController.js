import InputView from '../views/InputView.js';
import OutputView from '../views/OutputView.js';
import MESSAGES from '../constants/messages.js';
import EventPlanner from '../models/EventPlanner.js';
import handleException from '../utils/handleException.js';
import throwError from '../utils/throwError.js';
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

    this.#outputView.printMenus(this.#eventPlanner.menus);
    this.#outputView.printOriginalPrice(this.#eventPlanner.originalPrice);
  }

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

  #validateDateType(date) {
    if (!isNumber(date)) throwError(MESSAGES.errors.invalidDate);
  }

  #validateOrdersFormat(orders) {
    const formatReg = /^([ㄱ-ㅎㅏ-ㅣ가-힣]+-([1-9]|1\d|20),?)+$/;

    if (!isValidFormat(formatReg, orders))
      throwError(MESSAGES.errors.invalidOrders);
  }

  #processOrders(orders) {
    return orders.split(',').map((order) => {
      const [menu, amount] = order.split('-');
      return { menu, amount: Number(amount) };
    });
  }
}

export default ReservationController;
