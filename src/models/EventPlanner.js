import MESSAGES from '../constants/messages.js';
import { isNumberInRange } from '../utils/validators.js';
import throwError from '../utils/throwError.js';

class EventPlanner {
  #calendar;

  #visitDate;

  #events;

  constructor(date) {
    this.#validate(date);
    this.#visitDate = date;
    this.#calendar = new Calendar(year, month);
  }

  #validate(date) {
    const { startDate, endDate } = EVENT_PERIOD;

    if (!isNumberInRange(startDate, endDate, date))
      throwError(MESSAGES.errors.invalidDate);

    if (!isInteger(date)) throwError(MESSAGES.errors.invalidDate);
  }
}

export default EventPlanner;
