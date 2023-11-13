import OrderItem from '../../src/models/OrderItem';

describe('OrderItem 기능 테스트', () => {
  test('validate - 예외 처리', async () => {
    // given
    const INPUT = '치즈버거';

    //then
    expect(() => new OrderItem(INPUT, 3)).toThrow('[ERROR]');
  });

  test.each([
    { menu: '양송이수프', amount: 1 },
    { menu: '티본스테이크', amount: 1 },
    { menu: '초코케이크', amount: 1 },
    { menu: '해산물파스타', amount: 2 },
    { menu: '레드와인', amount: 1 },
  ])('validate - 통과', async ({ menu, amount }) => {
    //then
    expect(() => new OrderItem(menu, amount)).not.toThrow('[ERROR]');
  });

  test('접근자 프로퍼티 - item', async () => {
    // given
    const INPUT = '양송이수프';
    const AMOUNT = 3;
    const RESULT = {
      category: '애피타이저',
      menu: INPUT,
      amount: AMOUNT,
    };

    //when
    const orderItem = new OrderItem(INPUT, AMOUNT);

    //then
    expect(orderItem.item).toEqual(RESULT);
  });

  test('접근자 프로퍼티 - totalPrice', async () => {
    // given
    const INPUT = '양송이수프';
    const PRICE = 6000;
    const AMOUNT = 3;
    const RESULT = PRICE * AMOUNT;

    //when
    const orderItem = new OrderItem(INPUT, AMOUNT);

    //then
    expect(orderItem.totalPrice).toEqual(RESULT);
  });
});
