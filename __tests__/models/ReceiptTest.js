import Receipt from '../../src/models/Receipt';

describe('Recipt 클래스 기능 테스트', () => {
  test.each([
    [
      { menu: '양송이스프', amount: 10 },
      { menu: '타파스', amount: 11 },
    ],
    [
      { menu: '양송이스프', amount: 10 },
      { menu: '양송이스프', amount: 1 },
    ],
    [
      { menu: '제로콜라', amount: 1 },
      { menu: '샴페인', amount: 1 },
    ],
  ])('validator 테스트 - 예외 처리', (...inputs) => {
    expect(() => new Receipt(inputs)).toThrow('[ERROR]');
  });

  test('validator 테스트 - 통과', () => {
    const INPUT = [
      { menu: '해산물파스타', amount: 2 },
      { menu: '레드와인', amount: 1 },
      { menu: '초코케이크', amount: 1 },
    ];

    expect(() => new Receipt(INPUT)).not.toThrow('[ERROR]');
  });

  test('접근자 프로퍼티 테스트 - totalPrice', async () => {
    const INPUT = [
      { menu: '양송이수프', amount: 1 },
      { menu: '타파스', amount: 1 },
      { menu: '바비큐립', amount: 1 },
    ];
    const RESULT = 6000 + 5500 + 54000;

    const receipt = new Receipt(INPUT);
    receipt.generateOrders(INPUT);

    expect(receipt.totalPrice).toEqual(RESULT);
  });

  test('접근자 프로퍼티 테스트 - receipt', async () => {
    const INPUT = [
      { menu: '양송이수프', amount: 1 },
      { menu: '타파스', amount: 1 },
      { menu: '바비큐립', amount: 1 },
    ];
    const RESULT = {
      애피타이저: [
        { menu: '양송이수프', amount: 1 },
        { menu: '타파스', amount: 1 },
      ],
      메인: [{ menu: '바비큐립', amount: 1 }],
    };

    const receipt = new Receipt(INPUT);
    receipt.generateOrders(INPUT);

    expect(receipt.receipt).toEqual(RESULT);
  });

  test('접근자 프로퍼티 테스트 - orderCategories', async () => {
    const INPUT = [
      { menu: '양송이수프', amount: 1 },
      { menu: '타파스', amount: 1 },
      { menu: '바비큐립', amount: 1 },
    ];
    const RESULT = ['애피타이저', '메인'];

    const receipt = new Receipt(INPUT);
    receipt.generateOrders(INPUT);

    expect(receipt.orderCategories).toEqual(RESULT);
  });

  test('접근자 프로퍼티 테스트 - orderCntByCategory', async () => {
    const INPUT = [
      { menu: '양송이수프', amount: 1 },
      { menu: '타파스', amount: 1 },
      { menu: '바비큐립', amount: 1 },
    ];
    const RESULT = {
      애피타이저: 2,
      메인: 1,
    };

    const receipt = new Receipt(INPUT);
    receipt.generateOrders(INPUT);

    expect(receipt.orderCntByCategory).toEqual(RESULT);
  });

  test('접근자 프로퍼티 테스트 - menus', async () => {
    const INPUT = [
      { menu: '양송이수프', amount: 1 },
      { menu: '타파스', amount: 1 },
      { menu: '바비큐립', amount: 1 },
    ];
    const RESULT = INPUT;

    const receipt = new Receipt(INPUT);
    receipt.generateOrders(INPUT);

    expect(receipt.menus).toEqual(RESULT);
  });
});
