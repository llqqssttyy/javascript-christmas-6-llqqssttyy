import { EVENT_NAMES } from '../../src/constants/event';
import {
  CHRISTMAS_D_DAY,
  GIFT,
  SPECIAL,
  WEEKDAY,
  WEEKEND,
} from '../../src/domain/Events';

describe('Events 테스트', () => {
  test.each([
    { isChristmasPeriod: true, date: 25 },
    { isChristmasPeriod: false, date: 25 },
  ])('CHRISTMAS_D_DAY 기능 테스트', ({ isChristmasPeriod, date }) => {
    const event = CHRISTMAS_D_DAY;

    const EVENT = {
      name: EVENT_NAMES.CHRISTMAS_D_DAY,
      getBenefit: event.getBenefit,
    };
    const BENEFIT = {
      amount: 1,
      price: 3_400,
    };

    expect(event.isEventAvailable({ isChristmasPeriod })).toBe(
      isChristmasPeriod,
    );
    expect(event.getEvent()).toEqual(EVENT);
    expect(event.getBenefit({ date })).toEqual(BENEFIT);
  });

  test.each([
    {
      isWeekend: true,
      orderCntByCategory: {
        디저트: 3,
      },
    },
    {
      isWeekend: true,
      orderCntByCategory: {
        메인: 3,
      },
    },
  ])('WEEKDAY 기능 테스트', ({ isWeekend, orderCntByCategory }) => {
    const event = WEEKDAY;

    const EVENT = {
      name: EVENT_NAMES.WEEKDAY,
      getBenefit: event.getBenefit,
    };
    const BENEFIT = {
      amount: orderCntByCategory['디저트'],
      price: 2_023,
    };

    expect(event.isEventAvailable({ isWeekend, orderCntByCategory })).toBe(
      !isWeekend,
    );
    expect(event.getEvent()).toEqual(EVENT);
    expect(event.getBenefit({ orderCntByCategory })).toEqual(BENEFIT);
  });

  test.each([
    {
      isWeekend: false,
      orderCntByCategory: {
        메인: 3,
      },
    },
    {
      isWeekend: false,
      orderCntByCategory: {
        디저트: 3,
      },
    },
  ])('WEEKEND 기능 테스트', ({ isWeekend, orderCntByCategory }) => {
    const event = WEEKEND;

    const EVENT = {
      name: EVENT_NAMES.WEEKEND,
      getBenefit: event.getBenefit,
    };
    const BENEFIT = {
      amount: orderCntByCategory['메인'],
      price: 2_023,
    };

    expect(event.isEventAvailable({ isWeekend, orderCntByCategory })).toBe(
      isWeekend,
    );
    expect(event.getEvent()).toEqual(EVENT);
    expect(event.getBenefit({ orderCntByCategory })).toEqual(BENEFIT);
  });

  test.each([
    {
      isSpecialDate: true,
    },
    {
      isSpecialDate: true,
    },
  ])('SPECIAL 기능 테스트', ({ isSpecialDate }) => {
    const event = SPECIAL;

    const EVENT = {
      name: EVENT_NAMES.SPECIAL,
      getBenefit: event.getBenefit,
    };
    const BENEFIT = {
      amount: 1,
      price: 1_000,
    };

    expect(event.isEventAvailable({ isSpecialDate })).toBe(isSpecialDate);
    expect(event.getEvent()).toEqual(EVENT);
    expect(event.getBenefit()).toEqual(BENEFIT);
  });

  test('GIFT 기능 테스트', () => {
    const event = GIFT;

    const TOTAL_PRICE = 130_000;
    const EVENT = {
      name: EVENT_NAMES.GIFT,
      getBenefit: event.getBenefit,
    };
    const BENEFIT = {
      menu: '샴페인',
      amount: 1,
      price: 25_000,
    };

    expect(event.isEventAvailable({ totalPrice: TOTAL_PRICE })).toBe(true);
    expect(event.getEvent()).toEqual(EVENT);
    expect(event.getBenefit()).toEqual(BENEFIT);
  });
});
