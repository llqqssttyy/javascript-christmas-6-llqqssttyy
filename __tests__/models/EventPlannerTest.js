import EventPlanner from '../../src/models/EventPlanner';

async function getEventPlanner() {
  // given
  const VISIT_DATE = 25;
  const ORDERS = [
    { menu: '양송이수프', amount: 1 },
    { menu: '타파스', amount: 1 },
    { menu: '티본스테이크', amount: 2 },
    { menu: '초코케이크', amount: 1 },
    { menu: '아이스크림', amount: 1 },
  ];

  // when
  const eventPlanner = new EventPlanner(VISIT_DATE);
  await eventPlanner.generateReceipt(ORDERS);
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

    const eventPlanner = await getEventPlanner();

    expect(eventPlanner.gift).toEqual(gift);
  });

  test('접근자 프로퍼티 테스트 - benefits', async () => {
    const benefits = {
      CHRISTMAS_D_DAY: 3400,
      SPECIAL: 1000,
      WEEKDAY: 4046,
      GIFT: {
        menu: '샴페인',
        amount: 1,
        price: 25_000,
      },
    };

    const eventPlanner = await getEventPlanner();

    expect(eventPlanner.benefits).toEqual(benefits);
  });

  test('접근자 프로퍼티 테스트 - totalBenefitMoney', async () => {
    const totalBenefitMoney = 33_446;

    const eventPlanner = await getEventPlanner();

    expect(eventPlanner.totalBenefitMoney).toBe(totalBenefitMoney);
  });

  test('접근자 프로퍼티 테스트 - payment', async () => {
    const originalPrice = 141_500;
    const discountAmount = 8_446;

    const eventPlanner = await getEventPlanner();

    expect(eventPlanner.payment).toBe(originalPrice - discountAmount);
  });

  test('접근자 프로퍼티 테스트 - badge', async () => {
    const badge = '산타';

    const eventPlanner = await getEventPlanner();

    expect(eventPlanner.badge).toBe(badge);
  });
});
