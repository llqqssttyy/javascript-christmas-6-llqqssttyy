import {
  CHRISTMAS_D_DAY,
  GIFT,
  SPECIAL,
  WEEKDAY,
} from '../../src/constants/events';
import EventCalendar from '../../src/models/EventCalendar';

describe('EventCalendar 테스트', () => {
  test('getEventBenefit 기능 테스트', () => {
    const YEAR = 2023;
    const MONTH = 12;
    const DATE = 25;
    const TOTALPRICE = 130_000;
    const RESULT = {
      CHRISTMAS_D_DAY: CHRISTMAS_D_DAY.getBenefit,
      SPECIAL: SPECIAL.getBenefit,
      WEEKDAY: WEEKDAY.getBenefit,
      GIFT: GIFT.getBenefit,
    };

    const eventCalendar = new EventCalendar(YEAR, MONTH);
    eventCalendar.setAvailableEvents(DATE, TOTALPRICE);

    expect(eventCalendar.availableEvents).toEqual(RESULT);
  });
});
