const EVENT_YEAR = 2023;
const EVENT_MONTH = 12;
const EVENT_PERIOD = {
  startDate: 1,
  endDate: 31,
};

const EVENT_TYPES = {
  discount: 'DISCOUNT',
  present: 'PRESENT',
};

const CHRISTMAS_D_DAY = {
  period: {
    startDate: 1,
    endDate: 25,
  },

  type: EVENT_TYPES.discount,

  discountAmount: {
    basic: 1_000,
    additional: 100,
  },

  /**
   * @param {number} orderDate
   * @returns boolean
   */
  isEventAvailable(orderDate) {
    const { startDate, endDate } = CHRISTMAS_D_DAY.period;

    if (orderDate >= startDate.date && orderDate <= endDate.date) return true;
  },
};

const SPECIAL = {
  dates: {
    everySunday(date) {
      const dayOfWeek = new Date(date).getDay();
      return dayOfWeek === 0;
    },
  },

  type: EVENT_TYPES.discount,

  discountAmount: {
    basic: 1_000,
  },

  isEventAvailable(orderDate) {},
};
