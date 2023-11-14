import { FRIDAY, SATURDAY, SPECIAL_DATES } from '../constants/calendar';
import { ALL_EVENTS, EVENT_PERIOD } from '../constants/events';

class EventCalendar {
  #year;

  #month;

  #availableEvents;

  constructor(year, month) {
    this.#year = year;
    this.#month = month;
    this.#availableEvents = {};
  }

  async setAvailableEvents(date, totalPrice) {
    const state = this.#getState(date, totalPrice);

    await Object.keys(ALL_EVENTS).forEach((eventName) => {
      const event = ALL_EVENTS[eventName];

      if (event.isEventAvailable(state))
        this.#availableEvents[eventName] = event.getBenefit;
    });
  }

  #getState(date, totalPrice) {
    return {
      isWeekend: this.#isWeekend(date),
      isSpecialDate: this.#isSpecialDate(date),
      isChristmasPeriod: this.#isChristmasPeriod(date),
      totalPrice,
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
