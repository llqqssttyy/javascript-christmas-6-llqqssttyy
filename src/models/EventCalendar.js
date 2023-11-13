import { FRIDAY, SATURDAY, SPECIAL_DATES } from '../constants/calendar';
import { ALL_EVENTS, EVENT_PERIOD } from '../constants/events';

class EventCalendar {
  #year;

  #month;

  #events;

  constructor(year, month) {
    this.#year = year;
    this.#month = month;
    this.#events = [];
  }

  async findAvailableEvents(date) {
    const info = {
      isWeekend: this.#isWeekend(date),
      isSpecialDate: this.#isSpecialDate(date),
      isChristmasPeriod: this.#isChristmasPeriod(date),
    };

    await Object.keys(ALL_EVENTS).forEach((event) => {
      const eventObj = ALL_EVENTS[event];

      if (eventObj.isEventAvailable(info))
        return this.#events.push(eventObj.getBenefit);
    });
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

  get events() {
    return this.#events;
  }
}

export default EventCalendar;
