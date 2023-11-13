import EventCalendar from './EventCalendar.js';
import Receipt from './Receipt.js';

import MESSAGES from '../constants/messages.js';
import { EVENT_MONTH, EVENT_PERIOD, EVENT_YEAR } from '../constants/events.js';

import { isInteger, isNumberInRange } from '../utils/validators.js';
import throwError from '../utils/throwError.js';

class EventPlanner {
  #visitDate;

  #eventCalendar;

  #receipt;

  #events;

  constructor(date) {
    this.#validate(date);
    this.#visitDate = date;
    this.#eventCalendar = new EventCalendar(EVENT_YEAR, EVENT_MONTH);
  }

  #validate(date) {
    const { startDate, endDate } = EVENT_PERIOD;

    if (!isNumberInRange(startDate, endDate, date))
      throwError(MESSAGES.errors.invalidDate);

    if (!isInteger(date)) throwError(MESSAGES.errors.invalidDate);
  }

  generateReceipt(orders) {
    this.#receipt = new Receipt(orders);
    this.#receipt.generateOrders(orders);
  }

  generateEvents() {
    this.#eventCalendar.findAvailableEvents(this.#visitDate);
    this.#events = this.#eventCalendar.events;
  }

  get menus() {
    return this.#receipt.menus;
  }

  get originalPrice() {
    return this.#receipt.totalPrice;
  }
}

export default EventPlanner;
