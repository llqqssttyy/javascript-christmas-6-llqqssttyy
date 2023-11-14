import { DESSERTS, MAIN_COURSES } from './menus.js';

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

export const EVENT_NAMES = Object.freeze({
  CHRISTMAS_D_DAY: '크리스마스 디데이 할인',
  SPECIAL: '특별 할인',
  WEEKDAY: '평일 할인',
  WEEKEND: '주말 할인',
  GIFT: '증정 이벤트',
});

export const CHRISTMAS_D_DAY = {
  type: BENEFIT_TYPE.totalDiscount,

  discountAmount({ date }) {
    const baseAmount = 1000;
    const weightAmount = 100;

    return baseAmount + weightAmount * (date - 1);
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
  type: BENEFIT_TYPE.totalDiscount,

  discountAmount() {
    const discountAmount = 1_000;
    return discountAmount;
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
  type: BENEFIT_TYPE.menuDiscount,

  discountAmount({ orderCntByCategory }) {
    const discountAmount = 2_023;
    return orderCntByCategory[DESSERTS] * discountAmount;
  },

  getBenefit() {
    return {
      type: this.type,
      discountAmount: this.discountAmount,
    };
  },

  isEventAvailable({ isWeekend, orderCategories }) {
    return isWeekend === false && orderCategories.includes(DESSERTS);
  },
};

export const WEEKEND = {
  type: BENEFIT_TYPE.menuDiscount,

  discountAmount({ orderCntByCategory }) {
    const discountAmount = 2_023;
    return orderCntByCategory[MAIN_COURSES] * discountAmount;
  },

  getBenefit() {
    return {
      type: this.type,
      discountAmount: this.discountAmount,
    };
  },

  isEventAvailable({ isWeekend, orderCategories }) {
    return isWeekend === true && orderCategories.includes(MAIN_COURSES);
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
