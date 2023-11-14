import { FRIDAY, SATURDAY, SPECIAL_DATES } from '../constants/calendar.js';
import { ALL_EVENTS, EVENT_PERIOD } from '../constants/events.js';

class EventCalendar {
  #year;

  #month;

  #availableEvents;

  constructor(year, month) {
    this.#year = year;
    this.#month = month;
    this.#availableEvents = {};
  }

  /**
   * 이벤트 적용 가능 여부를 판단 후 이벤트 목록 객체 초기화
   * @param {number} date 날짜
   * @param {number} totalPrice 총 주문 금액
   * @param {string[]} orderCategories 주문한 카테고리들
   */
  async setAvailableEvents(date, totalPrice, orderCategories) {
    const state = this.#getState(date, totalPrice, orderCategories);

    await Object.keys(ALL_EVENTS).forEach((eventName) => {
      const event = ALL_EVENTS[eventName];

      if (event.isEventAvailable(state))
        this.#availableEvents[eventName] = event.getBenefit();
    });
  }

  #getState(date, totalPrice, orderCategories) {
    return {
      isWeekend: this.#isWeekend(date),
      isSpecialDate: this.#isSpecialDate(date),
      isChristmasPeriod: this.#isChristmasPeriod(date),
      totalPrice,
      orderCategories,
    };
  }

  #isWeekend(date) {
    const dayOfWeek = new Date(`${this.#year}-${this.#month}-${date}`).getDay();
    return dayOfWeek === FRIDAY || dayOfWeek === SATURDAY;
  }

  #isSpecialDate(date) {
    return SPECIAL_DATES.includes(date);
  }

  #isChristmasPeriod(date) {
    const { startDate, endDate } = EVENT_PERIOD;
    return date >= startDate && date <= endDate;
  }

  get availableEvents() {
    return this.#availableEvents;
  }
}

export default EventCalendar;
