import EventCalendar from '../../src/models/EventCalendar';

import { CHRISTMAS_D_DAY, GIFT, SPECIAL } from '../../src/constants/events';
import { MAIN_COURSES } from '../../src/constants/menus';

describe('EventCalendar 테스트', () => {
  test('getEventBenefit 기능 테스트', () => {
    // given
    const YEAR = 2023;
    const MONTH = 12;
    const DATE = 25;
    const TOTAL_PRICE = 130_000;
    const ORDER_CATEGORIES = [MAIN_COURSES];

    const RESULT = {
      CHRISTMAS_D_DAY: CHRISTMAS_D_DAY.getBenefit(),
      SPECIAL: SPECIAL.getBenefit(),
      GIFT: GIFT.getBenefit(),
    };

    // when
    const eventCalendar = new EventCalendar(YEAR, MONTH, DATE);
    eventCalendar.setAvailableEvents({
      totalPrice: TOTAL_PRICE,
      orderCategories: ORDER_CATEGORIES,
    });

    //then
    expect(eventCalendar.availableEvents).toEqual(RESULT);
  });
});
