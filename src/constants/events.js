import { DESSERTS, MAIN_COURSES } from './menus';

export const EVENT_YEAR = 2023;
export const EVENT_MONTH = 12;
export const EVENT_PERIOD = Object.freeze({
  startDate: 1,
  endDate: 31,
});

export const BENEFIT_TYPE = Object.freeze({
  totalDiscount: 'totalDiscount',
  menuDiscount: 'menuDiscount',
  gift: 'gift',
});

export const CHRISTMAS_D_DAY = {
  baseDiscountAmount: 1_000,
  additionalDiscountAmount: 100,
  type: BENEFIT_TYPE.totalDiscount,

  discountAmount(date) {
    return this.baseDiscountAmount + this.additionalDiscountAmount * (date - 1);
  },

  getBenefit() {
    return {
      type: this.type,
      discountAmount: this.discountAmount,
    };
  },

  isEventAvailable({ isChristmasPeriod }) {
    return isChristmasPeriod === true;
  },
};

export const SPECIAL = {
  baseDiscountAmount: 1_000,
  type: BENEFIT_TYPE.totalDiscount,

  discountAmount() {
    return this.discountAmount;
  },

  getBenefit() {
    return {
      type: this.type,
      discountAmount: this.discountAmount,
    };
  },

  isEventAvailable({ isSpecialDate }) {
    return isSpecialDate === true;
  },
};

export const WEEKDAY = {
  baseDiscountAmount: 2_023,
  type: BENEFIT_TYPE.menuDiscount,

  discountAmount(orders) {
    return orders.reduce((acc, order) => {
      if (order.category === DESSERTS)
        return acc + order.price * this.baseDiscountAmount;
    }, 0);
  },

  getBenefit() {
    return {
      type: this.type,
      discountAmount: this.discountAmount,
    };
  },

  isEventAvailable({ isWeekend }) {
    return isWeekend === false;
  },
};

export const WEEKEND = {
  baseDiscountAmount: 2_023,
  type: BENEFIT_TYPE.menuDiscount,

  discountAmount(orders) {
    return orders.reduce((acc, order) => {
      if (order.category === MAIN_COURSES)
        return acc + order.price * this.baseDiscountAmount;
    }, 0);
  },

  getBenefit() {
    return {
      type: this.type,
      discountAmount: this.discountAmount,
    };
  },

  isEventAvailable({ isWeekend }) {
    return isWeekend === true;
  },
};

export const GIFT = {
  gift: { menu: '샴페인', amount: 1, price: 25_000 },
  type: BENEFIT_TYPE.gift,

  getBenefit() {
    return { type: this.type, gift: this.gift };
  },

  isEventAvailable({ totalPrice }) {
    return totalPrice >= 120_000;
  },
};

export const ALL_EVENTS = Object.freeze({
  CHRISTMAS_D_DAY,
  SPECIAL,
  WEEKDAY,
  WEEKEND,
  GIFT,
});
