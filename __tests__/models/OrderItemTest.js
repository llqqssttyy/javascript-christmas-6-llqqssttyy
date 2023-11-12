import OrderItem from '../../src/models/Order';

describe('OrderItem 기능 테스트', () => {
  test('validate - 정상 작동', async () => {
    // given
    const INPUT = '치즈버거';

    //then
    expect(() => new OrderItem(INPUT, 3)).toThrow('[ERROR]');
  });

  test('findMenu - 정상 작동', async () => {
    // given
    const INPUT = '양송이수프';
    const RESULT = {
      category: '애피타이저',
      menu: INPUT,
      price: 6_000,
    };

    //when
    const orderItem = new OrderItem(INPUT, 3);

    //then
    expect(orderItem.findMenu(INPUT)).toEqual(RESULT);
  });
});
