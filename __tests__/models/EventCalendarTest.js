import {
  CHRISTMAS_D_DAY,
  GIFT,
  SPECIAL,
  WEEKDAY,
} from '../../src/constants/events';
import EventCalendar from '../../src/models/EventCalendar';

describe('EventCalendar 테스트', () => {
  test('findAvailableEvents 기능 테스트', () => {
    const YEAR = 2023;
    const MONTH = 12;
    const DATE = 25;
    const RESULT = [
      CHRISTMAS_D_DAY.getBenefit,
      SPECIAL.getBenefit,
      WEEKDAY.getBenefit,
      GIFT.getBenefit,
    ];

    const eventCalendar = new EventCalendar(YEAR, MONTH);
    eventCalendar.findAvailableEvents(DATE);

    expect(eventCalendar.events).toEqual(RESULT);
  });
});
