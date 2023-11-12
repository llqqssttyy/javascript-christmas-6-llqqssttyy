import { FRIDAY, HOLIDAYS, SATURDAY } from '../constants/calendar.js';

class Calendar {
  #year;

  #month;

  #weekends;

  constructor(year, month) {
    this.#year = year;
    this.#month = month;
    this.#weekends = [FRIDAY, SATURDAY];
  }

  getInfoWithDate(date) {
    const today = new Date(`${this.#year}-${this.#month}-${date}`);
    const dayOfWeek = today.getDay();

    return {
      dayOfWeek,
      isWeekend: this.isWeekend(dayOfWeek),
      holidayInfo: this.getMatchedHoliday(date),
    };
  }

  isWeekend(dayOfWeek) {
    return this.#weekends.includes(dayOfWeek);
  }

  getMatchedHoliday(date) {
    return HOLIDAYS.filter(
      (holiday) => holiday.month === this.#month && holiday.date === date,
    );
  }
}

export default Calendar;
