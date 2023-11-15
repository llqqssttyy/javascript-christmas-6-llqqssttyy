import EventCalendar from '../domain/EventCalendar.js';
import Receipt from '../domain/Receipt.js';

import {
  EVENT_MONTH,
  EVENT_NAMES,
  EVENT_PERIOD,
  EVENT_YEAR,
} from '../constants/event.js';
import MESSAGES from '../constants/messages.js';

import { isInteger, isNumberInRange } from '../utils/validators.js';
import throwError from '../utils/throwError.js';
import { isEmptyObject } from '../utils/object.js';

class EventPlanner {
  #visitDate;

  #eventCalendar;

  #receipt;

  #benefits;

  constructor(date) {
    this.#validate(date);
    this.#visitDate = date;
    this.#eventCalendar = new EventCalendar(EVENT_YEAR, EVENT_MONTH, date);
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
    const { totalPrice, orderCategories } = this.#receipt;

    this.#eventCalendar.setAvailableEvents({
      totalPrice,
      orderCategories,
    });

    this.#setBenefits();
  }

  #setBenefits() {
    if (this.originalPrice < 10_000) return;

    const conditions = {
      orderCntByCategory: this.#receipt.orderCntByCategory,
      date: this.#visitDate,
    };

    Object.entries(this.#eventCalendar.availableEvents).forEach(
      ([eventName, getBenefit]) => {
        this.#benefits[eventName] = getBenefit(conditions);
      },
    );
  }

  #getBadge() {
    const money = this.totalBenefitMoney;

    if (money >= 20_000) return '산타';

    if (money >= 10_000) return '트리';

    if (money >= 5000) return '별';

    return '없음';
  }

  get visitDate() {
    return this.#visitDate;
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
    if (isEmptyObject(this.#benefits)) return null;

    return this.#benefits[EVENT_NAMES.GIFT];
  }

  // 혜택 내역
  get benefits() {
    if (isEmptyObject(this.#benefits)) return null;

    return this.#benefits;
  }

  // 총 혜택 금액
  get totalBenefitMoney() {
    if (isEmptyObject(this.#benefits)) return 0;

    return Object.values(this.#benefits).reduce(
      (totalBenefitMoney, { amount, price }) =>
        totalBenefitMoney + amount * price,
      0,
    );
  }

  // 할인 후 예상 결제 금액
  get payment() {
    if (isEmptyObject(this.#benefits)) return this.originalPrice;

    const discountAmount = Object.entries(this.#benefits).reduce(
      (payment, [eventName, { amount, price }]) => {
        if (eventName !== EVENT_NAMES.GIFT) return payment + amount * price;
        return payment;
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
