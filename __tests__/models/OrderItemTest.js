import OrderItem from '../../src/models/OrderItem';

describe('OrderItem 기능 테스트', () => {
  test('validate - 정상 작동', async () => {
    // given
    const INPUT = '치즈버거';

    //then
    expect(() => new OrderItem(INPUT, 3)).toThrow('[ERROR]');
  });

  test('setCategory - 정상 작동', async () => {
    // given
    const INPUT = '양송이수프';
    const AMOUNT = 3;
    const RESULT = {
      category: '애피타이저',
      menu: INPUT,
      amount: AMOUNT,
      totalPrice: 6000 * AMOUNT,
    };

    //when
    const orderItem = new OrderItem(INPUT, AMOUNT);
    orderItem.setCategory(INPUT);

    //then
    expect(orderItem.DTO).toEqual(RESULT);
  });
});
