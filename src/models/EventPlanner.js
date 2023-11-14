import EventCalendar from './EventCalendar.js';
import Receipt from './Receipt.js';

import {
  BENEFIT_TYPE,
  EVENT_MONTH,
  EVENT_PERIOD,
  EVENT_YEAR,
} from '../constants/events.js';
import MESSAGES from '../constants/messages.js';

import { isInteger, isNumberInRange } from '../utils/validators.js';
import throwError from '../utils/throwError.js';

class EventPlanner {
  #visitDate;

  #eventCalendar;

  #receipt;

  #benefits;

  constructor(date) {
    this.#validate(date);
    this.#visitDate = date;
    this.#eventCalendar = new EventCalendar(EVENT_YEAR, EVENT_MONTH);
    this.#benefits = {};
  }

  #validate(date) {
    const { startDate, endDate } = EVENT_PERIOD;

    if (!isNumberInRange(startDate, endDate, date))
      throwError(MESSAGES.errors.invalidDate);

    if (!isInteger(date)) throwError(MESSAGES.errors.invalidDate);
  }

  generateReceipt(orders) {
    this.#receipt = new Receipt(orders);
    this.#receipt.generateOrders(orders);
  }

  generateBenefits() {
    const orderCategories = Object.keys(this.#receipt.receipt);

    this.#eventCalendar.setAvailableEvents(
      this.#visitDate,
      this.#receipt.totalPrice,
      orderCategories,
    );

    this.#setBenefits();
  }

  #setBenefits() {
    const conditions = {
      orderCntByCategory: this.#receipt.orderCntByCategory,
      date: this.#visitDate,
    };

    Object.entries(this.#eventCalendar.availableEvents).forEach(
      ([eventName, { type, discountAmount, gift }]) => {
        this.#benefits[eventName] =
          type === BENEFIT_TYPE.gift ? gift : discountAmount(conditions);
      },
    );
  }

  #getBadge() {
    const money = this.totalBenefitMoney;

    if (money >= 20_000) return '산타';

    if (money >= 10_000) return '트리';

    if (money >= 5000) return '별';
  }

  // 주문 메뉴
  get menus() {
    return this.#receipt.menus;
  }

  // 할인 전 총주문 금액
  get originalPrice() {
    return this.#receipt.totalPrice;
  }

  // 증정 메뉴
  get gift() {
    return this.#benefits['GIFT'];
  }

  // 혜택 내역
  get benefits() {
    return this.#benefits;
  }

  // 총 혜택 금액
  get totalBenefitMoney() {
    return Object.entries(this.#benefits).reduce(
      (acc, [eventName, benefit]) => {
        return eventName === 'GIFT' ? acc + benefit.price : acc + benefit;
      },
      0,
    );
  }

  // 할인 후 예상 결제 금액
  get payment() {
    const discountAmount = Object.entries(this.#benefits).reduce(
      (acc, [eventName, benefit]) => {
        return eventName !== 'GIFT' ? acc + benefit : acc;
      },
      0,
    );

    return this.originalPrice - discountAmount;
  }

  // 12월 이벤트 배지
  get badge() {
    return this.#getBadge();
  }
}

export default EventPlanner;
