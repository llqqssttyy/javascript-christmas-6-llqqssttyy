import { EVENT_NAMES } from '../../src/constants/event';
import EventPlanner from '../../src/services/EventPlanner';

const ORDERS = [
  { menu: '양송이수프', amount: 1 },
  { menu: '타파스', amount: 1 },
  { menu: '티본스테이크', amount: 2 },
  { menu: '초코케이크', amount: 1 },
  { menu: '아이스크림', amount: 1 },
];

async function getEventPlanner(orders) {
  // given
  const VISIT_DATE = 25;

  // when
  const eventPlanner = new EventPlanner(VISIT_DATE);
  await eventPlanner.generateReceipt(orders);
  await eventPlanner.generateBenefits();

  return eventPlanner;
}

describe('EventPlanner 기능 테스트', () => {
  test.each([32, 3.1])('validate - 정상 작동', async (input) => {
    expect(() => new EventPlanner(input)).toThrow('[ERROR]');
  });
});

describe('EventPlanner 혜택 조회 테스트', () => {
  test('접근자 프로퍼티 테스트 - gift', async () => {
    const gift = {
      menu: '샴페인',
      amount: 1,
      price: 25_000,
    };

    const eventPlanner = await getEventPlanner(ORDERS);

    expect(eventPlanner.gift).toEqual(gift);
  });

  test('접근자 프로퍼티 테스트 - benefits', async () => {
    const benefits = {
      [EVENT_NAMES.CHRISTMAS_D_DAY]: { amount: 1, price: 3400 },
      [EVENT_NAMES.SPECIAL]: { amount: 1, price: 1000 },
      [EVENT_NAMES.WEEKDAY]: { amount: 2, price: 2023 },
      [EVENT_NAMES.GIFT]: {
        menu: '샴페인',
        amount: 1,
        price: 25_000,
      },
    };

    const eventPlanner = await getEventPlanner(ORDERS);

    expect(eventPlanner.benefits).toEqual(benefits);
  });

  test('접근자 프로퍼티 테스트 - totalBenefitMoney', async () => {
    const totalBenefitMoney = 33_446;

    const eventPlanner = await getEventPlanner(ORDERS);

    expect(eventPlanner.totalBenefitMoney).toBe(totalBenefitMoney);
  });

  test('접근자 프로퍼티 테스트 - payment', async () => {
    const originalPrice = 141_500;
    const discountAmount = 8_446;

    const eventPlanner = await getEventPlanner(ORDERS);

    expect(eventPlanner.payment).toBe(originalPrice - discountAmount);
  });

  test.each([
    {
      orders: [
        { menu: '양송이수프', amount: 1 },
        { menu: '타파스', amount: 1 },
        { menu: '티본스테이크', amount: 2 },
        { menu: '초코케이크', amount: 1 },
        { menu: '아이스크림', amount: 1 },
      ],
      badge: '산타',
    },
    {
      orders: [
        { menu: '양송이수프', amount: 1 },
        { menu: '타파스', amount: 1 },
        { menu: '티본스테이크', amount: 1 },
        { menu: '아이스크림', amount: 4 },
      ],
      badge: '트리',
    },
    {
      orders: [
        { menu: '양송이수프', amount: 1 },
        { menu: '타파스', amount: 1 },
        { menu: '아이스크림', amount: 1 },
      ],
      badge: '별',
    },
    {
      orders: [
        { menu: '양송이수프', amount: 1 },
        { menu: '타파스', amount: 1 },
      ],
      badge: '없음',
    },
  ])('접근자 프로퍼티 테스트 - badge', async ({ orders, badge }) => {
    const eventPlanner = await getEventPlanner(orders);

    expect(eventPlanner.badge).toBe(badge);
  });
});
