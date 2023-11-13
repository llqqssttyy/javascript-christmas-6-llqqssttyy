export const EVENT_YEAR = 2023;
export const EVENT_MONTH = 12;
export const EVENT_PERIOD = Object.freeze({
  startDate: 1,
  endDate: 31,
});

export const BENEFIT_TYPE = Object.freeze({
  totalPrice: 'TOTAL_PRICE',
  desserts: 'DESSERTS',
  mainCourses: 'MAIN_COURSES',
  gift: 'GIFT',
});

export const CHRISTMAS_D_DAY = {
  DISCOUNT_BASE_AMOUNT: 1_000,
  DISCOUNT_PER_DAY: 100,

  getBenefit(date) {
    return {
      type: BENEFIT_TYPE.totalPrice,
      discountAmount:
        this.DISCOUNT_BASE_AMOUNT + (date - 1) * this.DISCOUNT_PER_DAY,
    };
  },

  isEventAvailable({ isChristmasPeriod }) {
    return isChristmasPeriod === true;
  },
};

export const SPECIAL = {
  DISCOUNT_BASE_AMOUNT: 1_000,

  getBenefit() {
    return {
      type: BENEFIT_TYPE.totalPrice,
      discountAmount: this.DISCOUNT_BASE_AMOUNT,
    };
  },

  isEventAvailable({ isSpecialDate }) {
    return isSpecialDate === true;
  },
};

export const WEEKDAY = {
  DISCOUNT_BASE_AMOUNT: 2_023,

  BENEFIT_RANGE: BENEFIT_TYPE.desserts,

  getBenefit() {
    return {
      type: this.BENEFIT_RANGE,
      discountAmount: this.DISCOUNT_BASE_AMOUNT,
    };
  },

  isEventAvailable({ isWeekend }) {
    return isWeekend === false;
  },
};

export const WEEKEND = {
  DISCOUNT_BASE_AMOUNT: 2_023,

  BENEFIT_RANGE: BENEFIT_TYPE.mainCourses,

  getBenefit() {
    return {
      type: this.BENEFIT_RANGE,
      discountAmount: this.DISCOUNT_BASE_AMOUNT,
    };
  },

  isEventAvailable({ isWeekend }) {
    return isWeekend === true;
  },
};

export const GIFT = {
  DISCOUNT_BASE_AMOUNT: 25_000,

  BENEFIT_RANGE: BENEFIT_TYPE.gift,

  getBenefit(totalPrice) {
    if (totalPrice >= 120_000) {
      return { type: BENEFIT_TYPE.gift, gift: this.DISCOUNT_BASE_AMOUNT };
    }

    return { type: BENEFIT_TYPE.gift, gift: 0 };
  },

  isEventAvailable() {
    return true;
  },
};

export const ALL_EVENTS = Object.freeze({
  CHRISTMAS_D_DAY,
  SPECIAL,
  WEEKDAY,
  WEEKEND,
  GIFT,
});
