import EventCalendar from '../../src/models/EventCalendar';

import {
  CHRISTMAS_D_DAY,
  EVENT_NAMES,
  GIFT,
  SPECIAL,
} from '../../src/constants/events';
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
      [EVENT_NAMES.CHRISTMAS_D_DAY]: CHRISTMAS_D_DAY.getEvent().getBenefit,
      [EVENT_NAMES.SPECIAL]: SPECIAL.getEvent().getBenefit,
      [EVENT_NAMES.GIFT]: GIFT.getEvent().getBenefit,
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
