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
      { menu: '양송이스프', amount: 1 },
      { menu: '타파스', amount: 1 },
    ];

    expect(() => new Receipt(INPUT)).not.toThrow('[ERROR]');
  });
});
