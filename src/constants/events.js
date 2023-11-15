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
  WEEKDAY: '평일 할인',
  WEEKEND: '주말 할인',
  SPECIAL: '특별 할인',
  GIFT: '증정 이벤트',
});

export const CHRISTMAS_D_DAY = {
  type: BENEFIT_TYPE.totalDiscount,

  getBenefit({ date }) {
    const baseAmount = 1000;
    const weightAmount = 100;

    return {
      amount: 1,
      price: baseAmount + weightAmount * (date - 1),
    };
  },

  getEvent() {
    return {
      name: EVENT_NAMES.CHRISTMAS_D_DAY,
      getBenefit: this.getBenefit,
    };
  },

  isEventAvailable({ isChristmasPeriod }) {
    return isChristmasPeriod === true;
  },
};

export const WEEKDAY = {
  type: BENEFIT_TYPE.menuDiscount,

  getBenefit({ orderCntByCategory }) {
    const discountAmount = 2_023;
    return {
      amount: orderCntByCategory[DESSERTS],
      price: discountAmount,
    };
  },

  getEvent() {
    return {
      name: EVENT_NAMES.WEEKDAY,
      getBenefit: this.getBenefit,
    };
  },

  isEventAvailable({ isWeekend, orderCategories }) {
    return isWeekend === false && orderCategories.includes(DESSERTS);
  },
};

export const WEEKEND = {
  type: BENEFIT_TYPE.menuDiscount,

  getBenefit({ orderCntByCategory }) {
    const discountAmount = 2_023;
    return {
      amount: orderCntByCategory[MAIN_COURSES],
      price: discountAmount,
    };
  },

  getEvent() {
    return {
      name: EVENT_NAMES.WEEKEND,
      getBenefit: this.getBenefit,
    };
  },

  isEventAvailable({ isWeekend, orderCategories }) {
    return isWeekend === true && orderCategories.includes(MAIN_COURSES);
  },
};

export const SPECIAL = {
  type: BENEFIT_TYPE.totalDiscount,

  getBenefit() {
    const discountAmount = 1_000;
    return {
      amount: 1,
      price: discountAmount,
    };
  },

  getEvent() {
    return {
      name: EVENT_NAMES.SPECIAL,
      getBenefit: this.getBenefit,
    };
  },

  isEventAvailable({ isSpecialDate }) {
    return isSpecialDate === true;
  },
};

export const GIFT = {
  type: BENEFIT_TYPE.gift,

  getBenefit() {
    return {
      menu: '샴페인',
      amount: 1,
      price: 25_000,
    };
  },

  getEvent() {
    return {
      name: EVENT_NAMES.GIFT,
      getBenefit: this.getBenefit,
    };
  },

  isEventAvailable({ totalPrice }) {
    return totalPrice >= 120_000;
  },
};

export const ALL_EVENTS = Object.freeze({
  CHRISTMAS_D_DAY,
  WEEKDAY,
  WEEKEND,
  SPECIAL,
  GIFT,
});
