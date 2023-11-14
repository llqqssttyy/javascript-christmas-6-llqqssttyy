import { FRIDAY, SATURDAY, SPECIAL_DATES } from '../constants/calendar.js';
import { ALL_EVENTS, EVENT_PERIOD } from '../constants/events.js';

class EventCalendar {
  #year;

  #month;

  #date;

  #availableEvents;

  constructor(year, month, date) {
    this.#year = year;
    this.#month = month;
    this.#date = date;
    this.#availableEvents = {};
  }

  async setAvailableEvents({ totalPrice, orderCategories }) {
    const state = this.#getState(totalPrice, orderCategories);

    await Object.entries(ALL_EVENTS).forEach(([eventName, event]) => {
      if (event.isEventAvailable(state))
        this.#availableEvents[eventName] = event.getBenefit();
    });
  }

  #getState(totalPrice, orderCategories) {
    return {
      isWeekend: this.#isWeekend(),
      isSpecialDate: this.#isSpecialDate(),
      isChristmasPeriod: this.#isChristmasPeriod(),
      totalPrice,
      orderCategories,
    };
  }

  #isWeekend() {
    const dayOfWeek = new Date(
      `${this.#year}-${this.#month}-${this.#date}`,
    ).getDay();
    return dayOfWeek === FRIDAY || dayOfWeek === SATURDAY;
  }

  #isSpecialDate() {
    return SPECIAL_DATES.includes(this.#date);
  }

  #isChristmasPeriod() {
    const { startDate, endDate } = EVENT_PERIOD;
    return this.#date >= startDate && this.#date <= endDate;
  }

  get availableEvents() {
    return this.#availableEvents;
  }
}

export default EventCalendar;
